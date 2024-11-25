import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const DoctorDetailPage = ({ route }) => {
  const { doctor } = route.params; // Lấy thông tin bác sĩ từ params

  return (
    <ScrollView style={styles.container}>
      {/* Hình ảnh bác sĩ */}
      <Image source={{ uri: doctor.doctorImage }} style={styles.profileImage} />

      {/* Tên bác sĩ */}
      <Text style={styles.name}>{doctor.doctorName}</Text>

      {/* Email */}
      <Text style={styles.info}>Email: {doctor.email}</Text>

      {/* Giới tính */}
      <Text style={styles.info}>Giới tính: {doctor.doctorGender ? 'Nam' : 'Nữ'}</Text>

      {/* Ngày sinh */}
      <Text style={styles.info}>Ngày sinh: {doctor.doctorDateOfBirth}</Text>

      {/* Chuyên khoa */}
      <Text style={styles.info}>Chuyên khoa: {doctor.departmentName}</Text>

      {/* Địa chỉ */}
      <Text style={styles.info}>Địa chỉ: {doctor.doctorAddress}</Text>

      {/* Kinh nghiệm */}
      <Text style={styles.info}>Kinh nghiệm: {doctor.doctordetailExperience}</Text>

      {/* Thông tin chi tiết */}
      <Text style={styles.info}>Thông tin: {doctor.doctordetailInformation}</Text>

      {/* Giải thưởng */}
      <Text style={styles.info}>Giải thưởng: {doctor.doctordetailAwardRecognization}</Text>

      {/* Nút đặt lịch */}
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => console.log('Đặt lịch khám!')} // Tùy chỉnh logic
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
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    marginBottom: 10,
    color: '#333',
  },
  bookButton: {
    backgroundColor: '#4D9DE0',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DoctorDetailPage;
