import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const refreshToken = async () => {
    try {
        const tokenString = await AsyncStorage.getItem('userToken');
        const token = tokenString ? JSON.parse(tokenString) : null;

        if (!token || !token.raw) {
            console.error('Không tìm thấy token, người dùng cần đăng nhập lại.');
            return null;
        }

        const response = await axios.post('https://api.unime.site/UNIME/auth/refresh', {
            token: token.raw,
        });
        const newToken = response.data.result.token;
        if (newToken) {
            await AsyncStorage.setItem('userToken', JSON.stringify({ raw: newToken }));
            return newToken;
        } else {
            console.log('Refresh token thất bại, vui lòng đăng nhập lại.');
            return null;
        }
    } catch (error) {
        console.log('Lỗi khi refresh token:', error);
        return null;
    }
};
export const checkValidToken = async (token) => {
    try {
        const response = await axios.post('https://api.unime.site/UNIME/auth/introspect', {
            token
        });
        return response.data.result.valid;
    } catch (error) {
        console.error('Lỗi khi kiểm tra token:', error);
    }
}