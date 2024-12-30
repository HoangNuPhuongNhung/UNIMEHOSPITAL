import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import axios from 'axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import { useContext } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';
import { refreshToken, checkValidToken } from '../services/tokenHelper';
import { startOfISOWeek, addWeeks, setDay, format } from 'date-fns';

// const getCurrentWeekDate = (dayOfWeek) => {
//   const weekDayMap = {
//     monday: 1,
//     tuesday: 2,
//     wednesday: 3,
//     thursday: 4,
//     friday: 5,
//     saturday: 6,
//     sunday: 0,
//   };

//   const today = new Date();
//   const currentDay = today.getDay();
//   const targetDay = weekDayMap[dayOfWeek.toLowerCase()];

//   const diff = targetDay - currentDay;
//   const targetDate = new Date(today); 
//   targetDate.setDate(today.getDate() + diff);

//   return targetDate.toLocaleDateString('vi-VN', {
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric',
//   });
// };
const getAppointmentDateFromAPI = (year, weekOfYear, dayOfWeek) => {
  // Xác định ngày đầu tiên của tuần đầu tiên (ISO week)
  const firstDayOfYear = new Date(year, 0, 1);
  const firstISOWeekStart = startOfISOWeek(firstDayOfYear);

  // Thêm số tuần để tìm đúng tuần
  const targetWeekStart = addWeeks(firstISOWeekStart, weekOfYear - 1);

  // Thêm ngày trong tuần
  const weekDayMap = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 0,
  };
  const appointmentDate = setDay(targetWeekStart, weekDayMap[dayOfWeek]);

  // Định dạng ngày để hiển thị
  return format(appointmentDate, 'dd/MM/yyyy');
}

