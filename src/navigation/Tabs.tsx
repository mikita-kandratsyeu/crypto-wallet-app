import React, { useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { setTradeModalVisibility } from '../store/tab/tab.actions';
import { Home, Portfolio, Market, Profile, Trade } from '../screens';
import { TabBarCustomButton, TabIcon } from '../components';
import { colors, StackRoutes } from '../constants';
import { IStore } from '../types';

export interface ITabsProps {
  isTradeModalVisible: boolean;
  setTradeModalVisibility: (isVisible: boolean) => any;
}

const Tab = createBottomTabNavigator();

const Tabs: React.FC<ITabsProps> = ({
  isTradeModalVisible,
  setTradeModalVisibility,
}) => {
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
        name={StackRoutes.Home}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) =>
            !isTradeModalVisible && (
              <TabIcon focused={focused} icon="home" label={StackRoutes.Home} />
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
        name={StackRoutes.Portfolio}
        component={Portfolio}
        options={{
          tabBarIcon: ({ focused }) =>
            !isTradeModalVisible && (
              <TabIcon
                focused={focused}
                icon="briefcase"
                label={StackRoutes.Portfolio}
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
        name={StackRoutes.Trade}
        component={Trade}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={tradeIcon}
              label={StackRoutes.Trade}
              isTrade
            />
          ),
          tabBarButton: props => (
            <TabBarCustomButton {...props} onPress={tradeTabButtonHandler} />
          ),
        }}
      />
      <Tab.Screen
        name={StackRoutes.Market}
        component={Market}
        options={{
          tabBarIcon: ({ focused }) =>
            !isTradeModalVisible && (
              <TabIcon
                focused={focused}
                icon="market"
                label={StackRoutes.Market}
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
        name={StackRoutes.Profile}
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
            !isTradeModalVisible && (
              <TabIcon
                focused={focused}
                icon="profile"
                label={StackRoutes.Profile}
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
    height: 140,
    backgroundColor: colors.primary,
    borderTopColor: 'transparent',
  },
});

const mapStateToProps = (state: IStore) => ({
  isTradeModalVisible: state.tabReducer.isTradeModalVisible,
});

const mapDispatchToProps = (dispatch: any) => ({
  setTradeModalVisibility: (isVisible: boolean) =>
    dispatch(setTradeModalVisibility(isVisible)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
