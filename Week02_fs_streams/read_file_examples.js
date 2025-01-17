const fs = require('fs');

// Console.log(fs)


console.log("----- Start -----");
fs.readFile('input.txt', (err, data) => {
     if(err){
        console.log(err.message);
        return 
     }
     console.log("1: " + data.toString());
});


let readDt = fs.readFileSync("input.txt"); // Syncranous

console.log(readDt.toString());


async function readData() {
    try {
        const data = await fs.promises.readFile('output.txt');
        console.log(data.toString());
    } catch(error) {
        console.log(error.message);
    }
}

readData();

console.log("----- End -----");