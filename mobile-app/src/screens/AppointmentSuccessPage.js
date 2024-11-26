import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const AppointmentSuccessPage = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { doctor, date, time, service, price } = route.params;

  return (
    <View style={styles.container}>

      <View style={styles.iconContainer}>
        <Icon name="check-circle" size={80} color="#4D9DE0" />
      </View>

      <Text style={styles.title}>ĐẶT LỊCH KHÁM THÀNH CÔNG</Text>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Icon name="person" size={24} color="#4D9DE0" />
          <View style={styles.textContainer}>
            <Text style={styles.infoText} numberOfLines={1} ellipsizeMode="tail">{doctor.doctorName}</Text>
            <Text style={styles.subInfoText}>Chuyên khoa: {doctor.departmentName}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Icon name="calendar-today" size={24} color="#4D9DE0" />
          <View style={styles.textContainer}>
            <Text style={styles.infoText}>{date}</Text>
            <Text style={styles.subInfoText}>Thời gian: {time}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Icon name="location-on" size={24} color="#4D9DE0" />
          <Text style={styles.infoText}>Địa chỉ: {doctor.doctorAddress}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="medical-services" size={24} color="#4D9DE0" />
          <Text style={styles.infoText}>Dịch vụ: {service}</Text>
        </View>

        {/* <View style={styles.infoRow}>
          <Icon name="note" size={24} color="#4D9DE0" />
          <Text style={styles.infoText}>Ghi chú: {note || 'Không có ghi chú'}</Text>
        </View> */}

        <View style={styles.infoRow}>
          <Icon name="attach-money" size={24} color="#4D9DE0" />
          <Text style={styles.infoText}>Giá tiền: {price}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('bottom tab')}>
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
    alignItems: 'flex-start', 
    marginBottom: 10,
  },
  textContainer: {
    flex: 1, 
    marginLeft: 10,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  subInfoText: {
    fontSize: 14,
    color: '#777',
    marginTop: 2, 
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

export default AppointmentSuccessPage;
