import React, { useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { LineChart } from 'react-native-chart-kit';
// @ts-ignore
import AnimateNumber from 'react-native-countup';
import { MainLayoutWrapper } from '.';
import { Icon, Switcher, TextButton } from '../components';
import { colors, fonts, messages, sizes } from '../constants';
import { getCoinMarket } from '../store/market/market.actions';
import { Store } from '../store/types';
import { MarketProps } from './types';
import { marketTabs } from '../components/Switcher';

const Market: React.FC<MarketProps> = props => {
  const { getCoinMarket, coins } = props;

  const scrollX = useRef(new Animated.Value(0)).current;
  const marketTabScrollViewRef = useRef<any>();

  useEffect(() => {
    getCoinMarket();
  }, []);

  const marketHandler = useCallback(
    (tabIndex: number) => {
      marketTabScrollViewRef?.current?.scrollToOffset({
        offset: tabIndex * sizes.width,
      });
    },
    [marketTabScrollViewRef.current],
  );

  return (
    <MainLayoutWrapper>
      <View style={styles.root}>
        <View style={styles.tabsContainer}>
          <Switcher scrollX={scrollX} onPress={marketHandler} />
        </View>
        <View style={styles.buttonsContainer}>
          <TextButton label={messages.usd} onPress={() => null} />
          <TextButton
            label={messages.changes7dShort}
            containerStyle={styles.button}
            onPress={() => null}
          />
          <TextButton
            label={messages.top}
            containerStyle={styles.button}
            onPress={() => null}
          />
        </View>
        <Animated.FlatList
          ref={marketTabScrollViewRef}
          data={marketTabs}
          contentContainerStyle={{ marginTop: sizes.padding }}
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            },
          )}
          renderItem={() => (
            <View style={styles.columnContainer}>
              <FlatList
                data={coins}
                keyExtractor={item => item.id}
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
                    <View style={styles.rowContainer}>
                      <View style={styles.coinContainer}>
                        <Image
                          source={{ uri: item.image }}
                          style={styles.icon}
                        />
                        <Text
                          style={{
                            marginLeft: sizes.radius,
                            color: colors.white,
                            ...fonts.h3,
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                      <View style={styles.chartContainer}>
                        <LineChart
                          withVerticalLabels={false}
                          withHorizontalLabels={false}
                          withDots={false}
                          withInnerLines={false}
                          withVerticalLines={false}
                          withOuterLines={false}
                          data={{
                            labels: [],
                            datasets: [
                              {
                                data: item.sparkline_in_7d.price,
                              },
                            ],
                          }}
                          width={100}
                          height={60}
                          chartConfig={{
                            color: () => priceColor(),
                          }}
                          bezier
                          style={styles.chart}
                        />
                      </View>
                      <View style={styles.priceContainer}>
                        <Text style={styles.coinsRenderPrice}>
                          {`$ ${Number(item.current_price).toLocaleString(
                            undefined,
                            {
                              maximumFractionDigits: 2,
                            },
                          )}`}
                        </Text>
                        <View style={styles.priceChangeContainer}>
                          {item.price_change_percentage_7d_in_currency !==
                            0 && (
                            <View style={changeIconStyle}>
                              <Icon
                                name="UpArrow"
                                height={10}
                                width={10}
                                color={priceColor()}
                              />
                            </View>
                          )}
                          <Text
                            style={[
                              styles.priceChangeText,
                              {
                                color: priceColor(),
                              },
                            ]}
                          >
                            <AnimateNumber
                              value={Number(
                                item.price_change_percentage_7d_in_currency ||
                                  0,
                              )}
                              timing="linear"
                              interval={15}
                              formatter={(value: number) =>
                                // eslint-disable-next-line prettier/prettier
                                `${value.toFixed(2)}%`}
                            />
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          )}
        />
      </View>
    </MainLayoutWrapper>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
  },
  tabsContainer: {
    marginTop: sizes.radius,
    marginHorizontal: sizes.radius,
    borderRadius: sizes.radius,
    backgroundColor: colors.gray,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: sizes.radius,
    marginHorizontal: sizes.radius,
  },
  button: {
    marginLeft: sizes.base,
  },
  priceContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  coinsRenderPrice: {
    textAlign: 'right',
    color: colors.white,
    ...fonts.h4,
  },
  priceChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  priceChangeText: {
    marginLeft: 5,
    ...fonts.body5,
    lineHeight: 15,
  },
  columnContainer: { flex: 1, width: sizes.width },
  rowContainer: {
    flexDirection: 'row',
    paddingHorizontal: sizes.padding,
    marginBottom: sizes.radius,
  },
  coinContainer: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 20,
    width: 20,
  },
  chartContainer: {
    flex: 1,
    alignItems: 'center',
  },
  chart: {
    paddingRight: 0,
  },
});

const mapStateToProps = (state: Store) => ({
  coins: state.marketReducer.coins,
});

const mapDispatchToProps = (dispatch: any) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(Market);
