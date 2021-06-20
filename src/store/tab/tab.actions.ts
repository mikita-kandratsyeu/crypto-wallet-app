import { Dispatch } from 'redux';

export const SET_TRADE_MODAL_VISIBILITY = 'SET_TRADE_MODAL_VISIBILITY';

export const setTradeModalVisibilitySuccess = (isVisible: boolean) => ({
  type: SET_TRADE_MODAL_VISIBILITY,
  payload: { isVisible },
});

export const setTradeModalVisibility =
  (isVisible: boolean) => (dispatch: Dispatch) =>
    dispatch(setTradeModalVisibilitySuccess(isVisible));
