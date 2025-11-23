from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.dbConnect import Base, engine
import asyncio

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False, index=True)
    description = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    stock = Column(Integer, nullable=False, default=0)
    category = Column(String(100), nullable=False)
    image = Column(String(255), nullable=True)  

  
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)


async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("Product tables created!")
    
    

  