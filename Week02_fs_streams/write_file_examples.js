const fs = require('fs');


// var data = "Hello World";
 
var data = Buffer.from("Hello From GBC!");

fs.writeFile("output.txt", data, (err) => {
    if(err){
        console.log(err.message);
        return;
    }
    console.log("Data Written successfully...");
});


data = "TESTING"
var error = fs.writeFileSync('output.txt',data); //Async
console.log("data Written");