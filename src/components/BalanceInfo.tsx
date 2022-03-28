import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { Feather } from "@expo/vector-icons";

interface Props {
  title: string;
  displayAmount: number;
  changePct: number;
  containerStyle?: any;
}

export default function BalanceInfo({
  title,
  displayAmount,
  changePct,
  containerStyle,
}: Props) {
  const icon = changePct > 0 ? "arrow-up-right" : "arrow-down-right";
  const iconColor = changePct > 0 ? COLORS.lightGreen : COLORS.red;

  return (
    <View style={{ ...containerStyle }}>
      {/* Title */}
      <Text style={{ ...FONTS.h3, color: COLORS.lightGray3 }}>{title}</Text>
      {/* Figures */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ ...FONTS.h3, color: COLORS.lightGray3 }}>$</Text>
        <Text
          style={{
            marginLeft: SIZES.base,
            marginVertical: 5,
            ...FONTS.h2,
            color: COLORS.white,
          }}
        >
          {displayAmount.toLocaleString()}
        </Text>
        <Text
          style={{
            marginLeft: SIZES.base / 2,
            ...FONTS.h3,
            color: COLORS.lightGray3,
          }}
        >
          USD
        </Text>
      </View>
      {/* Change Direction */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Feather name={icon} size={15} color={iconColor} />
        <Text
          style={{
            marginLeft: SIZES.base / 2,
            ...FONTS.h4,
            color: iconColor,
          }}
        >
          {changePct.toFixed(2)}%
        </Text>
        <Text
          style={{
            marginLeft: SIZES.base,
            ...FONTS.h5,
            color: COLORS.lightGray3,
          }}
        >
          7D change
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
