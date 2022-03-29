import axios from "axios";

async function getWeatherAndForecast(coordinates) {
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/onecall?",
    {
      params: {
        lat: coordinates.lat,
        lon: coordinates.lng,
        exclude: "minutely,hourly,alerts",
        appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
        units: "metric"
      }
    }
  );

  return response;
}

export default getWeatherAndForecast;
