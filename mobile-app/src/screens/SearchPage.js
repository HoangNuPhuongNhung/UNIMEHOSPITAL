import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const doctors = [
  {
    id: 1,
    name: 'Tiến sĩ, Bác sĩ Lân Việt Trung',
    specialty: 'Tiêu hóa',
    hospital: 'Bệnh viện Chợ Rẫy, Hồ Chí Minh',
    image: 'https://i.pinimg.com/236x/be/c0/94/bec094704eb85e0f76073a064dbdb9c7.jpg',
  },
  {
    id: 2,
    name: 'Tiến sĩ, Bác sĩ Nguyễn Lân Việt',
    specialty: 'Tim mạch',
    hospital: 'Bệnh viện Bạch Mai, Hà Nội',
    image: 'https://i.pinimg.com/236x/be/c0/94/bec094704eb85e0f76073a064dbdb9c7.jpg',
  },
  {
    id: 3,
    name: 'Bác sĩ Chuyên khoa 2 Lê Minh Hoàng',
    specialty: 'Nội tiết',
    hospital: 'Bệnh viện Nhân Dân 2, Hồ Chí Minh',
    image: 'https://i.pinimg.com/236x/be/c0/94/bec094704eb85e0f76073a064dbdb9c7.jpg',
  },
];

const DoctorListPage = () => {
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('Tất cả');

  return (
    <ImageBackground
      source={require('../../assets/background.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView style={styles.container}>
        <View style={styles.filterContainer}>
          <Text style={styles.label}>Chuyên khoa</Text>
          <View style={styles.dropdown}>
            <Text>{specialty}</Text>
            <Icon name="arrow-drop-down" size={24} color="#333" />
          </View>
        </View>

        <Text style={styles.label}>Tên bác sĩ</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm bác sĩ"
            value={search}
            onChangeText={setSearch}
          />
          <Icon name="search" size={24} color="#333" style={styles.searchIcon} />
        </View>

        {doctors.map((doctor) => (
          <View key={doctor.id} style={styles.card}>
            <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
            <View style={styles.infoContainer}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.specialty}>{doctor.specialty}</Text>
              <Text style={styles.hospital}>{doctor.hospital}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Xem chi tiết</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Đặt khám</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.loadMoreButton}>
          <Text style={styles.loadMoreText}>Xem thêm</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(244, 246, 252, 0.2)',
    padding: 20,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  filterContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Thêm opacity cho dropdown
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Thêm opacity cho input
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginLeft: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Thêm opacity cho card
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  specialty: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  hospital: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4D9DE0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  loadMoreButton: {
    backgroundColor: '#4D9DE0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 120,
  },
  loadMoreText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DoctorListPage;
