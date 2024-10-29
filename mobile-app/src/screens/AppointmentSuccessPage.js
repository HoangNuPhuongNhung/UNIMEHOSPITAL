import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const AppointmentSuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Dữ liệu truyền từ trang trước qua route.params
  const { doctorName, specialty, date, time, location, service, price, note } = route.params;

  return (
    <View style={styles.container}>
      {/* Icon xác nhận */}
      <View style={styles.iconContainer}>
        <Icon name="check-circle" size={80} color="#4D9DE0" />
      </View>

      {/* Tiêu đề */}
      <Text style={styles.title}>ĐẶT LỊCH KHÁM THÀNH CÔNG</Text>

      {/* Thông tin chi tiết */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Icon name="person" size={24} color="#4D9DE0" />
          <Text style={styles.infoText}>{doctorName}</Text>
          <Text style={styles.subInfoText}>Chuyên khoa: {specialty}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="calendar-today" size={24} color="#4D9DE0" />
          <Text style={styles.infoText}>{date}</Text>
          <Text style={styles.subInfoText}>Thời gian: {time}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="location-on" size={24} color="#4D9DE0" />
          <Text style={styles.infoText}>{location}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="medical-services" size={24} color="#4D9DE0" />
          <Text style={styles.infoText}>Dịch vụ: {service}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="note" size={24} color="#4D9DE0" />
          <Text style={styles.infoText}>Ghi chú: {note || 'Không có ghi chú'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="attach-money" size={24} color="#4D9DE0" />
          <Text style={styles.infoText}>Giá tiền: {price}₫</Text>
        </View>
      </View>

      {/* Nút quay về trang chủ */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Quay về trang chủ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4D9DE0',
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  subInfoText: {
    fontSize: 14,
    color: '#777',
    marginLeft: 34, // Dịch xa hơn để tạo khoảng cách cho sub info
  },
  button: {
    backgroundColor: '#4D9DE0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AppointmentSuccessScreen;
