require("dotenv").config();

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + process.env.API_KEY + "&q=";

const searchBox = document.querySelector(".searchbar input");
const searchButton = document.querySelector(".searchbar button");

async function checkWeather(city){
    const response = await fetch(apiUrl + city);
    var data = await response.json();

    document.querySelector(".result-card .city-name").innerHTML = data.name;
    document.querySelector(".result-card .temp").innerHTML = Math.round(data.main.temp) + "°C";
    
}

searchButton.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})