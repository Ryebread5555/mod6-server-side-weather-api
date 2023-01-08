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
var fivedayEl = document.getElementById("fiveday-header");

function getWeather(cityName) {
    // attemping to fetch the current weather from openWeather API
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
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
    
            //fetch the 5 day forecast for the searched city
            var cityID = response.data.id;
            var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
            fetch(forecastQueryURL)
            .then(function (response) {
                fivedayEl.classlist.remove("d-none");

                // Parse so the 5 day forecast will display
                const forecastEls = document.querySelectorAll(".forecast");
                for (i = 0; i < forecastEls.length; i++) {
                    forecastEls[i].innerHTML = "";
                    const forecastIndex = i * 8 + 4;
                    const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                    const forecastDay = forecastDate.getDate();
                    const forecastMonth = forecastDate.getMonth();
                    const forecastYear = forecastDate.getFullYear();
                    const forecastDateEl = document.createElement("p");
                    forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                    forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                    forecastEls[i].append(forecastDateEl);

                    // getting weather icons
                    const forecastWeatherEl = document.createElement("img");
                    forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                    forecastWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                    forecastEls[i].append(forecastWeatherEl);
                    const forecastTempEl = document.createElement("p");
                    forecastTempEl.innerHTML = "Temp: " = k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                    forecastEls[i].append(forecastTempEl);
                    const forecastHumidityEl = document.createElement("p");
                    forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                    forecastEls[i].append(forecastHumidityEl);

                }
            })
            })
}

}