import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfilePage = () => {
  return (
    <ImageBackground
      source={require('../../assets/background.png')} 
      style={styles.background}
      resizeMode=""
    >
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://i.pinimg.com/236x/77/b3/a6/77b3a6bda74bd0019cee11780571769c.jpg', // Ảnh đại diện
            }}
          />
          <View style={styles.info}>
            <Text style={styles.name}>Hoang</Text>
            <Text style={styles.detail}>03.02.2003</Text>
            <Text style={styles.detail}>+123456789</Text>
          </View>
          <Icon name="pencil" size={24} color="#4D9DE0" style={styles.editIcon} />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Thông tin cá nhân</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cài đặt tài khoản</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
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
