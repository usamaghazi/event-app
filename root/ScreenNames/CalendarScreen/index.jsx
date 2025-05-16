import { Modal,ActivityIndicator } from 'react-native'
import React,{ useState, useEffect } from 'react'
import { Calendar } from 'react-native-calendars';
import { useSelector ,useDispatch } from 'react-redux'
import { useRouter } from 'expo-router'
import { useFocusEffect } from '@react-navigation/native';

import { signOutUser, signOutComplete } from '../../../Slices/Authentication/authenticationSlice'
import { LoadingModal,
         CalendarHeader,
         CalendarHeaderText,
         LogoutButton,
         LogoutButtonText,
         CalendarContainer,
         DayContainer,
         DayText,
         EventText,
         MoreEventText} from './Styles'

const CalendarScreen = () => {

  const { events } = useSelector(state => state.event)
  const { user, loading, signOutError } = useSelector(state => state.authentication)
  const router = useRouter()
  const dispatch = useDispatch()

  const [selectedDate, setSelectedDate] = useState('');
  const [markedDates, setMarkedDates] = useState(null)
  const [eventByDate, setEventByDate] = useState({})

  

  useEffect(()=>{
      const newMarkedDates = {}
      const newEventTypeText = {}

      events && events.forEach(event => {
        const dateObj = new Date(event.dateTime)

        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        if(!newEventTypeText[formattedDate]){
          newEventTypeText[formattedDate] = []
        }

        newEventTypeText[formattedDate].push(event.eventType || 'Event')

        newMarkedDates[formattedDate] = {
          selected: true,
          selectedColor: '#5cde1b',
          selectedTextColor: 'white',
          dots: [
                { key: 'event', color: 'green', selectedDotColor: 'white' },
              ]
        }
      })
      setEventByDate(newEventTypeText)
      setMarkedDates(newMarkedDates)
  },[events, router])
  useFocusEffect(
    React.useCallback(() => {
      
      return () => {
        setSelectedDate('')
      //    const newMarkedDates = {}

      // events && events.forEach(event => {
      //   const dateObj = new Date(event.dateTime)

      //   const year = dateObj.getFullYear();
      //   const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      //   const day = String(dateObj.getDate()).padStart(2, '0');
      //   const formattedDate = `${year}-${month}-${day}`;

      //   newMarkedDates[formattedDate] = {
      //     selected: true,
      //     selectedColor: 'white',
      //     selectedTextColor: 'black',
      //     dots: [
      //           { key: 'event', color: 'green', selectedDotColor: '#49d504' },
      //         ]
      //   }
      // })
      // setMarkedDates(newMarkedDates)
        // Clean up resources here
      };
    }, [])
  );
//   {
//   "2025-04-24":{
//     selected: true,
//   selectedColor: 'white', 
//   selectedTextColor: 'black', 
//   dots: [
//     { key: 'event', color: 'green', selectedDotColor: '#49d504' },
//   ]
//   },
//   "2025-04-25":{
//   selected: true,
//   selectedColor: 'white', 
//   selectedTextColor: 'black', 
//   dots: [
//     { key: 'event', color: 'green', selectedDotColor: '#49d504' },
//   ]
//   },
//   "2025-04-29":{
//   selected: true,
//   selectedColor: 'white', 
//   selectedTextColor: 'black', 
//   dots: [
//     { key: 'event', color: 'green', selectedDotColor: '#49d504' },
//   ]
//   },
// }


// const { events } = useSelector(state=>state.event)

// const dateTimeArr = []

// events.map(event=>console.log('CalenderFile.js--',dateTimeArr.push(event.dateTime)))

// console.log('Array is---',dateTimeArr)

  const handleDayPress = (day) => {
   const dateString = day.dateString
   setSelectedDate(dateString)
   const markedDatesArr = markedDates ? Object.keys(markedDates) : []
   console.log(dateString)
   markedDatesArr.length > 0 && markedDatesArr.forEach(date => {
    if(date === dateString){
      console.log('Selected Date---',date)
      router.push(`/(event)/Calendar/${date}`)
    }
   })
  }

  const handleSignOut = async () => {

          await dispatch(signOutUser())
          dispatch(signOutComplete())
          router.replace('/(register)')
  }

  const renderCustomDay = (day) => {
    const dateString = day.dateString;
    // console.log('Render Function 148=====', dateString)
    const isMarked = markedDates && markedDates[dateString]
    const eventText = eventByDate[dateString] || [];

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const dayDate = new Date(day.timestamp);
  const isCurrentMonth = dayDate.getMonth() === currentMonth && dayDate.getFullYear() === currentYear;

    return(
      <DayContainer
      onPress={()=>handleDayPress(day)}>
        <DayText 
        isMarked={isMarked}
        isCurrentMonth={isCurrentMonth}
        isSelected={day.dateString === selectedDate}>
          {day.day}
          </DayText>
        {
        eventText.length > 0 && (
          <EventText
           numberOfLines={1} ellipsizeMode="tail"
          >{eventText[0]}</EventText>
        ) }
        {
          eventText.length > 1 && (
            <MoreEventText
            >
              & {eventText[1]} more
            </MoreEventText>
          )
        }
      </DayContainer>
    )
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
    <CalendarHeader>

          <CalendarHeaderText>Calendar</CalendarHeaderText>

          <LogoutButton
          onPress={handleSignOut}>
            <LogoutButtonText>Logout</LogoutButtonText>
          </LogoutButton>

    </CalendarHeader>
    <CalendarContainer>
      
      <Calendar
      dayComponent={({ date })=>renderCustomDay(date)}
      onDayPress={handleDayPress}
      markedDates={markedDates}
      markingType={'multi-dot'}
      theme={{
        todayTextColor:'#49d504'
      }}/>

    </CalendarContainer>
    </>
  )
}

export default CalendarScreen

















