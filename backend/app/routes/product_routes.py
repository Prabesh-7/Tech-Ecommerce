from fastapi import APIRouter, Depends, HTTPException, Form, File, UploadFile
from sqlalchemy import select, desc , text
from sqlalchemy.ext.asyncio import AsyncSession
from app.dbConnect import get_db
from app.models.Product import Product
from app.schemas.ProductValidation import ProductCreate, ProductOut
from app.dependencies import get_current_admin


router = APIRouter(prefix="/api/admin", tags=["Admin"])
# NEW ARRIVALS — FIXED: Using 'id' instead of created_at
@router.get("/new-arrivals", response_model=list[ProductOut])
async def get_new_arrivals(db: AsyncSession = Depends(get_db)):
    """
    Returns latest 5 products (by highest ID = newest added)
    Since you don't have created_at column yet
    """
    result = await db.execute(
        select(Product)
        .order_by(desc(Product.id))  # Latest by ID
        .limit(5)
    )
    products = result.scalars().all()
    return products







@router.get("/viewproducts", response_model=list[ProductOut])
async def get_products(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Product))
    return result.scalars().all()



@router.post("/products", response_model=ProductOut)
async def add_product(
    name: str = Form(...),          
    description: str = Form(...),    
    price: float = Form(...),       
    stock: int = Form(...),          
    category: str = Form(...),      
    image: str = Form(None),         
    db: AsyncSession = Depends(get_db),
    admin = Depends(get_current_admin)
):
    
    try:
        new_product = Product(
            name=name,
            description=description,
            price=price,
            stock=stock,
            category=category,
            image=image,  
            owner_id=admin.id
        )
        db.add(new_product)
        await db.commit()
        await db.refresh(new_product)
        return ProductOut.model_validate(new_product)
    except Exception as e:
        await db.rollback()
        raise HTTPException(500, detail=str(e))