import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/core';
import { MainLayoutWrapper } from '.';
import { IStore } from '../types';
import { getHoldings, getCoinMarket } from '../store/market/market.actions';
import { dummyData } from '../constants';

export interface IHomeProps {
  myHoldings: any[];
  coins: any[];
  getHoldings: any;
  getCoinMarket: any;
}

const Home: React.FC<IHomeProps> = ({
  myHoldings,
  coins,
  getHoldings,
  getCoinMarket,
}) => {
  useFocusEffect(
    useCallback(() => {
      getHoldings(dummyData.holdings);
      getCoinMarket();
    }, []),
  );
  return (
    <MainLayoutWrapper>
      <View>
        <Text>Home</Text>
      </View>
    </MainLayoutWrapper>
  );
};

const mapStateToProps = (state: IStore) => ({
  myHoldings: state.marketReducer.myHoldings,
  coins: state.marketReducer.coins,
});

const mapDispatchToProps = (dispatch: any) => ({
  getHoldings: (
    holdings: any[],
    currency: string,
    orderBy: string,
    sparkline: boolean,
    priceChangePerc: string,
    perPage: number,
    page: number,
  ) =>
    dispatch(
      getHoldings(
        holdings,
        currency,
        orderBy,
        sparkline,
        priceChangePerc,
        perPage,
        page,
      ),
    ),
  getCoinMarket: (
    currency: string,
    orderBy: string,
    sparkline: boolean,
    priceChangePerc: string,
    perPage: number,
    page: number,
  ) =>
    dispatch(
      getCoinMarket(
        currency,
        orderBy,
        sparkline,
        priceChangePerc,
        perPage,
        page,
      ),
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
