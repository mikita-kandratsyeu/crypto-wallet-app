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
  const rootStyle = [styles.root, containerStyle];
  const textStyle = [styles.text, fonts.h3];

  return (
    <TouchableOpacity style={rootStyle} onPress={onPress}>
      <Icon
        name={icon}
        width={styles.icon.width}
        height={styles.icon.height}
        color={colors.black}
      />
      <Text style={textStyle}>{label}</Text>
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
  },
});
