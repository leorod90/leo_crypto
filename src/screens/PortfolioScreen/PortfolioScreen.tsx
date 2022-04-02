import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import MainLayoutScreen from "../MainLayoutScreen";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getHoldings } from "../../store/market/marketActions";
import { rootState } from "../../store/store";
import { holdings } from "../../constants/dummyData";
import BalanceInfo from "../../components/BalanceInfo";
import Chart from "../../components/Chart";
import { Feather } from "@expo/vector-icons";

export default function PortfolioScreen() {
  const dispatch = useDispatch();
  const [selectedCoin, setSelectedCoin] = useState<any>(null);

  const myHoldings = useSelector(
    (state: rootState) => state.marketReducer.myHoldings
  );

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getHoldings(holdings));
    }, [])
  );

  const totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  const valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0
  );
  let percChange = (valueChange / (totalWallet - valueChange)) * 100;

  const renderCurrentBalanceSection = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}
      >
        <Text
          style={{
            marginTop: 50,
            color: COLORS.white,
            ...FONTS.largeTitle,
          }}
        >
          Portfolio
        </Text>
        <BalanceInfo
          title="Current Balance"
          displayAmount={totalWallet}
          changePct={percChange}
          containerStyle={{
            marginTop: SIZES.radius,
            marginBottom: SIZES.padding,
          }}
        />
      </View>
    );
  };

  return (
    <MainLayoutScreen>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}
      >
        {renderCurrentBalanceSection()}
        <Chart
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          chartPrices={
            selectedCoin
              ? selectedCoin?.sparkline_in_7d.value
              : myHoldings[0]?.sparkline_in_7d?.value
          }
        />
        <FlatList
          data={myHoldings}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View>
              <Text style={{ ...FONTS.h2, color: COLORS.white }}>
                You Assets
              </Text>
              <View style={{ flexDirection: "row", marginTop: SIZES.radius }}>
                <Text
                  style={{ flex: 1, ...FONTS.body5, color: COLORS.lightGray3 }}
                >
                  Assets
                </Text>
                <Text
                  style={{
                    flex: 1,
                    ...FONTS.body5,
                    color: COLORS.lightGray3,
                    textAlign: "right",
                  }}
                >
                  Price
                </Text>
                <Text
                  style={{
                    flex: 1,
                    ...FONTS.body5,
                    color: COLORS.lightGray3,
                    textAlign: "right",
                  }}
                >
                  Holdings
                </Text>
              </View>
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
                onPress={() => setSelectedCoin(item)}
                style={{
                  flexDirection: "row",
                  height: 55,
                  alignItems: "center",
                }}
              >
                {/* Asset */}
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    // alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{ height: 20, width: 20 }}
                  />
                  <Text
                    style={{
                      marginLeft: SIZES.radius,
                      color: COLORS.white,
                      ...FONTS.h4,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
                {/* Price */}
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      color: COLORS.white,
                      ...FONTS.h4,
                      lineHeight: 15,
                    }}
                  >
                    $ {item.current_price.toLocaleString()}
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
                {/* Holdings */}
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      textAlign: "right",
                      color: COLORS.white,
                      ...FONTS.h4,
                      lineHeight: 15,
                    }}
                  >
                    $ {item.total.toLocaleString()}
                  </Text>
                  <Text
                    style={{
                      textAlign: "right",
                      color: COLORS.lightGray3,
                      ...FONTS.body5,
                      lineHeight: 15,
                    }}
                  >
                    {item.qty} {item.symbol}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </MainLayoutScreen>
  );
}

const styles = StyleSheet.create({});
