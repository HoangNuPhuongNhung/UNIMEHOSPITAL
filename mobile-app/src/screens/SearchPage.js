import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const DoctorListPage = () => {
  const [search, setSearch] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(5);
  const navigation = useNavigation();
  const [selectedDepartment, setSelectedDepartment] = useState('Tất cả');
  const [departments, setDepartments] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      const response = await axios.get('https://api.unime.site/UNIME/departments/get/departmentList');
      if (response.data.code === 1000) {
        setDepartments([{ departmentId: 0, departmentName: 'Tất cả' }, ...response.data.result]);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  // Fetch doctors based on department
  const fetchDoctors = async (departmentId) => {
    try {
      let response;
      if (departmentId === 0) {
        // Fetch all doctors
        response = await axios.get('https://api.unime.site/UNIME/doctors/get/doctorList');
      } else {
        // Fetch doctors by department
        response = await axios.get(`http://api.unime.site:8888/UNIME/doctors/get/byDepartment?doctor_departmentId=${departmentId}`);
      }
      
      if (response.data.code === 1000) {
        setDoctors(response.data.result);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchDoctors(0); // Initially fetch all doctors
  }, []);

  // Handle department selection
  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department.departmentName);
    fetchDoctors(department.departmentId);
    setShowDropdown(false);
  };

  const loadMoreDoctors = () => {
    setCurrentIndex((prevIndex) => prevIndex + 5);
  };

  const filteredDoctors = doctors.filter((doctor) => 
    doctor.doctorName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.filterContainer}>
          <Text style={styles.label}>Chuyên khoa</Text>
          <View style={styles.dropdown}>
            <TouchableOpacity 
              onPress={() => setShowDropdown(!showDropdown)}
              style={styles.dropdownButton}
            >
              <Text style={styles.dropdownButtonText}>{selectedDepartment}</Text>
              <Icon name="arrow-drop-down" size={24} color="#333" />
            </TouchableOpacity>
            {showDropdown && (
              <View style={styles.dropdownMenu}>
                {departments.map((dept) => (
                  <TouchableOpacity
                    key={dept.departmentId}
                    onPress={() => handleDepartmentSelect(dept)}
                  >
                    <Text style={styles.dropdownItem}>{dept.departmentName}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        <Text style={styles.label}>Tên bác sĩ</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm bác sĩ"
            value={search}
            onChangeText={setSearch}
            keyboardType="default"
            autoCorrect={false}
            autoFocus={false}
            returnKeyType="search"
            enablesReturnKeyAutomatically={true}
            blurOnSubmit={true}
          />
          <Icon name="search" size={24} color="#333" style={styles.searchIcon} />
        </View>

        {filteredDoctors.slice(0, currentIndex).map((doctor) => (
          <View key={doctor.doctorId} style={styles.card}>
            <Image source={{ uri: doctor.doctorImage }} style={styles.doctorImage} />
            <View style={styles.infoContainer}>
              <Text style={styles.doctorName}>{doctor.doctorName}</Text>
              <Text style={styles.hospital}>{doctor.doctorAddress}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('DoctorDetailPage', { doctor })}
                >
                  <Text style={styles.buttonText}>Xem chi tiết</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('book doctor', { doctor })}
                >
                  <Text style={styles.buttonText}>Đặt khám</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {currentIndex < filteredDoctors.length && (
          <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreDoctors}>
            <Text style={styles.loadMoreText}>Xem thêm</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(244, 246, 252, 0.2)',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 150,
    marginTop: 24
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginLeft: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
    marginTop: 10,
    marginBottom: 30,
  },
  loadMoreText: {
    color: '#fff',
    fontSize: 16,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    zIndex: 10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    fontSize: 16,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 3,
  },
  dropdownButtonText: {
    fontSize: 15,
  },
});

export default DoctorListPage;
