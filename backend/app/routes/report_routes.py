from fastapi import APIRouter, HTTPException, Depends
from app.utils.security import get_current_user_id
from app.database.crud import create_report, get_report, get_all_reports
from app.models.report import Report
from app.schemas.report_schema import ReportCreate, ReportResponse
from app.database.crud import create_report, get_report, get_all_reports, update_report, delete_report

router = APIRouter(prefix="/reports", tags=["Reports"])


@router.post("/", response_model=dict)
async def create_new_report(
    report_in: ReportCreate,
    current_user_id: str = Depends(get_current_user_id),
):
    report = Report(
        title=report_in.title,
        content=report_in.content,
        owner_id=current_user_id,
    )
    new_id = await create_report(report)
    return {"id": new_id}


@router.get("/", response_model=list[ReportResponse])
async def list_reports(current_user_id: str = Depends(get_current_user_id)):
    return await get_all_reports(current_user_id)


@router.get("/{report_id}", response_model=ReportResponse)
async def read_report(
    report_id: str,
    current_user_id: str = Depends(get_current_user_id),
):
    report = await get_report(report_id, current_user_id)
    if report is None:
        raise HTTPException(status_code=404, detail="Report not found")
    return report
@router.put("/{report_id}", response_model=ReportResponse)
async def update_existing_report(
    report_id: str,
    report_in: ReportCreate,
    current_user_id: str = Depends(get_current_user_id),
):
    report = await update_report(report_id, current_user_id, report_in)
    if report is None:
        raise HTTPException(status_code=404, detail="Report not found")
    return report


@router.delete("/{report_id}", status_code=204)
async def delete_existing_report(
    report_id: str,
    current_user_id: str = Depends(get_current_user_id),
):
    deleted = await delete_report(report_id, current_user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Report not found")