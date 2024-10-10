import { View, Text, StyleSheet, Platform } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../screens/HomePage';
import SearchPage from '../screens/SearchPage';
import AppointmentPage from '../screens/AppointmentPage';
import ProfilePage from '../screens/ProfilePage';
import { AntDesign } from '@expo/vector-icons';

const BottomTabNavigator = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <BottomTabNavigator.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.label,
        tabBarStyle: styles.tabContainer,
        tabBarItemStyle: {
          marginBottom: 7,
        },
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: '#0071ff',
      }}
      safeAreaInsets={{
        bottom: 0,
      }}
    >
      <BottomTabNavigator.Screen
        name="Trang chủ"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={22}
              color={focused ? '#0071ff' : 'gray'}
            />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Tìm kiếm"
        component={SearchPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="search1"
              size={21}
              color={focused ? '#0071ff' : 'gray'}
            />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Đặt lịch"
        component={AppointmentPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="table"
              size={22}
              color={focused ? '#0071ff' : 'gray'}
            />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Hồ sơ"
        component={ProfilePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={22}
              color={focused ? '#0071ff' : 'gray'}
            />
          ),
        }}
      />
    </BottomTabNavigator.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    width: '90%',
    borderRadius: 12,
    left: '5%',
    bottom: 20,
    backgroundColor: 'white',
    height: 60,
  },
  label: {
    textTransform: 'capitalize',
    fontSize: 12,
  },
});
