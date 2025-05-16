import { Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons'
import * as Notifications from 'expo-notifications'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'expo-router'

import { editEvent } from '../../../Slices/Event/eventSlice'
import Input from '../../../components/Input'
import SubmitButton from '../../../components/SubmitButton'
import { registerForPushNotificationsAsync, 
         scheduleNotification  } from '../../../components/Utils'
import { Container, Label, RowContainer, TextArea, Icons, PickerWrapper } from './Styles'




Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true
  })
})

const EditEventScreen = () => {
  const { events, editIndex } = useSelector(state => state.event )
    

    const eventType = ['Meeting', 'Marrige', 'Swimming Gala']
    const [name,setName] = useState(events[editIndex].name)
    const [description, setDescription] = useState(events[editIndex].description)
    const [dateTime, setDateTime] = useState(new Date(events[editIndex].dateTime));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [documentUri, setDocumentUri] = useState(events[editIndex].documentUri);
    const [selectedEventType, setSelectedEventType] = useState(events[editIndex].eventType);
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

    
    const handleEditEvent = async () => {
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
  
        await dispatch(editEvent(eventDetails));
        

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
      placeholder='Full Name'
      onChangeText={text => setName(text)}
      value={name}
      isInValid={inValidName}/>


      <Input
      label='Description'
      multiline={true}
      placeholder='Enter Description'
      onChangeText={text => setDescription(text)}
      value={description}/>

      

      <Label>Date & Time*</Label>
      {/* <Button title= {dateTime ? dateTime.toLocaleString() : "Pick Date & Time"}  /> */}
      <RowContainer>

        <TextArea 
          dateTimeError={dateTimeError}
        >
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
      <TextArea>
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
      titleText='Edit Event'
      onPress={handleEditEvent}/>

    </Container>
  )
}

export default EditEventScreen
