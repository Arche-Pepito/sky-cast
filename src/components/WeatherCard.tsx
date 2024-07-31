// src/components/WeatherCard.tsx
import React from "react";

interface WeatherCardProps {
  weather: any; // Assuming your weather data structure
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className="weather-card">
      <h2>{weather.name}</h2>
      <div className="temperature">{weather.main.temp} °C</div>
      <div className="weather-details">
        <p>{weather.weather[0].description}</p>
        {/* Add more weather details as needed */}
      </div>
    </div>
  );
};

export default WeatherCard;
