import { describeWeatherCode } from "./weatherCodes";

export function toCurrentWeather(apiResponse){
    const temp = Math.round(apiResponse.current.temperature_2m);
    const descriptionCode = apiResponse.current.weather_code;
    return {temperature: temp , description: describeWeatherCode(descriptionCode)};

}