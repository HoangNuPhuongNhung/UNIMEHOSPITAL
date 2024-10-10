// App.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
// import { useFonts, Poppins_700Bold, Poppins_400Regular, Poppins_600SemiBold, Poppins_500Medium } from '@expo-google-fonts/poppins';
// import AppLoading from 'expo-app-loading'; 
import { NavigationContainer } from '@react-navigation/native';
// import Stack from './src/navigations/Stack';
import StartPage from './src/screens/StartPage';
import LoginPage from './src/screens/LoginPage';
import RegisterPage from './src/screens/RegisterPage';
import BottomTab from './src/navigations/BottomTab';


import { createStackNavigator } from '@react-navigation/stack';

const StackNavigator= createStackNavigator();

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   Poppins_400Regular,
  //   Poppins_600SemiBold,
  //   Poppins_700Bold,
  //   Poppins_500Medium,
  // });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  return (
    <NavigationContainer>
      {/* <Stack /> */}
      <StackNavigator.Navigator initialRouteName="Start">
        <StackNavigator.Screen name="Start" component={StartPage} options={{ headerShown: false }} />        
        <StackNavigator.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <StackNavigator.Screen name="Register" component={RegisterPage} options={{ headerShown: false }} />
        <StackNavigator.Screen name="bottom tab" component={BottomTab} options={{ headerShown: false }}/>
      </StackNavigator.Navigator>
    </NavigationContainer>
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
