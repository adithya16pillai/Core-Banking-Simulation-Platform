from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.account import Account, AccountType
from app.schemas.account import AccountCreate, AccountResponse, AccountUpdate

router = APIRouter()

@router.post("/", response_model=AccountResponse, status_code=status.HTTP_201_CREATED)
def create_account(account: AccountCreate, db: Session = Depends(get_db)):
    db_account = Account(**account.dict())
    db.add(db_account)
    db.commit()
    db.refresh(db_account)
    return db_account

@router.get("/{account_id}", response_model=AccountResponse)
def get_account(account_id: int, db: Session = Depends(get_db)):
    account = db.query(Account).filter(Account.id == account_id).first()
    if not account:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Account not found"
        )
    return account

@router.get("/", response_model=List[AccountResponse])
def list_accounts(
    skip: int = 0,
    limit: int = 100,
    account_type: AccountType = None,
    db: Session = Depends(get_db)
):
    query = db.query(Account)
    if account_type:
        query = query.filter(Account.account_type == account_type)
    return query.offset(skip).limit(limit).all()

@router.put("/{account_id}", response_model=AccountResponse)
def update_account(
    account_id: int,
    account_update: AccountUpdate,
    db: Session = Depends(get_db)
):
    db_account = db.query(Account).filter(Account.id == account_id).first()
    if not db_account:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Account not found"
        )
    
    for field, value in account_update.dict(exclude_unset=True).items():
        setattr(db_account, field, value)
    
    db.commit()
    db.refresh(db_account)
    return db_account

@router.delete("/{account_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_account(account_id: int, db: Session = Depends(get_db)):
    account = db.query(Account).filter(Account.id == account_id).first()
    if not account:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Account not found"
        )
    db.delete(account)
    db.commit()
    return None 