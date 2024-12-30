import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { sendOtp } from '../services/otpService';
import LoginPage from './LoginPage';
import axios from 'axios';
import Toast from 'react-native-toast-message';
const ForgotPwPage = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const apiClient = axios.create({
        baseURL: 'https://api.unime.site/UNIME', 
        headers: {
          'Content-Type': 'application/json',
        },
      });

    const handleForgotPw = async () => {
        if (email.trim() !== '') {
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { // Kiểm tra định dạng email
                try {
                    const response = await apiClient.post('/mail/sendPassword', null, {
                      params: { mail: email },
                    });
                    if(response.data.code === 1000){
                        // Alert.alert('Thành công !', 'Mật khẩu mới đã được gửi vào email của bạn');
                        Toast.show({
                            type: 'success',
                            text1: 'Thành công',
                            text2: 'Mật khẩu mới đã được gửi vào email của bạn',
                            visibilityTime: 2000,
                            autoHide: true,
                        });
                        navigation.navigate('Login');
                    }
                  } catch (error) {
                    console.log('Error sending OTP:', error.response ? error.response.data : error.message);
                    throw error; 
                  }
            } else {
                // Alert.alert('Lỗi','Vui lòng nhập đúng định dạng email!');
                Toast.show({
                    type: 'error',
                    text1: 'Lỗi',
                    text2: 'Vui lòng nhập đúng định dạng email!',
                    visibilityTime: 2000,
                    autoHide: true,
                });
            }
        } else {
            // Alert.alert('Lỗi','Vui lòng nhập email!');
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: 'Vui lòng nhập email!',
                visibilityTime: 2000,
                autoHide: true,
            });
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

                <Text style={styles.headerText}>Nhập email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    placeholderTextColor="#888"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none" // Tắt viết hoa tự động
                />
                <TouchableOpacity style={styles.sendOtpButton} onPress={handleForgotPw}>
                    <Text style={styles.sendOtpButtonText}>Xác nhận</Text>
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

export default ForgotPwPage;
