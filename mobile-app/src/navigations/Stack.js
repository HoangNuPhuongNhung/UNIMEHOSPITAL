import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import WebViewScreen from '../screens/WebViewScreen';

const StackNavigator = createNativeStackNavigator();

export default function Stack() {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <StackNavigator.Screen name="bottom tab" component={BottomTab} />
      <StackNavigator.Screen 
        name="WebView" 
        component={WebViewScreen}
        options={{
          headerShown: true,
          title: 'Bài viết',
        }}
      />
    </StackNavigator.Navigator>
  );
}
