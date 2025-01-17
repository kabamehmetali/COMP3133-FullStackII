const fs = require('fs');

// const Streams = require('stream');
// const frs = Streams.ReadStream
// const fws = Streams.WriteStream


const readStream = fs.createReadStream('input_stream.txt');
const writeStream = fs.createWriteStream('output_stream.txt');


readStream.on('data',(chunk) => {
    console.log(chunk);
    console.log(chunk.toString());
    console.log(chunk.length);
    
})

readStream.on('end',() => {
    console.log('Input Streams Ends.');
})

readStream.on('error', (err) => {
    console.log(err.message);
})

readStream.on('close', () => {
    console.log('Input Stream Closed.')
})


// Write Stream 

writeStream.on('error',(err) => {
    console.log("Write Stream Error!!");
})
// writeStream.write("hello");
// writeStream.write("world");

// Pipe

readStream.pipe(writeStream);
