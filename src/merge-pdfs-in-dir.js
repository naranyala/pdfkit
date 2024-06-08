const fs = require("fs").promises;
const { PDFDocument } = require("pdf-lib");
const path = require("path");

function normalizeToKebabCase(inputString) {
  return inputString.toLowerCase().replace(/\W+/g, "-");
}

async function mergePdfFiles(directoryPath) {
  const mergedPdf = await PDFDocument.create();

  try {
    // Get list of files in the directory
    const files = await fs.readdir(directoryPath);

    // Iterate through each file
    for (const file of files) {
      // Check if it's a PDF file
      if (path.extname(file) === ".pdf") {
        const pdfFilePath = path.join(directoryPath, file);

        // Load PDF document
        const pdfBytes = await fs.readFile(pdfFilePath);
        const pdfDoc = await PDFDocument.load(pdfBytes);

        // Copy pages from PDF document to merged PDF
        const copiedPages = await mergedPdf.copyPages(
          pdfDoc,
          pdfDoc.getPageIndices(),
        );
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }
    }

    const arr = directoryPath.split("/");
    const finalMergedFilename = `__${normalizeToKebabCase(arr.at(-1))}-all-merged.pdf`;
    console.log(`result: `, finalMergedFilename);

    // Write the merged PDF to a file
    const mergedPdfFilePath = path.join(directoryPath, finalMergedFilename);

    // Check if file already exists
    const fileExists = await fs
      .access(mergedPdfFilePath)
      .then(() => true)
      .catch(() => false);
    if (fileExists) {
      // Delete existing file
      await fs.unlink(mergedPdfFilePath);
      console.log(`Existing file "${mergedPdfFilePath}" deleted.`);
    }

    // Save the merged PDF
    const mergedPdfBytes = await mergedPdf.save();
    await fs.writeFile(mergedPdfFilePath, mergedPdfBytes);

    console.log(
      `PDFs successfully merged into one giant PDF: ${mergedPdfFilePath}`,
    );
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

// Example usage:
const directoryPath = getInput(
  "Enter the directory path where all PDF files are located: ",
);
mergePdfFiles(directoryPath);

function getInput(prompt) {
  const readlineSync = require("readline-sync");
  return readlineSync.question(prompt);
}

