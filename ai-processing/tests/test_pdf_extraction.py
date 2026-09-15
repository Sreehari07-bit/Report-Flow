from app.pdf_processor import extract_text_from_pdf


pdf_path = "sample_files/AI_Awareness_Workshop_Report.pdf"

text = extract_text_from_pdf(pdf_path)

print("========== PDF TEXT EXTRACTION ==========")
print(text)
print("==========================================")