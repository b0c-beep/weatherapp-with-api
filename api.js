import { storeWeatherData } from "./firebase.js";

const apiKey = "d2708d2ae07784e543955052d3ca73c8"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&units=metric&q=";

const searchBox = document.querySelector(".searchbar input");
const searchButton = document.querySelector(".search-button");
const weatherIcon = document.querySelector("#weather-icon");

async function checkWeather(city){
    const response = await fetch(apiUrl + city);
    var data = await response.json();

    await storeWeatherData(data);

    if(data.cod != 200){
        document.querySelector(".result-card .city-name").innerHTML = "Error";
        document.querySelector(".result-card .temp").style.visibility = "hidden";
        weatherIcon.src = "resources/error.svg";
    }
    else{
        document.querySelector(".result-card .city-name").innerHTML = data.name;
        document.querySelector(".result-card .temp").innerHTML = Math.round(data.main.temp) + "°C";  

        switch (data.weather[0].main){
            case "Clouds":
                weatherIcon.src = "resources/clouds.svg";
                break;
            case "Rain":
                weatherIcon.src = "resources/rain.svg";
                break;
            case "Clear": 
                weatherIcon.src = "resources/clear.svg";
                break;
            default:
                weatherIcon.src = "resources/clear.svg";
        }

        document.querySelector(".result-card .temp").style.visibility = "visible";
        document.querySelector(".result-card").style.visibility = "visible";
    }
}

searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value);
})
