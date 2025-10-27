import { useEffect, useState } from "react";
import logo from "/weather-Logo.png";
import SearchBox from "../components/SearchBox";
import WeatherCard from "../components/WeatherCard";

const key = import.meta.env.VITE_OWM_KEY;

const initialWeatherData = null;
const initialWeatherCondition = "";

const Home = () => {
  const [weatherData, setWeatherData] = useState(initialWeatherData);
  const [weatherCondition, setWeatherCondition] = useState(
    initialWeatherCondition
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("weatherData");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setWeatherData(parsed);
      setWeatherCondition(parsed.weather[0].main.toLowerCase());
    }
  }, []);

  const fetchWeather = async (city) => {
    const q = city?.trim();
    if (!q) return;
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
      );
      const data = await res.json();
      if (res.ok && (data.cod === 200 || data.cod === "200")) {
        setWeatherData(data);
        setWeatherCondition(data.weather[0].main.toLowerCase());
        localStorage.setItem("weatherData", JSON.stringify(data));
      } else {
        const serverMessage = data?.message ? data.message : "City not found!";
        alert(serverMessage);
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getBackgroundColor = () => {
    switch (weatherCondition) {
      case "clear":
      case "sunny":
        return "bg-gradient-to-b from-yellow-400 to-orange-500";
      case "rain":
      case "drizzle":
        return "bg-gradient-to-b from-blue-700 to-blue-900";
      case "clouds":
      case "cloudy":
        return "bg-gradient-to-b from-gray-400 to-gray-600";
      case "snow":
      case "snowy":
        return "bg-gradient-to-b from-blue-100 to-gray-200 text-black";
      default:
        return "bg-gradient-to-b from-sky-500 to-indigo-700";
    }
  };

  const handleReset = () => {
    setWeatherData(null);
    setWeatherCondition("");
    localStorage.removeItem("weatherData");
  };

  return (
    <div
      className={`min-h-screen p-2 text-white transition-all duration-500 ${getBackgroundColor()}`}
    >
      <div className="flex flex-col gap-1 py-5">
        <div className="mx-auto">
          <img src={logo} alt="LOGO" width="50px" height="50px" />
        </div>
        <h1 className="text-3xl font-bold text-center">SkyLine Weather</h1>
      </div>
      <SearchBox onSearch={fetchWeather} />
      {weatherData && (
        <WeatherCard
          weatherData={weatherData}
          onReset={handleReset}
          isLoading={isLoading}
          backgroundColor={getBackgroundColor()}
        />
      )}
    </div>
  );
};

export default Home;
