import { ITabState } from '../../types';
import * as tabActionTypes from './tab.actions';

const initialState: ITabState = {
  isTradeModalVisible: false,
};

const tabReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case tabActionTypes.SET_TRADE_MODAL_VISIBILITY:
      return {
        ...state,
        isTradeModalVisible: action.payload.isVisible,
      };
    default:
      return state;
  }
};

export default tabReducer;
