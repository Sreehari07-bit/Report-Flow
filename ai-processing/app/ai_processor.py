import json
import os

from dotenv import load_dotenv
from google import genai


load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError(
        "GEMINI_API_KEY is not set. "
        "Please check your .env file."
    )

client = genai.Client(api_key=api_key)


def extract_objectives(event_text: str) -> list[str]:
    """
    Use Gemini AI to identify the main objectives
    of an event from extracted document text.
    """

    prompt = f"""
You are processing an institutional event report.

Read the event information below and identify the main
objectives of the event.

Return ONLY a valid JSON array of concise objective strings.

Do not invent information.
Only infer objectives that are reasonably supported
by the provided document.

Example:
["Objective one", "Objective two", "Objective three"]

Event report:

{event_text}
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
    )

    result = response.text.strip()

    # Remove markdown code fences if Gemini adds them
    if result.startswith("```"):
        result = result.replace("```json", "")
        result = result.replace("```", "")
        result = result.strip()

    try:
        objectives = json.loads(result)
    except json.JSONDecodeError as error:
        raise ValueError(
            f"Gemini returned invalid JSON:\n{result}"
        ) from error

    if not isinstance(objectives, list):
        raise ValueError(
            "AI response is not a JSON list."
        )

    return objectives