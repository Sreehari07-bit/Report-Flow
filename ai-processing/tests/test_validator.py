from app.pdf_processor import extract_text_from_pdf
from app.event_extractor import extract_event_data
from app.excel_processor import extract_attendance_from_excel
from app.ai_processor import extract_objectives
from app.data_merger import merge_event_data
from app.data_validator import validate_event_data


pdf_path = "sample_files/AI_Awareness_Workshop_Report.pdf"
excel_path = "sample_files/attendance.xlsx"


pdf_text = extract_text_from_pdf(pdf_path)

event_data = extract_event_data(pdf_text)

event_data.objectives = extract_objectives(pdf_text)

attendance_data = extract_attendance_from_excel(excel_path)

final_event_data = merge_event_data(
    event_data=event_data,
    attendance=attendance_data,
)


errors = validate_event_data(final_event_data)


print("========== VALIDATION ==========")

if errors:
    print("VALIDATION FAILED")

    for error in errors:
        print(f"- {error}")

else:
    print("VALIDATION PASSED")
    print("Event data is ready for report generation.")

print("================================")