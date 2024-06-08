const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require("path")

const os = require('os');

function getAllOSInfo() {
    const osInfo = {
        platform: os.platform(),
        type: os.type(),
        release: os.release(),
        architecture: os.arch(),
        hostname: os.hostname(),
        uptime: os.uptime(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        // cpus: os.cpus(),
        // networkInterfaces: os.networkInterfaces(),
        userInfo: os.userInfo()
    };
    return osInfo;
}

function getNetworkInfo(){
  // Gather local network information
        const localNetworkInfo = {
            hostname: os.hostname(),
            networkInterfaces: {}
        };

        // Iterate over each network interface
        Object.entries(os.networkInterfaces()).forEach(([name, interfaces]) => {
            localNetworkInfo.networkInterfaces[name] = interfaces.map(interfaceInfo => ({
                address: interfaceInfo.address,
                netmask: interfaceInfo.netmask,
                family: interfaceInfo.family,
                mac: interfaceInfo.mac,
                internal: interfaceInfo.internal
            }));
        });

        return localNetworkInfo;
}

// Example usage
// const osInfo = getAllOSInfo();
// console.log(osInfo);

// const netInfo = getNetworkInfo()
// console.log(netInfo)

const currentDir = process.cwd()
const arr = currentDir.split("/")
const lastPath = arr[arr.length - 1]
const coverFilename = `__cover_${lastPath}.pdf`;

const COVER_TITLE = lastPath;


// Function to generate PDF with user information
function generateUserPDF(user) {
    // Create a new PDF document
    const doc = new PDFDocument();

    // Pipe the PDF into a writable stream
    // const stream = fs.createWriteStream('user_info.pdf');
    const stream = fs.createWriteStream(coverFilename);
    doc.pipe(stream);

    // Set PDF metadata
    doc.info.Title = 'User Information';
    doc.info.Author = 'Your Company Name';

    // Add user information to the PDF
    doc.fontSize(25).text(COVER_TITLE, { align: 'center' });
    doc.moveDown();

    doc.fontSize(16).text(`Name: ${user.name}`);
    doc.text(`Email: ${user.email}`);
    doc.text(`Age: ${user.age}`);
    doc.text(`Address: ${user.address}`);

    // Finalize the PDF and end the stream
    doc.end();

    // Notify when PDF is generated
    stream.on('finish', function() {
        console.log('PDF generated successfully.');
    });
}

// Example user data
const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30,
    address: '123 Main St, Anytown, USA'
};

// console.log(process.cwd())
// console.log(user)

// Generate the PDF
generateUserPDF(user);


