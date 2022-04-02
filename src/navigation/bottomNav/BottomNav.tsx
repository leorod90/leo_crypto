import * as React from "react";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";

import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import MarketScreen from "../../screens/MarketScreen/MarketScreen";
import PortfolioScreen from "../../screens/PortfolioScreen/PortfolioScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import TradeScreen from "../../screens/TradeScreen";
import TabIcon from "./TabIcon";
import CustomTabBar from "./CustomTabBar";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../store/store";
import { setTradeModalVisibility } from "../../store/tab/tabActions";
import { COLORS } from "../../constants/theme";

type BottomParamList = {
  Home: undefined;
  Market: undefined;
  Trade: undefined;
  Portfolio: undefined;
  Profile: undefined;
  //   FavNav: undefined;
};

export type BottomNavProps<T extends keyof BottomParamList> = {
  navigation: BottomTabNavigationProp<BottomParamList, T>;
  route: RouteProp<BottomParamList, T>;
};

const Tab = createBottomTabNavigator<BottomParamList>();

function MyTabs() {
  const dispatch = useDispatch();

  const isTradeModalVisible = useSelector(
    (state: rootState) => state.tabReducer.isTradeModalVisible
  );

  const toggleModalVisibilityHandler = () => {
    dispatch(setTradeModalVisibility(!isTradeModalVisible));
  };

  const tabListeners = {
    tabPress: (e: any) => {
      if (isTradeModalVisible) e.preventDefault();
    },
  };

  return (
    <Tab.Navigator
      //   tabBar={(props) => <CustomTab {...props} />}
      screenOptions={{
        headerShown: false,
        // unmountOnBlur: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          // borderWidth: 0,
          height: 120,
          backgroundColor: COLORS.primary,
        },
      }}
    >
      {/* <Tab.Screen
        name="CategoriesNav"
        component={CategoriesNav}
        options={{ lazy: false }}
      /> */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible)
              return <TabIcon focused={focused} icon="home" label="Home" />;
          },
        }}
        listeners={tabListeners}
      />
      <Tab.Screen
        name="Market"
        component={MarketScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible)
              return <TabIcon focused={focused} icon="globe" label="Market" />;
          },
        }}
        listeners={tabListeners}
      />
      <Tab.Screen
        name="Trade"
        component={TradeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              // icon="sliders"
              icon={isTradeModalVisible ? "x" : "dollar-sign"}
              label="Trade"
              isTrade={true}
            />
          ),
          tabBarButton: (props) => (
            <CustomTabBar {...props} onPress={toggleModalVisibilityHandler} />
          ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible)
              return (
                <TabIcon focused={focused} icon="briefcase" label="Portfolio" />
              );
          },
        }}
        listeners={tabListeners}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible)
              return <TabIcon focused={focused} icon="user" label="Profile" />;
          },
        }}
        listeners={tabListeners}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
