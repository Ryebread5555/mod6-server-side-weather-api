// A unique API key assigned to a variable
var APIKey = "96089c937b5fe6946fb2e0372ea5f6e2";

var cityEl = document.getElementById("enter-city");
var searchEl = document.getElementById("search-button");
var nameEl = document.getElementById("city-name");
var currentPicEl = document.getElementById("current-pic");
var currentTempEl = document.getElementById("temperature");
var currentWindEl = document.getElementById("wind");
var currentHumidityEl = document.getElementById("humidity");
var fivedayEl = document.getElementById("fiveday-header");
var todayweatherEl = document.getElementById("today-weather");
var historyEl = document.getElementById("history");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

function initPage() {



    // local storage for history
    searchEl.addEventListener("click", function () {
        const searchTerm = cityEl.value;
        
        getWeather(searchTerm);
        searchHistory.push(searchTerm);
        localStorage.setItem("search", JSON.stringify(searchHistory));
        renderSearchHistory();
    });



    renderSearchHistory();

};

function getWeather(cityName) {
    // Attemping to fetch the current weather from openWeather API
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    fetch(queryURL)
        .then(function (response) {
            // Return the response data as a JSON object
            return response.json();
        })
        .then(function (responseData) {
            // check if responseData.cod == 200
            // if not, show an error
            if (responseData.cod != 200) { 
                alert("Bad City");
                return
            }
            todayweatherEl.classList.remove("d-none");

            // This will parse to display the current weather in the area
            const currentDate = new Date(responseData.dt * 1000);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            nameEl.innerHTML = responseData.name + " (" + month + "/" + day + "/" + year + ") ";
            var weatherPic = responseData.weather[0].icon;
            currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            currentPicEl.setAttribute("alt", responseData.weather[0].description);
            currentTempEl.innerHTML = "Temperature: " + k2f(responseData.main.temp) + " &#176F";
            currentWindEl.innerHTML = "Wind: " + responseData.wind.speed + " MPH";
            currentHumidityEl.innerHTML = "Humidity: " + responseData.main.humidity + "%";

            //fetch the 5 day forecast for the searched city
            var cityID = responseData.id;
            var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
            fetch(forecastQueryURL)
                .then(function (response) {
                    // Return the response data as a JSON object and assign it to a variable
                    return response.json();
                })
                .then(function (forecastData) {

                    fivedayEl.classList.remove("d-none");

                    // Parse so the 5 day forecast will display
                    const forecastEls = document.querySelectorAll(".forecast");
                    for (i = 0; i < forecastEls.length; i++) {
                        forecastEls[i].innerHTML = "";
                        const forecastIndex = i * 8 + 4;
                        const forecastDate = new Date(forecastData.list[forecastIndex].dt * 1000);

                        const forecastDay = forecastDate.getDate();
                        const forecastMonth = forecastDate.getMonth();
                        const forecastYear = forecastDate.getFullYear();
                        const forecastDateEl = document.createElement("p");
                        forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                        forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                        forecastEls[i].append(forecastDateEl);

                        // getting weather icons

                        const forecastWeatherEl = document.createElement("img"); forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + forecastData.list[forecastIndex].weather[0].icon + "@2x.png"); forecastWeatherEl.setAttribute("alt", forecastData.list[forecastIndex].weather[0].description);
                        forecastEls[i].append(forecastWeatherEl);
                        const forecastTempEl = document.createElement("p");
                        forecastTempEl.innerHTML = "Temperature: " + k2f(forecastData.list[forecastIndex].main.temp) + " &#176F";
                        forecastEls[i].append(forecastTempEl);
                        const forecastHumidityEl = document.createElement("p");
                        forecastHumidityEl.innerHTML = "Humidity: " + forecastData.list[forecastIndex].main.humidity + "%";
                        forecastEls[i].append(forecastHumidityEl);

                    }
                })
        });



};
function k2f(K) {
    return Math.floor((K - 273.15) * 1.8 + 32);
};

function renderSearchHistory() {
    historyEl.innerHTML = "";
    for (let i = 0; i < searchHistory.length; i++) {
        var historyItem = document.createElement("input");
        historyItem.setAttribute("type", "text");
        historyItem.setAttribute("readonly", true);
        historyItem.setAttribute("class", "form-control d-block bg-light");
        historyItem.setAttribute("value", searchHistory[i]);
        historyItem.addEventListener("click", function () {
            getWeather(searchHistory[i]);
        })
        historyEl.append(historyItem);
    }
};

initPage();