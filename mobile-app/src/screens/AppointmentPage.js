import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';

const appointments = [
  {
    id: 1,
    date: '01/10/2024',
    time: '10:30-11:00',
    service: 'Khám bệnh',
    doctorName: 'Nguyễn Lân Việt',
    specialty: 'Tim mạch',
  },
  {
    id: 2,
    date: '01/10/2024',
    time: '10:30-11:00',
    service: 'Khám bệnh',
    doctorName: 'Nguyễn Lân Việt',
    specialty: 'Tim mạch',
  },
  {
    id: 3,
    date: '01/10/2024',
    time: '10:30-11:00',
    service: 'Khám bệnh',
    doctorName: 'Nguyễn Lân Việt',
    specialty: 'Tim mạch',
  },
];

const AppointmentCard = ({ appointment }) => (
  <View style={styles.card}>
    <View style={styles.infoRow}>
      <Text style={styles.value}>{appointment.date}</Text>
      <Text style={styles.value}>{appointment.time}</Text>
      <Text style={styles.value}>{appointment.service}</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.label}>Bác sĩ</Text>
      <Text style={styles.doctorName}>{appointment.doctorName}</Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.label}>Chuyên khoa</Text>
      <Text style={styles.specialty}>{appointment.specialty}</Text>
      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Hủy</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const AppointmentList = () => {
  return (

    <ImageBackground
      source={require('../../assets/background.png')} 
      style={styles.background}
      resizeMode=""
    >
      <ScrollView style={styles.container}>
      {appointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', 
  },
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#B4C3D1',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginRight: 10,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  specialty: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
  },
  cancelButton: {
    backgroundColor: '#FF5C5C',
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AppointmentList;
