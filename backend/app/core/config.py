from pydantic_settings import BaseSettings
from typing import Optional
import secrets

class Settings(BaseSettings):
    PROJECT_NAME: str = "BankBoxed"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Security
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    # Database
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/bankboxed"
    
    # CORS
    BACKEND_CORS_ORIGINS: list = ["*"]
    
    # Redis
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    
    # JWT
    JWT_SECRET_KEY: str = secrets.token_urlsafe(32)
    JWT_ALGORITHM: str = "HS256"
    
    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings() 