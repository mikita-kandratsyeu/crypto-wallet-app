import React from 'react';
import { StyleSheet, View } from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
