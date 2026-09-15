const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");


// ================================
// Customization settings
// ================================

const customizationPath = path.join(
    __dirname,
    "customization.json"
);

const customization = JSON.parse(
    fs.readFileSync(customizationPath, "utf8")
);


// ================================
// File locations
// ================================

const dataPath = path.join(
    __dirname,
    "sample-data.json"
);

const selectedTemplate = process.argv[2] || "event";


// ================================
// Available templates
// ================================

const templates = {
    event: "event-report.html",
    formal: "formal-report.html"
};


// ================================
// Check template choice
// ================================

if (!templates[selectedTemplate]) {

    console.error("Invalid template.");
    console.log("Use: event or formal");

    process.exit(1);
}


const templateName = templates[selectedTemplate];


// ================================
// Template path
// ================================

const templatePath = path.join(
    __dirname,
    "..",
    "templates",
    templateName
);


// ================================
// Output paths
// ================================

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


// ================================
// Read event data
// ================================

const data = JSON.parse(
    fs.readFileSync(dataPath, "utf8")
);


// ================================
// Read selected template
// ================================

let template = fs.readFileSync(
    templatePath,
    "utf8"
);


// ================================
// Replace simple placeholders
// ================================

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


// ================================
// Objectives
// ================================

const objectivesHTML = (data.objectives || [])
    .map(objective => `<li>${objective}</li>`)
    .join("");

template = template.replace(
    /{{objectives}}/g,
    objectivesHTML
);


// ================================
// Schedule
// ================================

const scheduleHTML = (data.schedule || [])
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


// ================================
// Outcomes
// ================================

const outcomesHTML = (data.outcomes || [])
    .map(outcome => `<li>${outcome}</li>`)
    .join("");

template = template.replace(
    /{{outcomes}}/g,
    outcomesHTML
);


// ================================
// Photos
// ================================

const photosHTML = (data.photos || [])
    .map(photo => {

        const photoPath = path.resolve(
            __dirname,
            "..",
            "photos",
            photo
        );

        if (!fs.existsSync(photoPath)) {

            console.warn(
                `Photo not found: ${photoPath}`
            );

            return `
                <div class="photo">
                    <p>Photo not found: ${photo}</p>
                </div>
            `;
        }


        const imageData = fs.readFileSync(
            photoPath
        );


        const extension = path
            .extname(photo)
            .toLowerCase();


        let mimeType = "image/jpeg";


        if (extension === ".png") {
            mimeType = "image/png";
        }

        else if (
            extension === ".jpg" ||
            extension === ".jpeg"
        ) {
            mimeType = "image/jpeg";
        }

        else if (extension === ".webp") {
            mimeType = "image/webp";
        }


        const base64Image =
            imageData.toString("base64");


        return `
            <div
                class="photo"
                style="
                    display: block;
                    width: 100%;
                    text-align: center;
                    margin-top: 15px;
                    margin-bottom: 20px;
                    page-break-inside: avoid;
                "
            >

                <img
                    src="data:${mimeType};base64,${base64Image}"
                    alt="Event Photograph"
                    style="
                        display: inline-block;
                        width: 300px;
                        height: 220px;
                        max-width: 100%;
                        object-fit: contain;
                        border: 1px solid #999;
                        padding: 3px;
                    "
                >

            </div>
        `;
    })
    .join("");


template = template.replace(
    /{{photos}}/g,
    photosHTML
);


// ================================
// Customization CSS
// ================================

const backgroundImageCSS =
    customization.backgroundImage
        ? `
            background-image: url("../photos/${customization.backgroundImage}");
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
        `
        : "";


