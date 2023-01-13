let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thirsday",
  "Friday",
  "Saturday",
];

let current_date = document.querySelector("#current-date");
let current_hour = now.getHours();
let current_minute = now.getMinutes();
if (current_hour < 10) {
  current_hour = "0" + current_hour;
}
if (current_minute < 10) {
  current_minute = "0" + current_minute;
}

let apiKey = "62231151ce343c4d68652e1617efc22f";

current_date.innerHTML = `${
  days[now.getDay()]
} ${current_hour}:${current_minute}`;

let search_form = document.querySelector("#search-form");

function showTemperature(response) {
  let temperature = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let main_weather = document.querySelector("#main-weather");
  let city_name = document.querySelector("#city-name");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)} Km/H`;
  main_weather.innerHTML = `${response.data.weather[0].main}`;
  city_name.innerHTML = `${response.data.name}`;
}

function addCityName(event) {
  event.preventDefault();
  let search_input = document.querySelector("#search-input");
  let city_name = document.querySelector("#city-name");
  if (search_input.value) {
    city_name.innerHTML = search_input.value;
  } else {
    city_name.innerHTML = "Lisbon";
  }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search_input.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

search_form.addEventListener("submit", addCityName);

let celcius = document.querySelector("#celcius");
let farenheit = document.querySelector("#farenheit");

function convertToCelcius(event) {
  event.preventDefault();
  let temparature = document.querySelector("#temperature");
  temparature.innerHTML = Math.floor(
    ((parseInt(temparature.innerHTML) - 32) * 5) / 9
  );
}

function convertToFarenheit(event) {
  event.preventDefault();
  let temparature = document.querySelector("#temperature");
  temparature.innerHTML = Math.floor(
    parseInt(temparature.innerHTML) * (9 / 5) + 32
  );
}

celcius.addEventListener("click", convertToCelcius);
farenheit.addEventListener("click", convertToFarenheit);

let current_btn = document.querySelector("#current-btn");

function showTemperaturePosition(response) {
  let temperature = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let main_weather = document.querySelector("#main-weather");
  let city_name = document.querySelector("#city-name");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)} Km/H`;
  main_weather.innerHTML = `${response.data.weather[0].main}`;
  city_name.innerHTML = `${response.data.name}`;
}

function handlePosition(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperaturePosition);
}

function getCurrentLocationWeather() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

current_btn.addEventListener("click", getCurrentLocationWeather);
