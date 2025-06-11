from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from app.models.account import AccountType

class AccountBase(BaseModel):
    account_type: AccountType
    currency: str = "USD"
    interest_rate: float = Field(ge=0.0, le=100.0)
    customer_id: int

class AccountCreate(AccountBase):
    pass

class AccountUpdate(BaseModel):
    account_type: Optional[AccountType] = None
    currency: Optional[str] = None
    interest_rate: Optional[float] = Field(None, ge=0.0, le=100.0)
    balance: Optional[float] = None

class AccountResponse(AccountBase):
    id: int
    account_number: str
    balance: float
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True 