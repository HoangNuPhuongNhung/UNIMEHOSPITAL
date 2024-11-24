import React, { useEffect, useState,useContext } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AntDesign } from '@expo/vector-icons';
// import { Path, SvgUri } from "react-native-svg";
// import Svg, { Circle } from 'react-native-svg';
import { Path, Svg, Circle } from "react-native-svg";
import { UserContext } from '../contexts/UserContext';

const appointments = [
  { id: 1, title: 'Tâm lý', place: 'Phòng khám Saigon', date: '25 Sep', time: '10:30am', icon: 'account' },
  { id: 2, title: 'Tiêu hóa', place: 'Bệnh viện chợ rẫy', date: '26 Sep', time: '10:30am', icon: 'account' },
  { id: 3, title: 'Tiêu hóa', place: 'Bệnh viện chợ rẫy', date: '26 Sep', time: '10:30am', icon: 'account' },
  { id: 4, title: 'Tiêu hóa', place: 'Bệnh viện chợ rẫy', date: '26 Sep', time: '10:30am', icon: 'account' },
];

const categories = [
  { name: 'Tim', icon: require('../../assets/specialty/heart.png') },
  { name: 'Nha khoa', icon: require('../../assets/specialty/tooth.png') },
  { name: 'Thận', icon: require('../../assets/specialty/kidney.png') },
  { name: 'Dạ dày', icon: require('../../assets/specialty/stomach.png') },
  { name: 'Phổi', icon: require('../../assets/specialty/lungs.png') },
  { name: 'Nhi Khoa', icon: require('../../assets/specialty/child.png') },
];


const HomePage = () => {
  const { userInfo, updateUserInfo } = useContext(UserContext);
  const [greeting, setGreeting] = useState('');


  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return 'Chào buổi sáng!';
    else if (currentHour < 18) return 'Chào buổi chiều!';
    else return 'Chào buổi tối!';
  };


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
    <ImageBackground source={require('../../assets/background.png')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.welcomeContainer}>
            <Image
              style={styles.logo}
              source={{ uri: userInfo?.patientImage }}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: '600' }}>{userInfo?.patientName}</Text>
              <Text>{greeting} </Text>
            </View>
            <AntDesign name="bells" size={22} color='#4c9de0' style={styles.bellIcon} />
            {/* <View style={styles.bellIcon}>
              <Svg viewBox="0 0 24 24" >
                  <Path
                    d="M18.7491 9.70957V9.00497C18.7491 5.13623 15.7274 2 12 2C8.27256 2 5.25087 5.13623 5.25087 9.00497V9.70957C5.25087 10.5552 5.00972 11.3818 4.5578 12.0854L3.45036 13.8095C2.43882 15.3843 3.21105 17.5249 4.97036 18.0229C9.57274 19.3257 14.4273 19.3257 19.0296 18.0229C20.789 17.5249 21.5612 15.3843 20.5496 13.8095L19.4422 12.0854C18.9903 11.3818 18.7491 10.5552 18.7491 9.70957Z"
                    stroke="#2b6fce"
                    strokeWidth=".5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
              </Svg>
            </View> */}


          </View>
        </View>


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

        <View style={styles.container}>
          <Text style={styles.header}>Danh mục</Text>
          <View style={styles.categoryContainer}>
            {categories.map((category) => (
              <TouchableOpacity key={category.name} style={styles.categoryCard}>
                <Image source={category.icon} style={{ width: 30, height: 30 }} />
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
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
    // backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  bellIcon: {
    marginRight: 0,
    alignSelf: 'center',
  },
  appointmentContainer: {
    marginBottom: 20,
  },
  appointmentCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(77, 157, 224, 0.9)',
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
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
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
