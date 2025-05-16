import {  FlatList } from 'react-native'
import { useLocalSearchParams, Stack } from 'expo-router'
import  { useSelector } from 'react-redux'

import DateEventCard from '../../../components/Event/DateEventCard'
import { Container, NoEvent, NoEventText } from './Styles'

const EventDateScreen = () => {
  const { events } = useSelector(state => state.event)
  const { date } = useLocalSearchParams()
  let cardBorderColor = ['red','blue','yellow','#91f261']


  const filterDate = events.length > 0 ? events.filter(event => {
    const dateObj = new Date(event.dateTime)

        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const newEventDate = `${year}-${month}-${day}`;
      return date === newEventDate 
  }) : []

  console.log('Events on date ======',filterDate)

  return (
    <Container>
      <Stack.Screen
      options={{
        title: `Events on ${date}`,
        headerStyle:{
          backgroundColor:'#86e371'
      },
      headerTintColor:'white',
      }}/>

{ filterDate && filterDate.length > 0 ? (
  <FlatList
    style={{paddingHorizontal:1, marginTop:10, marginBottom:10}}
    data={filterDate}
    renderItem={({ item, index })=>(
      <DateEventCard
      key={index}
      item={item}
      index={index}
      cardBorderColor={cardBorderColor[index % 4]}/>
    )}
    keyExtractor={(_,index)=>index}
    showsVerticalScrollIndicator={false}/>
  ) : (
    <NoEvent>
      <NoEventText>No events found for {date}</NoEventText>
    </NoEvent>
    )}
    </Container>
  )
}

export default EventDateScreen
