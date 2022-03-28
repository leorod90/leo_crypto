import { SET_TRADE_MODAL_VISIBILITY } from "./tabActions";

const initialState = {
  isTradeModalVisible: false,
};

interface Action {
  type: string;
  isVisible: boolean;
}

export default (state = initialState, { type, isVisible }: Action) => {
  switch (type) {
    case SET_TRADE_MODAL_VISIBILITY:
      return {
        ...state,
        isTradeModalVisible: isVisible,
      };

    default:
      return state;
  }
};
