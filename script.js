const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "9f20181755248b755074e1723e9ce68f";

// DOM Elements
const searchBox = document.getElementById('search-box');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const searchButton = document.querySelector('.Search');

fetchWeather("delhi")
// Fetch weather data
async function fetchWeather(city) {
    try {
        const response = await fetch(`${API_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        console.log(data);

        // Update UI with weather data
        cityName.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;
        humidity.textContent = `${data.main.humidity}%`;
        windSpeed.textContent = `${data.wind.speed.toFixed(1)} km/h`;

        // Set weather icon
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Could not find the city. Please try again.');
    }
}

// Search by pressing Enter
searchBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const city = searchBox.value.trim();
        if (city) {
            fetchWeather(city);
        } else {
            alert('Please enter a city name.');
        }
    }
});

// Search by clicking the button
searchButton.addEventListener('click', () => {
    const city = searchBox.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});
