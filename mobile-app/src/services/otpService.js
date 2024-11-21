import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.unime.site/UNIME', // Đường dẫn cơ bản
  headers: {
    'Content-Type': 'application/json',
  },
});

// Hàm gửi OTP
export const sendOtp = async (email) => {
  try {
    const response = await apiClient.post('/sendOtp', { email });
    return response.data; // Trả về dữ liệu từ API
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error; // Quăng lỗi để xử lý ở nơi sử dụng
  }
};
