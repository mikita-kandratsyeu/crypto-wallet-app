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
