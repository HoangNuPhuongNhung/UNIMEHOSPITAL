import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import axios from 'axios';

const DoctorDetailPage = ({ route, navigation }) => {
  const { doctor } = route.params;
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDoctorDetails();
  }, []);

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
      {doctorDetails.doctorImage && (
        <Image source={{ uri: doctorDetails.doctorImage }} style={styles.profileImage} />
      )}

      <Text style={styles.name}>{doctorDetails.doctorName}</Text>

      <Text style={styles.info}>Email: {doctorDetails.doctorEmail}</Text>

      <Text style={styles.info}>Số điện thoại: {doctorDetails.doctorPhoneNumber}</Text>

      <Text style={styles.info}>Giới tính: {doctorDetails.doctorGender ? 'Nam' : 'Nữ'}</Text>

      <Text style={styles.info}>Ngày sinh: {doctorDetails.doctorDateOfBirth}</Text>

      <Text style={styles.info}>Chuyên khoa: {doctorDetails.departmentName}</Text>

      <Text style={styles.info}>Mô tả: {doctorDetails.doctorDescription}</Text>
    
      <Text style={styles.info}>Địa chỉ: {doctorDetails.doctorAddress}</Text>

      <Text style={styles.info}>Kinh nghiệm: {doctorDetails.doctordetailExperience}</Text>

      <Text style={styles.info}>Thông tin: {doctorDetails.doctordetailInformation}</Text>

      <Text style={styles.info}>Giải thưởng: {doctorDetails.doctordetailAwardRecognization}</Text>

      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => navigation.navigate('book doctor', { doctor: doctorDetails })}
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
