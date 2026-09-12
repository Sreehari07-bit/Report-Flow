from bson.errors import InvalidId
from bson import ObjectId
from pymongo import ReturnDocument

from app.database.connection import reports_collection
from app.models.report import Report
from app.schemas.report_schema import ReportCreate, ReportResponse


def _to_response(doc: dict) -> ReportResponse:
    doc["_id"] = str(doc["_id"])
    return ReportResponse(**doc)


async def create_report(report: Report) -> str:
    result = await reports_collection.insert_one(report.model_dump())
    return str(result.inserted_id)


async def get_report(report_id: str, owner_id: str) -> ReportResponse | None:
    try:
        object_id = ObjectId(report_id)
    except InvalidId:
        return None
    doc = await reports_collection.find_one({"_id": object_id, "owner_id": owner_id})
    if doc is None:
        return None
    return _to_response(doc)


async def get_all_reports(owner_id: str) -> list[ReportResponse]:
    cursor = reports_collection.find({"owner_id": owner_id})
    return [_to_response(doc) async for doc in cursor]


async def update_report(report_id: str, owner_id: str, report_in: ReportCreate) -> ReportResponse | None:
    try:
        object_id = ObjectId(report_id)
    except InvalidId:
        return None
    result = await reports_collection.find_one_and_update(
        {"_id": object_id, "owner_id": owner_id},
        {"$set": {"title": report_in.title, "content": report_in.content}},
        return_document=ReturnDocument.AFTER,
    )
    if result is None:
        return None
    return _to_response(result)


async def delete_report(report_id: str, owner_id: str) -> bool:
    try:
        object_id = ObjectId(report_id)
    except InvalidId:
        return False
    result = await reports_collection.delete_one({"_id": object_id, "owner_id": owner_id})
    return result.deleted_count == 1