// Constants for API URL and API key
const apiKey = '424f0d7912985b5b0b76b3dfdb67d8b6';
const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

// DOM elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const currentWeatherInfo = document.getElementById('current-weather-info');
const forecastInfo = document.getElementById('forecast-info');
const form = document.getElementById('search');
// Event listener for search button
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = cityInput.value;
  geoCode(city);
});
// Searchbar functionality for calculating the coordinates for forecast calculation
function geoCode(city) {
  const requestCity = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
  fetch(requestCity)
    .then(function (response) {
      console.log(response)
      return response.json();
    }).then(function (data) {
      console.log(data);
      const lat = data[0].lat;
      const lon = data[0].lon;
      getWeatherData(lat, lon)
      currentWeather(lat, lon)
    })


}
// Function calculating current condtions for a given location. 
function currentWeather(lat, lon) {
  const currentForecast = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
  fetch(currentForecast)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.querySelector('#current-weather-info').innerHTML = '';
      const h2 = document.createElement('h2');
      h2.textContent = 'Your Location: ' + data.name;
      const weatherConditions = document.createElement('p')
      const temp = document.createElement('p')
      const humidity = document.createElement('p')
      const feels_like = document.createElement('p')
      const windSpeed = document.createElement('p')
      const icon = document.createElement('img');

      weatherConditions.textContent = 'Current Conditions: ' + data.weather[0].description
      temp.textContent = 'Current Temperature: ' + data.main.temp + 'F'
      humidity.textContent = 'Current Humidity: ' + data.main.humidity + '%'
      feels_like.textContent = 'Current Feels-Like Temprature: ' + data.main.feels_like + 'F'
      windSpeed.textContent = 'Current Wind Speeds: ' + data.wind.speed + 'mph'
      icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      document.querySelector('#current-weather-info').append(h2, temp, humidity, feels_like, windSpeed, weatherConditions, icon);
      updateWeatherInfo(data);
    })
}
1

// Function to fetch weather data from API
function getWeatherData(lat, lon) {
  const url = `${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  fetch(url)
    .then(response => response.json())
    // five day weather forecast info
    .then(data => {
      console.log(data);
      document.querySelector('#forecast-info').innerHTML = '';

      const currentDate = dayjs()
      const time = dayjs('2024-05-08 15:00')
    // This determines the dates and times for the five day forecast structure
    // Run the function if the date is not today and only if it is 3pm
  for (let i = 0; i < data.list.length; i++) {
    const weatherItem = data.list[i];
    const weatherDatetime = dayjs(weatherItem.dt_txt)

    // Check if it's the current day or not 3PM

    const isToday = currentDate.isSame(weatherDatetime, 'day');
    const is3PM = time.format('H') === weatherDatetime.format('H');


    if (isToday || !is3PM) {
      continue;
    }

    // Only render forecast if both conditions are true
    oneDayForecast(data.list[i]);
  }
});

}
// Function calculating the five day forecast parameters. 
function oneDayForecast(forecast) {
  const date = new Date(forecast.dt * 1000);

  const forecastInfo = document.createElement('div');
  forecastInfo.classList.add('forecast-item');

  const dateElement = document.createElement('h3');
  dateElement.textContent = date.toDateString();

  const conditionElement = document.createElement('p')
  conditionElement.textContent = 'Forecast: ' + forecast.weather[0].main;

  const tempElement = document.createElement('p');
  tempElement.textContent = 'Temperature: ' + forecast.main.temp + 'F';

  const humidityElement = document.createElement('p');
  humidityElement.textContent = 'Humidity: ' + forecast.main.humidity + '%';

  forecastInfo.append(dateElement, tempElement, humidityElement, conditionElement);
  document.querySelector('#forecast-info').appendChild(forecastInfo);
}
// Function to update weather information in the UI
function updateWeatherInfo(data) {
  // Update current weather information
  // Example: currentWeatherInfo.innerHTML = data.main.temp;

  // Update forecast information
  // Example: forecastInfo.innerHTML = data.list[0].main.temp;
}

// Initialization function
function init() {
  // Check if there is any stored data in localStorage and update UI if needed
}

// Call initialization function
init()