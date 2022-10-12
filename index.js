let now = new Date();

let todaysDate = document.querySelector("#date");

let hours = now.getHours();
let minutes = now.getMinutes();

if (hours < 10) {
  hours = `0${hours}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

todaysDate.innerHTML = `${day}, ${hours}:${minutes}`;

function displayForecast() {
  let forecastElement = document.querySelector(".future");

  let days = ["Thurs", "Fri", "Sat", "Sun", "Mon"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2">
          <div class="days">
            ${day}</div>
           <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="" width="42"/>
            <div class="week-temp">
            <span class="high-temp">27°</span>
            <span class="low-temp">| 15℃</span>
            </div>
        </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElememt.innerHTML = forecastHTML;
}

function weatherCurrent(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".my-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".chance-of-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".chance-of-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector(".weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector(".chance-of-high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector(".chance-of-low").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document
    .querySelector(".icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  celsiusTemperature = response.data.main.temp;
}

function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searching").value;
  search(city);
}

let form = document.querySelector("#search-box");
form.addEventListener("submit", searchSubmit);

function search(city) {
  let apiKey = "46fac47dd8b8fa26d1b6852218ad3dfe";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(weatherCurrent);
}

function swapToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  celsiusUnit.classList.remove("active");
  fahrenheitUnit.classList.add("active");
  let temperatureElement = document.querySelector(".my-temp");
  temperatureElement.innerHTML = fahrenheitTemperature;
}

function displayCelsius(event) {
  event.preventDefault();
  celsiusUnit.classList.add("active");
  fahrenheitUnit.classList.remove("active");
  let temperatureElement = document.querySelector(".my-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitUnit = document.querySelector(".fahrenheit");
fahrenheitUnit.addEventListener("click", swapToFahrenheit);

let celsiusTemperature = null;

let celsiusUnit = document.querySelector(".celsius");
celsiusUnit.addEventListener("click", displayCelsius);

function searchMyLocation(position) {
  let apiKey = "46fac47dd8b8fa26d1b6852218ad3dfe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weatherCurrent);
  console.log(apiUrl);
}

function getMyLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchMyLocation);
}

let currentLocationButton = document.querySelector(".location-button");
currentLocationButton.addEventListener("click", getMyLocation);

search("london");
displayForecast();
