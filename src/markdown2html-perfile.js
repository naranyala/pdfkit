const fs = require('fs');
const path = require('path');
const marked = require('marked'); // Correct import for CommonJS
const prompt = require('prompt-sync')();

// Get the input file name from the command line arguments
let inputFileName = process.argv[2];

// If no argument is provided, prompt the user to enter the file name
if (!inputFileName) {
    inputFileName = prompt('Enter the Markdown file path: ');
}

// Resolve the full path of the input file
const inputFilePath = path.resolve(inputFileName);

// Read the Markdown file
fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the Markdown file:', err);
        return;
    }

    // Convert Markdown to HTML
    const htmlContent = marked.parse(data); // Use 'marked.parse' instead of 'marked'

    // Construct the output file path
    const outputFilePath = path.format({
        dir: path.dirname(inputFilePath),
        name: path.basename(inputFilePath, path.extname(inputFilePath)),
        ext: '.html'
    });

    // Write the HTML content to a file
    fs.writeFile(outputFilePath, htmlContent, (err) => {
        if (err) {
            console.error('Error writing the HTML file:', err);
            return;
        }

        console.log(`HTML file created successfully: ${outputFilePath}`);
    });
});
