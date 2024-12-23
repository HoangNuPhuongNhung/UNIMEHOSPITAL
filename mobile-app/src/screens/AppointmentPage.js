import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import axios from 'axios'; // Import thư viện Axios
import AsyncStorage from '@react-native-async-storage/async-storage';



const getCurrentWeekDate = (dayOfWeek) => {
  const weekDayMap = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 0,
  };

  const today = new Date();
  const currentDay = today.getDay(); // Ngày hiện tại (0 = Chủ Nhật, 1 = Thứ Hai, ...)
  const targetDay = weekDayMap[dayOfWeek.toLowerCase()];

  // Tính toán ngày cần tìm (cộng khoảng cách ngày)
  const diff = targetDay - currentDay;
  const targetDate = new Date(today); 
  targetDate.setDate(today.getDate() + diff);

  // Định dạng ngày: DD/MM/YYYY
  return targetDate.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
const AppointmentCard = ({ appointment }) => {
  // Tính ngày thực tế từ `dayOfWeek`
  const formattedDate = getCurrentWeekDate(appointment.dayOfWeek);

  return (
    <View style={styles.card}>
      <View style={styles.infoRow}>
        {/* Hiển thị ngày thực tế */}
        <Text style={styles.value}>{formattedDate}</Text>
        <Text style={styles.value}>
          {appointment.startTime} - {appointment.endTime}
        </Text>
        <Text style={styles.value}>{appointment.serviceName}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Bác sĩ:</Text>
        <Text style={styles.doctorName}>{appointment.doctorName}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Trạng thái:</Text>
        <Text style={styles.specialty}>{appointment.appointmentStatus}</Text>
      </View>
      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Hủy</Text>
      </TouchableOpacity>
    </View>
  );
};
const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Lấy token từ AsyncStorage
        const tokenString = await AsyncStorage.getItem('userToken');
        const token = tokenString ? JSON.parse(tokenString) : null;

        if (!token) {
          console.error('Token is missing or invalid!');
          return;
        }

        // Gọi API để lấy danh sách lịch hẹn
        const response = await axios.get(
          'https://api.unime.site/UNIME/appointments/getByPatient',
          {
            headers: {
              Authorization: `Bearer ${token.raw}`,
            },
          }
        );

        if (response.data && response.data.result) {
          setAppointments(response.data.result); // Cập nhật danh sách lịch hẹn
        } else {
          console.error('Invalid API response format.');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false); // Dừng trạng thái loading
      }
    };

    fetchAppointments();
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
    >
      <ScrollView style={styles.container}>
        {loading ? (
          <Text>Đang tải dữ liệu...</Text>
        ) : (
          appointments.map((appointment) => (
            <AppointmentCard key={appointment.appointmentId} appointment={appointment} />
          ))
        )}
      </ScrollView>
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#B4C3D1',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginRight: 10,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  specialty: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
  },
  cancelButton: {
    backgroundColor: '#FF5C5C',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AppointmentList;
