import React, { useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AnimateNumber from 'react-native-countup';
import { Icon } from '.';
import { colors, fonts, messages, sizes } from '../constants';

export interface IBalanceInfoProps {
  title: string;
  displayAmount: string | number;
  changePct: string | number;
  containerStyle?: any;
}

export const BalanceInfo: React.FC<IBalanceInfoProps> = ({
  title,
  displayAmount,
  changePct,
  containerStyle,
}) => {
  const changePercentIconStyle = useMemo(() => {
    return [
      styles.changePercentIcon,
      {
        transform:
          Number(changePct) > 0
            ? [{ rotate: '45deg' }]
            : [{ rotate: '125deg' }],
      },
    ];
  }, [changePct]);

  const changePercentTextStyle = useMemo(() => {
    return [
      styles.changePercentText,
      { color: Number(changePct) > 0 ? colors.lightGreen : colors.red },
    ];
  }, [changePct]);

  return (
    <View style={{ ...containerStyle }}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.figuresContainer}>
        <Text style={styles.figuresCurrencySymbol}>$</Text>
        <Text style={styles.figuresAmount}>
          <AnimateNumber
            value={Number(displayAmount)}
            timing="linear"
            interval={15}
            formatter={(value: number) => value.toLocaleString()}
          />
        </Text>
        <Text style={styles.figuresCurrency}>{messages.usd}</Text>
      </View>
      <View style={styles.changePercentContainer}>
        {Number(changePct) !== 0 && (
          <View style={changePercentIconStyle}>
            <Icon
              name="upArrow"
              width={10}
              height={10}
              color={Number(changePct) > 0 ? colors.lightGreen : colors.red}
            />
          </View>
        )}
        <Text style={changePercentTextStyle}>
          {`${Number(changePct).toFixed(2)}%`}
        </Text>
        <Text style={styles.change7d}>{messages.changes7d}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    ...fonts.h3,
  },
  figuresContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  figuresCurrencySymbol: {
    color: colors.lightGray3,
    ...fonts.h2,
  },
  figuresAmount: {
    color: colors.white,
    marginLeft: sizes.base,
    ...fonts.h2,
  },
  figuresCurrency: {
    color: colors.lightGray3,
    ...fonts.h2,
    marginLeft: 5,
  },
  changePercentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  changePercentIcon: {
    alignSelf: 'center',
  },
  changePercentText: {
    marginLeft: sizes.base,
    alignSelf: 'flex-end',
    ...fonts.h4,
  },
  change7d: {
    marginLeft: sizes.radius,
    alignSelf: 'flex-end',
    color: colors.lightGray3,
    ...fonts.h5,
  },
});
