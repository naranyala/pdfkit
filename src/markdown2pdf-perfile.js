const fs = require("fs");
const { mdToPdf } = require("md-to-pdf");
const readlineSync = require("readline-sync");
const path = require("path");

(async () => {
  // Get the first command-line argument
  let markdownFilePath = process.argv[2];

  // If no argument is provided, prompt the user for the file path
  if (!markdownFilePath) {
    while (!markdownFilePath) {
      markdownFilePath = readlineSync.question("Enter the Markdown file path (with extension): ");
      if (!markdownFilePath) {
        console.log("Markdown file path cannot be empty. Please try again.");
      }
    }
  }

  // Resolve the full path of the markdown file
  const fullMarkdownFilePath = path.resolve(markdownFilePath);

  try {
    fs.accessSync(fullMarkdownFilePath, fs.constants.R_OK);

    const pdf = await mdToPdf({ path: fullMarkdownFilePath }).catch(console.error);

    if (pdf) {
      // Remove the file extension from the original filename and append ".pdf"
      const pdfFilePath = fullMarkdownFilePath.replace(path.extname(fullMarkdownFilePath), '.pdf');

      // Write the PDF content to a file
      fs.writeFileSync(pdfFilePath, pdf.content);
      console.log(`PDF successfully generated: ${pdfFilePath}`);
    }
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
})();
