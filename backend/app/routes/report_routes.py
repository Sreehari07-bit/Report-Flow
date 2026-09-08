from fastapi import APIRouter, HTTPException

from app.database.crud import create_report, get_report, get_all_reports
from app.models.report import Report
from app.schemas.report_schema import ReportCreate, ReportResponse

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.post("/", response_model=dict)
async def create_new_report(report_in: ReportCreate):
    report = Report(title=report_in.title, content=report_in.content)
    new_id = await create_report(report)
    return {"id": new_id}


@router.get("/", response_model=list[ReportResponse])
async def list_reports():
    return await get_all_reports()


@router.get("/{report_id}", response_model=ReportResponse)
async def read_report(report_id: str):
    report = await get_report(report_id)
    if report is None:
        raise HTTPException(status_code=404, detail="Report not found")
    return report