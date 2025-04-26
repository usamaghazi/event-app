import { View, Text, TouchableOpacity,StyleSheet,Modal } from 'react-native'
import React, {useState} from 'react'
import * as ImagePicker from 'expo-image-picker'
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Ionicons } from '@expo/vector-icons'

// import { storage} from '../Firebase/firebase'


const UploadImage = ({ uploadImage }) => {

    const [modalVisible, setModalVisible] = useState(false)
    // const [uploading, setUploading] = useState(false)
    const [imageUri, setImageUri] = useState(null)

    const pickImage = async () => {
        
        const hasPressmisson = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(!hasPressmisson){
            return;
        }
        setModalVisible(false)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if(!result.canceled){
            setImageUri(result.assets[0].uri);
            await uploadImage(result.assets[0].uri);
            
        }
    }

    const takePhoto =async () => {
        
        const hasPermission = await ImagePicker.requestCameraPermissionsAsync()
        if (hasPermission.granted === false) {
            Alert.alert('Permission Required', 'You need to allow access to your camera.');
            return;
    }

    setModalVisible(false)
    const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    })

    if(!result.canceled){
        setImageUri(result.assets[0].uri);
        await uploadImage(result.assets[0].uri)
        console.log('Done Upload')
        
    }
}

// const uploadImage = async (uri) => {
//     try {
        

//         const responce = await fetch(uri);
//         const blob = await responce.blob()

//         const fileName = `images/${Date.now()}`
//         const storageRef = ref( storage, fileName)

//         setUploading(true)
//         console.log('Loading True tryyyyyyy')
//         const snapshot = await uploadBytes(storageRef, blob)
//         const downloadURL = await getDownloadURL(snapshot.ref)

//         setUploading(false)
//         console.log('Loading False tryyyyy')
//         return downloadURL
        
        
//     } catch (error) {
    
//       console.error('Error uploading image:', error);
//       alert('Failed to upload image');
//       setUploading(false);
//       console.log("loading false error wala")
//       return null;

//     } finally{

//         setUploading(false)
//         console.log('loading false finally wala')
//         setModalVisible(false)
//     }
// }

  return (
 <View>
        <TouchableOpacity
        //   style={styles.registerButton}
          onPress={()=>setModalVisible(true)}
          > 
        {/* <Text style={styles.registerText}> */}
        <Ionicons 
            name='camera-outline' 
            size={24}
            color='white'/>
        {/* </Text> */}
        </TouchableOpacity>


    <Modal
        visible={modalVisible}
        animationType='slide'
        transparent={true}
        onRequestClose={()=>{setModalVisible(false)}}>

        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <TouchableOpacity
                    style={styles.modalButton}
                    onPress={takePhoto}>
                    <Text
                    style={styles.modalButtonText}>
                        Take a Photo
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.modalButton}
                    onPress={pickImage}>
                    <Text
                    style={styles.modalButtonText}>
                        Choose from Gallery
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={()=>setModalVisible(false)}>
                    <Text
                        style={styles.cancelButtonText}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
</View>
  )
}

export default UploadImage


const styles = StyleSheet.create({
    registerButton:{
        width: 280,
        height:50,
        backgroundColor:'#c2d106',
        marginTop:10,
        borderRadius:20,
        justifyContent:'center'
      },
      registerText:{
        textAlign:'center',
        color:'white',
        fontSize:18
      },
    modalContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent:{
        backgroundColor:'white',
        borderRadius:20,
        padding:18,
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2
        },
        elevation:5,
        shadowOpacity:0.3,
        shadowRadius:4,
        width:'85%'
    },
    modalButton:{
        padding: 5,
        borderRadius: 10,
        marginVertical: 5,
    },
    modalButtonText:{
            color:'#92938c',
            fontSize:15,
            fontWeight:'700'
    },
    cancelButton:{
        
        padding: 13,
        borderRadius: 10,
        alignItems:'flex-end',
        // paddingBottom:300
        
    },
    cancelButtonText:{
        color:'red',
        fontSize:16,
    }
})