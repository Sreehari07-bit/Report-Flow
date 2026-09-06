from fastapi import FastAPI

app = FastAPI(
    title="Report Flow API",
    description="Backend API for the Report Flow application",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "Report Flow API is running"
    }