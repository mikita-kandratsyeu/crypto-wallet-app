import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Portfolio, Market, Profile, Trade } from '../screens';
import { TabBarCustomButton, TabIcon } from '../components';
import { colors, icons, StackRoutes } from '../constants';

const Tab = createBottomTabNavigator();

export const Tabs: React.FC = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          height: 140,
          backgroundColor: colors.primary,
          borderTopColor: 'transparent',
        },
      }}
    >
      <Tab.Screen
        name={StackRoutes.Home}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.home}
              label={StackRoutes.Home}
            />
          ),
        }}
      />
      <Tab.Screen
        name={StackRoutes.Portfolio}
        component={Portfolio}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.briefcase}
              label={StackRoutes.Portfolio}
            />
          ),
        }}
      />
      <Tab.Screen
        name={StackRoutes.Trade}
        component={Trade}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.trade}
              label={StackRoutes.Trade}
              isTrade
            />
          ),
          tabBarButton: props => (
            <TabBarCustomButton
              {...props}
              onPress={() => console.log('Trade button was pressed')}
            />
          ),
        }}
      />
      <Tab.Screen
        name={StackRoutes.Market}
        component={Market}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.market}
              label={StackRoutes.Market}
            />
          ),
        }}
      />
      <Tab.Screen
        name={StackRoutes.Profile}
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={icons.profile}
              label={StackRoutes.Profile}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
