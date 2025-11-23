from pydantic import BaseModel, Field, model_validator
from typing import Optional

class ProductCreate(BaseModel):
    name: str = Field(..., min_length=3, max_length=200, description="Product name")
    description: str = Field(..., min_length=10, description="Product description")
    price: float = Field(..., gt=0, description="Product price")
    stock: int = Field(..., ge=0, description="Available stock")
    category: str = Field(..., min_length=3, max_length=100, description="Product category")
    image: Optional[str] = Field(None, max_length=255, description="Product image URL")

    @model_validator(mode="after")
    def check_fields(self):
        if self.price < 0:
            raise ValueError("Price cannot be negative")
        return self

class ProductOut(BaseModel):
    id: int
    name: str
    description: str
    price: float
    stock: int
    category: str
    image: Optional[str] = None

    class Config:
        from_attributes = True