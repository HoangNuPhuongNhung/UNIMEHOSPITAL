import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab';

const StackNavigator = createNativeStackNavigator();
export default function Stack() {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNavigator.Screen name="bottom tab" component={BottomTab} />
    </StackNavigator.Navigator>
  );
}
