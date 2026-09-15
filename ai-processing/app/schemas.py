from pydantic import BaseModel, Field
from typing import List, Optional


class Attendance(BaseModel):
    total_students: int = 0
    present_students: int = 0
    absent_students: int = 0
    attendance_percentage: float = 0.0


class ScheduleItem(BaseModel):
    time: str
    session_title: str
    focus: Optional[str] = None


class EventData(BaseModel):
    event_name: str
    date: Optional[str] = None
    venue: Optional[str] = None
    department: Optional[str] = None

    target_audience: List[str] = Field(default_factory=list)

    executive_summary: Optional[str] = None

    objectives: List[str] = Field(default_factory=list)

    schedule: List[ScheduleItem] = Field(default_factory=list)

    attendance: Optional[Attendance] = None

    recommendations: List[str] = Field(default_factory=list)

    conclusion: Optional[str] = None

    photos: List[str] = Field(default_factory=list)