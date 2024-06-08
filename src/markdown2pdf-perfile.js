const fs = require("fs");
const { mdToPdf } = require("md-to-pdf");
const readlineSync = require("readline-sync");
const path = require("path");

(async () => {
  // Input directory path for Markdown file
  const directoryPath = readlineSync.question(
    "Enter the directory path for the Markdown file: ",
  );

  // Input Markdown filename
  const markdownFilename = readlineSync.question(
    "Enter the Markdown file name (with extension): ",
  );

  const markdownFilePath = path.join(directoryPath, markdownFilename);

  try {
    fs.accessSync(markdownFilePath, fs.constants.R_OK);

    const pdf = await mdToPdf({ path: markdownFilePath }).catch(console.error);

    if (pdf) {
      // Remove ".md" extension from filename
      const pdfFilename = path.basename(
        markdownFilename,
        path.extname(markdownFilename),
      );

      // Write the PDF content to a file
      fs.writeFileSync(`${directoryPath}/${pdfFilename}.pdf`, pdf.content);
      console.log(
        `PDF successfully generated: ${directoryPath}/${pdfFilename}.pdf`,
      );
    }
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
})();

