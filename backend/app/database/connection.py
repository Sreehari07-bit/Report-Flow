from motor.motor_asyncio import AsyncIOMotorClient

from app.config.settings import settings


client = AsyncIOMotorClient(settings.mongodb_url)

database = client["reportflow"]
reports_collection = database["reports"]
users_collection = database["users"]