from pydantic import BaseModel, Field
from datetime import datetime


class ReportCreate(BaseModel):
    title: str
    content: str


class ReportResponse(BaseModel):
    id: str = Field(alias="_id")
    title: str
    content: str
    created_at: datetime

    model_config = {
        "populate_by_name": True,
    }