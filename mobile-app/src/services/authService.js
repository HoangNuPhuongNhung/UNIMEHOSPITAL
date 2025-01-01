import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect,useContext  } from 'react';
import { UserContext } from '../contexts/UserContext';
const API_URL = 'https://api.unime.site/UNIME/auth/token'; 


export const login = async (username, password) => {
  console.log(username, ' ## ', password);
  if (!username || !password) {
    throw new Error('Tên đăng nhập và mật khẩu không được để trống.');
  }

  try {
    const userData = {
      username,
      password,
    };
    const response = await axios.post(API_URL, userData);

    // Check if response has the expected structure
    if (response.data.code === 1000 && response.data.result.token) {
      const t = response.data.result.token;
      let token = {
        raw: t,
        header: JSON.parse(window.atob(t.split('.')[0])),
        payload: JSON.parse(window.atob(t.split('.')[1]))
      };
      // Kiểm tra role từ decoded token
      if (token.payload.scope !== 'PATIENT') {
        throw new Error('Chỉ bệnh nhân mới được phép đăng nhập vào ứng dụng này.');
      }

      await AsyncStorage.setItem('userToken', JSON.stringify(token));

          // try {
          //   const data = await getUserInfo();
          //   updateUserInfo(data); // Cập nhật thông tin vào context
          // } catch (error) {
          //   console.error('Lỗi lấy thông tin:', error.message);
          // }

      // useEffect(() => {
      //   const fetchUserData = async () => {
      //     try {
      //       const data = await getUserInfo();
      //       updateUserInfo(data); // Cập nhật thông tin vào context
      //     } catch (error) {
      //       console.error('Lỗi lấy thông tin:', error.message);
      //     }
      //   };
    
      //   fetchUserData();
      // }, []);
      //console.log(userInfo);
      return response.data.result;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
     console.log("Lỗi đăng nhập:", error.message);
    throw new Error('Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.');
  }
};

export const logout = async () => {
  try {
    const token = await getToken(); 
    console.log(token.raw);
    if (token && token.raw) {
      await axios.post('https://api.unime.site/UNIME/auth/logout', {
        token: token.raw
      });
    }
    
    // Xóa dữ liệu local
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userInfo');
    
  } catch (error) {
    console.log('Lỗi đăng xuất:', error.message);
  }
};


export const getToken = async () => {
  const tokenString = await AsyncStorage.getItem('userToken');
  //console.log(tokenString);
  return tokenString ? JSON.parse(tokenString) : null;
};

export const getUserInfo = async () => {
  try {
    const token = await getToken(); 
    if (!token || !token.raw) {
      throw new Error('Không tìm thấy token.');
    }

    const response = await axios.get('https://api.unime.site/UNIME/patients/myInfo', {
      headers: {
        Authorization: `Bearer ${token.raw}`,
      },
    });

    if (response.status === 200 && response.data.code === 1000) {
      return response.data.result;
    } else {
      throw new Error('Không thể lấy thông tin user.');
    }
  } catch (error) {
    console.log('Lỗi lấy thông tin user:', error.message);
    throw error;
  }
};


