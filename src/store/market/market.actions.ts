import axios from 'axios';
import { Dispatch } from 'redux';

export const GET_HOLDINGS_BEGIN = 'GET_HOLDINGS_BEGIN';
export const GET_HOLDINGS_SUCCESS = 'GET_HOLDINGS_SUCCESS';
export const GET_HOLDINGS_FAILURE = 'GET_HOLDINGS_FAILURE';
export const GET_COIN_MARKET_BEGIN = 'GET_COIN_MARKET_BEGIN';
export const GET_COIN_MARKET_SUCCESS = 'GET_COIN_MARKET_SUCCESS';
export const GET_COIN_MARKET_FAILURE = 'GET_COIN_MARKET_FAILURE';

export const getHoldingsBegin = () => ({
  type: GET_HOLDINGS_BEGIN,
});

export const getHoldingsSuccess = (myHoldings: any) => ({
  type: GET_HOLDINGS_SUCCESS,
  payload: { myHoldings },
});

export const getHoldingsFailure = (err: Error) => ({
  type: GET_HOLDINGS_FAILURE,
  payload: { error: err },
});

export const getHoldings = (
  holdings: any[] = [],
  currency: string = 'usd',
  orderBy: string = 'market_cap_desc',
  sparkline: boolean = true,
  priceChangePerc: string = '7d',
  perPage: number = 10,
  page: number = 1,
) => {
  return (dispatch: Dispatch) => {
    dispatch(getHoldingsBegin());

    const ids = holdings.map((item: any) => item.id).join(',');

    const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}`;

    return axios({
      url: apiUrl,
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          const myHoldings = res.data.map((item: any) => {
            const coin: any = holdings.find((a: any) => a.id === item.id);

            const price7d =
              item.current_price /
              (1 + item.price_change_percentage_7d_in_currency * 0.01);

            return {
              id: item.id,
              symbol: item.symbol,
              name: item.name,
              image: item.image,
              current_price: item.current_price,
              qty: coin.qty,
              total: coin.qty * item.current_price,
              price_change_percentage_7d_in_currency:
                item.price_change_percentage_7d_in_currency,
              holding_value_change_7d:
                (item.current_price - price7d) * coin.qty,
              sparkline_in_7d: {
                value: item.sparkline_in_7d.price.map(
                  (price: any) => price * coin.qty,
                ),
              },
            };
          });

          dispatch(getHoldingsSuccess(myHoldings));
        } else {
          dispatch(getHoldingsFailure(res.data));
        }
      })
      .catch(err => {
        dispatch(getHoldingsFailure(err));
      });
  };
};

export const getCoinMarketBegin = () => ({
  type: GET_COIN_MARKET_BEGIN,
});

export const getCoinMarketSuccess = (coins: any) => ({
  type: GET_COIN_MARKET_SUCCESS,
  payload: { coins },
});

export const getCoinMarketFailure = (err: Error) => ({
  type: GET_COIN_MARKET_FAILURE,
  payload: { error: err },
});

export const getCoinMarket = (
  currency: string = 'usd',
  orderBy: string = 'market_cap_desc',
  sparkline: boolean = true,
  priceChangePerc: string = '7d',
  perPage: number = 10,
  page: number = 1,
) => {
  return (dispatch: Dispatch) => {
    dispatch(getCoinMarketBegin());

    const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`;

    return axios({
      url: apiUrl,
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(res => {
        if (res.status === 200) {
          dispatch(getCoinMarketSuccess(res.data));
        } else {
          dispatch(getCoinMarketFailure(res.data));
        }
      })
      .catch(err => {
        dispatch(getCoinMarketFailure(err));
      });
  };
};
