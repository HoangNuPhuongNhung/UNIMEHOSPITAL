import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const DoctorDetailPage = ({ route }) => {
  const { doctor } = route.params; // Lấy dữ liệu bác sĩ từ route params
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Hiển thị hình ảnh bác sĩ */}
      <Image source={{ uri: doctor.avatar }} style={styles.profileImage} />
      {/* Hiển thị tên bác sĩ */}
      <Text style={styles.name}>{doctor.name}</Text>
      {/* Hiển thị chuyên khoa */}
      <Text style={styles.specialty}>Chuyên khoa: {doctor.specitalty}</Text>
      {/* Hiển thị địa chỉ */}
      <Text style={styles.address}>Địa chỉ: {doctor.address}</Text>
      {/* Hiển thị thông tin chi tiết */}
      <Text style={styles.info}>Thông tin: {doctor.info}</Text>

      {/* Nút để đặt lịch khám */}
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => navigation.navigate('book doctor', { doctor })}
      >
        <Text style={styles.bookButtonText}>Đặt lịch khám</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
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
  info: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginVertical: 8,
    paddingHorizontal: 10,
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

export default DoctorDetailPage;
