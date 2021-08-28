export interface Store {
  tabReducer: TabState;
  marketReducer: MarketState;
}

export interface TabState {
  isTradeModalVisible: boolean;
}

export interface MarketState {
  loading: boolean;
  error: any;
  myHoldings: any[];
  coins: any[];
}
