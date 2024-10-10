import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const RegisterPage = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendOTP = () => {
    if (phoneNumber.trim() !== '') {
      navigation.navigate('OTP', { phoneNumber }); 
    } else {
      alert("Vui lòng nhập số điện thoại!");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <Text style={styles.headerText}>Đăng ký</Text>
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          keyboardType="phone-pad"
          placeholderTextColor="#888"
          value={phoneNumber}
          onChangeText={setPhoneNumber} 
        />
        <TouchableOpacity style={styles.sendOtpButton} onPress={handleSendOTP}>
          <Text style={styles.sendOtpButtonText}>Gửi OTP</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2046A9',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#FFF',
    color: '#000',
  },
  sendOtpButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 25,
    marginTop: 20,
  },
  sendOtpButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 30,
  },
  linkText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default RegisterPage;
