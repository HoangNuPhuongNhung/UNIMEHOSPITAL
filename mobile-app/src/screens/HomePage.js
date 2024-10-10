import React from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity, Image ,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AntDesign } from '@expo/vector-icons';



const appointments = [
  { id: 1, title: 'Tâm lý', place: 'Phòng khám Saigon', date: '25 Sep', time: '10:30am', icon: 'account' },
  { id: 2, title: 'Tiêu hóa', place: 'Bệnh viện chợ rẫy', date: '26 Sep', time: '10:30am', icon: 'account' },
  { id: 3, title: 'Tiêu hóa', place: 'Bệnh viện chợ rẫy', date: '26 Sep', time: '10:30am', icon: 'account' },
  { id: 4, title: 'Tiêu hóa', place: 'Bệnh viện chợ rẫy', date: '26 Sep', time: '10:30am', icon: 'account' },
];

const categories = [
  { name: 'Tim', icon: 'heart-outline' },
  { name: 'Nha khoa', icon: 'heart-outline' },
  { name: 'Thận', icon: 'heart-outline' },
  { name: 'Dạ dày', icon: 'heart-outline' },
  { name: 'Phổi', icon: 'heart-outline' },
  { name: 'Não', icon: 'heart-outline' },
  { name: 'Tâm thần', icon: 'heart-outline' },
  { name: 'Gan', icon: 'heart-outline' },
];

const HomePage = () => {
  const renderItem = ({ item }) => (
    <View style={styles.appointmentCard}>
      <Icon name={item.icon} size={30} color="#fff" />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.place}>{item.place}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/background.png')} 
      style={styles.background}
      resizeMode=""
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>  
          <View style={styles.welcomeContainer}>
            <Image
              style={styles.logo}
              source={{
                uri: 'https://i.pinimg.com/236x/77/b3/a6/77b3a6bda74bd0019cee11780571769c.jpg',
              }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style= {{ fontSize: 20, fontWeight: '600' }}>Nguyen Dac Nhat Hoang</Text>
              <Text>Good Morning</Text>
            </View>
            <AntDesign
              name="bells"
              size={22}
              color='#4c9de0'
              style={styles.bellIcon}
            />
          </View>
        </View>

        {/*  */}
        <View style={styles.container}>
          <Text style={styles.header}>Lịch hẹn sắp tới</Text>
          <View style={styles.appointmentContainer}>
            <FlatList
              data={appointments}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        {/*  */}
        <View style={styles.container}>
          <Text style={styles.header}>Danh mục</Text>
          <View style={styles.categoryContainer}>
            {categories.map(category => (
              <TouchableOpacity key={category.name} style={styles.categoryCard}>
                <Icon name={category.icon} size={30} color="#4D9DE0" />
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
    backgroundColor: 'rgba(244, 246, 252, 0.9)', 
    padding: 20,
    borderRadius: 10, 
    margin: 10, 
    borderRadius: 10,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', 
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Thêm màu nền với opacity
    padding: 10,
    borderRadius: 10,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bellIcon: {
    position: 'absolute',
    right: 15,
  },
  appointmentContainer: {
    marginBottom: 20,
  },
  appointmentCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(77, 157, 224, 0.9)', // Sử dụng màu nền có opacity
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
    width: 250,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  place: {
    color: '#fff',
    fontSize: 14,
  },
  dateContainer: {
    flexDirection: 'row',
    marginTop: 5,
    
  },
  date: {
    color: '#fff',
    marginRight: 20,
  },
  time: {
    color: '#fff',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  categoryCard: {
    width: '45%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    borderRadius: 10,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4D9DE0',
  },
});


export default HomePage;