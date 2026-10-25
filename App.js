import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { loadCities } from "./src/storage/cityStorage";

export default function App() {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadCities().then((savedCities) => {
            setCities(savedCities);
            setIsLoading(false);
        });
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Hava Durumu</Text>

                {isLoading ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <FlatList
                        data={cities}
                        keyExtractor={(city) => String(city.id)}
                        renderItem={({ item }) => (
                            <View style={styles.row}>
                                <Text style={styles.cityName}>{item.name}</Text>
                            </View>
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
    row: {
        minHeight: 56,
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    cityName: {
        fontSize: 18,
    },
    emptyText: {
        textAlign: "center",
        color: "#888",
        marginTop: "32",
    },
});