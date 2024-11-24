import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

// Hàm upload ảnh lên Cloudinary
const uploadToCloudinary = async (file) => {
  const data = new FormData();
  data.append('file', {
    uri: file.uri,
    type: file.type, // Loại file, ví dụ: image/jpeg
    name: file.fileName, // Tên file
  });
  data.append('upload_preset', 'upload-avatar'); // Thay bằng upload preset của bạn

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dy8p5yjsd/image/upload`,
      data
    );
    console.log('Uploaded successfully:', response.data);
    return response.data.secure_url; // URL của ảnh sau khi upload
  } catch (error) {
    console.error('Upload failed:', error);
    return null; // Trả về null nếu lỗi
  }
};

import { PermissionsAndroid } from 'react-native';

const requestStoragePermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                title: 'Quyền truy cập thư viện ảnh',
                message: 'Ứng dụng cần quyền truy cập vào thư viện ảnh của bạn.',
                buttonNeutral: 'Để sau',
                buttonNegative: 'Hủy',
                buttonPositive: 'OK',
            }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
        console.warn(err);
        return false;
    }
};

// Hàm chọn và tải ảnh
export const selectAndUploadImage = async () => {
  try {
    const result = await new Promise((resolve, reject) => {
      launchImageLibrary({}, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          reject('User cancelled image picker');
        } else if (response.errorCode) {
          console.error('Image Picker Error: ', response.errorMessage);
          reject(response.errorMessage);
        } else {
          resolve(response.assets[0]); // Trả về asset ảnh
        }
      });
    });

    // Tải ảnh lên Cloudinary
    const uploadedUrl = await uploadToCloudinary(result);
    return uploadedUrl; // Trả về URL ảnh sau khi upload
  } catch (error) {
    console.error('Error selecting/uploading image:', error);
    return null; // Trả về null nếu lỗi
  }
};
