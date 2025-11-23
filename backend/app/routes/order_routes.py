from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.dbConnect import get_db
from app.models.Order import Order
from app.schemas.OrderValidation import OrderCreate, OrderItem
from typing import List
from sqlalchemy import select
import json

router = APIRouter(prefix="/api", tags=["Orders"])

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