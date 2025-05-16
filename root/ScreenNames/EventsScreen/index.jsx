import { View, Modal,ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { useSelector, useDispatch } from 'react-redux'

import EventsList from '../../../components/EventsList'
import { signOutUser, signOutComplete } from '../../../Slices/Authentication/authenticationSlice'
import { EventHeaderContainer,
         EventHeaderText, 
         CreateButton, 
         ButtonText,
         LogoutButton,
         LoadingModal,
         NoEvent,
         NoEventText } from './Styles'
const EventsScreen= () => {
  
  const router = useRouter()
  const { events } = useSelector(state=>state.event)
  const { loading } = useSelector(state => state.authentication)
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
        <LoadingModal>
          <ActivityIndicator size='large' color='#86e371' />
        </LoadingModal>
      </Modal>
    <EventHeaderContainer>
      <EventHeaderText>Events</EventHeaderText>

      <View style={{flexDirection:'row'}}>

      <CreateButton
      onPress={()=>router.push('/(main)/create-event')}>
        <ButtonText>Create Event</ButtonText>
      </CreateButton>

      <LogoutButton
      onPress={handleSignOut}>
        <ButtonText>Logout</ButtonText>
      </LogoutButton>

      </View>

    </EventHeaderContainer>
    {events.length ? (
      <EventsList/>
    ):(
      <NoEvent>
        <NoEventText>
          No Events
        </NoEventText>
    </NoEvent>
    )}
    
    </>
  )
}

export default EventsScreen
