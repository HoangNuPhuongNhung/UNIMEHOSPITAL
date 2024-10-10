import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';

const CreatePasswordPage = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validatePassword = (password) => {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return 'Mật khẩu phải chứa ít nhất 6 ký tự.';
    } else if (!hasUpperCase) {
      return 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa.';
    } else if (!hasLowerCase) {
      return 'Mật khẩu phải chứa ít nhất một chữ cái viết thường.';
    } else if (!hasNumber) {
      return 'Mật khẩu phải chứa ít nhất một chữ số.';
    } else if (!hasSpecialChar) {
      return 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt.';
    }

    return null;
  };

  const handleSubmit = () => {
    const passwordError = validatePassword(password);

    if (passwordError) {
      Alert.alert('Lỗi mật khẩu', passwordError);
    } else if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu không khớp!');
    } else {
      console.log("Mật khẩu đã được tạo");
      navigation.navigate('Login'); 
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <Text style={styles.headerText}>Tạo mật khẩu</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu"
          secureTextEntry={true}
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập lại mật khẩu"
          secureTextEntry={true}
          placeholderTextColor="#888"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
          <Text style={styles.nextButtonText}>Tiếp tục</Text>
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
  
  nextButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 25,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreatePasswordPage;
