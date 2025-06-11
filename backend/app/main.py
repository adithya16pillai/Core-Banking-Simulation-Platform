from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from datetime import datetime

app = FastAPI(
    title="BankBoxed API",
    description="Core Banking Simulation Platform API",
    version="1.0.0"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "Welcome to BankBoxed API",
        "status": "operational",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/health")
async def health_check():
    return JSONResponse(
        content={
            "status": "healthy",
            "timestamp": datetime.utcnow().isoformat()
        },
        status_code=200
    )

# Import and include routers
# from app.api.v1.endpoints import accounts, loans, transactions
# app.include_router(accounts.router, prefix="/api/v1/accounts", tags=["accounts"])
# app.include_router(loans.router, prefix="/api/v1/loans", tags=["loans"])
# app.include_router(transactions.router, prefix="/api/v1/transactions", tags=["transactions"]) 