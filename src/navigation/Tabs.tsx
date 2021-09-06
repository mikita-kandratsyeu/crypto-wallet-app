import React, { useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { setTradeModalVisibility } from '../store/tab/tab.actions';
import { Home, Portfolio, Market, Profile, Trade } from '../screens';
import { TabBarCustomButton, TabIcon } from '../components';
import { colors, messages, stackRoutes } from '../constants';
import { Store } from '../store/types';
import { TabsProps } from './types';

const Tab = createBottomTabNavigator();

const Tabs: React.FC<TabsProps> = props => {
  const { isTradeModalVisible, setTradeModalVisibility } = props;

  const tradeIcon = useMemo(() => {
    return isTradeModalVisible ? 'close' : 'trade';
  }, [isTradeModalVisible]);

  const tradeTabButtonHandler = () => {
    setTradeModalVisibility(!isTradeModalVisible);
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: styles.root,
      }}
    >
      <Tab.Screen
        name={stackRoutes.Home}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) =>
            !isTradeModalVisible && (
              <TabIcon focused={focused} icon="home" label={messages.home} />
            ),
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name={stackRoutes.Portfolio}
        component={Portfolio}
        options={{
          tabBarIcon: ({ focused }) =>
            !isTradeModalVisible && (
              <TabIcon
                focused={focused}
                icon="briefcase"
                label={messages.portfolio}
              />
            ),
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name={stackRoutes.Trade}
        component={Trade}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={tradeIcon}
              label={messages.trade}
              isTrade
            />
          ),
          tabBarButton: props => (
            <TabBarCustomButton {...props} onPress={tradeTabButtonHandler} />
          ),
        }}
      />
      <Tab.Screen
        name={stackRoutes.Market}
        component={Market}
        options={{
          tabBarIcon: ({ focused }) =>
            !isTradeModalVisible && (
              <TabIcon
                focused={focused}
                icon="market"
                label={messages.market}
              />
            ),
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name={stackRoutes.Profile}
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
            !isTradeModalVisible && (
              <TabIcon
                focused={focused}
                icon="profile"
                label={messages.profile}
              />
            ),
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  root: {
    height: DeviceInfo.hasNotch() ? 130 : 90,
    backgroundColor: colors.primary,
    borderTopColor: 'transparent',
  },
});

const mapStateToProps = (state: Store) => ({
  isTradeModalVisible: state.tabReducer.isTradeModalVisible,
});

const mapDispatchToProps = (dispatch: any) => ({
  setTradeModalVisibility: (isVisible: boolean) =>
    dispatch(setTradeModalVisibility(isVisible)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
