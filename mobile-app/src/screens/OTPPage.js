import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const OTPPage = ({ route, navigation }) => {
  const { email, otp } = route.params; // Lấy email và mã OTP từ RegisterPage
  const [userInputOtp, setUserInputOtp] = useState(['', '', '', '']); // Khởi tạo userInputOtp
  const otpRefs = useRef([]);
  const [isResending, setIsResending] = useState(false);

  const handleChange = (text, index) => {
    const newOtp = [...userInputOtp];
    newOtp[index] = text;
    setUserInputOtp(newOtp);

    if (text && index < 3) {
      otpRefs.current[index + 1].focus(); // Chuyển đến ô tiếp theo
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && userInputOtp[index] === '' && index > 0) {
      otpRefs.current[index - 1].focus(); // Quay lại ô trước nếu người dùng xóa
    }
  };

  // const handleResendOtp = async () => {
  //   setIsResending(true);
  //   try {
  //     const response = await axios.post('https://api.unime.site/UNIME/sendOtp', { email });
  //     if (response.data.code === 1000) {
  //       setOtp(response.data.result); // Cập nhật mã OTP mới
  //       Alert.alert('Thành công', 'OTP mới đã được gửi đến email của bạn.');
  //     } else {
  //       Alert.alert('Lỗi', 'Không thể gửi lại OTP. Vui lòng thử lại sau.');
  //     }
  //   } catch (error) {
  //     Alert.alert('Lỗi', 'Đã xảy ra lỗi khi gửi lại OTP.');
  //   } finally {
  //     setIsResending(false);
  //   }
  // };

  const handleSubmit = () => {
    const enteredOtp = userInputOtp.join(''); // Ghép các ký tự lại thành chuỗi
    if (enteredOtp === otp) {
      navigation.navigate('CreatePassword', { email: route.params.email });
    } else {
      alert('Mã OTP không đúng. Vui lòng kiểm tra lại!');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <Text style={styles.headerText}>Xác thực OTP</Text>
        <Text style={styles.instructionText}>
          Nhập mã xác thực đã được gửi đến email {email}
        </Text>
        <View style={styles.otpContainer}>
          {userInputOtp.map((value, index) => (
            <TextInput
              key={index}
              ref={(ref) => (otpRefs.current[index] = ref)}
              style={styles.otpInput}
              value={value}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
            />
          ))}
        </View>
        {/* <TouchableOpacity
          style={styles.resendOtpButton}
          onPress={handleResendOtp}
          disabled={isResending} // Vô hiệu hóa khi đang gửi lại
        >
          <Text style={styles.linkText}>
            {isResending ? 'Đang gửi lại OTP...' : 'Không nhận được OTP? Gửi lại'}
          </Text>
        </TouchableOpacity> */}
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
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 65,
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
