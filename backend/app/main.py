from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.dbConnect import test_db_connection
from app.models.User import create_tables
from app.models.Product import create_tables
 
from app.models.Order import create_tables 
 
from fastapi.staticfiles import StaticFiles
from app.routes.authRoutes import router as auth_router  
from app.routes.product_routes import router as product_router
from app.routes.upload_routes import router as upload_router
from app.routes.user_routes import router as user_router

from app.routes.order_routes import router as order_router


app = FastAPI(title="E-commerce API")

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],
   
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error. Try again!"},
        headers={"Access-Control-Allow-Origin": "http://localhost:5173"}
    )

app.include_router(auth_router, prefix="/api")

app.include_router(product_router)
app.include_router(upload_router)
app.include_router(user_router)

app.include_router(order_router)


@app.on_event("startup")
async def startup():
    await test_db_connection()
    await create_tables()
   
    print("App started! CORS + Auth ready!")
    
