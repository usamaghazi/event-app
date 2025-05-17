import {
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { signUp, errNullonUmount } from '../../../Slices/Authentication/authenticationSlice'
import UploadImage from '../../../components/UploadImage'
import { storage } from '../../../Services/Firebase/firebase'
import { LinearGradientContainer, 
         ProfileImage,
         UploadingImage,
         UploadArea,
         NameInput,
         ErrorText,
         EmailInput,
         PasswordInput,
         ConfirmPasswordInput,
         RegisterButton,
         RegisterButtonText,
         ErrorSnackBar} from './Styles'

const SignupScreen = () => {

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
        <LinearGradientContainer>


          <ProfileImage>
            <Ionicons
              style={{ marginBottom: 5.5 }}
              name='person-sharp'
              size={80}
              color='white' />
              {uploading? <UploadingImage>
              <ActivityIndicator size='large' color='#e6f621' />
              </UploadingImage>: null}
            <UploadArea>
              <UploadImage
              uploadImage = {handleUploadImage} 
              />
            </UploadArea>
          </ProfileImage>
          <View>

            <NameInput
              placeholder='Full Name'
              placeholderTextColor='#A9A9A9'
              onChangeText={text => setFullName(text)}
              hasError={nameError}
              value={fullName} />

            {nameError ? <ErrorText>*Required Full Name</ErrorText> : null}

            <EmailInput
              errorEmptyEmail={errorEmptyEmail}
              errorValidEmail={errorValidEmail}
              keyboardType='email-address'
              placeholder='E-mail Address'
              placeholderTextColor='#A9A9A9'
              onChangeText={text => setEmail(text)}
              value={email} />

            {
              errorEmptyEmail ? <ErrorText>*Required E-mail Address</ErrorText>
                :
                errorValidEmail ? (
                  <ErrorText>
                    *Required Valid E-mail Address
                  </ErrorText>
                ) : null
            }

            <PasswordInput
              hasError={errorPasswordEmpty}
              secureTextEntry={true}
              placeholder='Password'
              placeholderTextColor='#A9A9A9'
              onChangeText={text => setPassword(text)}
              value={password} />

            {
              errorPasswordEmpty ? (
                <ErrorText>
                  *Reuired Password
                </ErrorText>) : null
            }

            <ConfirmPasswordInput
            hasError={errorConfirmPasswordEmpty}
              secureTextEntry={true}
              placeholder='Confirm Password'
              placeholderTextColor='#A9A9A9'
              onChangeText={text => setConfirmPassword(text)}
              value={confirmPassword} />

              

            {
              signUperror === 'Firebase: Password should be at least 6 characters (auth/weak-password).'
              && errorConfirmPasswordEmpty ? (
                <ErrorText>
                  *Password Dosn't Match
                </ErrorText>
              ): errorConfirmPasswordEmpty ? (
                <ErrorText>
                  *Password Dosn't Match
                </ErrorText>) : signUperror ?
                signUperror === 'Firebase: Error (auth/email-already-in-use).'
                  ?
                  (
                    <ErrorText>
                      *E-mail already exists
                    </ErrorText>
                  )
                  :
                  signUperror === 'Firebase: Password should be at least 6 characters (auth/weak-password).' ?
                    (
                      <ErrorText>
                        *Password should be at least 6 characters
                      </ErrorText>
                    )
                    :
                    (
                      <ErrorText>
                        *Invalid E-mail Address
                      </ErrorText>
                    )
                :
                (
                  null
                )
            }

            <RegisterButton
              onPress={handleSignUp}
              onLayout={e =>{
                setButtonYPosition(e.nativeEvent.layout.y + e.nativeEvent.layout.height + 10)
              }
              }>
              {
                loading ? (
                  <ActivityIndicator size='small' color='white' />
                ) : (
                  <RegisterButtonText>
                    Register
                  </RegisterButtonText>
                )
              }

            </RegisterButton>


            

          </View>

          { errTicker ?
          <ErrorSnackBar
              visible={errTicker}
              onDismiss={()=>setErrTicker(false)}
              duration={3000}>
                Error : Failed to Upload Image
              </ErrorSnackBar> : null
              }
        </LinearGradientContainer>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignupScreen

