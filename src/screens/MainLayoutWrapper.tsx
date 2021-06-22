import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, SafeAreaView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { IconTextButton } from '../components';
import { colors, messages, sizes } from '../constants';
import { IStore } from '../types';

export interface IMainLayoutProps {
  children: React.ReactNode;
  isTradeModalVisible?: boolean;
}

const MainLayoutWrapper: React.FC<IMainLayoutProps> = ({
  children,
  isTradeModalVisible,
}) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isTradeModalVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  }, [isTradeModalVisible]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [sizes.height, sizes.height - 280],
  });

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" />
      {children}
      {isTradeModalVisible && (
        <Animated.View
          style={[styles.modalVisible, { opacity: modalAnimatedValue }]}
        />
      )}

      <Animated.View style={[styles.modal, { top: modalY }]}>
        <IconTextButton
          label={messages.transfer}
          icon="send"
          onPress={() => console.log('Transfer')}
        />
        <IconTextButton
          label={messages.withdraw}
          icon="withdraw"
          containerStyle={{
            marginTop: sizes.base,
          }}
          onPress={() => console.log('Withdraw')}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.black,
  },
  modal: {
    position: 'absolute',
    left: 0,
    width: '100%',
    padding: sizes.padding,
    backgroundColor: colors.primary,
  },

  modalVisible: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.transparentBlack,
  },
});

const mapStateToProps = (state: IStore) => ({
  isTradeModalVisible: state.tabReducer.isTradeModalVisible,
});

export default connect(mapStateToProps, null)(MainLayoutWrapper);
