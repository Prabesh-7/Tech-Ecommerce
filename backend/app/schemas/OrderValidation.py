# app/schemas/OrderSchema.py
from pydantic import BaseModel
from typing import List

from datetime import datetime



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

class OrderResponse(BaseModel):
    id: int
    order_id: str
    customer_name: str
    phone: str
    address: str
    items: List[OrderItem]  
    subtotal: float
    tax: float
    total: float
    payment_method: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

 
    def __init__(self, **data):
        if "items" in data and isinstance(data["items"], str):
            import json
            try:
                data["items"] = json.loads(data["items"])
            except:
                data["items"] = []
        super().__init__(**data)    
    
