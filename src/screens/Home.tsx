import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/core';
import { MainLayoutWrapper } from '.';
import { IStore } from '../types';
import { getHoldings, getCoinMarket } from '../store/market/market.actions';
import { colors, dummyData, messages, sizes } from '../constants';
import { BalanceInfo, IconTextButton } from '../components';

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
        <View style={styles.walletInfoContainer}>
          <BalanceInfo
            title={messages.yourWallet}
            displayAmount={totalWallet}
            changePct={percentChange}
            containerStyle={styles.balanceInfoContainer}
          />
        </View>
        <View style={styles.iconTextButtonContainer}>
          <IconTextButton
            label={messages.transfer}
            icon="send"
            containerStyle={styles.iconTextButton}
            onPress={() => console.log('Transfer')}
          />
          <IconTextButton
            label={messages.withdraw}
            icon="withdraw"
            containerStyle={styles.iconTextButton}
            onPress={() => console.log('Withdraw')}
          />
        </View>
      </View>
    </MainLayoutWrapper>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 15,
  },
  walletInfoContainer: {
    paddingHorizontal: sizes.padding,
    paddingBottom: sizes.padding * 2,
    borderRadius: 25,
    backgroundColor: colors.gray,
    marginLeft: sizes.base,
    marginRight: sizes.base,
  },
  balanceInfoContainer: {
    marginTop: 15,
    marginBottom: 15,
  },
  iconTextButtonContainer: {
    flexDirection: 'row',
    marginTop: -20,
    paddingHorizontal: sizes.radius * 3,
  },
  iconTextButton: {
    flex: 1,
    height: 40,
    marginRight: Math.floor(sizes.radius / 2),
    marginLeft: Math.floor(sizes.radius / 2),
  },
});

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
