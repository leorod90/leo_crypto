import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../store/store";
import MainLayoutScreen from "../MainLayoutScreen";
import { useFocusEffect } from "@react-navigation/native";
import { getCoinMarket, getHoldings } from "../../store/market/marketActions";
import { holdings } from "../../constants/dummyData";
import BalanceInfo from "../../components/BalanceInfo";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import IconTextBtn from "../../components/IconTextBtn";
import Chart from "../../components/Chart";
import { Feather } from "@expo/vector-icons";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const [selectedCoin, setSelectedCoin] = useState(null);

  const myHoldings = useSelector(
    (state: rootState) => state.marketReducer.myHoldings
  );
  const coins = useSelector((state: rootState) => state.marketReducer.coins);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getHoldings(holdings));
      dispatch(getCoinMarket());
    }, [])
  );

  const totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  const valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0
  );
  let percChange = (valueChange / (totalWallet - valueChange)) * 100;

  const RenderWalletInfoSection = () => {
    return (
      <View style={styles.renderWallet}>
        <BalanceInfo
          title="Your Wallet"
          displayAmount={totalWallet}
          changePct={percChange}
          containerStyle={{
            marginTop: 50,
            paddingVertical: SIZES.base,
          }}
        />
        {/* Buttons */}
        {/* <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            marginBottom: -15,
            paddingHorizontal: SIZES.radius,
          }}
        >
          <IconTextBtn
            label="Transfer"
            icon="send"
            onPress={() => {}}
            containerStyle={{
              flex: 1,
              height: 40,
              width: "100%",
              marginHorizontal: SIZES.radius,
            }}
          />
          <IconTextBtn
            label="Withdraw"
            icon="arrow-down-circle"
            onPress={() => {}}
            containerStyle={{
              flex: 1,
              height: 40,
              marginHorizontal: SIZES.radius,
            }}
          />
        </View> */}
      </View>
    );
  };

  return (
    <MainLayoutScreen>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <RenderWalletInfoSection />
        <Chart
          containerStyle={{
            marginTop: SIZES.padding * 2,
            marginBottom: SIZES.padding,
          }}
          chartPrices={
            selectedCoin
              ? selectedCoin?.sparkline_in_7d?.price
              : coins[0]?.sparkline_in_7d?.price
          }
        />
        <FlatList
          data={coins}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            marginTop: 30,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View style={{ marginBottom: SIZES.radius }}>
              <Text style={{ color: COLORS.white, ...FONTS.h3, fontSize: 18 }}>
                Top Cryptocurrency
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            let priceColor =
              item.price_change_percentage_7d_in_currency == 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red;
            const icon =
              item.price_change_percentage_7d_in_currency == 0
                ? "minus"
                : item.price_change_percentage_7d_in_currency > 0
                ? "arrow-up-right"
                : "arrow-down-right";

            return (
              <TouchableOpacity
                style={{
                  height: 55,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => setSelectedCoin(item)}
              >
                <View style={{ width: 35 }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ height: 20, width: 20 }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                    {item.name}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      textAlign: "right",
                      color: COLORS.white,
                      ...FONTS.h4,
                    }}
                  >
                    $ {item.current_price}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Feather name={icon} size={15} color={priceColor} />
                    <Text
                      style={{
                        marginLeft: 5,
                        color: priceColor,
                        ...FONTS.h5,
                        lineHeight: 15,
                      }}
                    >
                      {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={<View style={{ marginBottom: 50 }} />}
        />
      </View>
    </MainLayoutScreen>
  );
}

const styles = StyleSheet.create({
  renderWallet: {
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
});
