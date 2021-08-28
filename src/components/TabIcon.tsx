import React, { useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from '.';
import { fonts, colors } from '../constants';
import { TabIconProps } from './types';

export const TabIcon: React.FC<TabIconProps> = props => {
  const { focused, icon, label, isTrade } = props;

  const iconColor = useMemo(() => {
    return focused ? colors.white : colors.secondary;
  }, [focused]);

  const textStyle = useMemo(() => {
    return [
      { color: focused ? colors.white : colors.secondary },
      fonts.h4,
      styles.text,
    ];
  }, [focused]);

  return isTrade ? (
    <View style={[styles.root, styles.tradeContainer]}>
      <Icon
        name={icon}
        width={styles.icon.width}
        height={styles.icon.height}
        color={colors.white}
      />
      <Text style={styles.text}>{label}</Text>
    </View>
  ) : (
    <View style={styles.root}>
      <Icon
        name={icon}
        width={styles.icon.width}
        height={styles.icon.height}
        color={iconColor}
      />
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
    width: 15,
    height: 15,
  },
  text: {
    marginTop: 5,
    ...fonts.h4,
    color: colors.white,
  },
});
