import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors, constants, fonts, sizes } from '../constants';
import { MarketTab } from '../constants/constants';
import { SwitcherProps, TabIndicatorProps } from './types';

export const marketTabs: MarketTab[] = constants.marketTabs.map(tab => ({
  ...tab,
  ref: React.createRef(),
}));

const TabIndicator: React.FC<TabIndicatorProps> = props => {
  const { scrollX, measureLayout } = props;

  const inputRange = marketTabs.map((_, index) => index * sizes.width);
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(measure => measure.x),
  });

  return (
    <Animated.View
      style={[
        styles.tabIndicator,
        {
          transform: [
            {
              translateX,
            },
          ],
        },
      ]}
    />
  );
};

export const Switcher: React.FC<SwitcherProps> = props => {
  const { scrollX, onPress } = props;

  const [measureLayout, setMeasureLayout] = useState<any[]>([]);
  const containerRef = useRef<any>();

  useEffect(() => {
    const ml: any[] = [];

    marketTabs.forEach(tab => {
      tab?.ref?.current?.measureLayout(
        containerRef.current,
        (x: number, y: number, width: number, height: number) => {
          ml.push({
            x,
            y,
            width,
            height,
          });

          if (ml.length === marketTabs.length) {
            setMeasureLayout(ml);
          }
        },
      );
    });
  }, [containerRef.current]);

  return (
    <View ref={containerRef} style={styles.root}>
      {measureLayout.length > 0 && (
        <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
      )}
      {marketTabs.map((tab, index) => (
        <TouchableOpacity key={tab.id} onPress={() => onPress(index)}>
          <View ref={tab.ref} style={styles.tab}>
            <Text style={styles.text}>{tab.title}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: (sizes.width - sizes.radius * 2) / 2,
  },
  text: {
    color: colors.white,
    ...fonts.h3,
  },
  tabIndicator: {
    position: 'absolute',
    left: 0,
    height: '100%',
    width: (sizes.width - sizes.radius * 2) / 2,
    borderRadius: sizes.radius,
    backgroundColor: colors.lightGray,
  },
});
