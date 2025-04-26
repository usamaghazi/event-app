import { View, Text, TextInput, Button, StyleSheet, Platform, Touchable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons'
import * as Notifications from 'expo-notifications'
import { useDispatch } from 'react-redux'
import { useRouter } from 'expo-router'

import { addEvent } from '../../Slices/Event/eventSlice'


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true
  })
})

const CreateEventScreen = () => {
    const eventType = ['Meeting', 'Marrige', 'Swimming Gala']
    const [name,setName] = useState('')
    const [description, setDescription] = useState('')
    const [dateTime, setDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [documentUri, setDocumentUri] = useState();
    const [selectedEventType, setSelectedEventType] = useState('');
    const [inValidName, setInValidName] = useState(false)
    const [dateTimeError, setDateTimeError] = useState(false)
    const [inValideEventType, setInvalideEventType] = useState(false)

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(()=>{
      registerForPushNotificationsAsync();
    },[])

    const registerForPushNotificationsAsync = async () => {
      try {

        const { status } = await Notifications.getPermissionsAsync()
        const existingStatus = status
        let finalStatus = existingStatus

        if(existingStatus !== 'granted'){
          const { status } = await Notifications.requestPermissionsAsync()
          finalStatus = status
        }
        
        if(finalStatus !== 'granted'){
          alert('Failed to get Push Notification')
          return;
        }
      } catch (error) {
        console.log('Error getting notification permission:', error);

      }
    }

    const pickDocument = async () => {
      try {
        const result = await DocumentPicker.getDocumentAsync({})
        if(! result.canceled) {
          setDocumentUri(result.assets[0].uri)
        }
      } catch (error) {
        alert('Document Picking Error')
      }
    }

    const scheduleNotification = async (eventDetails) => {
      try {
        const notificationTime = new Date(eventDetails.dateTime);
        notificationTime.setMinutes(notificationTime.getMinutes() - 10)


        const notificationId = await Notifications.scheduleNotificationAsync({
          content: {
            title: eventDetails.name,
            body : `Your ${eventDetails.eventType} is strating in 10 minutes`,
            data: { eventDetails }
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,            
            date: notificationTime,
            
          }
        })
        
        return notificationId

      } catch (error) {
        console.error('Error scheduling notification:', error);
        return null;
      }

    }

    // const saveEventTOStorage = async (eventDetails) => {
    //   try {
    //       const existingEventsJSON = await AsyncStorage.getItem('events')
    //       const existingEvents = existingEventsJSON ? JSON.parse(existingEventsJSON):[]

    //       const updatedEvents = [...existingEvents,eventDetails]
          
    //       await AsyncStorage.setItem('events',JSON.stringify(updatedEvents))
    //       console.log('Event Saved in Async Storage')
    //   } catch (error) {
    //     console.error('Error saving event to storage:', error);
    //   }
    // }

    const handleCreateEvent = async () => {
      const now = new Date()

      if(name.trim() === ''){
        setInValidName(true)
      }
      else if (dateTime.getTime() < now.getTime() + 5000){
        setInValidName(false)
        setDateTimeError(true)
      }
      else if (selectedEventType.trim() === ''){
        setInValidName(false)
        setDateTimeError(false)
        setInvalideEventType(true)
      }
      else{
        setInValidName(false)
        setDateTimeError(false)
        setInvalideEventType(false)

        const eventDetails = {
          id: new Date().toString(),
          name,
          description,
          dateTime: dateTime.toISOString(),
          documentUri,
          eventType: selectedEventType
        }

        const notificationId = await scheduleNotification(eventDetails)

        if (notificationId) {
          eventDetails.notificationId = notificationId
        }
  
        await dispatch(addEvent(eventDetails));
        

        setName('');
        setDescription('');
        setDateTime(new Date());
        setDocumentUri(undefined);
        setSelectedEventType('');

        // router.replace('/(event)/Events')
        router.back()
      }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name*</Text>
      <TextInput  style={[styles.input,
        inValidName && styles.inValideInput
      ]} 
      placeholder='Full Name'
      placeholderTextColor='#A9A9A9'
      onChangeText={text=>setName(text)}
      value={name}/>

      <Text style={styles.label}>Description</Text>
      <TextInput  style={styles.input} 
      multiline 
      placeholder='Event Details'
      placeholderTextColor='#A9A9A9'
      onChangeText={text => setDescription(text)}
      value={description}/>

      

      <Text style={styles.label}>Date & Time*</Text>
      {/* <Button title= {dateTime ? dateTime.toLocaleString() : "Pick Date & Time"}  /> */}
      <View style={styles.dateTimeContainer}>

        <View style={[styles.dateTimeText,
          dateTimeError && styles.inValideInput
        ]}>
          <Text style={{color:'#A9A9A9'}}>{dateTime ? dateTime.toLocaleString() : 'Date & Time Reminder'}</Text>
        </View>

        <TouchableOpacity style={styles.dateTimeIcon}
        onPress={()=>setShowDatePicker(true)}
        > 
        <Ionicons 
        name="calendar"
        size={20}
        color = 'white'
        />
        </TouchableOpacity>
        
      </View>
      <DateTimePickerModal
                isVisible={showDatePicker}
                mode="datetime"
                onConfirm={(selectedDate)=>{
                  setDateTime(selectedDate)
                  setShowDatePicker(false)
                }}
                onCancel={()=> setShowDatePicker(false)}
                date={dateTime}
                minimumDate={new Date()}
            />
        {dateTimeError && <Text style={{color:'red'}}>*Reminder Should be atleast 5 seconds above</Text>}

      {/* {showDatePicker && (
        <DatePicker
          date={dateTime ?? new Date()}
          // onChange={(event, selectedDate)=> {
          //   if(selectedDate){
          //     setDateTime(selectedDate)
          //   }
          //   setShowDatePicker(false)
          // }}
          onChange={(event, selectedDate) => {
            if (selectedDate instanceof Date && !isNaN(selectedDate.getTime())) {
              setDateTime(selectedDate);
            }
            setShowDatePicker(false);
          }}
          mode="datetime"
        />
      )} */}

      

      <Text style={styles.label}>Attach Document</Text>

      <View style={styles.dateTimeContainer}>
      <View style={styles.dateTimeText}>
      <Text style={{color:'#A9A9A9'}}>{documentUri ? documentUri.split('/').pop().slice(0, 20) + '...' : 'Pick Document'}</Text>
      </View>

      <TouchableOpacity style={styles.dateTimeIcon}
      onPress={pickDocument}> 
      <Ionicons 
      name="attach"
      size={20}
      color = 'white'
      />
      </TouchableOpacity>

     </View>

      <Text style={styles.label}>Event Type*</Text>
      <View style={[styles.pickerWrapper,
        inValideEventType && styles.inValideInput
      ]}>
        <Picker
          selectedValue={selectedEventType}
          onValueChange={(itemValue) => setSelectedEventType(itemValue)}
        >
        <Picker.Item label="Select an Event..." value="" enabled={false} color="#999" />
          {eventType.map(type => (
            <Picker.Item key={type} label={type} value={type} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.createEventButton}
      onPress={handleCreateEvent}>
        <Text style={styles.createButtonText}>Create Event</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CreateEventScreen

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      padding: 16, 
      backgroundColor: '#fff' 
    },
  label: { 
    fontWeight: 'bold', 
    marginTop: 12 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 8, 
    borderRadius: 6, 
    marginTop: 4, 
    paddingVertical: 12,
    paddingLeft:10,
    marginTop:8
  },
  pickerWrapper: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 6, 
    marginVertical: 8 
  },
  docName: { 
    fontSize: 12, 
    color: '#555', 
    marginTop: 4, 
    marginBottom: 8 
  },
  dateTimeContainer:{
    flexDirection:'row',
    marginTop:7
  },
  dateTimeText: {
    borderWidth: 1, 
    borderColor: '#ccc', 
    paddingVertical:12,
    paddingHorizontal:8,  
    marginTop: 4,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius:6, 
    width:'80%',
    borderRightWidth: 0,
    paddingLeft:10
  },
  dateTimeIcon: {
    borderWidth: 1, 
    borderColor: '#ccc', 
    paddingVertical:12 ,
    // paddingHorizontal:2, 
    borderTopRightRadius: 6,
    borderBottomRightRadius:6, 
    marginTop: 4,
    backgroundColor:'#999b9c',
    width:'20%',
    borderLeftWidth: 0,
    alignItems:'center'
  },
  createEventButton:{
    backgroundColor:'#86e371',
    alignItems:'center',
    borderRadius:20,
    paddingVertical:15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  createButtonText:{
    color:'white',
    fontSize:14,
    fontWeight:'700'
  },
  inValideInput: {
    borderColor:'red'
  }
})