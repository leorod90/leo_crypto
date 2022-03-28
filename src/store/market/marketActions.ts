import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

export const GET_HOLDINGS_BEGIN = "GET_HOLDINGS_BEGIN";
export const GET_HOLDINGS_SUCCESS = "GET_HOLDINGS_SUCCESS";
export const GET_HOLDINGS_FAILURE = "GET_HOLDINGS_FAILURE";

export const GET_COIN_MARKET_BEGIN = "GET_COIN_MARKET_BEGIN";
export const GET_COIN_MARKET_SUCCESS = "GET_COIN_MARKET_SUCCESS";
export const GET_COIN_MARKET_FAILURE = "GET_COIN_MARKET_FAILURE";

//holdings
export const getHoldingsBegin = () => ({
  type: GET_HOLDINGS_BEGIN,
});
export const getHoldingsSuccess = (myHoldings: any) => ({
  type: GET_HOLDINGS_SUCCESS,
  myHoldings,
});

export const getHoldingsFailure = (error: any) => ({
  type: GET_HOLDINGS_FAILURE,
  error,
});

export function getHoldings(
  holdings = [],
  currency = "usd",
  orderBy = "market_cap_desc",
  sparkline = true,
  priceChangePerc = "7d",
  page = 1,
  perPage = 10
) {
  return (dispatch: any) => {
    dispatch(getHoldingsBegin());

    let ids = holdings.map((item: any) => item.id).join(",");
    let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}`;

    return axios
      .get(apiUrl)
      .then((response: any) => {
        if (response.status == 200) {
          let myHoldings = response.data.map((item: any) => {
            //current holdings
            let coin: any = holdings.find((a: any) => a.id == item.id);
            //7 day price
            let price7d =
              item.current_price /
              (1 + item.price_change_percentage_7d_in_currency * 0.01);

            return {
              id: item.id,
              symbol: item.symbol,
              name: item.name,
              image: item.image,
              current_price: item.current_price,
              qty: coin.qty,
              total: coin.qty * item.current_price,
              price_change_percentage_7d_in_currency:
                item.price_change_percentage_7d_in_currency,
              holding_value_change_7d:
                (item.current_price - price7d) * coin.qty,
              sparkline_in_7d: {
                value: item.sparkline_in_7d.price.map(
                  (price: any) => price * coin.qty
                ),
              },
            };
          });
          dispatch(getHoldingsSuccess(myHoldings));
        } else {
          dispatch(getHoldingsFailure(response.data));
        }
      })
      .catch((error) => dispatch(getHoldingsFailure(error)));
  };
}

//market
export const getCoinMarketBegin = () => ({
  type: GET_COIN_MARKET_BEGIN,
});

export const getCoinMarketSuccess = (coins: any) => ({
  type: GET_COIN_MARKET_SUCCESS,
  coins,
});

export const getCoinMarketFailure = (error: any) => ({
  type: GET_COIN_MARKET_FAILURE,
  error,
});

export function getCoinMarket(
  holdings = [],
  currency = "usd",
  orderBy = "market_cap_desc",
  sparkline = true,
  priceChangePerc = "7d",
  page = 1,
  perPage = 10
) {
  return (dispatch: any) => {
    dispatch(getCoinMarketBegin());

    const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`;

    return axios
      .get(apiUrl)
      .then((response: any) => {
        if (response.status == 200) {
          dispatch(getCoinMarketSuccess(response.data));
        } else {
          dispatch(getCoinMarketFailure(response.data));
        }
      })
      .catch((error) => dispatch(getCoinMarketFailure(error)));
  };
}
