// db.js
export async function storeWeatherData(city, data) {
    try {
      const response = await fetch('/store-weather-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city, data })
      });
      if (!response.ok) {
        throw new Error('Failed to store weather data');
      }
      console.log('Weather data stored successfully');
    } catch (error) {
      console.error(`Error storing weather data: ${error.message}`);
    }
  }
  
  export async function updateDatabase() {
    try {
      const response = await fetch('/run-script');
      if (!response.ok) {
        throw new Error('Failed to update database');
      }
      console.log('Database updated successfully');
    } catch (error) {
      console.error(`Error updating database: ${error.message}`);
    }
  }
  