import React from "react";
import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";

interface Props {
  focused: boolean;
  icon: string;
  iconStyle?: any;
  label: string;
  isTrade?: boolean;
}

export default function TabIcon({
  focused,
  icon,
  iconStyle,
  label,
  isTrade,
}: Props) {
  return (
    <View style={[styles.container, { ...iconStyle }]}>
      <Feather
        name={icon}
        size={24}
        color={focused ? COLORS.white : COLORS.secondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
