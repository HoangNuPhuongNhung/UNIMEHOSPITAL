import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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
      return response.data.result;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    // console.error("Lỗi đăng nhập:", error.message);
    throw new Error(error.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.');
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userInfo'); // Xóa thông tin người dùng
  } catch (error) {
    console.error('Lỗi đăng xuất:', error.message);
  }
};


export const getToken = async () => {
  const tokenString = await AsyncStorage.getItem('userToken');
  return tokenString ? JSON.parse(tokenString) : null;
};

export const getUserInfo = async () => {
  try {
    const token = await getToken(); // Lấy token từ AsyncStorage
    if (!token || !token.raw) {
      throw new Error('Không tìm thấy token.');
    }

    const response = await axios.get('https://api.unime.site/UNIME/patients/myInfo', {
      headers: {
        Authorization: `Bearer ${token.raw}`, // Sử dụng Bearer Token
      },
    });

    if (response.status === 200 && response.data.code === 1000) {
      return response.data.result; // Trả về phần `result` của response
    } else {
      throw new Error('Không thể lấy thông tin user.');
    }
  } catch (error) {
    console.error('Lỗi lấy thông tin user:', error.message);
    throw error;
  }
};


