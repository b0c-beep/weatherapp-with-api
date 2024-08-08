import { storeWeatherData } from './db.js';

var apiKey;
const searchBox = document.querySelector('.searchbar input');
const searchButton = document.querySelector('.search-button');
const weatherIcon = document.querySelector('#weather-icon');

async function getApiKey(){

    const response = await fetch('/api-key');
    const data = await response.json();

    apiKey = data.apiKey;
}

async function checkWeather(city) {
    try {
        await getApiKey();
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&q=`;

        const response = await fetch(apiUrl + city);
        const data = await response.json();

        if (data.cod != 200) {
            showError();
        } else {
            displayWeather(data);
            await storeWeatherData(city, data);  // Store data using server-side endpoint
        }
    } catch (error) {
        console.error(`Error fetching weather data: ${error.message}`);
        showError();
    }
}

function showError() {
    document.querySelector('.result-card .city-name').innerHTML = 'Error';
    document.querySelector('.result-card .temp').style.visibility = 'hidden';
    weatherIcon.src = 'resources/error.svg';
    document.querySelector('.result-card').style.visibility = 'visible';
}

function displayWeather(data) {
    document.querySelector('.result-card .city-name').innerHTML = data.name;
    document.querySelector('.result-card .temp').innerHTML = Math.round(data.main.temp) + '°C';

    switch (data.weather[0].main) {
        case 'Clouds':
            weatherIcon.src = 'resources/clouds.svg';
            break;
        case 'Rain':
            weatherIcon.src = 'resources/rain.svg';
            break;
        case 'Clear':
            weatherIcon.src = 'resources/clear.svg';
            break;
        default:
            weatherIcon.src = 'resources/clear.svg';
    }

    document.querySelector('.result-card .temp').style.visibility = 'visible';
    document.querySelector('.result-card').style.visibility = 'visible';
}

searchButton.addEventListener('click', () => {
    checkWeather(searchBox.value);
});
