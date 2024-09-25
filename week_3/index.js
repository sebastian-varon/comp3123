var http = require("http");
var Employee = require("./Employee"); // TODO - Use Employee Module here

console.log("Lab 03 - NodeJs");

// Define Server Port
const port = process.env.PORT || 8081;

// Create Web Server using CORE API
const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");

    if (req.method !== 'GET') {
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`);
    } else {
        if (req.url === '/') {
            // TODO - Display message "<h1>Welcome to Lab Exercise 03</h1>"
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end("<h1>Welcome to Lab Exercise 03</h1>");
        } else if (req.url === '/employee') {
            // TODO - Display all details for employees in JSON format
            res.writeHead(200);
            res.end(JSON.stringify(Employee.getAllEmployees()));
        } else if (req.url === '/employee/names') {
            // TODO - Display only all employees {first name + lastname} in Ascending order in JSON Array
            // e.g. [ "Ash Lee", "Mac Mohan", "Pritesh Patel" ]
            const employeeNames = Employee.getAllEmployees()
                .map(emp => `${emp.firstName} ${emp.lastName}`)
                .sort();
            res.writeHead(200);
            res.end(JSON.stringify(employeeNames));
        } else if (req.url === '/employee/totalsalary') {
            // TODO - Display Sum of all employees salary in given JSON format
            // e.g. { "total_salary": 100 }
            const totalSalary = Employee.getAllEmployees()
                .reduce((total, emp) => total + emp.Salary, 0);
            res.writeHead(200);
            res.end(JSON.stringify({ total_salary: totalSalary }));
        } else {
            res.end(`{"error": "${http.STATUS_CODES[404]}"}`);
        }
    }
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
}); 