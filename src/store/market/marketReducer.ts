import {
  GET_HOLDINGS_BEGIN,
  GET_HOLDINGS_SUCCESS,
  GET_HOLDINGS_FAILURE,
  GET_COIN_MARKET_BEGIN,
  GET_COIN_MARKET_SUCCESS,
  GET_COIN_MARKET_FAILURE,
} from "./marketActions";

const initialState = {
  myHoldings: [],
  coins: [],
  error: null,
  loading: false,
};

interface Action {
  type: string;
  myHoldings: any;
  error: any;
  coins: any;
}

export default (
  state = initialState,
  { type, myHoldings, error, coins }: Action
) => {
  switch (type) {
    case GET_HOLDINGS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_HOLDINGS_SUCCESS:
      return {
        ...state,
        myHoldings,
        loading: false,
        error: null,
      };
    case GET_HOLDINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error,
      };
    case GET_COIN_MARKET_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_COIN_MARKET_SUCCESS:
      return {
        ...state,
        coins,
        loading: false,
        error: null,
      };
    case GET_COIN_MARKET_FAILURE:
      return {
        ...state,
        loading: false,
        error,
      };

    default:
      return state;
  }
};
