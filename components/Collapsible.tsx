import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const ImageUploadModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Request camera permissions
  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === 'granted';
  };

  // Request gallery permissions
  const requestGalleryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === 'granted';
  };

  // Take photo using camera
  const takePhoto = async () => {
    const hasPermission = await requestCameraPermissions();
    if (!hasPermission) {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      await uploadImage(result.assets[0].uri);
      setModalVisible(false);
    }
  };

  // Pick image from gallery
  const pickImage = async () => {
    const hasPermission = await requestGalleryPermissions();
    if (!hasPermission) {
      alert('Sorry, we need gallery permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      await uploadImage(result.assets[0].uri);
      setModalVisible(false);
    }
  };

  // Upload image to Firebase Storage
  const uploadImage = async (uri: string) => {
    try {
      // Ensure user is authenticated
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (!user) {
        alert('Please log in first');
        return null;
      }

      // Convert URI to Blob
      const response = await fetch(uri);
      const blob = await response.blob();

      // Create a reference to the storage service
      const storage = getStorage();
      
      // Create a reference to 'images/[userId]/[timestamp]'
      const storageRef = ref(storage, `images/${user.uid}/${Date.now()}`);

      // Upload the image
      setUploading(true);
      const snapshot = await uploadBytes(storageRef, blob);

      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Here you can save the downloadURL to your database (e.g., Firestore)
      // For example: await updateUserProfile(user.uid, { profileImageUrl: downloadURL })

      setUploading(false);
      return downloadURL;

    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
      setUploading(false);
      return null;
    }
  };

  return (
    <View>
      {/* Button to open modal */}
      <TouchableOpacity 
        style={styles.uploadButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.uploadButtonText}>Upload Profile Picture</Text>
      </TouchableOpacity>

      {/* Modal for image selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={takePhoto}
            >
              <Text style={styles.modalButtonText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.modalButton}
              onPress={pickImage}
            >
              <Text style={styles.modalButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  uploadButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    backgroundColor: '#2196F3',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ImageUploadModal;