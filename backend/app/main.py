from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.connection import client, database
from app.routes.report_routes import router as report_router
from app.routes.auth_routes import router as auth_router

app = FastAPI(
    title="Report Flow API",
    description="Backend API for the Report Flow application",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(report_router)
app.include_router(auth_router)


@app.on_event("startup")
async def startup_db():
    await client.admin.command("ping")
    print("MongoDB connected successfully!")


@app.get("/")
def root():
    return {
        "message": "Report Flow API is running"
    }