const customizationCSS = `
<style>

    body {

        font-family: "${customization.fontFamily}";

        font-size: ${customization.fontSize}px;

        color: ${customization.textColor};

        background-color: ${customization.backgroundColor};

        ${backgroundImageCSS}

    }


    h1,
    h2,
    h3 {

        font-family: "${customization.headingFontFamily}";

        color: ${customization.headingColor};

    }


    h1 {

        font-size: ${customization.headingFontSize}px;

    }


    .header {

        ${customization.header.enabled
            ? ""
            : "display: none;"
        }

    }


    .photos {

        display: block;

        width: 100%;

        margin-top: 15px;

    }


    .photo {

        display: block;

        width: 100%;

        text-align: center;

        page-break-inside: avoid;

    }


    .photo img {

        width: ${customization.photo.width}px;

        height: ${customization.photo.height}px;

        max-width: 100%;

        object-fit: contain;

        display: inline-block;

    }


    .custom-header {

        text-align: center;

        font-family: "${customization.fontFamily}";

        font-size: ${customization.fontSize}px;

        margin-bottom: 20px;

    }


    .custom-footer {

        text-align: center;

        font-family: Arial, sans-serif;

        font-size: 10px;

        color: #555;

    }

</style>
`;


// ================================
// Add customization CSS
// ================================

template = template.replace(
    "</head>",
    `${customizationCSS}</head>`
);


// ================================
// Custom header
// ================================

if (
    customization.header.enabled &&
    customization.header.text
) {

    const headerHTML = `
        <div class="custom-header">
            ${customization.header.text}
        </div>
    `;

    template = template.replace(
        "<body>",
        `<body>${headerHTML}`
    );

}


// ================================
// Custom footer
// ================================
//
// If page numbers are enabled,
// Puppeteer will create the footer.
// Therefore we must NOT add another
// HTML footer.

if (
    !customization.pageNumbers &&
    customization.footer.enabled &&
    customization.footer.text
) {

    const footerHTML = `
        <div class="custom-footer">
            ${customization.footer.text}
        </div>
    `;

    template = template.replace(
        "</body>",
        `${footerHTML}</body>`
    );

}


// ================================
// Save generated HTML
// ================================

fs.writeFileSync(
    outputPath,
    template,
    "utf8"
);


// ================================
// Generate PDF
// ================================

async function generatePDF() {

    const browser = await puppeteer.launch();


    const page = await browser.newPage();


    const fileUrl =
        `file://${path.resolve(outputPath)}`;


    await page.goto(
        fileUrl,
        {
            waitUntil: "networkidle0"
        }
    );


    // ================================
    // Wait for all images
    // ================================

    await page.waitForFunction(() => {

        const images =
            Array.from(document.images);

        return images.every(
            image => image.complete
        );

    });


    // ================================
    // Generate PDF
    // ================================

    await page.pdf({

        path: pdfPath,

        format: "A4",

        printBackground: true,

        displayHeaderFooter:
            customization.pageNumbers,

        headerTemplate:
            "<div></div>",

        footerTemplate:
            customization.pageNumbers
                ? `
                    <div style="
                        width: 100%;
                        text-align: center;
                        font-size: 9px;
                        color: #555;
                        font-family: Arial, sans-serif;
                    ">
                        ${customization.footer.text}
                        — Page
                        <span class="pageNumber"></span>
                        of
                        <span class="totalPages"></span>
                    </div>
                `
                : "<div></div>",

        margin: {

            top:
                `${customization.margins.top}mm`,

            bottom:
                `${customization.margins.bottom + 10}mm`,

            left:
                `${customization.margins.left}mm`,

            right:
                `${customization.margins.right}mm`

        }

    });


    await browser.close();


    console.log("=================================");
    console.log("Report generated successfully!");
    console.log("=================================");

    console.log(
        `Selected template: ${templateName}`
    );

    console.log(
        `Font: ${customization.fontFamily}`
    );

    console.log(
        `Font size: ${customization.fontSize}px`
    );

    console.log(
        `Background: ${customization.backgroundColor}`
    );

    console.log(
        `Photos processed: ${(data.photos || []).length}`
    );

    console.log(
        `Page numbers: ${customization.pageNumbers}`
    );

    console.log(
        `HTML: ${outputPath}`
    );

    console.log(
        `PDF:  ${pdfPath}`
    );

}


// ================================
// Run PDF generation
// ================================

generatePDF().catch(error => {

    console.error(
        "PDF generation failed:"
    );

    console.error(error);

});