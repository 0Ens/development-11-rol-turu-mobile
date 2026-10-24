import { toCity, toCurrentWeather } from "../core/transform";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export async function searchCity(name) {
    const url = `${GEOCODING_URL}?name=${encodeURIComponent(name.trim())}&count=1&language=tr`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Şehir aranırken sunucu hatası oluştu");
    }

    const data = await response.json();
    return toCity(data);
}

export async function fetchCurrentWeather(city){
    const url = `${FORECAST_URL}?latitude=${(city.latitude)}&longitude=${(city.longitude)}&current=temperature_2m,weather_code`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Hava durumu alınırken sunucu hatası oluştu");
    }

    const data = await response.json();
    return toCurrentWeather(data);
}