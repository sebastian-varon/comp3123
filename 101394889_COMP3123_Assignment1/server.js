const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// parse JSON
app.use(express.json());

// test server
app.get('/', (req, res) => {
    res.send('API is running...');
});

// set the port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
