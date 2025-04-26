import { 
  View, 
  StyleSheet,
  ActivityIndicator } from 'react-native'
import React,{ useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'expo-router'

const Main = () => {
  const [isMount, setIsMount ] = useState(false)
  const { user } = useSelector(state => state.authentication)

  const router = useRouter()

  useEffect(()=>{
    setIsMount(true)
  },[])

  useEffect(()=>{

    if(isMount){
      if (user) {
          // router.replace('/(main)')
          router.replace('/(event)/Events')
      }
      else {
        router.replace('/(register)')
      }
    }

  },[isMount, user])

  return (
    <View style={styles.container}>
      {/* <Link href={'/(register)'} asChild>
      <Pressable style={styles.registerButton}>
        <Text style={styles.registerText}>Register</Text>
      </Pressable>
      </Link> */}
      <ActivityIndicator color={'green'} size={'large'}/>
    </View>
  )
}

export default Main

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  registerButton:{
    // backgroundColor: '#3498db',
    backgroundColor: '#007bff',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  registerText:{
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  }
})