from bson import ObjectId

from app.database.connection import reports_collection
from app.models.report import Report


async def create_report(report: Report) -> str:
    result = await reports_collection.insert_one(report.model_dump())
    return str(result.inserted_id)


async def get_report(report_id: str) -> dict | None:
    return await reports_collection.find_one({"_id": ObjectId(report_id)})


async def get_all_reports() -> list[dict]:
    cursor = reports_collection.find()
    return [doc async for doc in cursor]