import pymupdf


def extract_text_from_pdf(file_path: str) -> str:
    document = pymupdf.open(file_path)

    pages = []

    for page in document:
        page_text = page.get_text()

        if page_text.strip():
            pages.append(page_text.strip())

    document.close()

    return "\n\n".join(pages)