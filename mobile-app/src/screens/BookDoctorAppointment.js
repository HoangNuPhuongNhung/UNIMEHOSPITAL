import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const BookDoctorAppointment = ({ route }) => {
  const { doctor, service = null } = route.params;
  console.log(service);
  const navigation = useNavigation();
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState(null);
  const [serviceList, setServiceList] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [doctorTimeWork, setDoctorTimeWork] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDoctorDetails();
  }, []);

  useEffect(() => {
    if (doctor?.doctorId) {
      axios
        .get(`https://api.unime.site/UNIME/doctorservice/get/serviceList/${doctor.doctorId}`)
        .then(response => {
          const services = response.data?.result;
          if (Array.isArray(services)) {
            setServiceList(services);
            setFilteredServices(services);
            if (services.length > 0) {
              setSelectedService(services[0]);
            }
          } else {
            console.error('Unexpected data format:', response.data);
            setServiceList([]);
            setFilteredServices([]);
          }
        })
        .catch(error => console.error('Error fetching services:', error));
    }
  }, [doctor?.doctorId]);

  useEffect(() => {
    if (selectedDate && doctorTimeWork.length > 0) {
      const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
      const selectedDay = days[new Date(selectedDate).getDay()];
      
      const availableSlots = doctorTimeWork
        .filter(slot => 
          slot.dayOfWeek === selectedDay && 
          slot.doctorTimeworkStatus === "Available"
        )
        .map(slot => ({
          id: slot.doctorTimeworkId,
          time: `${slot.startTime.slice(0, 5)} - ${slot.endTime.slice(0, 5)}`
        }));

      setTimeSlots(availableSlots);
      setSelectedTime(null);
    }
  }, [selectedDate, doctorTimeWork]);

  useEffect(() => {
    if (doctor?.doctorId) {
      axios.get(`https://api.unime.site/UNIME/doctortimework/get/listByDoctor/${doctor.doctorId}`)
        .then(response => {
          if (response.data.code === 1000) {
            setDoctorTimeWork(response.data.result);
          }
        })
        .catch(error => console.error('Error fetching timeWork:', error));
    }
  }, [doctor?.doctorId]);

  const fetchDoctorDetails = async () => {
    try {
      const response = await axios.get(`https://api.unime.site/UNIME/doctors/get/getDetail/${doctor.doctorId}`);
      if (response.data.code === 1000) {
        setDoctorDetails(response.data.result);
      }
    } catch (error) {
      setError('Error fetching doctor details');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const confirmAppointment = async () => {
    try {
      setIsLoading(true);
      
      const selectedTimeSlot = timeSlots.find(slot => slot.time === selectedTime);
      
      if (!selectedTimeSlot || !selectedService) {
        Alert.alert('Thông báo', 'Vui lòng chọn đầy đủ thông tin đặt lịch');
        return;
      }
      const tokenString = await AsyncStorage.getItem('userToken');
      const token = tokenString ? JSON.parse(tokenString) : null;
      if (!token || !token.raw) { 
        console.log("Token không tồn tại");
        Alert.alert("Lỗi", "Bạn chưa đăng nhập, vui lòng đăng nhập lại.");
        return;
      }
      const response = await axios.post(
        'https://api.unime.site/UNIME/appointments',
        {
          doctortimeworkId: selectedTimeSlot.id,
          doctorserviceId: selectedService.serviceId
        },
        {
          headers: {
            'Authorization': `Bearer ${token.raw}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.code === 1000) {
        navigation.navigate('appointment success', { 
          doctorDetails, 
          date: selectedDate, 
          time: selectedTime, 
          selectedService, 
        });
      } else {
        Alert.alert('Thông báo', 'Đặt lịch không thành công');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      Alert.alert('Thông báo', 'Có lỗi xảy ra khi đặt lịch');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  if (error) {
    return <View style={styles.container}><Text>{error}</Text></View>;
  }

  if (!doctorDetails) {
    return <View style={styles.container}><Text>No doctor details available</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: doctorDetails.doctorImage }} style={styles.profileImage} />
      <Text style={styles.name}>{doctorDetails.doctorName}</Text>
      <Text style={styles.specialty}>Chuyên khoa: {doctorDetails.departmentName}</Text>
      <Text style={styles.address}>Địa chỉ: {doctorDetails.doctorAddress}</Text>
      <Text style={styles.title}>Đặt lịch khám</Text>

      <Text style={styles.sectionTitle}>Chọn ngày khám</Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#4D9DE0' },
        }}
        minDate={today}
        theme={{
          selectedDayBackgroundColor: '#4D9DE0',
          todayTextColor: '#4D9DE0',
          arrowColor: '#4D9DE0',
        }}
      />

      <Text style={styles.sectionTitle}>Chọn giờ khám</Text>
      <View style={styles.timeSlotsContainer}>
        {timeSlots.map((slot) => (
          <TouchableOpacity
            key={slot.id}
            style={[
              styles.timeSlot,
              selectedTime === slot.time && styles.selectedTimeSlot
            ]}
            onPress={() => setSelectedTime(slot.time)}
          >
            <Text style={[
              styles.timeText,
              selectedTime === slot.time && styles.selectedTimeText
            ]}>{slot.time}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.sectionTitle}>Chọn dịch vụ</Text>
      <Picker
        selectedValue={selectedService?.serviceId}
        onValueChange={(itemValue) => {
          const selected = filteredServices.find(service => service.serviceId === itemValue);
          setSelectedService(selected);
        }}
        style={styles.picker}
      >
        {filteredServices.map(service => (
          <Picker.Item 
            key={service.serviceId} 
            label={`${service.serviceName}`} 
            value={service.serviceId} 
          />
        ))}
      </Picker>
      <Text style={styles.priceLabel}>Giá tiền:</Text>
      <Text style={styles.price}>{selectedService?.servicePrice.toLocaleString()} đ</Text>

      {/* <Text style={styles.sectionTitle}>Ghi chú</Text>
      <TextInput
        style={styles.noteInput}
        placeholder="Mô tả vấn đề của bạn."
        multiline
        value={note}
        onChangeText={setNote}
      /> */}

      <TouchableOpacity
        style={[
          styles.bookButton,
          (!selectedDate || !selectedTime || !selectedService) && styles.disabledButton
        ]}
        onPress={confirmAppointment}
        disabled={!selectedDate || !selectedTime || !selectedService || isLoading}
      >
        <Text style={styles.bookButtonText}>
          {isLoading ? 'Đang xử lý...' : 'Đặt lịch khám'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF1FF',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  specialty: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginVertical: 8,
  },
  address: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4D9DE0',
    textAlign: 'center',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  timeSlot: {
    backgroundColor: '#F0F4FF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 5,
  },
  selectedTimeSlot: {
    backgroundColor: '#4D9DE0',
  },
  timeText: {
    color: '#333',
  },
  selectedTimeText: {
    color: '#fff',
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  price: {
    fontSize: 18,
    color: '#4D9DE0',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  noteInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  bookButton: {
    backgroundColor: '#4D9DE0',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 120,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
    opacity: 0.7
  }
});

export default BookDoctorAppointment;
