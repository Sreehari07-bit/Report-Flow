from pydantic import BaseModel, EmailStr, Field
from datetime import datetime


class User(BaseModel):
    full_name: str
    email: EmailStr
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)