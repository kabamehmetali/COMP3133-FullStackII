// MEHMET ALI KABA
// 101453763


const fs = require('fs'); // importing file system here
const csvParser = require('csv-parser'); // importing csw parser

// File paths
const inputFilePath = 'input_countries.csv';
const canadaFilePath = 'canada.txt';
const usaFilePath = 'usa.txt';

// This is my task one deleting canada and usa files if exist.
function deleteFile(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`${filePath} deleted.`);
        }
    } catch (err) {
        console.error(`Error deleting ${filePath}:`, err.message);
    }
}


// This is my task three to read CSV file and filter data
function filterCSVData(inputPath, callback) {
    const canadaData = [];
    const usaData = [];

    try {
        const readStream = fs.createReadStream(inputPath);

        readStream
            .pipe(csvParser())
            .on('data', (row) => {
                if (row.country === 'Canada') {
                    canadaData.push(row);
                } else if (row.country === 'United States') {
                    usaData.push(row);
                }
            })
            .on('end', () => {
                console.log('CSV file successfully processed.');
                callback(null, { canadaData, usaData });
            })
            .on('error', (err) => {
                console.error('Error reading the CSV file:', err.message);
                callback(err);
            });
    } catch (err) {
        console.error('Error setting up the CSV file read operation:', err.message);
        callback(err);
    }
}

// this is for writing data
function writeToFile(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`Data written to ${filePath}`);
    } catch (err) {
        console.error(`Error writing to ${filePath}:`, err.message);
    }
}

// This is additional function to read the data
function readAndDisplayFile(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        console.log(`Content of ${filePath}:`);
        console.log(fileContent);
    } catch (err) {
        console.error(`Error reading ${filePath}:`, err.message);
    }
}

// This is my main function to execute all tasks
function processCSVData() {
    // Step 1: Deleting existing files
    deleteFile(canadaFilePath);
    deleteFile(usaFilePath);

    // Step 2: Filtering data from the CSV file
    filterCSVData(inputFilePath, (err, result) => {
        if (err) {
            console.error('Error filtering CSV data:', err.message);
            return;
        }

        // Step 3: Writening filtered data to files
        writeToFile(canadaFilePath, result.canadaData);
        writeToFile(usaFilePath, result.usaData);

        // Step 4: Readgin and displaying the data on console
        readAndDisplayFile(canadaFilePath);
        readAndDisplayFile(usaFilePath);
    });
}

// I am executing the main function here.
processCSVData();
