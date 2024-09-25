const os = require('os');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');

// console.log(os.cpus());
console.log(os.homedir());
//console.log(os);

http.createServer((req, res) => {
    console.log(req.url);
    console.log(req.method);
    
    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Home Page</h1>');
    }

    if (req.url == '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>About Page</h1>');
    }

    if (req.url == '/student') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Student Page</h1>');
        
        // Declare student object before using it
        const student = {
            name: 'Sebastian Varon',
            age: 20,
            studentId: '101394889'
        };

        // Send the student object as a query string
        res.write(stringify(student));
        
        // End the response
        res.end(); 
    }

    // res.end('Hello World'); - if you want to only end one line
}).listen(3000, () => {
    console.log('Server is running on port 3000');
});