import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const OTPPage = ({ route, navigation }) => {
    const { phoneNumber } = route.params;
    const [otp, setOtp] = useState(['', '', '', '']); 
    const otpRefs = useRef([]);

    const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      otpRefs.current[index + 1].focus();
    }
    };

     const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpRefs.current[index - 1].focus();
    }
    };

    const handleSubmit = () => {
    console.log("OTP:", otp.join('')); 
    navigation.navigate('CreatePassword'); 
    };

    return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/background.png')} 
        style={styles.background}
        resizeMode="cover"
      >
        <Text style={styles.headerText}>Xác thực OTP</Text>
        <Text style={styles.instructionText}>Nhập mã xác thực đã được gửi đến số {phoneNumber}</Text>
        <View style={styles.otpContainer}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              ref={(ref) => otpRefs.current[index] = ref}
              style={styles.otpInput}
              value={value}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.resendOtpButton}>
          <Text style={styles.linkText}>Không nhận được OTP? Gửi lại</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
          <Text style={styles.confirmButtonText}>Xác nhận</Text>
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
    color: '#FFF',
  },
  instructionText: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#FFF',
    color: '#000',
  },
  resendOtpButton: {
    marginBottom: 30,
  },
  linkText: {
    color: '#000000',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 25,
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OTPPage;
