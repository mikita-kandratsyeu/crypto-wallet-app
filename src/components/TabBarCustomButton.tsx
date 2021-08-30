import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { TabBarCustomButtonProps } from './types';

export const TabBarCustomButton: React.FC<TabBarCustomButtonProps> = props => {
  const { children, onPress } = props;

  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
