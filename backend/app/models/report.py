from pydantic import BaseModel, Field
from datetime import datetime


class Report(BaseModel):
    title: str
    content: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    