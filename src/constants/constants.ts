export interface MarketTab {
  id: string;
  title: string;
  ref?: any;
}

const marketTabs: MarketTab[] = [
  {
    id: '1',
    title: 'Cryptoassets',
  },
  {
    id: '2',
    title: 'Exchanges',
  },
];

// API
// My Holdings
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}

// Coin Market
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}

const constants = {
  marketTabs,
};

export default constants;