const confirmCancel = (appointmentId, fetchAppointments, logout, navigation) => {
  Alert.alert(
    "Xác nhận hủy",
    "Bạn có chắc chắn muốn hủy lịch hẹn này không?",
    [
      {
        text: "Không",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => handleCancel(appointmentId, fetchAppointments,logout, navigation),
      },
    ],
    { cancelable: true }
  );
};
const handleCancel = async (appointmentId,fetchAppointments, logout, navigation) => {
  const handleLogout = () => {
    Alert.alert(
      "Phiên đăng nhập hết hạn",
      "Vui lòng đăng nhập lại!",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        { text: "Đồng ý", onPress: () => {
            logout();
            navigation.replace("Login"); 
          }
        }
      ],
      { cancelable: true }
    );
  };
  try {
    const tokenString = await AsyncStorage.getItem('userToken');
    let token = tokenString ? JSON.parse(tokenString) : null;

    if (!token || !token.raw) {
      console.log('Token không tồn tại');
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Bạn chưa đăng nhập, vui lòng đăng nhập lại.',
        visibilityTime: 2000,
        autoHide: true,
      });
      return;
    }

    const body = {
      appointmentId: appointmentId,
      appointmentNote: "Tôi có lịch bận khác",
    };
    const checkToken = await checkValidToken(token.raw);
    if (checkToken) {
      console.log('Token còn hạn!');
      try {
        const response = await axios.put(
          'https://api.unime.site/UNIME/appointments/updateCancelledByPatient',
          body,
          {
            headers: {
              Authorization: `Bearer ${token.raw}`,
              'Content-Type': 'application/json',
            },
          }
        );
    
        if (response.status === 200) {
          Toast.show({
            type: 'success',
            text1: 'Thành công',
            text2: 'Lịch hẹn đã được hủy.',
            visibilityTime: 2000,
            autoHide: true,
          });
          // Cập nhật lại danh sách lịch hẹn
          fetchAppointments();
        } else {
          Toast.show({
            type: 'error',
            text1: 'Lỗi',
            text2: 'Không thể hủy lịch hẹn. Vui lòng thử lại sau.',
            visibilityTime: 2000,
            autoHide: true,
          });
        }
      } catch (error) {
        console.log('Lỗi khi hủy lịch hẹn:', error);
        Toast.show({
          type: 'error',
          text1: 'Lỗi',
          text2: 'Đã xảy ra lỗi, vui lòng thử lại sau.',
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } else {
      console.log('Token hết hạn! Đang làm mới...');
      const newToken = await refreshToken();
      if (newToken) {
        token = { raw: newToken };
        try {
          const response = await axios.put(
            'https://api.unime.site/UNIME/appointments/updateCancelledByPatient',
            body,
            {
              headers: {
                Authorization: `Bearer ${token.raw}`,
                'Content-Type': 'application/json',
              },
            }
          );
      
          if (response.status === 200) {
            Toast.show({
              type: 'success',
              text1: 'Thành công',
              text2: 'Lịch hẹn đã được hủy.',
              visibilityTime: 2000,
              autoHide: true,
            });
            // Cập nhật lại danh sách lịch hẹn
            fetchAppointments();
          } else {
            Toast.show({
              type: 'error',
              text1: 'Lỗi',
              text2: 'Không thể hủy lịch hẹn. Vui lòng thử lại sau.',
              visibilityTime: 2000,
              autoHide: true,
            });
          }
        } catch (error) {
          console.log('Lỗi khi hủy lịch hẹn:', error);
          Toast.show({
            type: 'error',
            text1: 'Lỗi',
            text2: 'Đã xảy ra lỗi, vui lòng thử lại sau.',
            visibilityTime: 2000,
            autoHide: true,
          });
        }
      } else {
        handleLogout();
        return;
      }
    }

  } catch (error) {
    console.log('Lỗi khi hủy lịch hẹn:', error);
    Toast.show({
      type: 'error',
      text1: 'Lỗi',
      text2: 'Đã xảy ra lỗi, vui lòng thử lại sau.',
      visibilityTime: 2000,
      autoHide: true,
    });
  }
};
const AppointmentCard = ({ appointment,fetchAppointments  }) => {
  // const formattedDate = getCurrentWeekDate(appointment.dayOfWeek);
  const formattedDate = getAppointmentDateFromAPI(appointment.year, appointment.weekOfYear, appointment.dayOfWeek);
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const statusStyle = {
    color: appointment.appointmentStatus === 'Pending' ? '#FF9900' : '#333',
    fontWeight: appointment.appointmentStatus === 'Pending' ? 'bold' : 'normal',
  };
  return (
    <View style={styles.card}>
      <View style={styles.infoRow}>
        {/* Hiển thị ngày thực tế */}
        <View>
          <Text style={styles.value}>Ngày: {formattedDate}</Text>
        </View>
        <View>
          <Text style={styles.value}>
            Thời gian: {appointment.startTime} - {appointment.endTime}
          </Text>
        </View>
      </View>
      <View style={styles.infoRow}>
        <Text>Dịch vụ: </Text>
        <Text style={styles.value}>{appointment.serviceName}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Bác sĩ:</Text>
        <Text style={styles.doctorName}>{appointment.doctorName}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Trạng thái:</Text>
        <Text style={[styles.specialty, statusStyle]}>{appointment.appointmentStatus}</Text>
      </View>
      <TouchableOpacity style={styles.cancelButton} onPress={() =>confirmCancel(appointment.appointmentId,fetchAppointments, logout, navigation )}>
        <Text style={styles.cancelButtonText}>Hủy</Text>
      </TouchableOpacity>
    </View>
  );
};
const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation(); 


  const fetchAppointments = async () => {
    const handleLogout = () => {
      Alert.alert(
        "Phiên đăng nhập hết hạn",
        "Vui lòng đăng nhập lại!",
        [
          {
            text: "Hủy",
            style: "cancel"
          },
          { text: "Đồng ý", onPress: () => {
              logout();
              navigation.replace("Login"); 
            }
          }
        ],
        { cancelable: true }
      );
    };
    try {
      const tokenString = await AsyncStorage.getItem('userToken');
      let token = tokenString ? JSON.parse(tokenString) : null;

      if (!token || !token.raw) {
        console.log("Token không tồn tại");
        Toast.show({
          type: 'error',
          text1: 'Lỗi',
          text2: 'Bạn chưa đăng nhập, vui lòng đăng nhập lại.',
          visibilityTime: 2000,
          autoHide: true,
        });
        return;
      }

      const checkToken = await checkValidToken(token.raw);
      if (checkToken) {
        console.log('Token còn hạn!');
        try {
          const response = await axios.get(
            'https://api.unime.site/UNIME/appointments/getByPatient',
            {
              headers: {
                Authorization: `Bearer ${token.raw}`,
              },
            }
          );
          if (response.data && response.data.result) {
            const allAppointments = response.data.result;
            const currentDate = new Date().toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            });

            const todayAppointments = allAppointments.filter((appointment) => {
              // const appointmentDate = getCurrentWeekDate(appointment.dayOfWeek);
              const appointmentDate = getAppointmentDateFromAPI(appointment.year, appointment.weekOfYear, appointment.dayOfWeek);
              return appointmentDate === currentDate;
            });
            setAppointments(allAppointments);
            setFilteredAppointments(todayAppointments);
          }
        } catch (error) {
          console.log('Lỗi xem lịch hẹn:', error);
          Toast.show({
            type: 'error',
            text1: 'Thông báo',
            text2: 'Không tải được lịch hẹn',
            visibilityTime: 2000,
            autoHide: true,
          });
        }
      } else {
        console.log('Token hết hạn! Đang làm mới...');
        const newToken = await refreshToken();
        if (newToken) {
          token = { raw: newToken };
          try {
            const response = await axios.get(
              'https://api.unime.site/UNIME/appointments/getByPatient',
              {
                headers: {
                  Authorization: `Bearer ${token.raw}`,
                },
              }
            );
            if (response.data && response.data.result) {
              const allAppointments = response.data.result;
              const currentDate = new Date().toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              });

              const todayAppointments = allAppointments.filter((appointment) => {
                // const appointmentDate = getCurrentWeekDate(appointment.dayOfWeek);
                const appointmentDate = getAppointmentDateFromAPI(appointment.year, appointment.weekOfYear, appointment.dayOfWeek);
                return appointmentDate === currentDate;
              });

              setAppointments(allAppointments);
              setFilteredAppointments(todayAppointments);
            }
          } catch (error) {
            console.log('Lỗi xem lịch hẹn:', error);
            Toast.show({
              type: 'error',
              text1: 'Thông báo',
              text2: 'Không tải được lịch hẹn',
              visibilityTime: 2000,
              autoHide: true,
            });
          }
        } else {
          handleLogout();
          return;
        }
      }
    } catch (error) {
      console.log('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
    setSelectedDate(new Date());
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  
  const handleDateChange = (event, selected) => {
    setShowPicker(false);
    if (selected) {
      setSelectedDate(selected);

      // Lọc lịch hẹn theo ngày
      const formattedSelectedDate = selected.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      const filtered = appointments.filter((appointment) => {
        // const appointmentDate = getCurrentWeekDate(appointment.dayOfWeek);
        const appointmentDate = getAppointmentDateFromAPI(appointment.year, appointment.weekOfYear, appointment.dayOfWeek);
        return appointmentDate === formattedSelectedDate;
      });

      setFilteredAppointments(filtered);
    }
  };
  return (
    <ImageBackground source={require('../../assets/background.png')} style={styles.background}>
      <View style={styles.datePickerContainer}>
        {/* <Text style={styles.label}>Chọn ngày:</Text> */}
        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.datePickerButton}>
          <Text style={styles.datePickerText}>
            {selectedDate.toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </Text>
        </TouchableOpacity>
      </View>

  {showPicker && (
    <DateTimePicker
      value={selectedDate}
      mode="date"
      display="default"
      minimumDate={new Date()} // Giới hạn ngày
      onChange={handleDateChange}
    />
  )}

      <ScrollView style={styles.container}>
        {loading ? (
          <Text>Đang tải dữ liệu...</Text>
        ) : filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.appointmentId}
              appointment={appointment}
              fetchAppointments={fetchAppointments}
            />
          ))
        ) : (
          <Text>Không có lịch hẹn trong ngày được chọn.</Text>
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
    marginBottom: 20,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: 'flex-start', 
    marginVertical: 12,
    marginLeft: 16, 
},

label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    letterSpacing: 0.3,
},
datePickerButton: {
  backgroundColor: '#ffffff',
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: 8,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
},
datePickerText: {
  fontSize: 15,
  color: '#34495e',
  fontWeight: '500',
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
