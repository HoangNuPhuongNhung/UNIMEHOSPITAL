// App.js
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast, { BaseToast, ToastProps } from 'react-native-toast-message';
import { AuthProvider } from './src/contexts/AuthContext';
import { UserProvider } from './src/contexts/UserContext';
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
import UserInfoPage from './src/screens/UserInfoPage';
import ForgotPwPage from './src/screens/ForgotPasswordPage';
import DoctorByServicePage from './src/screens/DoctorByServicePage';
const StackNavigator = createStackNavigator();

const toastConfig = {
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'green',
        width: '90%',  // Tăng độ rộng
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: 16,   // Tăng kích thước chữ tiêu đề
        fontWeight: 'bold'
      }}
      text2Style={{
        fontSize: 14    // Tăng kích thước chữ nội dung
      }}
    />
  ),
  error: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'red',
        width: '90%',   // Tăng độ rộng
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: 16,   // Tăng kích thước chữ tiêu đề
        fontWeight: 'bold'
      }}
      text2Style={{
        fontSize: 16    // Tăng kích thước chữ nội dung
      }}
    />
  ),
  info: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#1E90FF',  // Màu xanh dương
        width: '90%',
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold'
      }}
      text2Style={{
        fontSize: 14
      }}
    />
  ),
  warning: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#FFA500',  // Màu cam
        width: '90%',
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold'
      }}
      text2Style={{
        fontSize: 14
      }}
    />
  ),
};
  
export default function App() {
  return (
    <UserProvider>
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
            <StackNavigator.Screen name="DoctorDetailPage" component={DoctorDetailPage} options={{ title: 'Thông tin bác sĩ' }} />
            <StackNavigator.Screen name="book doctor" component={BookDoctorAppointment} options={{ title: 'Đặt lịch khám' }} />
            <StackNavigator.Screen name="appointment success" component={AppointmentSuccessPage} options={{ title: 'Đặt lịch khám' }} />
            <StackNavigator.Screen name="UserInfo" component={UserInfoPage} options={{ title: 'Thông tin cá nhân' }} />
            <StackNavigator.Screen name="ForgotPw" component={ForgotPwPage} options={{ headerShown: false }} />
            <StackNavigator.Screen name="DoctorByServicePage" component={DoctorByServicePage} options={{ title: 'Danh sách bác sĩ' }} />
          </StackNavigator.Navigator>
        </NavigationContainer>
        <Toast config={toastConfig}/>
      </AuthProvider>
    </UserProvider>
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
