// src/services/weatherService.ts
import axios from "axios";

const API_KEY = "ee5b4e6cb169f793b82f686bfccd860b"; // Replace with your API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeather = async (city: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric", // or 'imperial' for Fahrenheit
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};
