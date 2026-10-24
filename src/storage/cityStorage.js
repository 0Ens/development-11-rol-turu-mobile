import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "cities";

export async function loadCities() {
    try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        return json ? JSON.parse(json) : [];
    } catch {
        return [];
    }
}

export async function saveCities(cities) {
    const json = JSON.stringify(cities);
    await AsyncStorage.setItem(STORAGE_KEY, json);
}
