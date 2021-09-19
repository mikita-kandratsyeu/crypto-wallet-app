import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors, fonts, sizes } from '../constants';
import { TextButtonProps } from './types';

export const TextButton: React.FC<TextButtonProps> = props => {
  const { label, onPress, containerStyle } = props;

  return (
    <TouchableOpacity style={[styles.root, containerStyle]} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    paddingHorizontal: 18,
    borderRadius: sizes.radius,
    backgroundColor: colors.gray1,
  },
  text: {
    color: colors.white,
    ...fonts.h3,
  },
});
