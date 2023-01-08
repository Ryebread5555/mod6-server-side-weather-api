function initPage() {

// A unique API key assigned to a variable
var APIKey = "96089c937b5fe6946fb2e0372ea5f6e2";

var cityEl = document.getElementById("enter-city");
var searchEl = document.getElementById("search-button");
var nameEl = document.getElementById("city-name");
var currentPicEl = document.getElementById("current-pic");
var currentTempEl = document.getElementById("temperature");
var currentWindEl = document.getElementById("wind");
var currentHumidityEl = document.getElementById("humidity");

function getWeather(cityName) {
    // attemping to fetch the current weather from openWeather API
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + cityName + "&appid=" + APIKey;
    fetch.get(queryURL)
    .then(function (response) {

        todayweatherEL.classlist.remove("d-none");

        
    })
}

}