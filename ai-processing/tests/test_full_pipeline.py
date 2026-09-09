from app.pdf_processor import extract_text_from_pdf
from app.event_extractor import extract_event_data
from app.excel_processor import extract_attendance_from_excel
from app.ai_processor import extract_objectives
from app.data_merger import merge_event_data


pdf_path = "sample_files/AI_Awareness_Workshop_Report.pdf"
excel_path = "sample_files/attendance.xlsx"


# 1. Extract text from PDF
pdf_text = extract_text_from_pdf(pdf_path)


# 2. Extract structured event information
event_data = extract_event_data(pdf_text)


# 3. Use Gemini to extract objectives
objectives = extract_objectives(pdf_text)

event_data.objectives = objectives


# 4. Extract attendance from Excel
attendance_data = extract_attendance_from_excel(excel_path)


# 5. Merge everything
final_event_data = merge_event_data(
    event_data=event_data,
    attendance=attendance_data,
)


print("========== FINAL EVENT DATA ==========")
print(final_event_data.model_dump_json(indent=4))
print("======================================")