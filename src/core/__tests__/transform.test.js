import { toCurrentWeather, toCity } from "../transform";

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

test("geocoding cevabindan ilk sehri cikarir", () => {
    const fakeResponse = {
        results: [
            {
                id: 323786,
                name: "Ankara",
                latitude: 39.91987,
                longitude: 32.85427,
                country: "Türkiye Cumhuriyeti",
                population: 3517182,
                timezone: "Europe/Istanbul"
            }
        ]
    };

    expect(toCity(fakeResponse)).toEqual({
        id: 323786,
        name: "Ankara",
        country: "Türkiye Cumhuriyeti",
        latitude: 39.91987,
        longitude: 32.85427
    });
});

test("sonuc yoksa null dondurur", () => {
    expect(toCity({ generationtime_ms: 0.13 })).toBeNull();
});

test("sonuc listesi bossa null dondurur", () => {
    expect(toCity({ results: [] })).toBeNull();
});
