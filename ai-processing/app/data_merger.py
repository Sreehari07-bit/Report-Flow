from app.schemas import (
    EventData,
    Attendance,
    ScheduleItem,
)


def merge_event_data(
    event_data: EventData,
    attendance: dict | None = None,
    photos: list[str] | None = None,
) -> EventData:
    """
    Merge information from different processing pipelines.

    PDF processing provides:
        - event details
        - summary
        - schedule
        - recommendations
        - conclusion

    Excel processing provides:
        - attendance information

    Image processing will later provide:
        - photos
    """

    attendance_data = None

    if attendance:
        attendance_data = Attendance(**attendance)

    return EventData(
        event_name=event_data.event_name,
        date=event_data.date,
        venue=event_data.venue,
        department=event_data.department,
        target_audience=event_data.target_audience,
        executive_summary=event_data.executive_summary,
        objectives=event_data.objectives,
        schedule=event_data.schedule,
        attendance=attendance_data,
        recommendations=event_data.recommendations,
        conclusion=event_data.conclusion,
        photos=photos or event_data.photos,
    )