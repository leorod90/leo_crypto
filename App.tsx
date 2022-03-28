import React from "react";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import Navigation from "./src/navigation";

export default function App() {
  const [loaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
