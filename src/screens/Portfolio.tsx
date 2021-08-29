import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { MainLayoutWrapper } from '.';
import { getHoldings } from '../store/market/market.actions';
import { Store } from '../store/types';
import { colors, dummyData, fonts, messages, sizes } from '../constants';
import { PortfolioProps } from './types';
import { getTotalWallet, getValueChange } from './services';
import { BalanceInfo, Chart } from '../components';

const Portfolio: React.FC<PortfolioProps> = props => {
  const { myHoldings, getHoldings } = props;

  useFocusEffect(
    useCallback(() => {
      getHoldings(dummyData.holdings);
    }, []),
  );

  const valueChange = getValueChange(myHoldings);
  const totalWallet = getTotalWallet(myHoldings);

  const percentChange = (valueChange / (totalWallet - valueChange)) * 100;

  return (
    <MainLayoutWrapper>
      <View style={styles.root}>
        <View style={styles.currentBalanceContainer}>
          <BalanceInfo
            title={messages.currentBalance}
            displayAmount={totalWallet}
            changePct={percentChange}
            containerStyle={styles.balanceInfoContainer}
          />
        </View>
        <Chart
          containerStyle={{ marginTop: sizes.padding }}
          // eslint-disable-next-line camelcase
          chartPrices={myHoldings[0]?.sparkline_in_7d?.value}
        />
        <FlatList
          data={myHoldings}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.assetsListContainer}
          // eslint-disable-next-line prettier/prettier
          ListHeaderComponent={(
            <View>
              <Text style={styles.assetsListHeaderText}>
                {messages.yourAssets}
              </Text>
              <View style={styles.assetsListSectionContainer}>
                <Text style={styles.assetsListSectionHeader}>
                  {messages.asset}
                </Text>
                <Text
                  style={[
                    styles.assetsListSectionHeader,
                    styles.textAlignRight,
                  ]}
                >
                  {messages.price}
                </Text>
                <Text
                  style={[
                    styles.assetsListSectionHeader,
                    styles.textAlignRight,
                  ]}
                >
                  {messages.holdings}
                </Text>
              </View>
            </View>
            // eslint-disable-next-line prettier/prettier
          )}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.assetsListItem}>
                <View style={styles.assetItem}>
                  <Image source={{ uri: item.image }} style={styles.icon} />
                  <Text style={styles.assetItemName}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </MainLayoutWrapper>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: colors.black,
  },
  currentBalanceContainer: {
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
    height: 30,
  },
  assetsListContainer: {
    marginTop: 30,
    paddingHorizontal: sizes.padding,
  },
  assetsListHeaderText: {
    color: colors.white,
    ...fonts.h3,
    fontSize: 18,
  },
  assetsListSectionContainer: {
    flexDirection: 'row',
    marginTop: sizes.radius,
  },
  assetsListSectionHeader: {
    flex: 1,
    color: colors.lightGray3,
  },
  textAlignRight: {
    textAlign: 'right',
  },
  assetsListItem: {
    flexDirection: 'row',
    height: 55,
  },
  icon: {
    height: 20,
    width: 20,
  },
  assetItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetItemName: {
    marginLeft: sizes.radius,
    color: colors.white,
    ...fonts.h3,
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
