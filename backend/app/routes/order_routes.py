from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.dbConnect import get_db
from app.models.Order import Order
from app.schemas.OrderValidation import OrderCreate, OrderItem
from typing import List, Dict
from sqlalchemy import select, text
from sqlalchemy.orm import Session
from app.schemas.OrderValidation import OrderResponse
import json
from app.dependencies import get_current_user

router = APIRouter(prefix="/api", tags=["Orders"])




@router.get("/my-orders")
async def get_my_orders(
    current_user = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)  
):
   
    user_mobile = None

    
    if hasattr(current_user, "mobile_number") and current_user.mobile_number:
        user_mobile = current_user.mobile_number
    
    elif isinstance(current_user, dict) and current_user.get("mobile_number"):
        user_mobile = current_user.get("mobile_number")
   
    else:
        from app.models.User import User
        result = await db.execute(select(User).where(User.email == current_user.email))
        db_user = result.scalar_one_or_none()
        if db_user and db_user.mobile_number:
            user_mobile = db_user.mobile_number

    if not user_mobile:
        raise HTTPException(
            status_code=400,
            detail="Mobile number not linked to your account. Please update your profile."
        )

    result = await db.execute(
        select(Order)
        .where(Order.phone == user_mobile)
        .order_by(Order.created_at.desc())
    )
    orders = result.scalars().all()  

    if not orders:
        return []

    response_orders = []
    for order in orders:
        try:
            items = json.loads(order.items) if order.items else []
        except:
            items = []

        response_orders.append({
            "id": order.id,
            "order_id": order.order_id,
            "customer_name": order.customer_name,
            "phone": order.phone,
            "address": order.address,
            "items": items,
            "subtotal": float(order.subtotal),
            "tax": float(order.tax),
            "total": float(order.total),
            "payment_method": order.payment_method,
            "status": order.status.capitalize(),
            "created_at": order.created_at.strftime("%B %d, %Y • %I:%M %p") if order.created_at else "N/A"
        })

    return response_orders

@router.get("/trending-products", response_model=List[Dict])
async def get_trending_products(db: AsyncSession = Depends(get_db)):
    try:
        query = text("""
            SELECT items FROM orders 
            WHERE items IS NOT NULL AND items != ''
            ORDER BY created_at DESC
        """)

        result = await db.execute(query)
        rows = result.fetchall()

        product_stats = {}

        for (items_json,) in rows:
            try:
                items = json.loads(items_json)
                if not isinstance(items, list):
                    continue

                for item in items:
                    name = item.get("name") or item.get("product_name") or "Unknown Product"
                    qty = int(item.get("quantity") or 1)
                    product_id = item.get("id")
                    price = float(item.get("price") or 0)
                    image = item.get("image")

                    category = item.get("category")
                    if not category or str(category).strip() in ["", "null", "None", "Uncategorized"]:
                        name_lower = name.lower()
                        if any(k in name_lower for k in ["keyboard", "keypad", "key board"]):
                            category = "Keyboard"
                        elif any(k in name_lower for k in ["mouse", "mice"]):
                            category = "Mouse"
                        elif any(k in name_lower for k in ["monitor", "display", "screen"]):
                            category = "Monitor"
                        elif any(k in name_lower for k in ["laptop", "macbook", "asus", "dell", "lenovo", "hp", "acer", "msi"]):
                            category = "Laptop"
                        elif any(k in name_lower for k in ["headphone", "earphone", "earbud", "airpods", "headset", "sony", "boat"]):
                            category = "Headphone"
                        elif "webcam" in name_lower or "camera" in name_lower:
                            category = "Webcam"
                        elif "speaker" in name_lower:
                            category = "Speaker"
                        else:
                            category ="HeadPhone"

                    key = f"{product_id}_{name}"

                    if key not in product_stats:
                        product_stats[key] = {
                            "id": product_id,
                            "name": name,
                            "image": image or "https://via.placeholder.com/400x400?text=Hot+Item",
                            "price": price,
                            "category": category,  
                            "total_ordered": 0
                        }
                    product_stats[key]["total_ordered"] += qty

            except (json.JSONDecodeError, TypeError, ValueError):
                continue

      
        top_products = sorted(
            product_stats.values(),
            key=lambda x: x["total_ordered"],
            reverse=True
        )[:5]

  
        for rank, product in enumerate(top_products, start=1):
            product["rank"] = rank

        return top_products

    except Exception as e:
        print("TRENDING PRODUCTS ERROR:", str(e))
        raise HTTPException(status_code=500, detail="Failed to load trending products")

@router.post("/place-order")
async def place_order(
    order_data: OrderCreate,
    db: AsyncSession = Depends(get_db)
):
    try:
        import random
        order_id = f"ORD{random.randint(100000, 999999)}"

        items_json = json.dumps([item.dict() for item in order_data.items])

        new_order = Order(
            order_id=order_id,
            customer_name=order_data.name,
            phone=order_data.phone,
            address=f"{order_data.address}, {order_data.city}, {order_data.province}",
            items=items_json,
            subtotal=order_data.subtotal,
            tax=order_data.tax,
            total=order_data.total,
            payment_method=order_data.payment,
            status="paid" if order_data.payment == "esewa" else "pending"
        )

        db.add(new_order)
        await db.commit()
        await db.refresh(new_order)

        return {
            "success": True,
            "order_id": order_id,
            "message": "Order placed successfully!"
        }

    except Exception as e:
        print("PLACE ORDER ERROR:", str(e))
        await db.rollback()
        raise HTTPException(status_code=500, detail="Order failed. Try again.")

@router.get("/orders")
async def get_all_orders(db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(
            select(Order).order_by(Order.created_at.desc())
        )
        orders = result.scalars().all()

      
        parsed_orders = []
        for order in orders:
            try:
                items = json.loads(order.items) if order.items else []
                parsed_order = {
                    "id": order.id,
                    "order_id": order.order_id,
                    "customer_name": order.customer_name,
                    "phone": order.phone,
                    "address": order.address,
                    "items": [OrderItem(**item) for item in items] if items else [],
                    "subtotal": float(order.subtotal),
                    "tax": float(order.tax),
                    "total": float(order.total),
                    "payment_method": order.payment_method,
                    "status": order.status,
                    "created_at": order.created_at
                }
                parsed_orders.append(parsed_order)
            except:
                parsed_orders.append({
                    "id": order.id,
                    "order_id": order.order_id,
                    "customer_name": order.customer_name,
                    "phone": order.phone,
                    "address": order.address,
                    "items": [],
                    "subtotal": 0,
                    "tax": 0,
                    "total": 0,
                    "payment_method": order.payment_method,
                    "status": order.status,
                    "created_at": order.created_at
                })

        return parsed_orders

    except Exception as e:
        print("GET ORDERS ERROR:", str(e))
        raise HTTPException(status_code=500, detail="Failed to fetch orders")  