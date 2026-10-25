import { Pressable, StyleSheet, Text } from "react-native";

export default function CityRow({ city, onLongPress }) {
  return (
    <Pressable style={styles.row} onLongPress={onLongPress}>
      <Text style={styles.cityName}>{city.name}</Text>
      <Text style={styles.country}>{city.country}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 56,
    justifyContent: "center",
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
});
