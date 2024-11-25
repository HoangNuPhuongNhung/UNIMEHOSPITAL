import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.unime.site/UNIME', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendOtp = async (email) => {
  try {
    const response = await apiClient.post('/mail/sendOTP', null, {
      params: { mail: email },
    });
    return response.data; 
  } catch (error) {
    console.error('Error sending OTP:', error.response ? error.response.data : error.message);
    throw error; 
  }
};
