// testLogin.js
const { login } = require('./authService'); // Sử dụng require

const testLogin = async () => {
  const username = 'user01'; // Thay thế bằng tên đăng nhập thực tế
  const password = '123123123'; // Thay thế bằng mật khẩu thực tế

  try {
    const result = await login(username, password);
    console.log("Kết quả đăng nhập:", result);
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error.message);
  }
};

testLogin();
