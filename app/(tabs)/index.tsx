import { router } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const [mobile, setMobile] = useState("");

  const sendOtp = () => {
    // Call backend to send OTP
    router.push({ pathname: "/(tabs)/otp", params: { mobile } });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Enter Mobile Number</Text>
      <TextInput
        placeholder="10-digit number"
        keyboardType="number-pad"
        value={mobile}
        onChangeText={setMobile}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <Button title="Send OTP" onPress={sendOtp} />
    </View>
  );
}
