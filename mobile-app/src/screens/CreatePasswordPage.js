import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert, Platform, Modal } from 'react-native';
import axios from 'axios';
import RadioGroup from 'react-native-radio-buttons-group';
import DateTimePicker from '@react-native-community/datetimepicker';
const CreatePasswordPage = ({ route, navigation }) => {
  const email = route.params?.email || '';
  console.log(email);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState(true);
  const [selectedId, setSelectedId] = useState('1');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  console.log(gender);


  // useEffect(() => {
  //   if (!email) {
  //     Alert.alert('Lỗi', 'Không tìm thấy email. Vui lòng thử lại.', [
  //       { text: 'OK', onPress: () => navigation.goBack() },
  //     ]);
  //   }
  // }, [email]);

  const validatePassword = (password) => {
    if (password.length < 6) {
      return 'Mật khẩu phải chứa ít nhất 6 ký tự.';
    }
    return null;
  };
  const genderOptions = useMemo(() => [
    {
      id: '1',
      label: 'Nam',
      value: true,
      selected: selectedId === '1',
    },
    {
      id: '2',
      label: 'Nữ',
      value: false,
      selected: selectedId === '2',
    },
  ], [selectedId]);

  const handleGenderChange = (id) => {
    setSelectedId(id);
    const selected = genderOptions.find(item => item.id === id);
    setGender(selected?.value ?? true);
  };

  const handleRegister = async () => {
    const passwordError = validatePassword(password);

    if (!username) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên đăng nhập.');
      return;
    }

    if (passwordError) {
      Alert.alert('Lỗi mật khẩu', passwordError);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu không khớp!');
      return;
    }

    if (!name || !address || !phoneNumber || !dateOfBirth) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const requestData = {
      patientUsername: username,
      patientPassword: password,
      patientEmail: email,
      patientName: name,
      patientAddress: address,
      patientPhoneNumber: phoneNumber,
      patientGender: gender,
      patientDateOfBirth: dateOfBirth,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    try {
    console.log('Sending request with data:', requestData); // Log dữ liệu gửi đi
    const response = await axios.post(
      'https://api.unime.site/UNIME/patients', 
      requestData,
      config
    );
    console.log('Response:', response.data); // Log response

    if (response.data.code === 1000) {
      Alert.alert('Thành công', 'Đăng ký tài khoản thành công!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } else {
      Alert.alert('Lỗi', `Đăng ký thất bại: ${response.data.message || 'Vui lòng thử lại'}`);
    }
  } catch (error) {
    console.error('Error details:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    const errorMessage = error.response?.data?.message 
      || error.response?.data?.error 
      || 'Không thể kết nối đến máy chủ.';
    
    Alert.alert('Lỗi', errorMessage);
  }
};

  const onDateChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (event.type === 'dismissed') {
      return;
    }
    if (selectedDate) {
      setDate(selectedDate);
      // Format date to YYYY-MM-DD
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDateOfBirth(formattedDate);
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <Text style={styles.headerText}>Tạo tài khoản</Text>

        <Text style={styles.emailText}>Email: {email}</Text>

        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Địa chỉ"
          placeholderTextColor="#888"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          placeholderTextColor="#888"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TouchableOpacity 
          style={styles.input} 
          onPress={showDatePicker}
        >
          <Text style={[styles.dateText, !dateOfBirth && styles.placeholderText]}>
            {dateOfBirth || 'Chọn ngày sinh'}
          </Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu"
          secureTextEntry
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Nhập lại mật khẩu"
          secureTextEntry
          placeholderTextColor="#888"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <View style={styles.radioContainer}>
          <Text style={styles.label}>Giới tính:</Text>
          <RadioGroup
            radioButtons={genderOptions}
            onPress={handleGenderChange}
            selectedId={selectedId}
            layout="row"
            containerStyle={{ marginBottom: 20 }}
          />
        </View>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Đăng ký</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
            maximumDate={new Date()} // Không cho chọn ngày trong tương lai
            minimumDate={new Date(1900, 0, 1)} // Giới hạn năm sinh từ 1900
          />
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2046A9',
  },
  emailText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#FFF',
    color: '#000',
  },
  registerButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 25,
  },
  registerButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  radioContainer: {
    width: '80%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
  dateText: {
    fontSize: 16,
    color: '#000',
    paddingVertical: 12,
  },
  placeholderText: {
    color: '#888',
  },
});

export default CreatePasswordPage;
