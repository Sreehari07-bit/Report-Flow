from app.schemas import EventData


def validate_event_data(event_data: EventData) -> list[str]:
    """
    Validate structured event data before it is passed
    to the report generation stage.

    Returns a list of validation errors.
    An empty list means the data is valid.
    """

    errors = []

    if not event_data.event_name.strip():
        errors.append("Event name is missing.")

    if event_data.date is None:
        errors.append("Event date is missing.")

    if event_data.venue is None:
        errors.append("Event venue is missing.")

    if event_data.department is None:
        errors.append("Department is missing.")

    if not event_data.objectives:
        errors.append("No event objectives were extracted.")

    if not event_data.schedule:
        errors.append("No event schedule was extracted.")

    if event_data.attendance:
        attendance = event_data.attendance

        if attendance.total_students < 0:
            errors.append("Total students cannot be negative.")

        if attendance.present_students < 0:
            errors.append("Present students cannot be negative.")

        if attendance.absent_students < 0:
            errors.append("Absent students cannot be negative.")

        if (
            attendance.present_students
            + attendance.absent_students
            != attendance.total_students
        ):
            errors.append(
                "Present + absent students does not equal total students."
            )

        if not 0 <= attendance.attendance_percentage <= 100:
            errors.append(
                "Attendance percentage must be between 0 and 100."
            )

    return errors