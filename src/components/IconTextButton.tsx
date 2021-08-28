import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { Icon } from '.';
import { colors, fonts, sizes } from '../constants';
import { IconTextButtonProps } from './types';

export const IconTextButton: React.FC<IconTextButtonProps> = props => {
  const { label, icon, containerStyle, onPress } = props;

  return (
    <TouchableHighlight
      style={[styles.root, containerStyle]}
      underlayColor={colors.lightGray5}
      onPress={onPress}
    >
      <>
        <Icon
          name={icon}
          width={styles.icon.width}
          height={styles.icon.height}
          color={colors.black}
        />
        <Text style={styles.text}>{label}</Text>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: sizes.radius,
    backgroundColor: colors.white,
  },
  icon: {
    width: 20,
    height: 20,
  },
  text: {
    marginLeft: sizes.base,
    ...fonts.h3,
  },
});
