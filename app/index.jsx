import { ActivityIndicator } from 'react-native'
import React,{ useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'expo-router'

import { Container } from '../components/Styled-Components/Styles'
  
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
          router.replace('/(event)/Events')
      }
      else {
        router.replace('/(register)')
      }
    }

  },[isMount, user])

  return (
    
      <Container>
      <ActivityIndicator color={'green'} size={'large'}/>
      </Container>
    
  )
}

export default Main

