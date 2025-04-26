import { View, Text, StyleSheet, TouchableOpacity, Modal,ActivityIndicator } from 'react-native'
import React,{ useState } from 'react'
import { useRouter } from 'expo-router'
import MainHome from '../../(main)/index'
import { useSelector, useDispatch } from 'react-redux'

import { signOutUser, signOutComplete } from '../../../Slices/Authentication/authenticationSlice'

const Event= () => {
  
  const router = useRouter()
  const { events } = useSelector(state=>state.event)
  const { user, loading, signOutError } = useSelector(state => state.authentication)
  const dispatch = useDispatch()
  console.log('Eventss for checking', events.length )

  const handleSignOut = async () => {
      await dispatch(signOutUser())
      dispatch(signOutComplete())
      router.replace('/(register)')
  }

  return (
    <>
    <Modal
        animationType="fade"  
        transparent={true}
        visible={loading} 
      >
        <View style={styles.modal}>
          <ActivityIndicator size='large' color='#86e371' />
        </View>
      </Modal>
    <View style={styles.eventHeaderContainer}>
      <Text style={styles.eventHeaderText}>Events</Text>

      <View style={{flexDirection:'row'}}>

      <TouchableOpacity
      onPress={()=>router.push('/(main)/create-event')} 
      style={styles.createEventButtonContainer}>
        <Text style={styles.createEventText}>Create Event</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={styles.logoutButton}
      onPress={handleSignOut}>
        <Text style={styles.createEventText}>Logout</Text>
      </TouchableOpacity>

      </View>

    </View>
    {events.length ? (
      <MainHome/>
    ):(
      <View style={styles.noEvents}>
        <Text style={styles.noEventsText}>
          No Events
        </Text>
    </View>
    )}
    
    </>
  )
}

export default Event

const styles = StyleSheet.create({
  eventHeaderContainer:{
    paddingTop:15,
    paddingHorizontal:20,
    backgroundColor:'#fff',
    // flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  eventHeaderText:{
    fontSize:26,
    fontWeight:'bold',
    color:'#86e371'
  },
  createEventButtonContainer:{
    // backgroundColor:'#86e371',
    paddingHorizontal:12,
    paddingVertical:8,
    borderRadius:10,
    backgroundColor:'#fff',
    // borderWidth:2,
    // borderColor:'#86e371'
  },
  logoutButton:{
    paddingVertical:8,
  },
  createEventText:{
    color:'#86e371',
    fontSize: 16,
    fontWeight:'bold',
  },
  noEvents:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  },
  noEventsText:{
    fontSize:26,
    fontWeight:'bold',
    color:'#e2e6e0',
    fontStyle: 'italic',
  },
  modal:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center'
  }
})