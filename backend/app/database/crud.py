from bson.errors import InvalidId
from bson import ObjectId

from app.database.connection import reports_collection
from app.models.report import Report
from app.schemas.report_schema import ReportResponse


def _to_response(doc: dict) -> ReportResponse:
    doc["_id"] = str(doc["_id"])
    return ReportResponse(**doc)


async def create_report(report: Report) -> str:
    result = await reports_collection.insert_one(report.model_dump())
    return str(result.inserted_id)


async def get_report(report_id: str) -> ReportResponse | None:
    try:
        object_id = ObjectId(report_id)
    except InvalidId:
        return None
    doc = await reports_collection.find_one({"_id": object_id})
    if doc is None:
        return None
    return _to_response(doc)


async def get_all_reports() -> list[ReportResponse]:
    cursor = reports_collection.find()
    return [_to_response(doc) async for doc in cursor]