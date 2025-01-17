const fs = require('fs');

fs.open('data.txt','w+',(err, fd)=>{
    if(err){
        console.log(err.message);
        return;
    }
    console.log("Opened successfully!");

    let buffer = Buffer.alloc(10);
    const dataRead = fs.readSync(fd,buffer, 0, buffer.length);

    console.log(buffer.toString());
    const data = "George Brown College";
    fs.write(fd,data, (err)=>{
        if(err){
            console.log(err.message);
        return;
        }
        console.log("Data Written!");
        fs.close(fd);
    });
  
// const err = fs.writeSync(fd,data);

});
