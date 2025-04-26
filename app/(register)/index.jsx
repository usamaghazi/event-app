import { 
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  ActivityIndicator
   } from 'react-native'
// import { LinearGradient } from 'expo-linear-gradient'
import React,{ useCallback, useEffect, useState } from 'react'
import { useRouter, useFocusEffect } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'

import { signIn, errNullonUmount } from '../../Slices/Authentication/authenticationSlice'


const images = {
  ImageBackground_421AZ:
    "https://images.unsplash.com/photo-1467106015942-a0ea2960655a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTYyMDF8MHwxfHNlYXJjaHwyfHxuaWdodCUyMHNreXxlbnwwfHx8fDE3MjgxNzAzMTZ8MA&ixlib=rb-4.0.3&q=80&w=1080",
};

const Login = () => {
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
   
    <SafeAreaView style={styles.SafeAreaView_4IVEP}>
    <KeyboardAvoidingView
    style={{flex:1}}
    behavior={Platform.OS? 'padding': 'height'}
    enabled
    >
    <ScrollView contentContainerStyle={{flexGrow:1}}>

    <ImageBackground
    
      source={{ uri: images.ImageBackground_421AZ }}
      resizeMode={"cover"}
      style={styles.ImageBackground_421AZ}
    >
      <View>

      <TextInput 
      style={ emptyEmailField ? styles.errTextInput_4GDWO :styles.TextInput_4GDWO } 
      keyboardType='email-address'
      placeholder='E-mail Address'
      placeholderTextColor='#A9A9A9'
      onChangeText={text => setEmail(text)}
      value={email} />

      {
      emptyEmailField ? 
      <Text style={{color:'red', marginBottom:5}}>
        *Required E-mail Address
      </Text>:
      null
      }


      <TextInput 
      style={ emptyPasswordField? styles.errTextInput_4GFLB : styles.TextInput_4GFLB }
      placeholder='Password'
      placeholderTextColor='#A9A9A9' 
      secureTextEntry={true}
      onChangeText={text => setPassword(text)}
      value={password}/>

      {
      emptyPasswordField ? 
      <Text style={{color:'red', marginBottom:5}}>
        *Required Password
      </Text>:
      null
      }

    {
      signInerror? <Text style={{color:'red', marginBottom:5}}>
      *Invalid Credential
    </Text>: null
    }
    </View>
      
    
    

      <TouchableOpacity
      style={styles.loginButton}
      onPress={handleLogin}>
        {loading? (
          <ActivityIndicator size='small' color='white' />                
        ):(
          <Text 
        style={styles.loginText}>
          Log In
        </Text>
        )
        }
      </TouchableOpacity>

      <Text style={styles.oR}>
        or
      </Text>
      <TouchableOpacity onPress={()=>router.push('/signup')}>
        <Text style={styles.createAcc}>
          Create a new account
        </Text>
      </TouchableOpacity>
    </ImageBackground>
    </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  SafeAreaView_4IVEP: {
    
    flex: 1,
    width: "100%",
    height: "100%"
  },
  ImageBackground_421AZ: {
    // width: "100%",
    // height: "100%",
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  TextInput_4GDWO: { 
    backgroundColor: "white", 
    width: 280,
    marginBottom:10,
    borderRadius:20,
    paddingVertical:13,
    paddingHorizontal:15,
    height: 45, 
  },
  errTextInput_4GDWO:{
    backgroundColor: "white", 
    width: 280,
    borderRadius:20,
    paddingVertical:13,
    paddingHorizontal:15,
    height: 45,
    borderWidth: 1.5,
    borderColor: 'red',
  },
  TextInput_4GFLB: {
    backgroundColor: "white",
    width: 280,
    borderRadius:20,
    paddingVertical:13,
    paddingHorizontal:15,
    height: 45,

  },
  errTextInput_4GFLB:{
    backgroundColor: "white",
    width: 280,
    borderRadius:20,
    paddingVertical:13,
    paddingHorizontal:15,
    height: 45,
    borderWidth: 1.5,
    borderColor: 'red',
  },
  loginButton:{
    width: 280,
    height:50,
    backgroundColor:'#aaf5c6',
    marginTop:20,
    borderRadius:20,
    justifyContent:'center'
  },
  loginText:{
    textAlign:'center',
    color:'white',
    fontSize:18
  },
  oR:{
    color:'white',
    fontSize: 16,
    marginTop:10,
  },
  createAcc:{
    color:'white',
    fontSize:16
  }
})