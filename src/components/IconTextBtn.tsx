import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { FONTS, SIZES } from "../constants/theme";

interface Props {
  label: string;
  icon: string;
  containerStyle?: any;
  onPress: () => void;
}

export default function ({ label, icon, containerStyle, onPress }: Props) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        backgroundColor: "white",
        borderRadius: SIZES.radius,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Feather name={icon} size={20} />
      <Text style={{ ...FONTS.h3, marginLeft: SIZES.base }}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
