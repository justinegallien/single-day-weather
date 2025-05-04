import React, { useEffect, useState } from "react";

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("New Orleans");
  const [inputField, setInputField] = useState("");

  const API_KEY = process.env.API_KEY;
  async function getData() {
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&days=5`
      );
      const data = await res.json();
      console.log(data);
      setWeatherData({ temp: data.current.temp_f, city: data.location.name });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (city) {
      getData();
    }
  }, [city]);
  console.log(weatherData);
  if (!weatherData.city) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <h3>{weatherData.city}</h3>
        <p>{weatherData.temp}</p>
      </>
    );
  }
}
