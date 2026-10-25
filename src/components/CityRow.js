import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { fetchCurrentWeather } from "../api/openMeteo";

export default function CityRow({ city, onLongPress }) {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadWeather() {
      try {
        const result = await fetchCurrentWeather(city);
        setWeather(result);
      } catch {
        setError("Bağlantı yok...");
      } finally {
        setIsLoading(false);
      }
    }
    loadWeather();
  }, [city]);

  return (
    <Pressable style={styles.row} onLongPress={onLongPress}>
      <View>
        <Text style={styles.cityName}>{city.name}</Text>
        <Text style={styles.country}>{city.country}</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <View style={styles.weather}>
          <Text style={styles.temperature}>{weather.temperature}°</Text>
          <Text style={styles.description}>{weather.description}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  country: {
    fontSize: 14,
    color: "#888",
  },
  cityName: {
    fontSize: 18,
  },
  weather: {
    alignItems: "flex-end",
  },
  temperature: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#888",
  },
  error: {
    fontSize: 14,
    color: "#dc2626",
  },
});
