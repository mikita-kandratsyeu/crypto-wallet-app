import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, sizes } from '../constants';
import { SectionTitleProps } from './types';

export const SectionTitle: React.FC<SectionTitleProps> = props => {
  const { title } = props;

  return (
    <View style={styles.root}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: sizes.padding,
  },
  text: {
    color: colors.lightGray3,
    ...fonts.h4,
  },
});
