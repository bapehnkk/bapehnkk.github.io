import React, { useState, useEffect } from 'react';
import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaSmog } from 'react-icons/fa';
import styles from './Weather.module.scss';

interface WeatherData {
    temperature: number;
    weathercode: number;
}

const Weather: React.FC = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);

    useEffect(() => {
        const fetchWeather = async (latitude: number, longitude: number) => {
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
            const data = await response.json();
            setWeather(data.current_weather);
        };

        const fetchIPLocation = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                fetchWeather(data.latitude, data.longitude);
            } catch (error) {
                console.error('Error fetching IP location:', error);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    fetchWeather(latitude, longitude);
                },
                error => {
                    console.error('Geolocation error:', error);
                    fetchIPLocation();
                }
            );
        } else {
            fetchIPLocation();
        }
    }, []);

    const getWeatherIcon = (weathercode: number) => {
        switch (weathercode) {
            case 0: // Clear sky
                return <FaSun />;
            case 1: // Mainly clear
            case 2: // Partly cloudy
            case 3: // Overcast
                return <FaCloud />;
            case 45: // Fog
            case 48: // Depositing rime fog
                return <FaSmog />;
            case 51: // Drizzle: Light
            case 53: // Drizzle: Moderate
            case 55: // Drizzle: Dense intensity
            case 56: // Freezing Drizzle: Light
            case 57: // Freezing Drizzle: Dense intensity
            case 61: // Rain: Slight
            case 63: // Rain: Moderate
            case 65: // Rain: Heavy intensity
            case 66: // Freezing Rain: Light
            case 67: // Freezing Rain: Heavy intensity
            case 80: // Rain showers: Slight
            case 81: // Rain showers: Moderate
            case 82: // Rain showers: Violent
                return <FaCloudRain />;
            case 71: // Snow fall: Slight
            case 73: // Snow fall: Moderate
            case 75: // Snow fall: Heavy intensity
            case 77: // Snow grains
            case 85: // Snow showers: Slight
            case 86: // Snow showers: Heavy
                return <FaSnowflake />;
            default:
                return <FaCloud />;
        }
    };

    return (
        <div className={styles.weather}>
            {weather ? (
                <>
                    <div className={styles.icon}>{getWeatherIcon(weather.weathercode)}</div>
                    <div className={styles.temperature}>{weather.temperature}°C</div>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default Weather;
