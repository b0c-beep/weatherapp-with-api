import { exec } from 'child_process';
import { promisify } from 'util';

export function storeWeatherData(city, data) {
  var a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], {type: "text/plain"}));
  a.setAttribute("download", "database-openweatherapi.txt");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

const execPromise = promisify(exec);

// Define the file paths
const originalFile = 'C:/Users/Mario/Downloads/database-openweatherapi.txt';
const targetFile = 'D:/github projects/weatherapp-with-api/weatherapp-with-api/database.txt';

// Construct the command to run the Python script
const command = `python append-to-db.py ${originalFile} ${targetFile}`;


export async function updateDatabase() {
    try {
        const { stdout, stderr } = await execPromise(command);
        if (stderr) {
            console.error(`Python script stderr: ${stderr}`);
            return;
        }
        //console.log(`Python script output: ${stdout}`);
    } catch (error) {
        console.error(`Error executing Python script: ${error.message}`);
    }
}

