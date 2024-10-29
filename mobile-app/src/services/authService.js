import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'https://dummyjson.com/user/login'; 

export const login = async (username, password) => {
  console.log(username, ' ## ' ,password);
  if (!username || !password) {
    throw new Error('Tên đăng nhập và mật khẩu không được để trống.');
  }

  // try {
    const userData = {
      username,
      password,
    };
    const response = await axios.post(API_URL, userData);

    const token = response.data.token;
    if (token) {
      await AsyncStorage.setItem('userToken', token);
    }

    return response.data; 
  // } catch (error) {
  //   console.error("Lỗi đăng nhập:", error.message);
  //   throw new Error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.');
  // }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (error) {
    console.error("Lỗi đăng xuất:", error);
  }
};

export const getToken = async () => {
  return await AsyncStorage.getItem('userToken');
};
