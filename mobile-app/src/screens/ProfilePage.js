import React, { useContext, useState,useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../contexts/UserContext';

const ProfilePage = ({ route }) => {
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const { userInfo } = useContext(UserContext);


  const handleLogout = () => {
    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        { text: "Đồng ý", onPress: () => {
            logout();
            navigation.replace("Login"); 
          }
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.avatar}
            source={{
              uri: userInfo?.patientImage
            }}
          />
          <View style={styles.info}>
            <Text style={styles.name}>{userInfo?.patientName}</Text>
            <Text style={styles.detail}>{userInfo?.patientDateOfBirth}</Text>
            <Text style={styles.detail}>{userInfo?.patientPhoneNumber}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserInfo')}>
          <Text style={styles.buttonText}>Thông tin cá nhân</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AppointmentPage')}>
          <Text style={styles.buttonText}>Hồ sơ đặt lịch</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cài đặt tài khoản</Text>
        </TouchableOpacity> */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('change password')}
        >
          <Text style={styles.buttonText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', 
  },
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 24
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detail: {
    color: '#777',
    fontSize: 14,
  },
  editIcon: {
    position: 'absolute',
    right: 15,
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ProfilePage;
