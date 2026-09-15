from app.pdf_processor import extract_text_from_pdf
from app.ai_processor import extract_objectives


pdf_path = "sample_files/AI_Awareness_Workshop_Report.pdf"

pdf_text = extract_text_from_pdf(pdf_path)

objectives = extract_objectives(pdf_text)

print("========== AI GENERATED OBJECTIVES ==========")

for i, objective in enumerate(objectives, start=1):
    print(f"{i}. {objective}")

print("==============================================")