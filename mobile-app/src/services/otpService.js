import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.unime.site/UNIME', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendOtp = async (email) => {
  try {
    const response = await apiClient.get('/mail/sendOTP', {
      params: { mail: email }, 
    });
    return response.data; 
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error; 
  }
};
