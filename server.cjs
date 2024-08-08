require('dotenv').config();

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

//Endpoint to get api key
app.get('/api-key', (req, res) => {

    const apiKey = process.env.API_KEY;
    res.json({apiKey});

});


function appendFileContents(sourceFile, destinationFile) {
    // Resolve the full path to the files
    const sourcePath = path.resolve(sourceFile);
    const destinationPath = path.resolve(destinationFile);
  
    // Read the contents of the source file
    fs.readFile(sourcePath, 'utf8', (readErr, data) => {
      if (readErr) {
        return console.error(`Error reading ${sourceFile}:`, readErr.message);
      }
  
      // Append the contents to the destination file
      fs.appendFile(destinationPath, `\n\n${data}`, (appendErr) => {
        if (appendErr) {
          return console.error(`Error appending to ${destinationFile}:`, appendErr.message);
        }
        console.log(`Contents of ${sourceFile} have been appended to ${destinationFile}.`);
      });
    });
  }

// Endpoint to save weather data to a file
app.post('/store-weather-data', (req, res) => {
    const { city, data } = req.body;
    if (!city || !data) {
        return res.status(400).send('Invalid request payload');
    }
    const content = JSON.stringify({ city, data }, null, 2);
    fs.writeFileSync(originalFile, content);
    appendFileContents(originalFile, targetFile);
    res.send('Data stored successfully');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
