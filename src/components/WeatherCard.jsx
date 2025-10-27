
import { useNavigate } from "react-router-dom";

import sunny from "../assets/sunny.png";
import rainy from "../assets/rainy.png";
import cloudy from "../assets/cloudy.png";
import snowy from "../assets/snowy.png";
import storm from "../assets/storm.png";
import foggy from "../assets/foggy.png";
import defaultImg from "../assets/default.png";

const WeatherCard = ({ weatherData, onReset, isLoading, backgroundColor }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-10">
        <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!weatherData) return null;

  const conditionRaw = weatherData.weather[0].main;
  const condition = conditionRaw.toLowerCase();
  const temperature = Math.round(weatherData.main.temp);
  const humidity = weatherData.main.humidity;
  const windSpeed = Math.round(weatherData.wind.speed * 3.6);

  const friendlyCondition = (() => {
    switch (condition) {
      case "clear":
        return "Sunny";
      case "clouds":
        return "Cloudy";
      case "rain":
      case "drizzle":
        return "Rainy";
      case "snow":
        return "Snowy";
      case "thunderstorm":
        return "Stormy";
      case "mist":
      case "fog":
        return "Foggy";
      default:
        return conditionRaw;
    }
  })();

  const getWeatherImage = (condition) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return sunny;
      case "rain":
      case "drizzle":
        return rainy;
      case "clouds":
        return cloudy;
      case "snow":
        return snowy;
      case "thunderstorm":
        return storm;
      case "mist":
      case "fog":
        return foggy;
      default:
        return defaultImg;
    }
  };

  const handleDetails = () => {
    navigate("/Details", {
      state: { weatherData , backgroundColor},
    });
  };

  const reset = () => {
    const confirmed = window.confirm("Are you sure you want to reset?");
    if (confirmed && onReset) {
      onReset();
    }
  };

  return (
    <div className="flex flex-col items-center gap-1 text-2xl my-4">
      <h2 className="text-3xl font-bold">{weatherData.name}</h2>
      <p>{friendlyCondition}</p>
      <img
        width="80px"
        src={getWeatherImage(condition)}
        alt={condition}
        className="drop-shadow-lg"
      />
      <p className="text-5xl font-bold">{temperature}°C</p>
      <div className="text-xl">
        <p>Humidity: {humidity}%</p>
        <p>Wind: {windSpeed} km/h</p>
      </div>

      <button
        className="text-xl font-semibold px-4 py-2 w-64 outline-none bg-blue-700 rounded-3xl hover:bg-blue-900 hover:w-72 transition-all duration-300 ease-in-out"
        type="button"
        onClick={handleDetails}
      >
        More Details
      </button>

      <button
        className="text-xl font-semibold px-2 py-1 w-24 outline-none bg-red-500 rounded-3xl hover:bg-red-600 hover:w-32 transition-all duration-300 ease-in-out mt-1"
        type="button"
        onClick={reset}
      >
        Reset
      </button>
    </div>
  );
};

export default WeatherCard;
