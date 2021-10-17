let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let day = days[now.getDay()];
let hour = now.getHours();
let minute = ("0" + now.getMinutes()).slice(-2);
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let sentence = `${day} ${hour}:${minute}, ${month} ${date} ${year}`;
let dayTime = document.querySelector("#day-time");

dayTime.innerHTML = `${sentence}`;

//Week 5 Challenge

function currentWeather(response) {
  let city = response.data.name;
  let country = response.data.sys.country;
  let humidity = response.data.main.humidity;
  let windSpeed = response.data.wind.speed;
  let cityElement = document.querySelector("#search-city");
  let cityTemp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#city-temp");
  let windElement = document.querySelector("#wind-speed");
  let humidityElement = document.querySelector("#humid-percent");
  cityElement.innerHTML = `${city}, ${country}`;
  tempElement.innerHTML = `${cityTemp}°C`;
  windElement.innerHTML = `Wind Speed: ${windSpeed} mps`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
}

function cityNameInput(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-entry-value");
  let cityInput = searchCity.value;
  let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  if (searchCity.value) {
  } else {
    alert("Please enter a city");
  }
  axios.get(`${apiUrl}`).then(currentWeather);
}

let searchForm = document.querySelector(".selectForm");
searchForm.addEventListener("submit", cityNameInput);

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
  function showPosition(position) {
    event.preventDefault();
    let apiKey = "8402ccd9e55983fce71eeeaa1d2bd1fc";
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&limit={1}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}`).then(currentWeather);
  }
}

let currentCityBtn = document.querySelector("#btn-current");
currentCityBtn.addEventListener("click", getCurrentPosition);
