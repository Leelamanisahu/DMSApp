import { getToken } from "@/utils/securestore";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function IndexScreen() {
  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (token) {
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>DMS</Text>
      <ActivityIndicator
        size="large"
        color="#1e73be"
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#1e73be",
    letterSpacing: 4,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
});
