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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

function displayFutureForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6)
      forecastHTML =
        forecastHTML +
        `
  
    <div class="col-2">
      <div class="future-forecast-date">
        ${formatDay(forecastDay.dt)}
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="future-forecast-temperature">
          <span class="future-forecast-temperature-high"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="future-forecast-temperature-low"> ${Math.round(
            forecastDay.temp.min
          )}°</span>
        </div>
      </div>
  </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "46fac47dd8b8fa26d1b6852218ad3dfe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayFutureForecast);
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

  getForecast(response.data.coord);
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
