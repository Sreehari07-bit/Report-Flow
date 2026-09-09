from app.pdf_processor import extract_text_from_pdf
from app.event_extractor import extract_event_data


pdf_path = "sample_files/AI_Awareness_Workshop_Report.pdf"


# Step 1: Extract raw text from PDF
text = extract_text_from_pdf(pdf_path)


# Step 2: Convert raw text into structured EventData
event_data = extract_event_data(text)


# Step 3: Display structured data
print("========== STRUCTURED EVENT DATA ==========")

print(event_data.model_dump_json(indent=4))

print("===========================================")