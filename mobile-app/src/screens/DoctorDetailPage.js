import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const DoctorDetailPage = ({ route,navigation }) => {
  const { doctor } = route.params; 

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: doctor.doctorImage }} style={styles.profileImage} />

      <Text style={styles.name}>{doctor.doctorName}</Text>

      <Text style={styles.info}>Email: {doctor.email}</Text>

      <Text style={styles.info}>Giới tính: {doctor.doctorGender ? 'Nam' : 'Nữ'}</Text>

      <Text style={styles.info}>Ngày sinh: {doctor.doctorDateOfBirth}</Text>

      <Text style={styles.info}>Chuyên khoa: {doctor.departmentName}</Text>

    
      <Text style={styles.info}>Địa chỉ: {doctor.doctorAddress}</Text>

      <Text style={styles.info}>Kinh nghiệm: {doctor.doctordetailExperience}</Text>

      <Text style={styles.info}>Thông tin: {doctor.doctordetailInformation}</Text>

      <Text style={styles.info}>Giải thưởng: {doctor.doctordetailAwardRecognization}</Text>

      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => navigation.navigate('book doctor', { doctor })} // Tùy chỉnh logic
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
