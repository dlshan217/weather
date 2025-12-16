import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function WeeklyChart({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div style={{ marginTop: "30px", width: "100%", height: 300 }}>
      <h3>7-Day Temperature</h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#007bff"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div> // Closing the div for the WeeklyChart component
  );
}

export default WeeklyChart;
