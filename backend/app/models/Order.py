from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from sqlalchemy.sql import func
from app.dbConnect import Base,engine

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(String(20), unique=True, index=True)
    customer_name = Column(String(100), nullable=False)
    phone = Column(String(15), nullable=False)
    address = Column(Text, nullable=False)
    items = Column(Text, nullable=False)  # JSON string
    subtotal = Column(Float, nullable=False)
    tax = Column(Float, nullable=False)
    total = Column(Float, nullable=False)
    payment_method = Column(String(20), nullable=False)
    status = Column(String(20), default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("Order tables created!")
        