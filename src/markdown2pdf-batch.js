const fs = require("fs");
const { mdToPdf } = require("md-to-pdf");
const path = require("path");

async function convertMarkdownToPdf(directoryPath) {
  try {
    // Get list of files in the directory
    const files = fs.readdirSync(directoryPath);

    // Iterate through each file
    for (const file of files) {
      // Check if it's a Markdown file
      if (path.extname(file) === ".md") {
        const markdownFilePath = path.join(directoryPath, file);
        const pdfFilePath = path.join(
          directoryPath,
          `${path.basename(file, ".md")}.pdf`,
        );

        // Check if PDF file already exists
        if (fs.existsSync(pdfFilePath)) {
          console.log(`Skipping ${file} - PDF file already exists.`);
        } else {
          // Convert Markdown to PDF
          const pdf = await mdToPdf({ path: markdownFilePath }).catch(
            console.error,
          );

          // Write the PDF content to a file
          fs.writeFileSync(pdfFilePath, pdf.content);
          console.log(`Converted ${file} to PDF: ${pdfFilePath}`);
        }
      }
    }

    console.log("Conversion complete.");
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

// Example usage:
const directoryPath = getInput(
  "Enter the directory path where all Markdown files are located: ",
);
convertMarkdownToPdf(directoryPath);

function getInput(prompt) {
  const readlineSync = require("readline-sync");
  return readlineSync.question(prompt);
}

