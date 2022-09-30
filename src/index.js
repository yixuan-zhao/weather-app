// Updating time

let now = new Date();

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let weekDay = weekDays[now.getDay()];
let hour = now.getHours();
if (hour < 10 && hour > 0) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${weekDay} ${hour}:${minute}`;

// default weather
function showTemp(response) {
  let city = document.querySelector("#city-name");
  let temp = document.querySelector("#current-temp");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let condition = document.querySelector("#weather-condition");
  city.innerHTML = `${response.data.name}`;
  temp.innerHTML = `${Math.round(response.data.main.temp)}`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  condition.innerHTML = `${response.data.weather[0].main}`;
  console.log(response);
}

// search a city
function changeCity(city) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  changeCity(city);
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", citySubmit);

// local weather
function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let units = "metric";
  let geoApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(geoApiUrl).then(showTemp);
}
function checkGeo(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentGeo = document.querySelector("#current-position");
currentGeo.addEventListener("click", checkGeo);

changeCity("Berlin");
