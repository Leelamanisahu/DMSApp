import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { login } from "./services/auth";

export default function LoginScreen() {
  const [mobile, setMobile] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: () => login(mobile),
    onSuccess: (data) => {
      router.push({ pathname: "/otp", params: { mobile } });
    },
    onError: (error: any) => {
      console.log(error?.response);
      alert(error?.response?.data?.message || "Something went wrong");
    },
  });

  const sendOtp = () => {
    if (mobile.length === 10) {
      mutate();
    } else {
      alert("Please enter a valid 10-digit mobile number.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.box}>
        <Text style={styles.title}>DMSApp</Text>
        <Text style={styles.subtitle}>
          Enter your mobile number to continue
        </Text>

        <TextInput
          placeholder="10-digit mobile number"
          placeholderTextColor="#999"
          keyboardType="number-pad"
          value={mobile}
          onChangeText={setMobile}
          maxLength={10}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={sendOtp}
          disabled={isPending}
        >
          <Text style={styles.buttonText}>
            {isPending ? "Sending OTP..." : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: "#000",
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#1e73be",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
