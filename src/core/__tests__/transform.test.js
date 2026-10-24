import { toCurrentWeather } from "../transform";

test("API cevabini ekran modeline cevir", () => {
    const fakeResponse = {
        current: { temperature_2m: 17.3, weather_code: 3}
    };

    expect(toCurrentWeather(fakeResponse)).toEqual({
        temperature: 17,
        description: "Kapalı"
    });
});

test("sicakligi yukari yuvarlar", () => {
    const fakeResponse = {
        current: { temperature_2m: 17.6, weather_code: 45}
    };

    expect(toCurrentWeather(fakeResponse)).toEqual({
        temperature: 18,
        description: "Sis"
    });
});
