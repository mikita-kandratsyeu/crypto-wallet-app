export interface IMarketTabs {
  id: number;
  title: string;
}

export interface IHoldings {
  id: string;
  qty: number;
}

export interface IProfile {
  id: number;
  email: string;
}

export interface ISettings {
  launchScreen: string;
  currency: string;
  appearance: string;
  language: string;
  faceId: boolean;
}

export type iconTypes =
  | 'close'
  | 'briefcase'
  | 'home'
  | 'market'
  | 'profile'
  | 'rightArrow'
  | 'send'
  | 'trade'
  | 'upArrow'
  | 'verified'
  | 'withdraw';

// Store
export interface IStore {
  tabReducer: ITabState;
  marketReducer: IMarketState;
}

export interface ITabState {
  isTradeModalVisible: boolean;
}

export interface IMarketState {
  loading: boolean;
  error: any;
  myHoldings: any[];
  coins: any[];
}
