/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('users-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

//weather
// Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
const apiKey = 'bbc112b096fa41239d3f7e37383c3b8a';
const weatherElement = document.getElementById('weather');

// Get weather data for a specific location (e.g., Montreal)
const city = 'Montreal';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

// Fetch weather data from the API
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
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
  })
  .catch(error => {
    weatherElement.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
    console.error('Error fetching weather data:', error);
  });
