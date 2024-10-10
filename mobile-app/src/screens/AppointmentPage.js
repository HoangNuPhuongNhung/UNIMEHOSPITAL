import * as React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';



const AppointmentPage = () => {
  return (
    <ImageBackground
      source={require('../../assets/background.png')} 
      style={styles.background}
      resizeMode=""
    >
      <View style={styles.container}>
        <Text>Đặt lịch hẹn</Text>
      </View>
    </ImageBackground>
  );
  
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  background: {
    flex: 1,
    resizeMode: 'cover', 
  },
});
export default AppointmentPage;
