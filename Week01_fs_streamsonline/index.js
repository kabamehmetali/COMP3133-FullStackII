console.log("Week 01 - Buffer Examples");

let b1 = Buffer.from("A Hello World"); // gets data as hexadecimal

console.log(b1)
console.log(b1.toString());
console.log(b1[0]);

console.log(b1.toString('utf-8'));
console.log(b1.toString('hex'));
console.log(b1.toString('base64'));
console.log(b1.toString('ascii'));
console.log(b1.toString('ucs-2'));

console.log(b1.includes('He'));
console.log(b1.length);

let b2 = Buffer.alloc(10); // Allocates the size of the buffer.
console.log(b2);
console.log(b2.toString());
b2[0] = 65//'🎁';
console.log(b2);
console.log(b2.toString());
console.log(b2);

let b3 = Buffer.allocUnsafe(20);
console.log(b3);
b3.fill('B');
console.log(b3);
console.log(b3.toString());

let b4 = Buffer.from('Hello🎁 World')
console.log(b4);
console.log(b4.toString());
console.log(b4[0]);
console.log(b4.length);

console.log(b4.toString('Utf8',5,9));


// Concat

let b6 = Buffer.concat([b3,b4]);
console.log(b6.toString());


let b7 = b6.slice(20,34);
console.log(b6.toString());


let b8 = Buffer.alloc(10);
b8.write('Buffer',2);
console.log(b8);
console.log(b8.toString());
// console.log(b8.read());

// for(let c in b8){
//     console.log(c);
// }

