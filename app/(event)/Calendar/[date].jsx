import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { useLocalSearchParams, Stack } from 'expo-router'
import  { useSelector } from 'react-redux'
import { useRouter } from 'expo-router'
import DateEventCard from '../../../components/Event/DateEventCard'

const EventDate = () => {
  const router = useRouter()
  const { events } = useSelector(state => state.event)
  const { date } = useLocalSearchParams()
  let cardBorderColor = ['red','blue','yellow','#91f261']

  // events.length > 0 && events.forEach(event =>{
  //     const eventDate = new Date(event.dateTime)
  //     const finalDate = eventDate.toISOString().split('T')
      
  //     console.log('Now getting dates-------',finalDate[0])
  // })

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
    <View style={styles.container}>
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
    <View style={styles.noEventsContainer}>
      <Text style={styles.noEventsText}>No events found for {date}</Text>
    </View>
    )}
    </View>
  )
}

export default EventDate

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:10,
    paddingHorizontal:25,
    backgroundColor:'#fff'
  },
  noEventsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  noEventsText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  }
})