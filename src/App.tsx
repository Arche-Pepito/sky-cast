// src/App.tsx
import React, { useState, useEffect } from "react";
import { fetchWeather } from "./services/weatherService";
import WeatherCard from "./components/WeatherCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./App.css"; // Import your CSS file for styling

const App: React.FC = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("weatherAppSearchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleSearch = async () => {
    try {
      const data = await fetchWeather(city);
      if (data && data.cod === 200) {
        setWeatherData(data);
        setError("");

        if (!searchHistory.includes(city)) {
          const newHistory = [...searchHistory, city];
          setSearchHistory(newHistory);
          localStorage.setItem(
            "weatherAppSearchHistory",
            JSON.stringify(newHistory)
          );
        }
      } else {
        setError("No data found for the entered city.");
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      setError("Error fetching weather. Please try again.");
    }
  };

  const handleHistoryClick = async (cityName: string) => {
    setCity(cityName);
    await handleSearch();
  };

  const handleDeleteHistory = (index: number) => {
    const updatedHistory = [...searchHistory];
    updatedHistory.splice(index, 1);
    setSearchHistory(updatedHistory);
    localStorage.setItem(
      "weatherAppSearchHistory",
      JSON.stringify(updatedHistory)
    );
  };

  return (
    <div className="App">
      <h1 className="app-title">SkyCast</h1>
      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="city-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {weatherData && <WeatherCard weather={weatherData} />}

      {searchHistory.length > 0 && (
        <div className="search-history">
          <h2>Search History</h2>
          <ul>
            {searchHistory.map((item, index) => (
              <li key={index} className="history-item">
                <span onClick={() => handleHistoryClick(item)}>{item}</span>
                <button
                  onClick={() => handleDeleteHistory(index)}
                  className="delete-button"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer Component */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Arche. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
