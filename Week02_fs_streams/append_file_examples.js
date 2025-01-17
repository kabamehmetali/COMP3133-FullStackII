const fs = require('fs');

var dataToAppend = "\nI am from append File";

fs.appendFile('output.txt',dataToAppend, (err)=>{
    if(err){
        console.log(err.message);
        return;
    }
    console.log("Append Success.");
})


const error = fs.appendFileSync('output.txt',dataToAppend);


async function readData() {
    try {
        const data = await fs.promises.readFile('output.txt');
        console.log(data.toString());
    } catch(error) {
        console.log(error.message);
    }
}

readData();
