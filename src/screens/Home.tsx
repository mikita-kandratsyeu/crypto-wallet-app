import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
// @ts-ignore
import AnimateNumber from 'react-native-countup';
import { useFocusEffect } from '@react-navigation/core';
import { MainLayoutWrapper } from '.';
import { IStore } from '../types';
import { getHoldings, getCoinMarket } from '../store/market/market.actions';
import { colors, dummyData, fonts, messages, sizes } from '../constants';
import { BalanceInfo, Chart, Icon, IconTextButton } from '../components';

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
        <Chart
          containerStyle={{ marginTop: sizes.padding * 2 }}
          // eslint-disable-next-line camelcase
          chartPrices={coins[0]?.sparkline_in_7d?.price}
        />
        <FlatList
          data={coins}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listCoins}
          // eslint-disable-next-line prettier/prettier
          ListHeaderComponent={(
            <View style={styles.listCoinsHeader}>
              <Text style={styles.listCoinsText}>
                {messages.topCryptoCurrency}
              </Text>
            </View>
            // eslint-disable-next-line prettier/prettier
          )}
          renderItem={({ item }) => {
            const priceColor = () => {
              if (item.price_change_percentage_7d_in_currency === 0) {
                return colors.lightGray3;
              }

              if (item.price_change_percentage_7d_in_currency > 0) {
                return colors.lightGreen;
              }

              return colors.red;
            };

            const changeIconStyle = {
              transform:
                Number(item.price_change_percentage_7d_in_currency) > 0
                  ? [{ rotate: '45deg' }]
                  : [{ rotate: '125deg' }],
            };
            return (
              <TouchableOpacity style={styles.listCoinsRenderRoot}>
                <View style={styles.listCoinsRender}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.listCoinsIcon}
                  />
                </View>
                <View style={styles.listCoinsTextContainer}>
                  <Text style={styles.listCoinsText}>{item.name}</Text>
                </View>
                <View>
                  <Text style={styles.listCoinsRenderPrice}>
                    {`$ ${Number(item.current_price).toLocaleString()}`}
                  </Text>
                  <View
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.price_change_percentage_7d_in_currency !== 0 && (
                      <View style={changeIconStyle}>
                        <Icon
                          name="upArrow"
                          height={10}
                          width={10}
                          color={priceColor()}
                        />
                      </View>
                    )}
                    <Text
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{
                        marginLeft: 5,
                        color: priceColor(),
                        ...fonts.body5,
                        lineHeight: 15,
                      }}
                    >
                      <AnimateNumber
                        value={Number(
                          item.price_change_percentage_7d_in_currency || 0,
                        )}
                        timing="linear"
                        interval={15}
                        formatter={(value: number) => `${value.toFixed(2)}%`}
                      />
                    </Text>
                  </View>
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
  listCoins: {
    marginTop: 30,
    paddingHorizontal: sizes.padding,
  },
  listCoinsHeader: {
    marginBottom: sizes.radius,
  },
  listCoinsText: {
    color: colors.white,
    ...fonts.h3,
    fontSize: 18,
  },

  listCoinsRenderRoot: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  listCoinsRender: {
    width: 35,
  },
  listCoinsIcon: {
    width: 20,
    height: 20,
  },
  listCoinsTextContainer: {
    flex: 1,
  },
  listCoinsRenderText: {
    color: colors.white,
    ...fonts.h3,
  },
  listCoinsRenderPrice: {
    textAlign: 'right',
    color: colors.white,
    ...fonts.h4,
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
