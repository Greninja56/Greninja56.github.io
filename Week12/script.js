const apiKey = "b654e5a00bb767f84e1f1fc15af5eece";
const weatherDiv = document.getElementById("weather");
const errorDiv = document.getElementById("error");
const privacySelect = document.getElementById("privacy");
const manualInput = document.getElementById("manualInput");

privacySelect.addEventListener("change", () => {
  manualInput.style.display = privacySelect.value === "manual" ? "block" : "none";
});

document.getElementById("fetchWeather").addEventListener("click", () => {
  errorDiv.textContent = "";
  weatherDiv.textContent = "";

  const privacyLevel = privacySelect.value;
  
  if (privacyLevel === "precise") {
    navigator.geolocation.getCurrentPosition(
      pos => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
      () => showError("Location access denied. Try another privacy mode.")
    );
  } else if (privacyLevel === "city") {
    const city = prompt("Enter your city name:");
    if (city) fetchWeatherByCity(city);
  } else if (privacyLevel === "manual") {
    const city = document.getElementById("cityInput").value;
    if (city) fetchWeatherByCity(city);
    else showError("Please enter a city name.");
  }
});

async function fetchWeatherByCoords(lat, lon) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();
    displayWeather(data);
  } catch {
    showError("Error fetching weather. Please try again.");
  }
}

async function fetchWeatherByCity(city) {
  try {
    const cleanCity = encodeURIComponent(city.trim());

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cleanCity}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    if (data.cod === 200) {
      displayWeather(data);
    } else if (data.cod === "404") {
      showError(`City not found: "${city}". Try adding a country code (e.g., "Paris,FR" or "New York,US").`);
    } else if (data.cod === 401) {
      showError("Invalid API key. Check your OpenWeatherMap key and try again.");
    } else {
      showError(`Unexpected error: ${data.message}`);
    }
  } catch (err) {
    showError("Error fetching weather. Please check your internet connection.");
  }
}


function displayWeather(data) {
  weatherDiv.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>${data.weather[0].description}</p>
    <p>🌡 ${data.main.temp}°C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
  `;
}

function showError(message) {
  errorDiv.textContent = message;
}

// Show the correct input box on page load
manualInput.style.display = privacySelect.value === "manual" ? "block" : "none";

