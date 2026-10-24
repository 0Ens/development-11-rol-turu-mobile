import { describeWeatherCode } from "./weatherCodes";

export function toCurrentWeather(apiResponse){
    const temp = Math.round(apiResponse.current.temperature_2m);
    const descriptionCode = apiResponse.current.weather_code;
    return {temperature: temp , description: describeWeatherCode(descriptionCode)};

}

export function toCity(geocodingResponse) {
    const first = geocodingResponse.results?.[0];
    if (!first) {
        return null;
    }
    return {
        id: first.id,
        name: first.name,
        country: first.country,
        latitude: first.latitude,
        longitude: first.longitude
    };
}
