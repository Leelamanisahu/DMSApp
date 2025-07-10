import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

const OTPVerificationScreen = () => {
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    // Your OTP verification logic here
    console.log("Entered OTP:", otp);
    router.push("/(tabs)/profile");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.subtitle}>Enter the OTP sent to your number</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={6}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
    color: "#666",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 18,
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OTPVerificationScreen;
