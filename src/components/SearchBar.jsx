function SearchBar({ city, setCity, onSearch }) {
  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search city"
        style={{
          flex: 1,
          padding: "12px",
          background: "#020617",
          border: "1px solid #1e293b",
          color: "#e5e7eb",
          outline: "none",
        }}
      />
      <button
        onClick={onSearch}
        style={{
          padding: "12px 16px",
          background: "#38bdf8",
          color: "#020617",
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
