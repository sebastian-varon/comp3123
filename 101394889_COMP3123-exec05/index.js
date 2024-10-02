const express = require('express'); // Importing the express framework
const fs = require('fs'); // Using the fs module to handle file operations
const app = express(); // Creating an express app
const router = express.Router(); // Using the router to define routes
app.use(express.json()); // Middleware to handle JSON bodies in requests

// Creating the HTML content for the home page as a string
const homeHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Home</title>
  </head>
  <body>
    <h1>Welcome to ExpressJs Tutorial</h1>
  </body>
  </html>
`;

// Writing the home.html file to the server file system
fs.writeFileSync('home.html', homeHtml); // This creates (or overwrites) the home.html file with the content above

// Define the /home route to serve the home.html file
router.get('/home', (req, res) => {
  res.sendFile(__dirname + '/home.html'); // Send the HTML file when the user visits /home
});

// Define the /profile route to send data from user.json
router.get('/profile', (req, res) => {
  fs.readFile('user.json', 'utf-8', (err, data) => { // Read the user.json file
    if (err) {
      res.status(500).json({ status: false, message: 'Error reading user data' }); // If there's an error, send a 500 response
    } else {
      res.json(JSON.parse(data)); // If successful, send the data as JSON
    }
  });
});

// Define the /login route to handle login requests
router.post('/login', (req, res) => {
  const { username, password } = req.body; // Extract the username and password from the request body

  fs.readFile('user.json', 'utf-8', (err, data) => { // Read the user data from user.json
    if (err) {
      return res.status(500).json({ status: false, message: 'Error reading user data' }); // Send error if reading fails
    }

    const users = JSON.parse(data); // Parse the JSON file into a JavaScript object
    const user = users.find(user => user.username === username); // Search for the user by username

    if (!user) {
      return res.json({ status: false, message: 'User Name is invalid' }); // If username isn't found, return an error
    }

    if (user.password !== password) {
      return res.json({ status: false, message: 'Password is invalid' }); // If password doesn't match, return an error
    }

    res.json({ status: true, message: 'User Is valid' }); // If both match, send a success message
  });
});

// Define the /logout route to log out users
router.get('/logout', (req, res) => {
  const username = req.query.username; // Get the username from query parameters (URL)

  if (username) {
    res.send(`<b>${username} successfully logged out.</b>`); // Send a logout confirmation if the username is present
  } else {
    res.send('<b>Username is required for logout.</b>'); // If no username is provided, ask for it
  }
});

// Middleware to handle any server errors
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace to the console
  res.status(500).send('<h1>Server Error</h1><p>Something went wrong. Please try again later.</p>'); // Send a user-friendly error message
});

// Use the router for handling requests to the root URL and other paths
app.use('/', router); // Attach the router to the app

// Start the server and listen on port 8082 or whatever port is set in the environment variables
app.listen(process.env.port || 8082, () => {
  console.log('Web Server is listening at port ' + (process.env.port || 8082)); // Log the port the server is running on
});