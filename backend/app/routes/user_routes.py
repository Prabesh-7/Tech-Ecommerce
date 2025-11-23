from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.dbConnect import get_db
from app.models.User import User
from app.schemas.UserValidation import UserOut
from app.dependencies import get_current_admin

router = APIRouter(prefix="/api/admin", tags=["Admin Users"])

@router.get("/viewusers", response_model=list[UserOut])
async def get_all_users(
    db: AsyncSession = Depends(get_db),
    admin = Depends(get_current_admin)
):
    result = await db.execute(select(User))
    users = result.scalars().all()
    return users