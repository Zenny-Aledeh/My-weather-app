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

function weatherCurrent(response) {
  console.log(response.data);
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

function swap(event) {
  event.preventDefault();
  let Temperature = document.querySelector(".my-temp");
  Temperature.innerHTML = Math.round((25 * 9) / 5 + 32);
}

let changeUnit = document.querySelector(".fahrenheit");
changeUnit.addEventListener("click", swap);

function changeBack(event) {
  event.preventDefault();
  let Temp = document.querySelector(".my-temp");
  Temp.innerHTML = 25;
}

let convert = document.querySelector(".celcius");
convert.addEventListener("click", changeBack);

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