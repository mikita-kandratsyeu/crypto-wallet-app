import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, sizes, icons } from '../constants';

export interface IMainLayoutProps {
  children: React.ReactNode;
}

export const MainLayoutWrapper: React.FC<IMainLayoutProps> = ({ children }) => {
  return <View style={styles.root}>{children}</View>;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
