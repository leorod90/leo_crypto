import React from "react";
import { Text } from "react-native";
import { useTheme } from "@react-navigation/native";

interface Props {
  light?: boolean;
  bold?: boolean;
  style?: any;
  numberOfLines?: number;
  children: React.ReactNode;
}

export default function CustomText({
  light,
  bold,
  style,
  children,
  numberOfLines,
}: Props) {
  const { colors } = useTheme();

  let fontFamily = "Roboto";
  if (light) fontFamily = "Roboto-Light";
  if (bold) fontFamily = "Roboto-Bold";

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          fontFamily,
          color: colors.text,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
