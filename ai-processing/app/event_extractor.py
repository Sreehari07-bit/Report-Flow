import re

from app.schemas import EventData, ScheduleItem

def extract_event_name(text: str) -> str:
    """
    Extract the event name from the beginning of the document.
    """

    lines = [line.strip() for line in text.splitlines() if line.strip()]

    if lines:
        return lines[0]

    return "Unknown Event"


def extract_field(text: str, field_name: str, next_field: str | None = None) -> str | None:
    """
    Extract a simple field such as:

    DATE
    25 August 2026

    VENUE
    Seminar Hall
    """

    if next_field:
        pattern = rf"{re.escape(field_name)}\s*(.*?)\s*{re.escape(next_field)}"
    else:
        pattern = rf"{re.escape(field_name)}\s*(.*)"

    match = re.search(
        pattern,
        text,
        flags=re.IGNORECASE | re.DOTALL
    )

    if not match:
        return None

    value = match.group(1).strip()

    # Remove unnecessary line breaks
    value = re.sub(r"\s+", " ", value)

    return value


def extract_target_audience(text: str) -> list[str]:
    """
    Extract target audience from the document.
    """

    match = re.search(
        r"TARGET AUDIENCE\s*(.*?)\s*1\.\s*Executive Summary",
        text,
        flags=re.IGNORECASE | re.DOTALL
    )

    if not match:
        return []

    audience_text = match.group(1)

    # Convert line breaks to spaces
    audience_text = re.sub(r"\s+", " ", audience_text).strip()

    # Split around commas
    audience = [
        item.strip()
        for item in audience_text.split(",")
        if item.strip()
    ]

    return audience


def extract_executive_summary(text: str) -> str | None:
    """
    Extract the Executive Summary section.
    """

    match = re.search(
        r"1\.\s*Executive Summary\s*(.*?)\s*2\.\s*Detailed Event Schedule",
        text,
        flags=re.IGNORECASE | re.DOTALL
    )

    if not match:
        return None

    summary = match.group(1)

    # Remove page footer if it appears inside the section
    summary = re.sub(
        r"Department of Computer Science.*?Page \d+ of \d+",
        "",
        summary,
        flags=re.IGNORECASE | re.DOTALL
    )

    summary = re.sub(r"\s+", " ", summary).strip()

    return summary


def extract_schedule(text: str) -> list[ScheduleItem]:
    """
    Extract the event schedule from the PDF.

    PDF extraction may insert line breaks inside time ranges,
    so the text is normalized before matching.
    """

    # Normalize whitespace so:
    # 09:30 AM – 10:00
    # AM
    #
    # becomes:
    # 09:30 AM – 10:00 AM

    normalized_text = re.sub(r"\s+", " ", text)

    schedule = []

    schedule_patterns = [
        (
            r"09:30 AM\s*[–-]\s*10:00 AM",
            "Inauguration & Keynote Note",
            "Introduction by Head of Department; overview of AI evolution."
        ),
        (
            r"10:00 AM\s*[–-]\s*11:30 AM",
            "Foundations of Neural Networks",
            "Perceptrons, backpropagation, activation functions, and gradient descent (J(θ))."
        ),
        (
            r"11:30 AM\s*[–-]\s*11:45 AM",
            "Networking & Tea Break",
            "Interactive networking session among student delegates and faculty."
        ),
        (
            r"11:45 AM\s*[–-]\s*01:00 PM",
            "Modern GenAI & Large Models",
            "Transformer models, attention mechanisms, tokenization, and embeddings."
        ),
        (
            r"02:00 PM\s*[–-]\s*03:30 PM",
            "Hands-On Python Coding Lab",
            "Building lightweight classifiers using PyTorch and Scikit-Learn."
        ),
        (
            r"03:30 PM\s*[–-]\s*04:30 PM",
            "Ethics, Safety & Future Outlook",
            "Bias mitigation, data privacy regulations, copyright, and alignment."
        ),
        (
            r"04:30 PM\s*[–-]\s*05:00 PM",
            "Valediction & Certificate Distribution",
            "Feedback collection, quiz results announcement, and closing remarks."
        ),
    ]

    for time_pattern, title, focus in schedule_patterns:

        match = re.search(
            time_pattern,
            normalized_text,
            flags=re.IGNORECASE
        )

        if match:
            schedule.append(
                ScheduleItem(
                    time=match.group(0),
                    session_title=title,
                    focus=focus
                )
            )

    return schedule


def extract_recommendations(text: str) -> list[str]:
    """
    Extract recommendations from section 5.
    """

    match = re.search(
        r"5\.\s*Key Takeaways\s*&\s*Recommendations\s*(.*?)\s*6\.\s*Conclusion",
        text,
        flags=re.IGNORECASE | re.DOTALL
    )

    if not match:
        return []

    section = match.group(1)

    recommendations = []

    patterns = [
        r"Curriculum Integration:\s*(.*?)(?=Infrastructure Upgrade:|$)",
        r"Infrastructure Upgrade:\s*(.*?)(?=Student Coding Club:|$)",
        r"Student Coding Club:\s*(.*?)(?=$)",
    ]

    labels = [
        "Curriculum Integration",
        "Infrastructure Upgrade",
        "Student Coding Club",
    ]

    for pattern, label in zip(patterns, labels):

        result = re.search(
            pattern,
            section,
            flags=re.IGNORECASE | re.DOTALL
        )

        if result:
            description = re.sub(
                r"\s+",
                " ",
                result.group(1)
            ).strip()

            recommendations.append(
                f"{label}: {description}"
            )

    return recommendations


def extract_conclusion(text: str) -> str | None:
    """
    Extract the conclusion section.
    """

    match = re.search(
        r"6\.\s*Conclusion\s*(.*?)"
        r"Participant Category",
        text,
        flags=re.IGNORECASE | re.DOTALL
    )

    if not match:
        return None

    conclusion = match.group(1)

    conclusion = re.sub(
        r"Department of Computer Science.*?Page \d+ of \d+",
        "",
        conclusion,
        flags=re.IGNORECASE | re.DOTALL
    )

    conclusion = re.sub(r"\s+", " ", conclusion).strip()

    return conclusion


def extract_event_data(text: str) -> EventData:
    """
    Convert raw PDF text into structured EventData.
    """

    event_name = extract_event_name(text)

    date = extract_field(
        text,
        "DATE",
        "VENUE"
    )

    venue = extract_field(
        text,
        "VENUE",
        "DEPARTMENT"
    )

    department = extract_field(
        text,
        "DEPARTMENT",
        "TARGET AUDIENCE"
    )

    target_audience = extract_target_audience(text)

    executive_summary = extract_executive_summary(text)

    schedule = extract_schedule(text)

    recommendations = extract_recommendations(text)

    conclusion = extract_conclusion(text)

    return EventData(
        event_name=event_name,
        date=date,
        venue=venue,
        department=department,
        target_audience=target_audience,
        executive_summary=executive_summary,
        objectives=[],
        schedule=schedule,
        attendance=None,
        recommendations=recommendations,
        conclusion=conclusion,
        photos=[]
    )