import pandas as pd


def extract_attendance_from_excel(file_path: str) -> dict:
    df = pd.read_excel(file_path)

    total_students = len(df)

    present_students = len(
        df[df["Status"].str.lower() == "present"]
    )

    absent_students = len(
        df[df["Status"].str.lower() == "absent"]
    )

    attendance_percentage = (
        present_students / total_students * 100
        if total_students > 0
        else 0
    )

    return {
        "total_students": total_students,
        "present_students": present_students,
        "absent_students": absent_students,
        "attendance_percentage": round(attendance_percentage, 2),
        "students": df.to_dict(orient="records")
    }