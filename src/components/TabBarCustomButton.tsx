import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export interface ITabBarCustomButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}

export const TabBarCustomButton: React.FC<ITabBarCustomButtonProps> = ({
  children,
  onPress,
}) => (
  <TouchableOpacity style={styles.root} onPress={onPress}>
    {children}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
