import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  children: React.ReactNode;
  onPress: () => void;
}

export default function CustomTabBar({ children, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
