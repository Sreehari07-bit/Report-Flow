const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    HeadingLevel,
    AlignmentType,
    Table,
    TableRow,
    TableCell,
    WidthType,
    ImageRun
} = require("docx");

const fs = require("fs");
const path = require("path");


// ================================
// File locations
// ================================

const dataPath = path.join(
    __dirname,
    "sample-data.json"
);

const outputPath = path.join(
    __dirname,
    "..",
    "output",
    "event-report.docx"
);

const photoPath = path.join(
    __dirname,
    "..",
    "photos",
    "images.jpg"
);


// ================================
// Read event data
// ================================

const data = JSON.parse(
    fs.readFileSync(dataPath, "utf8")
);


// ================================
// Create document content
// ================================

const children = [];


// ================================
// Institution
// ================================

children.push(
    new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
            new TextRun({
                text: data.institution,
                bold: true,
                size: 28
            })
        ]
    })
);


// ================================
// Department
// ================================

children.push(
    new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
            new TextRun({
                text: data.department,
                bold: true,
                size: 24
            })
        ]
    })
);


// ================================
// Report title
// ================================

children.push(
    new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: {
            before: 200,
            after: 400
        },
        children: [
            new TextRun({
                text: "EVENT REPORT",
                bold: true,
                size: 32
            })
        ]
    })
);


// ================================
// Event details
// ================================

children.push(
    new Paragraph({
        children: [
            new TextRun({
                text: "Event Name: ",
                bold: true
            }),
            new TextRun({
                text: data.eventName
            })
        ]
    })
);

children.push(
    new Paragraph({
        children: [
            new TextRun({
                text: "Date: ",
                bold: true
            }),
            new TextRun({
                text: data.date
            })
        ]
    })
);

children.push(
    new Paragraph({
        children: [
            new TextRun({
                text: "Venue: ",
                bold: true
            }),
            new TextRun({
                text: data.venue
            })
        ]
    })
);

children.push(
    new Paragraph({
        children: [
            new TextRun({
                text: "Coordinator: ",
                bold: true
            }),
            new TextRun({
                text: data.coordinator
            })
        ]
    })
);

children.push(
    new Paragraph({
        spacing: {
            after: 300
        },
        children: [
            new TextRun({
                text: "Number of Participants: ",
                bold: true
            }),
            new TextRun({
                text: String(data.participants)
            })
        ]
    })
);


// ================================
// Introduction
// ================================

children.push(
    new Paragraph({
        text: "1. Introduction",
        heading: HeadingLevel.HEADING_1
    })
);

children.push(
    new Paragraph({
        text: data.introduction
    })
);


// ================================
// Objectives
// ================================

children.push(
    new Paragraph({
        text: "2. Objectives",
        heading: HeadingLevel.HEADING_1
    })
);

data.objectives.forEach(objective => {

    children.push(
        new Paragraph({
            text: objective,
            bullet: {
                level: 0
            }
        })
    );

});


// ================================
// Event Schedule
// ================================

children.push(
    new Paragraph({
        text: "3. Event Schedule",
        heading: HeadingLevel.HEADING_1
    })
);


const scheduleRows = [];


// Table header

scheduleRows.push(
    new TableRow({
        children: [
            new TableCell({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Time",
                                bold: true
                            })
                        ]
                    })
                ]
            }),

            new TableCell({
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "Activity",
                                bold: true
                            })
                        ]
                    })
                ]
            })
        ]
    })
);


// Table data

data.schedule.forEach(item => {

    scheduleRows.push(
        new TableRow({
            children: [
                new TableCell({
                    children: [
                        new Paragraph({
                            text: item.time
                        })
                    ]
                }),

                new TableCell({
                    children: [
                        new Paragraph({
                            text: item.activity
                        })
                    ]
                })
            ]
        })
    );

});


children.push(
    new Table({
        width: {
            size: 100,
            type: WidthType.PERCENTAGE
        },
        rows: scheduleRows
    })
);


// ================================
// Participants
// ================================

children.push(
    new Paragraph({
        text: "4. Participants",
        heading: HeadingLevel.HEADING_1
    })
);

children.push(
    new Paragraph({
        text: `A total of ${data.participants} participants attended the event.`
    })
);


// ================================
// Event Photographs
// ================================

children.push(
    new Paragraph({
        text: "5. Event Photographs",
        heading: HeadingLevel.HEADING_1
    })
);


if (
    data.photos &&
    data.photos.length > 0 &&
    fs.existsSync(photoPath)
) {

    const imageData = fs.readFileSync(photoPath);

    children.push(
        new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
                new ImageRun({
                    type: "jpg",
                    data: imageData,
                    transformation: {
                        width: 400,
                        height: 300
                    }
                })
            ]
        })
    );

}


// ================================
// Outcomes
// ================================

children.push(
    new Paragraph({
        text: "6. Outcomes",
        heading: HeadingLevel.HEADING_1
    })
);

data.outcomes.forEach(outcome => {

    children.push(
        new Paragraph({
            text: outcome,
            bullet: {
                level: 0
            }
        })
    );

});


// ================================
// Conclusion
// ================================

children.push(
    new Paragraph({
        text: "7. Conclusion",
        heading: HeadingLevel.HEADING_1
    })
);

children.push(
    new Paragraph({
        text: data.conclusion
    })
);


// ================================
// Create DOCX document
// ================================

const doc = new Document({

    sections: [
        {
            properties: {},
            children: children
        }
    ]

});


// ================================
// Generate DOCX file
// ================================

Packer.toBuffer(doc)
    .then(buffer => {

        fs.writeFileSync(
            outputPath,
            buffer
        );

        console.log("=================================");
        console.log("DOCX report generated successfully!");
        console.log("=================================");
        console.log(`DOCX: ${outputPath}`);

    })
    .catch(error => {

        console.error("DOCX generation failed:");
        console.error(error);

    });