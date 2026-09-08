const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

// File locations
const dataPath = path.join(__dirname, "sample-data.json");

// Get template choice from command line
const selectedTemplate = process.argv[2] || "event";

// Available templates
const templates = {
    event: "event-report.html",
    formal: "formal-report.html"
};

// Check template choice
if (!templates[selectedTemplate]) {
    console.error("Invalid template.");
    console.log("Use: event or formal");
    process.exit(1);
}

const templateName = templates[selectedTemplate];

const templatePath = path.join(
    __dirname,
    "..",
    "templates",
    templateName
);

const outputPath = path.join(
    __dirname,
    "..",
    "output",
    "event-report.html"
);

const pdfPath = path.join(
    __dirname,
    "..",
    "output",
    "event-report.pdf"
);


// Read event data
const data = JSON.parse(
    fs.readFileSync(dataPath, "utf8")
);


// Read selected HTML template
let template = fs.readFileSync(
    templatePath,
    "utf8"
);


// Replace simple placeholders

template = template.replace(
    /{{institution}}/g,
    data.institution
);

template = template.replace(
    /{{department}}/g,
    data.department
);

template = template.replace(
    /{{eventName}}/g,
    data.eventName
);

template = template.replace(
    /{{date}}/g,
    data.date
);

template = template.replace(
    /{{venue}}/g,
    data.venue
);

template = template.replace(
    /{{coordinator}}/g,
    data.coordinator
);

template = template.replace(
    /{{participants}}/g,
    data.participants
);

template = template.replace(
    /{{introduction}}/g,
    data.introduction
);

template = template.replace(
    /{{conclusion}}/g,
    data.conclusion
);


// Convert objectives into HTML list items

const objectivesHTML = data.objectives
    .map(objective => `<li>${objective}</li>`)
    .join("");

template = template.replace(
    /{{objectives}}/g,
    objectivesHTML
);


// Convert schedule into table rows

const scheduleHTML = data.schedule
    .map(item => `
        <tr>
            <td>${item.time}</td>
            <td>${item.activity}</td>
        </tr>
    `)
    .join("");

template = template.replace(
    /{{schedule}}/g,
    scheduleHTML
);


// Convert outcomes into HTML list items

const outcomesHTML = data.outcomes
    .map(outcome => `<li>${outcome}</li>`)
    .join("");

template = template.replace(
    /{{outcomes}}/g,
    outcomesHTML
);


// Convert photos into HTML

const photosHTML = (data.photos || [])
    .map(photo => `
        <div class="photo">
            <img
                src="../photos/${photo}"
                alt="Event Photograph"
            >
        </div>
    `)
    .join("");

template = template.replace(
    /{{photos}}/g,
    photosHTML
);


// Save generated HTML report

fs.writeFileSync(
    outputPath,
    template,
    "utf8"
);


// Generate PDF

async function generatePDF() {

    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    const fileUrl = `file://${path.resolve(outputPath)}`;

    await page.goto(
        fileUrl,
        {
            waitUntil: "networkidle0"
        }
    );

    await page.pdf({
        path: pdfPath,
        format: "A4",
        printBackground: true,

        displayHeaderFooter: true,

        headerTemplate: "<div></div>",

        footerTemplate: `
            <div style="
                width: 100%;
                text-align: center;
                font-size: 9px;
                color: #555;
                font-family: Arial, sans-serif;
            ">
                Generated using Eventory — Page
                <span class="pageNumber"></span>
                of
                <span class="totalPages"></span>
            </div>
        `,

        margin: {
            top: "20mm",
            bottom: "25mm",
            left: "15mm",
            right: "15mm"
        }
    });

    await browser.close();

    console.log("=================================");
    console.log("Report generated successfully!");
    console.log("=================================");
    console.log(`Selected template: ${templateName}`);
    console.log(`HTML: ${outputPath}`);
    console.log(`PDF:  ${pdfPath}`);
}


// Run PDF generation

generatePDF().catch(error => {

    console.error("PDF generation failed:");

    console.error(error);

});