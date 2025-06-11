from sqlalchemy import Column, Integer, String, Float, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.core.database import Base

class AccountType(str, enum.Enum):
    SAVINGS = "savings"
    CHECKING = "checking"
    FIXED_DEPOSIT = "fixed_deposit"
    LOAN = "loan"

class Account(Base):
    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True, index=True)
    account_number = Column(String, unique=True, index=True)
    account_type = Column(Enum(AccountType))
    balance = Column(Float, default=0.0)
    currency = Column(String, default="USD")
    interest_rate = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Foreign Keys
    customer_id = Column(Integer, ForeignKey("customers.id"))
    
    # Relationships
    customer = relationship("Customer", back_populates="accounts")
    transactions = relationship("Transaction", back_populates="account")
    
    def __repr__(self):
        return f"<Account {self.account_number}>" 