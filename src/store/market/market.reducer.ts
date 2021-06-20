import { IMarketState } from '../../types';
import * as marketActions from './market.actions';

const initialState: IMarketState = {
  myHoldings: [],
  coins: [],
  error: null,
  loading: false,
};

const marketReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case marketActions.GET_HOLDINGS_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case marketActions.GET_HOLDINGS_SUCCESS:
      return {
        ...state,
        myHoldings: action.payload.myHoldings,
      };
    case marketActions.GET_COIN_MARKET_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case marketActions.GET_COIN_MARKET_SUCCESS:
      return {
        ...state,
        coins: action.payload.coins,
      };
    case marketActions.GET_HOLDINGS_FAILURE:
    case marketActions.GET_COIN_MARKET_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default marketReducer;
