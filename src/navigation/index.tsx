import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import BottomNav from "../navigation/bottomNav/BottomNav";
import { customLightTheme, customDarkTheme } from "../constants/Colors";

export default function Navigation() {
  const [darkTheme, setDarkTheme] = useState(true);
  //theme={darkTheme ? customDarkTheme : customLightTheme}

  return (
    <NavigationContainer theme={darkTheme ? customDarkTheme : customLightTheme}>
      <>
        <StatusBar style="light" />
        <BottomNav />
      </>
    </NavigationContainer>
  );
}
