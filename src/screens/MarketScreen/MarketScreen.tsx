import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  FlatList,
  Image,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import HeaderBar from "../../components/HeaderBar";
import TextButton from "../../components/TextButton";
import constants from "../../constants/constants";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { getCoinMarket } from "../../store/market/marketActions";
import MainLayoutScreen from "../MainLayoutScreen";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { useSelector } from "react-redux";
import { rootState } from "../../store/store";

const marketTabs = constants.marketTabs.map((marketTab) => ({
  ...marketTab,
  ref: React.createRef(),
}));

const Tabs = () => {
  return (
    <View style={{ flexDirection: "row" }}>
      {marketTabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`MartTab-${index}`}
            style={{ flex: 1 }}
            onPress={() => {}}
          >
            <View
              ref={item.ref}
              style={{
                paddingHorizontal: 15,
                alignItems: "center",
                justifyContent: "center",
                height: 40,
              }}
            >
              <Text style={{ color: Colors.white, ...FONTS.h3 }}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default function MarketScreen() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const coins = useSelector((state: rootState) => state.marketReducer.coins);

  useEffect(() => {
    getCoinMarket();
  }, []);

  const renderTabBar = () => {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gray,
        }}
      >
        <Tabs />
      </View>
    );
  };

  const renderButtons = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
        }}
      >
        <TextButton label="USD" />
        <TextButton
          label="% (7d)"
          containerStyle={{ marginLeft: SIZES.base }}
        />
        <TextButton label="Top" containerStyle={{ marginLeft: SIZES.base }} />
      </View>
    );
  };

  const renderList = () => {
    return (
      <Animated.FlatList
        data={marketTabs}
        contentContainerStyle={{ marginTop: SIZES.padding }}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: true,
          }
        )}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flex: 1,
                width: SIZES.width,
              }}
            >
              <FlatList
                data={coins}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                  let priceColor =
                    item.price_change_percentage_7d_in_currency == 0
                      ? COLORS.lightGray3
                      : item.price_change_percentage_7d_in_currency > 0
                      ? COLORS.lightGreen
                      : COLORS.red;

                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        paddingHorizontal: SIZES.padding,
                        marginBottom: SIZES.radius,
                      }}
                    >
                      {/* Coins */}
                      <View
                        style={{
                          flexDirection: "row",
                          paddingHorizontal: SIZES.padding,
                          marginBottom: SIZES.radius,
                        }}
                      >
                        <Image
                          source={{ uri: item.image }}
                          style={{
                            height: 20,
                            width: 20,
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          marginLeft: SIZES.radius,
                          color: COLORS.white,
                          ...FONTS.h3,
                        }}
                      >
                        {item.name}
                      </Text>
                      {/* Line Charts */}
                      <View style={{ flex: 1, alignItems: "center" }}>
                        <LineChart
                          withVerticalLabels={false}
                          withHorizontalLabels={false}
                          withDots={false}
                          withInnerLines={false}
                          withVerticalLines={false}
                          withOuterLines={false}
                          data={{
                            datasets: [
                              {
                                data: item.sparkline_in_7d.price,
                              },
                            ],
                          }}
                          width={100}
                          height={60}
                          chartConfig={{
                            color: () => priceColor,
                          }}
                          bezier
                          style={{
                            paddingRight: 0,
                          }}
                        />
                      </View>
                      {/* Figures */}
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
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
        <HeaderBar title="Market" />
        {renderTabBar()}
        {renderButtons()}
        {renderList()}
      </View>
    </MainLayoutScreen>
  );
}

const styles = StyleSheet.create({});
