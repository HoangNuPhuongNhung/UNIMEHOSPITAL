import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { sendOtp } from '../services/otpService';
const RegisterPage = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleSendOTP = async () => {
    if (email.trim() !== '') {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { // Kiểm tra định dạng email
        try {
          const data = await sendOtp(email); // Gọi API từ otpService.js
          if (data.code === 1000) {
            navigation.navigate('OTP', { email, otp: data.result }); // Chuyển sang OTPPage
          } else {
            alert('Gửi OTP thất bại. Vui lòng thử lại!');
          }
        } catch (error) {
          alert('Có lỗi xảy ra khi gửi OTP. Vui lòng kiểm tra lại!');
        }
      } else {
        alert('Vui lòng nhập đúng định dạng email!');
      }
    } else {
      alert('Vui lòng nhập email!');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#2046A9" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Đăng ký</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address" 
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail} 
          autoCapitalize="none" // Tắt viết hoa tự động
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
  },
});

export default RegisterPage;
