from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import text  
import urllib.parse


password = urllib.parse.quote_plus("Postgres@123")
DATABASE_URL = f"postgresql+asyncpg://postgres:{password}@localhost:5432/ecommerce"


engine = create_async_engine(DATABASE_URL, echo=True, future=True)
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

Base = declarative_base()


async def test_db_connection():
    try:
        async with engine.connect() as conn:  
            await conn.execute(text("SELECT 1"))  
        print("Database connected successfully!")
    except Exception as e:
        print(f"Database connection failed: {e}")
        raise  


async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()