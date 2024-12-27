import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectAndUploadImage } from '../services/imageService';
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { refreshToken, checkValidToken } from '../services/tokenHelper';
const UserInfoPage = () => {
    const { userInfo, updateUserInfo } = useContext(UserContext);

    const [name, setName] = useState(userInfo?.patientName || '');
    const [phone, setPhone] = useState(userInfo?.patientPhoneNumber || '');
    const [birthdate, setBirthdate] = useState(userInfo?.patientDateOfBirth || '');
    const [address, setAddress] = useState(userInfo?.patientAddress || '');
    const initialGender = userInfo?.patientGender === true ? 'male' : 'female';
    const [gender, setGender] = useState(initialGender);
    const [showPicker, setShowPicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [image, setImage] = useState(userInfo?.patientImage || '');
    const { logout } = useContext(AuthContext);
    const navigation = useNavigation();

    const openImagePicker = async () => {
        try {
            const uploadedUrl = await selectAndUploadImage(); // Chọn và upload ảnh
            if (uploadedUrl) {
                setImage(uploadedUrl); // Lưu URL vào state
                // Alert.alert('Thành công', 'Ảnh đã được tải lên!');
                Toast.show({
                    type: 'success',
                    text1: 'Thành công',
                    text2: 'Ảnh đã được tải lên!',
                    visibilityTime: 2000,
                    autoHide: true,
                });
            } else {
                // Alert.alert('Lỗi', 'Không thể tải ảnh lên!');
                Toast.show({
                    type: 'error',
                    text1: 'Lỗi',
                    text2: 'Không thể tải ảnh lên!',
                    visibilityTime: 2000,
                    autoHide: true,
                });
            }
        } catch (error) {
            console.error('Error selecting/uploading image:', error);
            // Alert.alert('Lỗi', 'Đã xảy ra lỗi khi chọn hoặc tải ảnh!');
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: 'Đã xảy ra lỗi khi chọn hoặc tải ảnh!',
                visibilityTime: 2000,
                autoHide: true,
            });
        }
    };

    const onDateChange = (event, selectedDate) => {
        setShowPicker(Platform.OS === 'ios');
        if (event.type === 'dismissed') {
            return;
        }
        if (selectedDate) {
            setDate(selectedDate);
            // Format date to YYYY-MM-DD
            const formattedDate = selectedDate.toISOString().split('T')[0];
            setBirthdate(formattedDate);
        }
    };

    const showDatePicker = () => {
        setShowPicker(true);
    };

    const handleLogout = () => {
        Alert.alert(
            "Phiên đăng nhập hết hạn",
            "Vui lòng đăng nhập lại!",
            [
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Đồng ý", onPress: () => {
                        logout();
                        navigation.replace("Login");
                    }
                }
            ],
            { cancelable: true }
        );
    };

    const update = async () => {
        try {
            if (
                name === userInfo?.patientName &&
                phone === userInfo?.patientPhoneNumber &&
                birthdate === userInfo?.patientDateOfBirth &&
                address === userInfo?.patientAddress &&
                gender === (userInfo?.patientGender ? 'male' : 'female') &&
                image === userInfo?.patientImage
            ) {
                // Alert.alert('Thông báo', 'Không có thay đổi nào để cập nhật!');
                Toast.show({
                    type: 'warning',
                    text1: 'Thông báo',
                    text2: 'Không có thay đổi nào để cập nhật!',
                    visibilityTime: 2000,
                    autoHide: true,
                });
                return;
            }

            // const token = await getToken();
            // console.log(token);
            const tokenString = await AsyncStorage.getItem('userToken');
            let token = tokenString ? JSON.parse(tokenString) : null;

            if (!token || !token.raw) {
                console.log("Token không tồn tại");
                Toast.show({
                    type: 'error',
                    text1: 'Lỗi',
                    text2: 'Bạn chưa đăng nhập, vui lòng đăng nhập lại.',
                    visibilityTime: 2000,
                    autoHide: true,
                });
                return;
            }
            const payload = {
                patientId: userInfo?.patientId,
                userId: userInfo?.userId,
                patientUsername: userInfo?.patientUsername,
                patientEmail: userInfo?.patientEmail,
                patientImage: image,
                patientName: name,
                patientAddress: address,
                patientPhoneNumber: phone,
                patientGender: gender === 'male',
                patientDateOfBirth: birthdate,
            };
            const checkToken = await checkValidToken(token.raw);
            if (checkToken) {
                console.log('Token còn hạn!');
                try {
                    await axios.put(
                        'https://api.unime.site/UNIME/patients/update',
                        payload,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token.raw}`,
                            },
                        }
                    );

                } catch (error) {
                    console.error('Lỗi cập nhật thông tin:', error);
                    console.log('ahihi');
                    Toast.show({
                        type: 'error',
                        text1: 'Lỗi',
                        text2: 'Đã xảy ra lỗi, vui lòng thử lại sau.',
                        visibilityTime: 2000,
                        autoHide: true,
                    });
                }
            } else {
                console.log('Token hết hạn ! Đợi làm mới');
                const newToken = await refreshToken();
                if (newToken) {
                    token = { raw: newToken };
                    try {
                        await axios.put(
                            'https://api.unime.site/UNIME/patients/update',
                            payload,
                            {
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token.raw}`,
                                },
                            }
                        );
                    } catch (error) {
                        console.error('Lỗi cập nhật thông tin:', error);
                        console.log('ahihi');
                        Toast.show({
                            type: 'error',
                            text1: 'Lỗi',
                            text2: 'Đã xảy ra lỗi, vui lòng thử lại sau.',
                            visibilityTime: 2000,
                            autoHide: true,
                        });
                    }
                }else {
                    handleLogout();
                    return;
                }
            }
            console.log('Đổi được thông tin rồi');
            updateUserInfo(payload);
            // Alert.alert('Thành công', 'Cập nhật thông tin thành công!');
            Toast.show({
                type: 'success',
                text1: 'Thành công',
                text2: 'Cập nhật thông tin thành công!',
                visibilityTime: 2000,
                autoHide: true,
            });
        } catch (error) {
            console.error('API Error:', error);
            // Alert.alert('Lỗi', 'Không thể cập nhật thông tin!');
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: 'Không thể cập nhật thông tin!',
                visibilityTime: 2000,
                autoHide: true,
            });
        }
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.avatarContainer} onPress={openImagePicker}>
                <Image
                    source={{ uri: image || userInfo?.patientImage }}
                    style={styles.avatar}
                />
            </TouchableOpacity>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Họ và tên</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Số điện thoại</Text>
                <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Ngày sinh</Text>
                <TouchableOpacity
                    style={styles.input}
                    onPress={showDatePicker}
                >
                    <Text style={[styles.dateText, !birthdate && styles.placeholderText]}>
                        {birthdate || 'Chọn ngày sinh'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Giới tính</Text>
                <View style={styles.genderContainer}>
                    <TouchableOpacity
                        style={[
                            styles.genderButton,
                            gender === 'male' && styles.selectedButton,
                        ]}
                        onPress={() => setGender('male')}
                    >
                        <Text style={[
                            styles.genderText,
                            gender === 'male' && { color: '#FFF' }
                        ]}>Nam</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.genderButton,
                            gender === 'female' && styles.selectedButton,
                        ]}
                        onPress={() => setGender('female')}
                    >
                        <Text style={[
                            styles.genderText,
                            gender === 'female' && { color: '#FFF' }
                        ]}>Nữ</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Địa chỉ</Text>
                <TextInput
                    style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                    value={address}
                    onChangeText={setAddress}
                    multiline={true}
                />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={update}>
                <Text style={styles.saveButtonText}>Xong</Text>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onDateChange}
                    maximumDate={new Date()} // Không cho chọn ngày trong tương lai
                    minimumDate={new Date(1900, 0, 1)} // Giới hạn năm sinh từ 1900
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9F4FE',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    backText: {
        fontSize: 20,
        color: '#007AFF',
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#D9D9D9',
    },
    editAvatar: {
        marginTop: 5,
        color: '#007AFF',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#C4C4C4',
        borderRadius: 10,
        backgroundColor: '#FFF',
        padding: 10,
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    genderButton: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#C4C4C4',
        borderRadius: 10,
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    genderText: {
        color: '#000',
    },
    saveButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
});

export default UserInfoPage;
