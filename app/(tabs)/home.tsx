import UploadScreen from "@/components/Upload";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <UploadScreen />
    </View>
  );
}
