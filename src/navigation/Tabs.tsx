import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Portfolio, Market, Profile, Trade } from '../screens';
import { COLORS, StackRoutes } from '../constants';

const Tab = createBottomTabNavigator();

export const Tabs: React.FC = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: COLORS.primary,
          borderTopColor: 'transparent',
        },
      }}
    >
      <Tab.Screen name={StackRoutes.Home} component={Home} />
      <Tab.Screen name={StackRoutes.Portfolio} component={Portfolio} />
      <Tab.Screen name={StackRoutes.Trade} component={Trade} />
      <Tab.Screen name={StackRoutes.Market} component={Market} />
      <Tab.Screen name={StackRoutes.Profile} component={Profile} />
    </Tab.Navigator>
  );
};
