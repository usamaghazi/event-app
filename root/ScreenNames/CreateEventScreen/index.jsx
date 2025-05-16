import { Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons'
import * as Notifications from 'expo-notifications'
import { useDispatch } from 'react-redux'
import { useRouter } from 'expo-router'

import { registerForPushNotificationsAsync, scheduleNotification } from '../../../components/Utils'
import { addEvent } from '../../../Slices/Event/eventSlice'
import Input from '../../../components/Input'
import SubmitButton from '../../../components/SubmitButton'
import { Container, Label, RowContainer, TextArea, Icons, PickerWrapper } from './Styles'


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
    <Container>

      <Input
      label='Name'
      required={true}
      onChangeText={text => setName(text)}
      placeholder='Full Name'
      value={name}
      isInValid={inValidName}/>

      
      <Input
      label='Description'
      multiline={true}
      placeholder='Event Details'
      onChangeText={text=>setDescription(text)}
      value={description}/>
      

      <Label>Date & Time*</Label>
      <RowContainer>
        <TextArea
        dateTimeError={dateTimeError}>
          <Text style={{color:'#A9A9A9'}}>{dateTime ? dateTime.toLocaleString() : 'Date & Time Reminder'}</Text>
        </TextArea>

        <Icons
        onPress={()=>setShowDatePicker(true)}
        > 
        <Ionicons 
        name="calendar"
        size={20}
        color = 'white'
        />
        </Icons>
        
      </RowContainer>
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


      

      <Label>Attach Document</Label>

      <RowContainer>
      <TextArea
      dateTimeError={false}>
      <Text style={{color:'#A9A9A9'}}>{documentUri ? documentUri.split('/').pop().slice(0, 20) + '...' : 'Pick Document'}</Text>
      </TextArea>

      <Icons
      onPress={pickDocument}> 
      <Ionicons 
      name="attach"
      size={20}
      color = 'white'
      />
      </Icons>

     </RowContainer>

      <Label>Event Type*</Label>
      <PickerWrapper
        inValideEventType={inValideEventType}
      >
        <Picker
          selectedValue={selectedEventType}
          onValueChange={(itemValue) => setSelectedEventType(itemValue)}
        >
        <Picker.Item label="Select an Event..." value="" enabled={false} color="#999" />
          {eventType.map(type => (
            <Picker.Item key={type} label={type} value={type} />
          ))}
        </Picker>
      </PickerWrapper>

      <SubmitButton
      titleText='Create Event'
      onPress={handleCreateEvent}/>
    </Container>
  )
}

export default CreateEventScreen

