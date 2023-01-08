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
    fetch(queryURL)
    .then(function (response) {

        todayweatherEL.classlist.remove("d-none");

        // This will parse to display the current weather in the area
        const currentDate = new Date(response.data.dt * 1000);
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year +") ";
        var weatherPic = response.data.weather[0].icon;
        currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
        currentPicEl.setAttribute("alt", response.data.weather[0].description);
        currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F"
        currentWindEl.innerHTML = "Wind: " + response.data.wind + " MPH";
        currentHumidityEl.innerHTML = "Humidity: " + response.data.humidity + "%";
            })
}

}