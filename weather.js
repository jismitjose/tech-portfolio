//weather
// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const apiKey = '4ceb762ad5f7ff2d58bcd594865e894c';
const weatherElement = document.getElementById('weather');

// Get weather data for a specific location (e.g., Montreal)
const city = 'Montreal';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

// Fetch weather data from the API
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log('API response:', data);  // Log the full API response to check its structure
    
    if (data.main) {  // Check if 'main' exists before accessing it
      const temperature = data.main.temp;
      const weatherDescription = data.weather[0].description;
      const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

      // Display weather data
      weatherElement.innerHTML = `
        <h3>Weather in ${city}</h3>
        <p>Temperature: ${temperature}°C</p>
        <p>Condition: ${weatherDescription}</p>
        <img src="${icon}" alt="${weatherDescription}">
      `;
    } else {
      weatherElement.innerHTML = `<p>Could not fetch weather data. Error: ${data.message}</p>`;
    }
  })
  .catch(error => {
    weatherElement.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
    console.error('Error fetching weather data:', error);
  });

