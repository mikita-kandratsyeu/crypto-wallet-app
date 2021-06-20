import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './store/root-reducer';
import { Tabs } from './navigation';
import { StackRoutes } from './constants';

const Stack = createStackNavigator();

const middleware =
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunk)
    : composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducer, middleware);

export const App: React.FC = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};
