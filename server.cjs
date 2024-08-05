const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define the file paths
const originalFile = 'C:/Users/Mario/Downloads/database-openweatherapi.txt';
const targetFile = 'D:/github projects/weatherapp-with-api/weatherapp-with-api/database.txt';

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/run-script', (req, res) => {
    const command = `python append-to-db.py ${originalFile} ${targetFile}`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error.message}`);
            res.status(500).send('Error executing script');
            return;
        }
        if (stderr) {
            console.error(`Python script stderr: ${stderr}`);
            res.status(500).send('Error executing script');
            return;
        }
        res.send('Script executed successfully');
    });
});

// Endpoint to save weather data to a file
app.post('/store-weather-data', (req, res) => {
    const { city, data } = req.body;
    if (!city || !data) {
        return res.status(400).send('Invalid request payload');
    }
    const content = JSON.stringify({ city, data }, null, 2);
    fs.writeFileSync(originalFile, content);
    res.send('Data stored successfully');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
