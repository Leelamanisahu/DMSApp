import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const TAB_WIDTH = width / 2;

const tabs = [
  { name: "home", icon: "home" },
  { name: "profile", icon: "person" },
];

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withSpring(state.index * TAB_WIDTH, {
      damping: 13,
      stiffness: 120,
    });
  }, [state.index]);

  const animatedSliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <Animated.View style={[styles.slider, animatedSliderStyle]} />
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const iconBase = tabs[index]?.icon ?? "ellipse";
          const iconName = (
            isFocused ? iconBase : `${iconBase}-outline`
          ) as keyof typeof Ionicons.glyphMap;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={styles.tabButton}
              activeOpacity={0.7}
            >
              <Ionicons
                name={iconName}
                size={24}
                color={isFocused ? "#fff" : "#888"}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 30 : 20,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 40,
    backgroundColor: "#fff",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  tabBar: {
    flexDirection: "row",
    height: "100%",
    borderRadius: 40,
    overflow: "hidden",
  },
  slider: {
    position: "absolute",
    height: "100%",
    width: TAB_WIDTH,
    backgroundColor: "#000",
    borderRadius: 40,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
});
