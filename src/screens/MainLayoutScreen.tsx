import React from "react";
import { Animated, View } from "react-native";
import { useSelector } from "react-redux";
import IconTextBtn from "../components/IconTextBtn";
import { rootState } from "../store/store";
import { COLORS, SIZES } from "../constants/theme";

interface Props {
  children: React.ReactNode;
}

export default function MainLayoutScreen({ children }: Props) {
  const isTradeModalVisible = useSelector(
    (state: rootState) => state.tabReducer.isTradeModalVisible
  );

  const modalAnimatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isTradeModalVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [isTradeModalVisible]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 270],
  });

  return (
    <View style={{ flex: 1 }}>
      {children}
      {isTradeModalVisible && (
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.transparentBlack,
            opacity: modalAnimatedValue,
          }}
        />
      )}
      <Animated.View
        style={{
          position: "absolute",
          top: modalY,
          left: 0,
          width: "100%",
          padding: SIZES.padding,
          backgroundColor: COLORS.primary,
          zIndex: 100,
        }}
      >
        <IconTextBtn label="Transfer" icon="send" onPress={() => {}} />
        <IconTextBtn
          label="Withdraw"
          icon="arrow-down-circle"
          onPress={() => {}}
          containerStyle={{ marginTop: SIZES.base }}
        />
      </Animated.View>
    </View>
  );
}
