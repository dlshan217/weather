import { useEffect, useState } from "react";
import { getCurrentLocation } from "./services/location";
import {
  getWeatherByCoords,
  getWeatherByCity,
  getWeeklyForecastByCity,
} from "./services/weather";

import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import WeeklyChart from "./components/WeeklyChart";
import { quotes } from "./utils/quotes";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [weeklyData, setWeeklyData] = useState([]);
  const [quote, setQuote] = useState("");

  async function handleUseMyLocation() {
    try {
      setLoading(true);
      setError("");
      localStorage.removeItem("lastCity");

      const { lat, lon } = await getCurrentLocation();
      const data = await getWeatherByCoords(lat, lon);
      setWeather(data);
      pickQuote(data.weather[0].main);

      const forecastData = await getWeeklyForecastByCity(data.name);
      const daily = forecastData.list.filter((_, index) => index % 8 === 0);
      const formatted = daily.slice(0, 7).map((item) => ({
        day: new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "short" }),
        temp: item.main.temp,
      }));

      setWeeklyData(formatted);
      setCity("");
    } catch {
      setError("Unable to get current location");
    } finally {
      setLoading(false);
    }
  }

  function pickQuote(condition) {
    const hour = new Date().getHours();
    let timeKey = "now";
    if (hour >= 2 && hour < 6) timeKey = "two";
    if (hour >= 6) timeKey = "six";

    const key = condition?.toLowerCase().includes("rain")
      ? "rain"
      : condition?.toLowerCase().includes("cloud")
      ? "clouds"
      : condition?.toLowerCase().includes("clear")
      ? "clear"
      : "default";

    const pool = quotes[key][timeKey] || quotes[key].now;
    const random = pool[Math.floor(Math.random() * pool.length)];
    setQuote(random);
  }

  useEffect(() => {
    async function loadWeather() {
      const savedCity = localStorage.getItem("lastCity");
      try {
        setLoading(true);
        if (savedCity) {
          setCity(savedCity);
          const weatherData = await getWeatherByCity(savedCity);
          setWeather(weatherData);
          pickQuote(weatherData.weather[0].main);

          const forecastData = await getWeeklyForecastByCity(savedCity);
          const daily = forecastData.list.filter((_, index) => index % 8 === 0);
          const formatted = daily.slice(0, 7).map((item) => ({
            day: new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "short" }),
            temp: item.main.temp,
          }));
          setWeeklyData(formatted);
        } else {
          const { lat, lon } = await getCurrentLocation();
          const data = await getWeatherByCoords(lat, lon);
          setWeather(data);
          pickQuote(data.weather[0].main);
        }
        setError("");
      } catch {
        setError("Unable to load weather");
      } finally {
        setLoading(false);
      }
    }
    loadWeather();
  }, []);

  async function handleSearch() {
    if (!city) return;
    try {
      setLoading(true);
      const weatherData = await getWeatherByCity(city);
      setWeather(weatherData);
      pickQuote(weatherData.weather[0].main);

      const forecastData = await getWeeklyForecastByCity(city);
      const daily = forecastData.list.filter((_, index) => index % 8 === 0);
      const formatted = daily.slice(0, 7).map((item) => ({
        day: new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "short" }),
        temp: item.main.temp,
      }));

      setWeeklyData(formatted);
      localStorage.setItem("lastCity", city);
      setError("");
    } catch {
      setError("City not found");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />
      <button
  onClick={handleUseMyLocation}
  style={{
    marginBottom: "16px",
    padding: "10px 14px",
    background: "#020617",
    color: "#e5e7eb",
    border: "1px solid #1e293b",
    cursor: "pointer",
    fontSize: "14px",
  }}
>
  Use current location
</button>


      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <CurrentWeather weather={weather} />
      {quote && (
        <div style={{ marginTop: "16px", padding: "14px", borderLeft: "4px solid #38bdf8", color: "#9ca3af", fontStyle: "italic" }}>
          "{quote}"
        </div>
        
      )}
      <WeeklyChart data={weeklyData} />
    </div>
  );
}

export default App;
