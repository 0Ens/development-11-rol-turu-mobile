import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { loadCities, saveCities } from "./src/storage/cityStorage";
import { searchCity } from "./src/api/openMeteo";
import { addCity, removeCity } from "./src/core/cities";
import CityRow from "./src/components/CityRow";

export default function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCities().then((savedCities) => {
      setCities(savedCities);
      setIsLoading(false);
    });
  }, []);

  const [query, setQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  async function handleAdd() {
    const name = query.trim();
    if (!name) {
      return;
    }

    setIsAdding(true);
    setAddError(null);
    try {
      const city = await searchCity(name);
      if (!city) {
        setAddError("Şehir bulunamadı");
        return;
      }

      const updatedCities = addCity(cities, city);
      if (updatedCities === cities) {
        setAddError(`${city.name} zaten listede`);
        return;
      }

      setCities(updatedCities);
      await saveCities(updatedCities);
      setQuery("");
    } catch {
      setAddError("Bağlantı yok. İnternetini kontrol edip tekrar dene.");
    } finally {
      setIsAdding(false);
    }
  }

  async function handleRemove(cityId) {
    const updatedCities = removeCity(cities, cityId);
    setCities(updatedCities);
    await saveCities(updatedCities);
  }

  function handleRefresh() {
    setRefreshKey((key) => key + 1);
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Hava Durumu</Text>
        <View style={styles.addRow}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Şehir adı"
            style={styles.input}
            autoCorrect={false}
            onSubmitEditing={handleAdd}
          />
          <Pressable
            onPress={handleAdd}
            disabled={isAdding}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>
              {isAdding ? "..." : "Ekle"}
            </Text>
          </Pressable>
        </View>

        {addError ? <Text style={styles.errorText}>{addError}</Text> : null}

        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={cities}
            keyExtractor={(city) => String(city.id)}
            refreshing={false}
            onRefresh={handleRefresh}
            renderItem={({ item }) => (
              <CityRow
                city={item}
                refreshKey={refreshKey}
                onLongPress={() => handleRemove(item.id)}
              />
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Henüz şehir eklemedin</Text>
            }
          />
        )}

        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 16,
  },
  input: {
    flex: 1,
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  addRow: {
    flexDirection: "row",
    gap: 8,
  },
  addButton: {
    minHeight: 48,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "#2563eb",
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#dc2626",
    marginTop: 8,
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 32,
  },
});
