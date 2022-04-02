import React from "react";
import { View, Text } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";

interface Props {
  title: string;
}

export default function HeaderBar({ title }: Props) {
  return (
    <View
      style={{
        height: 100,
        paddingHorizontal: SIZES.radius,
        justifyContent: "flex-end",
      }}
    >
      <Text style={{ color: COLORS.white, ...FONTS.largeTitle }}>{title}</Text>
    </View>
  );
}
