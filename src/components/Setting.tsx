import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from '.';
import { colors, fonts, sizes } from '../constants';
import { SettingProps } from './types';

export const Setting: React.FC<SettingProps> = props => {
  const {
    title,
    value = '',
    switchValue = false,
    type,
    onPress,
    onSwitchValueChange,
  } = props;

  if (type === 'button') {
    return (
      <TouchableOpacity style={styles.root} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.value}>
          <Text
            style={{
              marginRight: sizes.radius,
              color: colors.lightGray3,
              ...fonts.h3,
            }}
          >
            {value}
          </Text>
          <Icon name="RightArrow" color={colors.white} />
        </View>
      </TouchableOpacity>
    );
  }

  if (type === 'switch') {
    return (
      <View style={styles.root}>
        <Text style={styles.title}>{title}</Text>
        <Switch value={switchValue} onValueChange={onSwitchValueChange} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.value}>
        <Text
          style={{
            marginRight: sizes.radius,
            color: colors.lightGray3,
            ...fonts.h3,
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  title: {
    flex: 1,
    color: colors.white,
    ...fonts.h3,
  },
  value: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
