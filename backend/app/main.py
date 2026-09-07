from fastapi import FastAPI
from app.database.connection import client, database

app = FastAPI(
    title="Report Flow API",
    description="Backend API for the Report Flow application",
    version="1.0.0"
)


@app.on_event("startup")
async def startup_db():
    await client.admin.command("ping")
    print("MongoDB connected successfully!")


@app.get("/")
def root():
    return {
        "message": "Report Flow API is running"
    }