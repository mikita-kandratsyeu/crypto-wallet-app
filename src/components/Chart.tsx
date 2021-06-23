import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartXLabel,
  ChartYLabel,
  monotoneCubicInterpolation,
  // @ts-ignore
} from '@rainbow-me/animated-charts';
import moment from 'moment';
import { colors, fonts, sizes } from '../constants';

export interface IChartProps {
  containerStyle?: any;
  chartPrices: any[];
}

export const Chart: React.FC<IChartProps> = ({
  chartPrices,
  containerStyle,
}) => {
  const startUnixTimestamp = moment().subtract(7, 'day').unix();

  const data = chartPrices
    ? chartPrices?.map((item: any, idx: number) => {
        return {
          x: startUnixTimestamp + (idx + 1) * 3600,
          y: item,
        };
      })
    : [];

  const points = monotoneCubicInterpolation({ data, range: 40 });

  const formatUSD = (value: string): string => {
    'worklet';

    if (value === '') {
      return '';
    }

    return `$ ${Number(value).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDateTime = (value: string): string => {
    'worklet';

    if (value === '') {
      return '';
    }

    const selectedDate = new Date(Number(value) * 1000);

    const date = `0${selectedDate.getDate()}`.slice(-2);
    const month = `0${selectedDate.getMonth() + 1}`.slice(-2);

    return `${date} / ${month}`;
  };

  const formatNumber = (value: number, roundingPoint: number): string => {
    if (value > 1e9) {
      return `${(value / 1e9).toFixed(roundingPoint)}B`;
    }

    if (value > 1e6) {
      return `${(value / 1e6).toFixed(roundingPoint)}M`;
    }

    if (value > 1e3) {
      return `${(value / 1e3).toFixed(roundingPoint)}K`;
    }

    return value.toFixed(roundingPoint);
  };

  const getYAxisLabelValues = (): string[] => {
    if (chartPrices !== undefined) {
      const minValue = Math.min(...chartPrices);
      const maxValue = Math.max(...chartPrices);
      const midValue = (minValue + maxValue) / 2;

      const higherMidValue = (maxValue + midValue) / 2;
      const lowerMidValue = (minValue + midValue) / 2;

      const roundingPoint = 2;

      return [
        formatNumber(maxValue, roundingPoint),
        formatNumber(higherMidValue, roundingPoint),
        formatNumber(lowerMidValue, roundingPoint),
        formatNumber(minValue, roundingPoint),
      ];
    }

    return [];
  };

  return (
    <View style={{ ...containerStyle }}>
      <View style={styles.yAxisContainer}>
        {getYAxisLabelValues().map((item: string) => (
          <Text key={item} style={styles.yAxisItem}>
            {item}
          </Text>
        ))}
      </View>
      {data.length > 0 && (
        <ChartPathProvider data={{ points, smoothingStrategy: 'bezier' }}>
          <ChartPath
            height={150}
            width={sizes.width}
            stroke={colors.lightGreen}
            strokeWidth={2}
          />
          <ChartDot>
            <View style={styles.chartDotContainer}>
              <View style={styles.chartDot}>
                <View style={styles.chartDotInternal} />
              </View>
              <ChartYLabel style={styles.chartYLabel} format={formatUSD} />
              <ChartXLabel style={styles.chartXLabel} format={formatDateTime} />
            </View>
          </ChartDot>
        </ChartPathProvider>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chartDotContainer: {
    position: 'absolute',
    left: -35,
    width: 80,
    alignItems: 'center',
    backgroundColor: colors.transparentBlack,
  },
  yAxisContainer: {
    position: 'absolute',
    left: sizes.padding,
    top: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  yAxisItem: {
    color: colors.lightGray3,
    ...fonts.body4,
  },
  chartDot: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: colors.white,
  },
  chartDotInternal: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: colors.lightGreen,
  },
  chartYLabel: {
    color: colors.white,
    ...fonts.body5,
  },
  chartXLabel: {
    marginTop: 3,
    color: colors.lightGray3,
    ...fonts.body5,
    lineHeight: 15,
  },
});
