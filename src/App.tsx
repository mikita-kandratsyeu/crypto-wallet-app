import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Tabs } from './navigation';
import { StackRoutes } from './constants';

const Stack = createStackNavigator();

export const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={StackRoutes.MainLayout}
      >
        <Stack.Screen name={StackRoutes.MainLayout} component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
