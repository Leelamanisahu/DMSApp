import UploadScreen from "@/components/Upload";
import { useEffect } from "react";
import { BackHandler, Platform, View } from "react-native";

export default function HomeScreen() {
  useEffect(() => {
    const onBackPress = () => {
      BackHandler.exitApp();
      return true;
    };

    if (Platform.OS === "android") {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => backHandler.remove();
    }
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <UploadScreen />
    </View>
  );
}
