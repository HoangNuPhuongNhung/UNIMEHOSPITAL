import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const getFileForUpload = async (uri) => {
  const newUri = FileSystem.cacheDirectory + 'temp_upload.jpg'; 
  await FileSystem.copyAsync({
    from: uri,
    to: newUri,
  });
  return {
    uri: newUri,
    type: 'image/jpeg', // Định dạng MIME
    name: 'temp_upload.jpg', // Tên file
  };
};

const uploadToCloudinary = async (file) => {


  const data = new FormData();
  data.append('file', {
    uri: file.uri,
    type: file.type || 'image/jpeg', // Định dạng ảnh
    name: file.name || 'upload.jpg', // Tên ảnh
  });
  data.append('upload_preset', 'upload-avatar');
  console.log('FormData:', data);
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dy8p5yjsd/image/upload`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log('Uploaded successfully:', response.data);
    return response.data.secure_url; // URL của ảnh sau khi upload
  } catch (error) {
    console.error('Upload failed:', error);
    return null;
  }
};

export const selectAndUploadImage = async () => {
  try {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Ứng dụng cần quyền truy cập thư viện ảnh!');
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const file = await getFileForUpload(result.assets[0].uri); // Chuyển đổi URI
      const uploadedUrl = await uploadToCloudinary(file);
      console.log('Uploaded image URL:', uploadedUrl);
      return uploadedUrl;
    } else {
      console.log('User cancelled image picker');
      return null;
    }
  } catch (error) {
    console.error('Error selecting/uploading image:', error);
    return null;
  }
};
