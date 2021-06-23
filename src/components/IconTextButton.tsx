import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from '.';
import { colors, fonts, sizes } from '../constants';
import { iconTypes } from '../types';

export interface IIconTextButtonProps {
  label: string;
  icon: iconTypes;
  containerStyle?: any;
  onPress: () => void;
}

export const IconTextButton: React.FC<IIconTextButtonProps> = ({
  label,
  icon,
  containerStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity style={[styles.root, containerStyle]} onPress={onPress}>
      <Icon
        name={icon}
        width={styles.icon.width}
        height={styles.icon.height}
        color={colors.black}
      />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
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
