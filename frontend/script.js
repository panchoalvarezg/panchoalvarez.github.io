const apiKey = 'YOUR_API_KEY';  // Replace with your OpenWeatherMap API key

document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeatherData(city);
    }
});

async function fetchWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    displayWeatherData(data);
}

function displayWeatherData(data) {
    if (data.cod === 200) {
        const weatherInfo = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        document.getElementById('weather-info').innerHTML = weatherInfo;
    } else {
        document.getElementById('weather-info').innerHTML = `<p>${data.message}</p>`;
    }
}
