import {
  View,
  Text, StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Snackbar } from 'react-native-paper';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { signUp, errNullonUmount } from '../../Slices/Authentication/authenticationSlice'
import UploadImage from '../../components/UploadImage'
import { storage } from '../../Firebase/firebase'

const Signup = () => {

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nameError, setNameError] = useState(false)
  const [errorEmptyEmail, setErrorEmptyEmail] = useState(false)
  const [errorValidEmail, setErrorValidEmail] = useState(false)
  const [errorPasswordEmpty, setErrorPasswordEmpty] = useState(false)
  const [errorConfirmPasswordEmpty, setErrorConfirmPasswordEmpty] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [errTicker, setErrTicker] = useState(false)
  const [buttonYPosition, setButtonYPosition] = useState(0)

  const { user, loading, signUperror } = useSelector(state => state.authentication)


  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {


    return () => {
      dispatch(errNullonUmount())
    }
  }, [])


  const handleSignUp = async () => {
    if (fullName.trim() === '') {
      setNameError(true)
      // setErrorConfirmPasswordEmpty(false)
      setErrorEmptyEmail(false)
    }
    else if (email.trim() === '') {
      setNameError(false)
      setErrorEmptyEmail(true)
      setErrorConfirmPasswordEmpty(false)
    }
    else if (!email.includes('@')) {
      setNameError(false)
      setErrorEmptyEmail(false)
      setErrorValidEmail(true)
      setErrorConfirmPasswordEmpty(false)
    }
    else if (password.trim() === '') {
      setNameError(false)
      setErrorEmptyEmail(false)
      setErrorValidEmail(false)
      setErrorPasswordEmpty(true)
      setErrorConfirmPasswordEmpty(false)
    }
    else if (password !== confirmPassword) {
      setNameError(false)
      setErrorPasswordEmpty(false)
      setErrorConfirmPasswordEmpty(true)
      setErrorEmptyEmail(false)
    }
    else {
      setErrorConfirmPasswordEmpty(false)
      await dispatch(signUp({ fullName, email, password }))
    }
  }

  useEffect(()=>{
      console.log('Run navigation')
      if (user) {
        router.replace('/(event)/Events')
      }
    },[user])

  const handleUploadImage = async (uri) => {

    try {
        

      const responce = await fetch(uri);
      const blob = await responce.blob()

      const fileName = `images/${Date.now()}`
      const storageRef = ref( storage, fileName)

      setUploading(true)
      console.log('Loading True tryyyyyyy')
      const snapshot = await uploadBytes(storageRef, blob)
      const downloadURL = await getDownloadURL(snapshot.ref)

      setUploading(false)
      console.log('Loading False tryyyyy')
      return downloadURL
      
      
  } catch (error) {
  
    // console.error('Error uploading image:', error);
    // alert('Failed to upload image');
    setUploading(false);
    setErrTicker(true)
    // console.log("loading false error wala")
    return null;

  } 
  // finally{

  //     setUploading(false)
  //     console.log('loading false finally wala')
  //     setModalVisible(false)
  // }    

  }



  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient
          colors={['#020024', '#6775de', '#0023ff']}
          style={styles.container}>



          <View style={styles.profilePic}>
            <Ionicons
              style={{ marginBottom: 5.5 }}
              name='person-sharp'
              size={80}
              color='white' />
              {uploading? <View style={styles.uploadingPic}>
              <ActivityIndicator size='large' color='#e6f621' />
              </View>: null}
            <View style={styles.uploadArea}>
              <UploadImage
              uploadImage = {handleUploadImage} 
              />
            </View>
          </View>
          <View>
            {/* <TextInput 
      style={styles.TextInput_4GDWO} 
      placeholder='Full Name'
      placeholderTextColor='#A9A9A9'
      onChangeText={text=>setFullName(text)}
      value={fullName}/> */}

            <TextInput
              style={nameError ? styles.errorInputs : styles.TextInput_4GDWO}
              placeholder='Full Name'
              placeholderTextColor='#A9A9A9'
              onChangeText={text => setFullName(text)}
              value={fullName} />

            {nameError ? <Text style={{ color: 'red', marginBottom: 5 }}>*Required Full Name</Text> : null}

            <TextInput
              style={
                errorEmptyEmail
                  ?
                  styles.errorInputs
                  :
                  errorValidEmail
                    ?
                    styles.errorInputs
                    :
                    styles.TextInput_4GDWO}
              keyboardType='email-address'
              placeholder='E-mail Address'
              placeholderTextColor='#A9A9A9'
              onChangeText={text => setEmail(text)}
              value={email} />

            {
              errorEmptyEmail ? <Text style={{ color: 'red', marginBottom: 5 }}>*Required E-mail Address</Text>
                :
                errorValidEmail ? (
                  <Text style={{ color: 'red', marginBottom: 5 }}>
                    *Required Valid E-mail Address
                  </Text>
                ) : null
            }

            <TextInput
              style={errorPasswordEmpty ? styles.errorInputs : styles.TextInput_4GDWO}
              secureTextEntry={true}
              placeholder='Password'
              placeholderTextColor='#A9A9A9'
              onChangeText={text => setPassword(text)}
              value={password} />

            {
              errorPasswordEmpty ? (
                <Text style={{ color: 'red', marginBottom: 5 }}>
                  *Reuired Password
                </Text>) : null
            }

            <TextInput
              style={errorConfirmPasswordEmpty ? styles.errorInputs : styles.TextInput_4GDWO}
              secureTextEntry={true}
              placeholder='Confirm Password'
              placeholderTextColor='#A9A9A9'
              onChangeText={text => setConfirmPassword(text)}
              value={confirmPassword} />

              

            {
              signUperror === 'Firebase: Password should be at least 6 characters (auth/weak-password).'
              && errorConfirmPasswordEmpty ? (
                <Text style={{ color: 'red', marginBottom: 5 }}>
                  *Password Dosn't Match
                </Text>
              ): errorConfirmPasswordEmpty ? (
                <Text style={{ color: 'red', marginBottom: 5 }}>
                  *Password Dosn't Match
                </Text>) : signUperror ?
                signUperror === 'Firebase: Error (auth/email-already-in-use).'
                  // signUperror === 'Firebase: Password should be at least 6 characters (auth/weak-password).' 
                  ?
                  (
                    <Text style={styles.firebaseError}>
                      *E-mail already exists
                    </Text>
                  )
                  :
                  signUperror === 'Firebase: Password should be at least 6 characters (auth/weak-password).' ?
                    (
                      <Text style={styles.firebaseError}>
                        *Password should be at least 6 characters
                      </Text>
                    )
                    :
                    (
                      <Text style={styles.firebaseError}>
                        *Invalid E-mail Address
                      </Text>
                    )
                :
                (
                  null
                )
            }

            {/* {
              errorConfirmPasswordEmpty ? (
                <Text style={{ color: 'red', marginBottom: 5 }}>
                  *Password Dosn't Match
                </Text>) : null
            } */}

            

            {/* {
              signUperror ?
                signUperror === 'Firebase: Error (auth/email-already-in-use).'
                  // signUperror === 'Firebase: Password should be at least 6 characters (auth/weak-password).' 
                  ?
                  (
                    <Text style={styles.firebaseError}>
                      *E-mail already exists
                    </Text>
                  )
                  :
                  signUperror === 'Firebase: Password should be at least 6 characters (auth/weak-password).' ?
                    (
                      <Text style={styles.firebaseError}>
                        *Password should be at least 6 characters
                      </Text>
                    )
                    :
                    (
                      <Text style={styles.firebaseError}>
                        *Invalid E-mail Address
                      </Text>
                    )
                :
                (
                  null
                )
            } */}

            {/* <TouchableOpacity
      style={styles.registerButton}
      onPress={handleSignUp}>
        {
          loading ? (
            <ActivityIndicator size='small' color='white'/>
          ):(
            <Text 
        style={styles.registerText}>
          Register
        </Text>
          )
        }
        
      </TouchableOpacity> */}


            {/* <TouchableOpacity
      style={styles.registerButton}
      >
      </TouchableOpacity> */}
            {/* <TouchableOpacity
      style={styles.registerButton}
      >
      </TouchableOpacity>  */}



            {/* <UploadImage/> */}


            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleSignUp}
              onLayout={e =>{
                setButtonYPosition(e.nativeEvent.layout.y + e.nativeEvent.layout.height + 10)
              }
              }>
              {
                loading ? (
                  <ActivityIndicator size='small' color='white' />
                ) : (
                  <Text
                    style={styles.registerText}>
                    Register
                  </Text>
                )
              }

            </TouchableOpacity>


            

          </View>

          { errTicker ?
          <Snackbar
            style={styles.snakbarError}
              visible={errTicker}
              onDismiss={()=>setErrTicker(false)}
              duration={3000}>
                Error : Failed to Upload Image
              </Snackbar> : null
              }
          

          

        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Signup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0
  },
  TextInput_4GDWO: {
    backgroundColor: "white",
    width: 280,
    marginBottom: 10,
    borderRadius: 20,
    paddingVertical: 13,
    paddingHorizontal: 15,
    height: 45,
  },
  errorInputs: {
    backgroundColor: "white",
    width: 280,
    marginBottom: 1,
    borderRadius: 20,
    paddingVertical: 13,
    paddingHorizontal: 15,
    height: 45,
    borderWidth: 1.5,
    borderColor: 'red',

  },
  registerButton: {
    width: 280,
    height: 50,
    backgroundColor: '#c2d106',
    marginTop: 10,
    borderRadius: 20,
    justifyContent: 'center'
  },
  registerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18
  },
  firebaseError: {
    color: 'red',
    fontSize: 14
  },
  profilePic: {
    height: 110,
    width: 110,
    borderRadius: 55,
    backgroundColor: '#d2d3cf',
    marginBottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  uploadArea: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 35,
    height: 35,
    backgroundColor: '#e6f621',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  uploadingPic:{
    flex:1,
    backgroundColor:'grey',
    position:'absolute',
    height: 110,
    width: 110,
    borderRadius: 55,
    opacity:0.6,
    justifyContent:'center',
    alignItems:'center'
  },
  snakbarError:{
    position: 'absolute', 
    bottom: 50, 
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center',
    width:'70%',
    alignSelf:'center',
    borderRadius:30,
    justifyContent:'center'
  }
})
