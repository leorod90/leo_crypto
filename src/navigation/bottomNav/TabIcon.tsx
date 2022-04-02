import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../constants/theme";

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
  const color = focused ? COLORS.white : COLORS.secondary;

  return (
    <View style={[styles.container, { ...iconStyle }]}>
      <Feather name={icon} size={24} color={color} />
      <Text style={{ marginTop: 5, color, ...FONTS.body5 }}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
