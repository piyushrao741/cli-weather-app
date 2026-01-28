
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const city = process.argv.slice(2).join(" ");

if (!city) {
  console.error("❌ Please provide a city name.");
  process.exit(1);
}

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

async function getWeather(city) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });

    const temperature = response.data.main.temp;
    const description = response.data.weather[0].description;

    console.log(
      `🌤️ Weather in ${city}: ${temperature}°C, ${description}`
    );
  }catch (error) {
  if (error.response) {
    console.error("❌ API Error:", error.response.data);
  } else {
    console.error("❌ Network/Error:", error.message);
  }
}

}

getWeather(city);
