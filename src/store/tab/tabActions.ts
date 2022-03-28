export const SET_TRADE_MODAL_VISIBILITY = "SET_TRADE_MODAL_VISIBILITY";

export function setTradeModalVisibility(isVisible: boolean) {
  return (dispatch: any) => {
    dispatch({
      type: SET_TRADE_MODAL_VISIBILITY,
      isVisible,
    });
  };
}
