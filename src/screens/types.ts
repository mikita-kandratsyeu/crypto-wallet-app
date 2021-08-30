export interface HomeProps {
  myHoldings: any[];
  coins: any[];
  getHoldings: any;
  getCoinMarket: any;
}

export interface MainLayoutProps {
  children: React.ReactNode;
  isTradeModalVisible?: boolean;
  setTradeModalVisibility?: (isVisible: boolean) => any;
}

export interface PortfolioProps {
  myHoldings: any[];
  getHoldings: any;
}
