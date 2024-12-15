import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthScreen from '../screens/AuthScreen/AuthScreen';
import TransactionsHistory from '../screens/TramsactionsHistory/TransactionsHistory';
import TransactionDetails from '../screens/TransactionDetails/TransactionDetails';
import { RootStackParamList } from '../types/types';

const Stack = createStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthScreen">
        <Stack.Screen
          name="AuthScreen"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TransactionsHistory"
          component={TransactionsHistory}
          options={{ title: 'Transaction', headerLeft: () => null }}
        />
        <Stack.Screen
          name="TransactionDetails"
          component={TransactionDetails}
          options={{ title: '', headerBackTitle: '' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
