from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from app.dbConnect import Base, engine

import asyncio


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    mobile_number = Column(String(20), unique=True, index=True, nullable=False)
    address = Column(String(255), nullable=True)
    password_hash = Column(String(255), nullable=False)
    
    role = Column(Text, nullable=False, default="user", server_default="user")
  
async def create_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("User Tables created!")