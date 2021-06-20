import React, { useMemo } from 'react';

import { StyleSheet, View, Text, Image } from 'react-native';

import { fonts, colors } from '../constants';

export interface ITabIconProps {
  focused: boolean;
  icon: any;
  iconStyleProp?: any;
  label: string;
  isTrade?: boolean;
}

export const TabIcon: React.FC<ITabIconProps> = ({
  focused,
  icon,
  iconStyleProp,
  label,
  isTrade,
}) => {
  const iconStyle = useMemo(() => {
    return [
      styles.icon,
      { tintColor: focused ? colors.white : colors.secondary },
      iconStyleProp,
    ];
  }, [focused]);

  const iconTradeStyle = [
    styles.icon,
    { tintColor: colors.white },
    iconStyleProp,
  ];

  const textStyle = useMemo(() => {
    return [{ color: focused ? colors.white : colors.secondary }, fonts.h4];
  }, [focused]);

  const textTradeStyle = [{ color: colors.white }, fonts.h4];

  const tradeContainerStyle = [styles.root, styles.tradeContainer];

  return isTrade ? (
    <View style={tradeContainerStyle}>
      <Image source={icon} resizeMode="contain" style={iconTradeStyle} />
      <Text style={textTradeStyle}>{label}</Text>
    </View>
  ) : (
    <View style={styles.root}>
      <Image source={icon} resizeMode="contain" style={iconStyle} />
      <Text style={textStyle}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tradeContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.black,
  },
  icon: {
    width: 25,
    height: 25,
  },
});
