function CurrentWeather({ weather }) {
  if (!weather) return null;

  return (
    <div
      style={{
        background: "#111827",
        padding: "20px",
        marginBottom: "24px",
        border: "1px solid #1e293b",
      }}
    >
      <h2 style={{ margin: 0 }}>{weather.name}</h2>
      <p style={{ fontSize: "32px", margin: "8px 0" }}>
        {weather.main.temp}°C
      </p>
      <p style={{ color: "#9ca3af" }}>{weather.weather[0].main}</p>

      <div style={{ display: "flex", gap: "24px", marginTop: "12px" }}>
        <span>💧 {weather.main.humidity}%</span>
        <span>🌬️ {weather.wind.speed} m/s</span>
      </div>
    </div>
  );
}

export default CurrentWeather;
