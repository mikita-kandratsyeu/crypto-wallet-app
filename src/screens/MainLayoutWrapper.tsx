import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Animated,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { IconTextButton } from '../components';
import { colors, messages, sizes } from '../constants';
import { setTradeModalVisibility } from '../store/tab/tab.actions';
import { Store } from '../store/types';
import { showAlert } from './services';
import { MainLayoutProps } from './types';

const MainLayoutWrapper: React.FC<MainLayoutProps> = props => {
  const { children, isTradeModalVisible, setTradeModalVisibility } = props;

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
    outputRange: [
      sizes.height,
      sizes.height - (DeviceInfo.hasNotch() ? 280 : 240),
    ],
  });

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" />
      {children}
      {isTradeModalVisible && (
        <Animated.View
          style={[
            styles.modalVisible,
            {
              opacity: modalAnimatedValue,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => setTradeModalVisibility?.(!isTradeModalVisible)}
            style={styles.touchableArea}
          />
        </Animated.View>
      )}
      <Animated.View style={[styles.modal, { top: modalY }]}>
        <IconTextButton
          label={messages.transfer}
          icon="send"
          onPress={showAlert}
        />
        <IconTextButton
          label={messages.withdraw}
          icon="withDraw"
          containerStyle={{
            marginTop: sizes.base,
          }}
          onPress={showAlert}
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
  touchableArea: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
});

const mapStateToProps = (state: Store) => ({
  isTradeModalVisible: state.tabReducer.isTradeModalVisible,
});

const mapDispatchToProps = (dispatch: any) => ({
  setTradeModalVisibility: (isVisible: boolean) =>
    dispatch(setTradeModalVisibility(isVisible)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainLayoutWrapper);
