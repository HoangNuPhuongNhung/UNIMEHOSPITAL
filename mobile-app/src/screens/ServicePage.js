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

const ServicePage = () => {
    const [search, setSearch] = useState('');
    const [services, setServices] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(5);
    const navigation = useNavigation();

    // Fetch services
    const fetchServices = async () => {
        try {
            const response = await axios.get('https://api.unime.site/UNIME/services/get/serviceList');
            if (response.data.code === 1000) {
                setServices(response.data.result);
            }   
        } catch (error) {
            console.log('Error fetching services:', error);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const loadMoreServices = () => {
        setCurrentIndex((prevIndex) => prevIndex + 5);
    };

    const filteredServices = services.filter((service) => 
        service.serviceName.toLowerCase().includes(search.toLowerCase())
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
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Tìm kiếm dịch vụ"
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

                {filteredServices.slice(0, currentIndex).map((service) => (
                    <View key={service.serviceId} style={styles.card}>
                        <Image source={{ uri: service.serviceImage }} style={styles.serviceImage} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.serviceName}>{service.serviceName}</Text>
                            <Text style={styles.serviceDescription}>{service.serviceDescription}</Text>
                            <Text style={styles.price}>
                                {Number(service.servicePrice).toLocaleString('vi-VN')} VNĐ
                            </Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => navigation.navigate('DoctorByServicePage', { service })}
                                >
                                    <Text style={styles.buttonText}>Xem danh sách Bác sĩ</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => navigation.navigate('book service', { service })}
                                >
                                    <Text style={styles.buttonText}>Đặt dịch vụ</Text>
                                </TouchableOpacity> */}
                            </View>
                        </View>
                    </View>
                ))}

                {currentIndex < filteredServices.length && (
                    <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreServices}>
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
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 24
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
    serviceImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 15,
    },
    infoContainer: {
        flex: 1,
    },
    serviceName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    price: {
        fontSize: 14,
        color: '#4D9DE0',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 5,
    },
    serviceDescription: {
        fontSize: 14,
        color: '#777',
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
});

export default ServicePage;
