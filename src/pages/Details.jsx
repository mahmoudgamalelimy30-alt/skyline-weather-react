import { useLocation, useNavigate } from "react-router-dom";

const Details = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const weatherData = state?.weatherData;
  const backgroundColor =
    state?.backgroundColor || "bg-gradient-to-b from-sky-500 to-indigo-700";

  if (!weatherData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-600">
        <p>No data found 😢</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const { name, main, weather, wind, coord } = weatherData;

  const windSpeed = Math.round(wind.speed * 3.6);

  return (
    <div
      className={`min-h-screen flex flex-col items-center ${backgroundColor} text-white p-6`}
    >
      <div className="flex items-center justify-between w-full max-w-md mb-2">
        <h1 className="text-4xl font-bold mb-4">{name}</h1>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
        >
          🔙 Back
        </button>
      </div>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl w-full max-w-md text-left space-y-2">
        <p>🌡 Temperature: {main.temp}°C</p>
        <p>💧 Humidity: {main.humidity}%</p>
        <p>🌬 Wind Speed: {windSpeed} km/h</p>
        <p>☁ Condition: {weather[0].description}</p>
        <p>🌍 Pressure: {main.pressure} hPa</p>
      </div>
      <iframe
        className="w-full max-w-md h-64 rounded-xl mt-2"
        src={`https://www.google.com/maps?q=${coord.lat},${coord.lon}&output=embed`}
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
};
export default Details;
