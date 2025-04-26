import {FlatList, View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import React,{ useState, useMemo } from 'react'
import { useRouter } from 'expo-router'
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux'
// import { FlatList } from 'react-native-web';
import EventCard from '../../components/Event/EventCard'


const MainHome = () => {
  const router = useRouter()
  const eventType = ['All','Meeting', 'Marrige', 'Swimming Gala']
  const [selectedEventType, setSelectedEventType] = useState('All');

  let cardBorderColor = ['red','blue','yellow','#91f261']

  const { events } = useSelector(state => state.event)

    events.map(event=>console.log('dddd',event.name, event.description))

    const filteredEvents = useMemo(()=>{
      if(selectedEventType === 'All'){
        return events 
      }
      else{
        return events.filter( event=> event.eventType === selectedEventType )
      }
    },[events,selectedEventType])

  return (
    <View style={styles.container}>

      <View style={styles.pickerWrapper}>  
        <Picker
        selectedValue={selectedEventType}
        onValueChange={ itemValue => setSelectedEventType(itemValue)}
        style={{backgroundColor:'#FFFFFF',borderRadius:2}}
        >
        {eventType.map(type => (
        <Picker.Item 
        style={{fontSize: 14,fontWeight:'bold'}}
        key={type} 
        label={type} 
        value={type}/>
        ))}
        </Picker>
      </View>

  { filteredEvents && filteredEvents.length > 0 ? (
  <FlatList
    style={{paddingHorizontal:1, marginTop:10, marginBottom:10}}
    data={filteredEvents}
    renderItem={({ item, index })=>(
      <EventCard
      key={index}
      item={item}
      index={index}
      cardBorderColor={cardBorderColor[index % 4]}/>
    )}
    keyExtractor={(_,index)=>index}
    showsVerticalScrollIndicator={false}/>
  ) : (
    <View style={styles.noEventsContainer}>
      <Text style={styles.noEventsText}>No events found for {selectedEventType}</Text>
    </View>
    )}
    </View>
  )
}

export default MainHome

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:20,
    paddingHorizontal:25,
    backgroundColor:'#fff'
  },
  creatEvent: {
    alignSelf:'flex-end',
    backgroundColor:'#86e371',
    paddingHorizontal:12,
    paddingVertical:8,
    borderRadius:10,
    shadowColor:'#000',
    shadowOffset:{width:0, height: 2},
    shadowOpacity:0.2,
    shadowRadius:4,
    elevation: 5
  },
  createEventText:{
    color:'white',
    fontSize:14,
    fontWeight:'700'
  },
  pickerWrapper:{
    borderWidth: 2,
    borderColor:'#86e371',
    borderRadius:2,
    width: '47%',
    marginTop:10
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