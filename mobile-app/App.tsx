// App.js
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext'; 
import StartPage from './src/screens/StartPage';
import LoginPage from './src/screens/LoginPage';
import RegisterPage from './src/screens/RegisterPage';
import OTPPage from './src/screens/OTPPage';
import CreatePasswordPage from './src/screens/CreatePasswordPage';

import ChangePasswordPage from './src/screens/ChangePasswordPage';

import DoctorDetailPage from './src/screens/DoctorDetailPage';
import BookDoctorAppointment from './src/screens/BookDoctorAppointment';
import AppointmentSuccessPage from './src/screens/AppointmentSuccessPage';

import BottomTab from './src/navigations/BottomTab';
import { createStackNavigator } from '@react-navigation/stack';

const StackNavigator = createStackNavigator();

export default function App() {
  return (
    <AuthProvider> 
      <NavigationContainer>
        <StackNavigator.Navigator initialRouteName="bottom Tab">
          <StackNavigator.Screen name="Start" component={StartPage} options={{ headerShown: false }} />
          <StackNavigator.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
          <StackNavigator.Screen name="Register" component={RegisterPage} options={{ headerShown: false }} />
          <StackNavigator.Screen name="OTP" component={OTPPage} options={{ headerShown: false }} />
          <StackNavigator.Screen name="CreatePassword" component={CreatePasswordPage} options={{ headerShown: false }} />
          <StackNavigator.Screen name="bottom tab" component={BottomTab} options={{ headerShown: false }} />
          <StackNavigator.Screen name="change password" component={ChangePasswordPage} options={{ title: 'Hồ sơ' }} />
          <StackNavigator.Screen name="DoctorDetailPage" component={DoctorDetailPage} options={{ title: 'Danh sách bác sĩ' }} />
          <StackNavigator.Screen name="book doctor" component={BookDoctorAppointment} options={{ title: 'Thông tin bác sĩ' }} />
          <StackNavigator.Screen name="appointment success" component={AppointmentSuccessPage} options={{ title: 'Đặt lịch' }} />
        </StackNavigator.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins_400Regular',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
