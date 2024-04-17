// Constants for API URL and API key
const apiKey = '424f0d7912985b5b0b76b3dfdb67d8b6';
const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

// DOM elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const currentWeatherInfo = document.getElementById('current-weather-info');
const forecastInfo = document.getElementById('forecast-info');

// Event listener for search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    geoCode(city);
});

function geoCode(city) {
    const requestCity = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
    fetch(requestCity)
    .then(function (response){
        console.log(response)
        return response.json();
    }).then(function (data){
        console.log(data);
        const lat = data
        const lon = data
        getWeatherData(lat, lon)
        currentWeather(lat, lon)
    })

    
}

function currentWeather(lat, lon) {
    const currentForecast = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    fetch(currentForecast)
    .then(response => response.json())
    .then(data => {
        console.log(data);

    })
}


// Function to fetch weather data from API
function getWeatherData(lat, lon) {
    const url = `${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Update current weather and forecast information
            updateWeatherInfo(data);
        })
        .catch(error => console.error('Error fetching data:', error));
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
init();