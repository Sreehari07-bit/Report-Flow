from fastapi import FastAPI, UploadFile, File
from pathlib import Path
import tempfile

from app.pdf_processor import extract_text_from_pdf
from app.event_extractor import extract_event_data
from app.ai_processor import extract_objectives
from app.excel_processor import extract_attendance_from_excel
from app.data_merger import merge_event_data
from app.data_validator import validate_event_data


app = FastAPI(
    title="ReportFlow AI Processing API",
    description="AI and data processing service for ReportFlow",
    version="1.0.0",
)


@app.get("/")
def root():
    return {
        "message": "ReportFlow AI Processing API is running"
    }


@app.post("/process")
async def process_files(
    pdf_file: UploadFile = File(...),
    excel_file: UploadFile | None = File(None),
):
    with tempfile.TemporaryDirectory() as temp_dir:

        # Save uploaded PDF
        pdf_path = Path(temp_dir) / pdf_file.filename

        pdf_content = await pdf_file.read()
        pdf_path.write_bytes(pdf_content)

        # Extract PDF text
        pdf_text = extract_text_from_pdf(str(pdf_path))

        # Extract structured event information
        event_data = extract_event_data(pdf_text)

        # Extract objectives using Gemini
        event_data.objectives = extract_objectives(pdf_text)

        # Extract attendance if Excel was provided
        attendance_data = None

        if excel_file:
            excel_path = Path(temp_dir) / excel_file.filename

            excel_content = await excel_file.read()
            excel_path.write_bytes(excel_content)

            attendance_data = extract_attendance_from_excel(
                str(excel_path)
            )

        # Merge all processed information
        final_event_data = merge_event_data(
            event_data=event_data,
            attendance=attendance_data,
        )

        # Validate final data
        validation_errors = validate_event_data(final_event_data)

        if validation_errors:
            return {
                "success": False,
                "errors": validation_errors,
            }

        return {
            "success": True,
            "data": final_event_data.model_dump(),
        }