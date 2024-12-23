import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      // Alert.alert('Lỗi', 'Mật khẩu không được để trống!');
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Mật khẩu không được để trống!',
        visibilityTime: 2000,
        autoHide: true,
      });
      return;
    }

    if (newPassword.length < 6) {
      // Alert.alert('Lỗi', 'Mật khẩu mới phải có ít nhất 6 ký tự!');
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Mật khẩu mới phải có ít nhất 6 ký tự!',
        visibilityTime: 2000,
        autoHide: true,
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      // Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp!');
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Mật khẩu xác nhận không khớp!',
        visibilityTime: 2000,
        autoHide: true,
      });
      return;
    }

    if (currentPassword === newPassword) {
      // Alert.alert('Lỗi', 'Mật khẩu mới không được trùng với mật khẩu hiện tại!');
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Mật khẩu mới không được trùng với mật khẩu hiện tại!',
        visibilityTime: 2000,
        autoHide: true,
      });
      return;
    }
    const tokenString = await AsyncStorage.getItem('userToken');
    const token = tokenString ? JSON.parse(tokenString) : null;
    if (!token || !token.raw) { 
      console.log("Token không tồn tại");
      // Alert.alert("Lỗi", "Bạn chưa đăng nhập, vui lòng đăng nhập lại.");
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Bạn chưa đăng nhập, vui lòng đăng nhập lại.',
        visibilityTime: 2000,
        autoHide: true,
      });
      return;
    }
    console.log(token);
    const data = {
      oldPassword: currentPassword,
      newPassword: newPassword,
    };
    console.log(data);
    try {
      const response = await axios.put(
        'https://api.unime.site/UNIME/password',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.raw}`,
          },
        }
      );

      if (response.data.code !== 1000) {
        // Alert.alert('Lỗi', 'Mật khẩu hiện tại không đúng!');
        Toast.show({
          type: 'error',
          text1: 'Lỗi',
          text2: 'Mật khẩu hiện tại không đúng!',
          visibilityTime: 2000,
          autoHide: true,
        });
        return;
      }

      // Alert.alert('Thành công', 'Mật khẩu đã được đổi thành công!');
      Toast.show({
        type: 'success',
        text1: 'Thành công',
        text2: 'Mật khẩu đã được đổi thành công!',
        visibilityTime: 2000,
        autoHide: true,
      });
      resetForm();
    } catch (error) {
      console.error('Error changing password:', error);
      // Alert.alert('Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại sau.');
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Đã xảy ra lỗi, vui lòng thử lại sau.',
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Đổi mật khẩu</Text>

      <View style={styles.inputContainer}>
        <Text>Mật khẩu hiện tại</Text>
        <View style={styles.passwordInput}>
          <TextInput
            style={styles.input}
            secureTextEntry={!showCurrentPassword}
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
            <Ionicons name={showCurrentPassword ? "eye" : "eye-off"} size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text>Mật khẩu mới</Text>
        <View style={styles.passwordInput}>
          <TextInput
            style={styles.input}
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
            <Ionicons name={showNewPassword ? "eye" : "eye-off"} size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text>Xác nhận mật khẩu</Text>
        <View style={styles.passwordInput}>
          <TextInput
            style={styles.input}
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons name={showConfirmPassword ? "eye" : "eye-off"} size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Xong</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F4FF',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: 10,
  },
  button: {
    backgroundColor: '#4B77BE',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
