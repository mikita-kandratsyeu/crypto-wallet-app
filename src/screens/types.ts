export interface HomeProps {
  myHoldings: any[];
  coins: any[];
  getHoldings: any;
  getCoinMarket: any;
}

export interface MainLayoutProps {
  children: React.ReactNode;
  isTradeModalVisible?: boolean;
}

export interface PortfolioProps {
  myHoldings: any[];
  getHoldings: any;
}
