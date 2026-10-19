const WEATHER_DESCRIPTIONS = {
    0: "Açık",
    1: "Az bulutlu",
    2: "Parçalı bulutlu",
    3: "Kapalı",
    45: "Sis",
    48: "Kırağılı sis",
    51: "Hafif çisenti",
    53: "Orta çisenti",
    55: "Yoğun çisenti",
    56: "Dondurucu çisenti",
    57: "Şiddetli dondurucu çisenti",
    61: "Hafif yağmur",
    63: "Orta yağmur",
    65: "Şiddetli yağmur",
    66: "Dondurucu yağmur",
    67: "Şiddetli dondurucu yağmur",
    71: "Hafif kar",
    73: "Orta kar",
    75: "Şiddetli kar",
    77: "Kar taneleri",
    80: "Hafif sağanak",
    81: "Orta sağanak",
    82: "Şiddetli sağanak",
    85: "Kar sağanağı",
    86: "Şiddetli kar sağanağı",
    95: "Gök gürültülü fırtına",
    96: "Dolulu fırtına",
    99: "Şiddetli dolulu fırtına"
};

export function describeWeatherCode(code){
    return WEATHER_DESCRIPTIONS[code] ?? "Bilinmeyen";
}
