
from pydantic import BaseModel, EmailStr, Field, model_validator
from typing import Optional


class UserCreate(BaseModel):
    first_name: str = Field(..., min_length=2, max_length=100)
    last_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    mobile_number: str = Field(..., pattern=r"^\d{10}$")
    address: Optional[str] = None
    password: str = Field(..., min_length=8, max_length=72)  
    confirm_password: str = Field(..., max_length=72)

    @model_validator(mode="after")
    def check_passwords_match(self):
        if self.password != self.confirm_password:
            raise ValueError("Passwords do not match")
        return self
    

class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    mobile_number: str
    address: Optional[str] = None
    role: Optional[str] = "user"
    
    class Config:
        from_attributes = True   
        
        
