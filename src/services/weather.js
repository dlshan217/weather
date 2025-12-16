const API_KEY = "5ee0a04604abfb62c98d737bb59875b6";

// Current weather by coordinates
export async function getWeatherByCoords(lat, lon) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Weather fetch failed");
  }

  return res.json();
}

// Current weather by city
export async function getWeatherByCity(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error("City not found");
  }

  return res.json();
}

// 5-day / weekly forecast by city
export async function getWeeklyForecastByCity(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Forecast fetch failed");
  }

  return res.json();
}
