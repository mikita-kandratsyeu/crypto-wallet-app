import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { MainLayoutWrapper } from '.';
import { getHoldings } from '../store/market/market.actions';
import { Store } from '../store/types';
import { dummyData } from '../constants';
import { PortfolioProps } from './types';

const Portfolio: React.FC<PortfolioProps> = props => {
  const { myHoldings, getHoldings } = props;

  useFocusEffect(
    useCallback(() => {
      getHoldings(dummyData.holdings);
    }, []),
  );
  const totalWallet = myHoldings.reduce(
    (a: number, b: any) => a + (b.total || 0),
    0,
  );

  const valueChange = myHoldings.reduce(
    (a: number, b: any) => a + (b.holding_value_change_7d || 0),
    0,
  );

  const percentChange = (valueChange / (totalWallet - valueChange)) * 100;

  return (
    <MainLayoutWrapper>
      <View style={styles.root}>
        <Text>Portfolio</Text>
      </View>
    </MainLayoutWrapper>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

const mapStateToProps = (state: Store) => ({
  myHoldings: state.marketReducer.myHoldings,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
