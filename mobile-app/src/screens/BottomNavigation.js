import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomePage from './HomePage';
import SearchPage from './SearchPage';
import ServicePage from './ServicePage';
import ProfilePage from '.ProfilePage';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Search') {
            iconName = 'magnify';
          } else if (route.name === 'Service') {
            iconName = 'hand-heart-outline';
          } else if (route.name === 'Profile') {
            iconName = 'account-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4D9DE0',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomePage} options={{ tabBarLabel: 'Trang chủ' }} />
      <Tab.Screen name="Search" component={SearchPage} options={{ tabBarLabel: 'Tìm kiếm' }} />
      <Tab.Screen name="Service" component={ServicePage} options={{ tabBarLabel: 'Dịch vụ' }} />
      <Tab.Screen name="Profile" component={ProfilePage} options={{ tabBarLabel: 'Hồ sơ' }} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
