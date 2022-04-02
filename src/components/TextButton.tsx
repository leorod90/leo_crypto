import React from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../constants/theme";

interface Props {
  label: string;
  containerStyle?: StyleProp<any>;
  onPress?: () => void;
}

export default function TextButton({ label, containerStyle, onPress }: Props) {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 3,
        paddingHorizontal: 18,
        borderRadius: 15,
        backgroundColor: COLORS.gray1,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
