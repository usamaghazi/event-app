import { 
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  ActivityIndicator
   } from 'react-native'
import React,{ useCallback, useEffect, useState } from 'react'
import { useRouter, useFocusEffect } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'

import { EmailInput,
         ErrorMessage,
         PasswordInput,
         LoginButton,
         LoginText,
         Or,
         CreateAccText,
         BackgroundImage,
         SafeArea } from './Styles';
import { signIn, errNullonUmount } from '../../../Slices/Authentication/authenticationSlice'        


const images = {
  ImageBackground_421AZ:
    "https://images.unsplash.com/photo-1467106015942-a0ea2960655a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTYyMDF8MHwxfHNlYXJjaHwyfHxuaWdodCUyMHNreXxlbnwwfHx8fDE3MjgxNzAzMTZ8MA&ixlib=rb-4.0.3&q=80&w=1080",
};

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emptyEmailField, setEmptyEmailField] = useState(false)
  const [emptyPasswordField, setEmptyPasswordField] = useState(false)

  const router =  useRouter()
  const dispatch = useDispatch()

  const { loading , user, signInerror } = useSelector(state => state.authentication)

  useEffect(() => {
    console.log('Index Running')
   if(user){
    router.replace('/(event)/Events')
   } 
  }, [user])
  

  const handleLogin = async () => {
    if(email.trim() === '' && password.trim() === ''){
      setEmptyEmailField(true)
      setEmptyPasswordField(true)
      
    }
    else if(email.trim() === ''){
      setEmptyEmailField(true)
      setEmptyPasswordField(false)
    }
    else if(password.trim() === ''){
      setEmptyEmailField(false)
      setEmptyPasswordField(true)
      
    }
    else{
      setEmptyEmailField(false)
      setEmptyPasswordField(false)
      await dispatch(signIn({ email, password }))

    }
  }

  useFocusEffect(
    useCallback(() => {
      return () => {
        setEmptyEmailField(false)
        setEmptyPasswordField(false)
        setEmail('')
        setPassword('')
        dispatch(errNullonUmount())
      }
     },[])
)  
  

  return (
   
    <SafeArea>
    <KeyboardAvoidingView
    style={{flex:1}}
    behavior={Platform.OS? 'padding': 'height'}
    enabled
    >
    <ScrollView contentContainerStyle={{flexGrow:1}}>

    <BackgroundImage
      source={{ uri: images.ImageBackground_421AZ }}
      resizeMode={"cover"}
    >
      <View>

      <EmailInput  
      keyboardType='email-address'
      placeholder='E-mail Address'
      placeholderTextColor='#A9A9A9'
      onChangeText={text => setEmail(text)}
      hasError={emptyEmailField}
      value={email} />

      {
      emptyEmailField ? 
      <ErrorMessage>
        *Required E-mail Address
      </ErrorMessage>:
      null
      }


      <PasswordInput 
      placeholder='Password'
      placeholderTextColor='#A9A9A9' 
      secureTextEntry={true}
      onChangeText={text => setPassword(text)}
      hasError={emptyPasswordField}
      value={password}/>

      {
      emptyPasswordField ? 
      <ErrorMessage>
        *Required Password
      </ErrorMessage>:
      null
      }

    {
      signInerror? <ErrorMessage>
      *Invalid Credential
    </ErrorMessage>: null
    }
    </View>
      
      <LoginButton
      onPress={handleLogin}>
        {loading? (
          <ActivityIndicator size='small' color='white' />                
        ):(
          <LoginText >
          Log In
        </LoginText>
        )
        }
      </LoginButton>

      <Or>
        or
      </Or>

      <TouchableOpacity onPress={()=>router.push('/signup')}>
        <CreateAccText>
          Create a new account
        </CreateAccText>
      </TouchableOpacity>

    </BackgroundImage>
    </ScrollView>
    </KeyboardAvoidingView>
  </SafeArea>
  )
}

export default LoginScreen
