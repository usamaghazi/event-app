import { View, Text ,StyleSheet, TouchableOpacity,Modal,ActivityIndicator} from 'react-native'
import React,{ useState, useEffect } from 'react'
import { Calendar } from 'react-native-calendars';
import { useSelector ,useDispatch } from 'react-redux'
import { useRouter } from 'expo-router'
import { useFocusEffect } from '@react-navigation/native';

import { signOutUser, signOutComplete } from '../../../Slices/Authentication/authenticationSlice'

const CalendarFile = () => {

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
      <TouchableOpacity 
      style={styles.dayContainer}
      onPress={()=>handleDayPress(day)}>
        <Text style={[
          styles.dayText,
          isMarked && styles.markedDayText,
          !isCurrentMonth && styles.otherMonthText,
          day.dateString === selectedDate && styles.selectedDayText
        ]}>
          {day.day}
          </Text>
        {
        eventText.length > 0 && (
          <Text
          style={styles.eventText} numberOfLines={1} ellipsizeMode="tail"
          >{eventText[0]}</Text>
        ) }
        {
          eventText.length > 1 && (
            <Text
            style={styles.moreEventsText}
            >
              & {eventText[1]} more
            </Text>
          )
        }
      </TouchableOpacity>
    )
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

          <Text style={styles.eventHeaderText}>Calendar</Text>

          <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleSignOut}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>

    </View>
    <View style={styles.calendarContainer}>
      
      <Calendar
      dayComponent={({ date })=>renderCustomDay(date)}
      onDayPress={handleDayPress}
      markedDates={markedDates}
      markingType={'multi-dot'}
      theme={{
        todayTextColor:'#49d504'
      }}/>

    </View>
    </>
  )
}

export default CalendarFile

const styles = StyleSheet.create({
  eventHeaderContainer:{
    paddingTop:15,
    paddingHorizontal:20,
    backgroundColor:'#fff',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  logoutButton:{
    paddingVertical:8,
  },
  logoutButtonText:{
    color:'#86e371',
    fontSize: 16,
    fontWeight:'bold', 
  },
  eventHeaderText:{
    fontSize:26,
    fontWeight:'bold',
    color:'#86e371'
  },
  calendarContainer:{
    flex:1,
    paddingTop:30,
    paddingHorizontal:25,
    backgroundColor:'#fff',
  },
  dayContainer: {
    width: 32,
    height: 'auto', // Let it grow as needed
    minHeight: 45,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 4,
    paddingBottom: 2,
  },
  dayText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
  },
  otherMonthText: {
    color: '#BBBBBB', 
  },
  markedDayText: {
    color: '#5cde1b',
    fontWeight: 'bold',
  },
  selectedDayText: {
    color: '#fff',
    backgroundColor: '#5cde1b',
    // backgroundColor: 'red',
    borderRadius: 12,
    overflow: 'hidden',
    width: 25,
    height: 25,
    textAlign: 'center',
    lineHeight: 24,
  },
  eventText: {
    fontSize: 7, // Make it smaller to fit
    color: '#777',
    width: 32,
    textAlign: 'center',
    marginTop: 1,
  },
  moreEventsText: {
    fontSize: 6,
    color: '#888',
    fontStyle: 'italic',
  },
  modal:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center'
  }
})

















