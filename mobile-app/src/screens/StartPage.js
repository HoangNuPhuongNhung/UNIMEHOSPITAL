import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';

const StartPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/background.png')} 
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo-removebg.png')} // Đường dẫn đến logo của bạn
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.tagline}>Sức khỏe trong tầm tay, Lịch khám dễ dàng mỗi ngày!</Text>
        </View>
        <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.startButtonText}>Bắt đầu</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
  },
  tagline: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  startButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 50,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StartPage;
