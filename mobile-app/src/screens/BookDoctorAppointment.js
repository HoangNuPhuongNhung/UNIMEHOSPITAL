import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';


const BookDoctorAppointment = ({ route }) => {
  const { doctor } = route.params;
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);
  const [service, setService] = useState("Khám bệnh");
  const [note, setNote] = useState("");

  const timeSlots = [
    '9:30 - 10:00', '10:00 - 10:30', '10:30 - 11:00',
    '11:00 - 11:30', '11:30 - 12:00', '1:00 - 1:30'
  ];

  const confirmAppointment = () => {
    navigation.navigate('appointment success', { 
      doctor, 
      date: selectedDate, 
      time: selectedTime, 
      service, 
      price: getServicePrice(service), 
      note 
    });
    console.log('Bookdoctor');
  };

  const getServicePrice = (service) => {
    switch (service) {
      case 'Khám bệnh':
        return '500,000 đ';
      case 'Tư vấn':
        return '200,000 đ';
      default:
        return '0 đ';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: doctor.avatar }} style={styles.profileImage} />
      <Text style={styles.name}>{doctor.name}</Text>
      <Text style={styles.specialty}>Chuyên khoa: {doctor.specitalty}</Text>
      <Text style={styles.address}>Địa chỉ: {doctor.address}</Text>
      <Text style={styles.title}>Đặt lịch khám</Text>

      <Text style={styles.sectionTitle}>Chọn ngày khám</Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#4D9DE0' },
        }}
        theme={{
          selectedDayBackgroundColor: '#4D9DE0',
          todayTextColor: '#4D9DE0',
          arrowColor: '#4D9DE0',
        }}
      />

      <Text style={styles.sectionTitle}>Chọn giờ khám</Text>
      <View style={styles.timeSlotsContainer}>
        {timeSlots.map((time, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeSlot,
              selectedTime === time && styles.selectedTimeSlot
            ]}
            onPress={() => setSelectedTime(time)}
          >
            <Text style={[
              styles.timeText,
              selectedTime === time && styles.selectedTimeText
            ]}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Chọn dịch vụ</Text>
      <Picker
        selectedValue={service}
        onValueChange={(itemValue) => setService(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Khám bệnh" value="Khám bệnh" />
        <Picker.Item label="Tư vấn" value="Tư vấn" />
      </Picker>

      <Text style={styles.priceLabel}>Giá tiền:</Text>
      <Text style={styles.price}>{getServicePrice(service)}</Text>

      <Text style={styles.sectionTitle}>Ghi chú</Text>
      <TextInput
        style={styles.noteInput}
        placeholder="Mô tả vấn đề của bạn."
        multiline
        value={note}
        onChangeText={setNote}
      />

      <TouchableOpacity
        style={styles.bookButton}
        onPress={selectedDate && selectedTime ? confirmAppointment : null} 
        disabled={!selectedDate || !selectedTime} 
      >
        <Text style={styles.bookButtonText}>Đặt lịch khám</Text>
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
});

export default BookDoctorAppointment;
