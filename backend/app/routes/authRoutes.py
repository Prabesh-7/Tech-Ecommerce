from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.dbConnect import get_db
from app.models.User import User
from app.schemas.UserValidation import UserCreate, UserOut
from passlib.context import CryptContext
from app.utils import create_access_token, oauth2_scheme, SECRET_KEY, ALGORITHM
from datetime import timedelta
from jose import jwt, JWTError

router = APIRouter()

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
    bcrypt__rounds=12,
)

ACCESS_TOKEN_EXPIRE_MINUTES = 30



@router.post("/register")
async def register(user_data: UserCreate, db: AsyncSession = Depends(get_db)):
    try:
        safe_password = user_data.password[:72]


        result = await db.execute(select(User).where(User.email == user_data.email))
        if result.scalar_one_or_none():
            raise HTTPException(status_code=400, detail="Email already registered")

      
        result = await db.execute(select(User).where(User.mobile_number == user_data.mobile_number))
        if result.scalar_one_or_none():
            raise HTTPException(status_code=400, detail="Mobile number already registered")

        hashed_password = pwd_context.hash(safe_password)

     
        new_user = User(
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            email=user_data.email,
            mobile_number=user_data.mobile_number,
            address=user_data.address,
            password_hash=hashed_password
        )

        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)

        return {
            "message": "Registration successful! Please login.",
            "user": UserOut.from_orm(new_user).model_dump() 
        }

    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/login")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db)
):
    try:
      
        result = await db.execute(select(User).where(User.email == form_data.username))
        user = result.scalar_one_or_none()

        if not user:
            raise HTTPException(status_code=401, detail="Incorrect email or password")

        if not pwd_context.verify(form_data.password[:72], user.password_hash):
            raise HTTPException(status_code=401, detail="Incorrect email or password")

        access_token = create_access_token(
            data={"sub": user.email},
            expires_delta=timedelta(minutes=60)
        )

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": user.id,
                "first_name": user.first_name,
                "email": user.email,
                "role": getattr(user, "role", "user") or "user"
            }
        }

    except Exception as e:
        print("LOGIN ERROR:", str(e)) 
        raise HTTPException(status_code=500, detail="Server busy, try again")

    
    
    
    
@router.get("/me", response_model=UserOut)
async def get_current_user_profile(
    
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db),
      
    
   
):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return UserOut.model_validate(user)    