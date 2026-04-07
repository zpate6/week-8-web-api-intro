"use client";

import { useState, useEffect } from "react";

const API_KEY = "Your API Key Goes Here";

export default function WeatherApp() {
  const [city, setCity] = useState("San Francisco");
  const [searchInput, setSearchInput] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName: string) => {
    try{

      setError("");
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
      const data = await response.json();

      if (!response.ok){
        throw new Error(data.message || "City not found or API error.");
      }

      setWeather(data);

    }catch (err: any){
      setError(err.message);
      setWeather(null);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
      setSearchInput("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 text-gray-900 p-8 font-sans">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold mb-4">Weather</h1>

        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter City"
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>

        {error ? (
          <p className="text-red-600 bg-red-50 p-3 rounded border border-red-200">{error}</p>
        ) : weather ? (
          <div>
            <h2 className="text-xl font-semibold mb-3 pb-2 border-b border-gray-100">
              {weather.name}, {weather.sys.country}
            </h2>
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold text-gray-700 inline-block w-24">Temperature:</span> {Math.round(weather.main.temp)}°C</p>
              <p><span className="font-semibold text-gray-700 inline-block w-24">Feels Like:</span> {Math.round(weather.main.feels_like)}°C</p>
              <p><span className="font-semibold text-gray-700 inline-block w-24">Condition:</span> <span className="capitalize">{weather.weather[0].description}</span></p>
              <p><span className="font-semibold text-gray-700 inline-block w-24">Humidity:</span> {weather.main.humidity}%</p>
              <p><span className="font-semibold text-gray-700 inline-block w-24">Wind Speed:</span> {weather.wind.speed} m/s</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
