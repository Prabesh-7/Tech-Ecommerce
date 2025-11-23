# app/schemas/OrderSchema.py
from pydantic import BaseModel
from typing import List

class OrderItem(BaseModel):
    id: int
    name: str
    price: float
    quantity: int = 1
    image: str | None = None

class OrderCreate(BaseModel):
    name: str
    phone: str
    address: str
    city: str = "Kathmandu"
    province: str = "Bagmati"
    items: List[OrderItem]
    subtotal: float
    tax: float
    total: float
    payment: str  