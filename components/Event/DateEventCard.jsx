import { View, Text , StyleSheet,TouchableOpacity, Modal,Alert} from 'react-native'
import React, { useState , useRef } from 'react'
import { Calendar, Clock, MoreHorizontal, Edit, Trash2 } from 'react-native-feather'





const DateEventCard = ({ item, index, cardBorderColor }) => {

   

    const dateTime = new Date(item.dateTime);
    const formattedDate = dateTime.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    
    const formattedTime = dateTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // const formattedDateTime = item.dateTime.toLocaleString();
    
    // console.log('Date Time........',item.dateTime.toLocalString())
  //   const dateTimeParts = formattedDateTime.split(', ');
  // const dateStr = dateTimeParts[0] || item.dateTime;
  // const timeStr = dateTimeParts[1] || '';
  return (
    <View style={[styles.eventCard, {borderColor:cardBorderColor}]}>


      <View style={styles.eventTypeTag}>
        <Text style={styles.eventTypeText}>{item.eventType}</Text>
      </View>
      
      <Text style={styles.eventTitle}>{item.name}</Text>
      
      <View style={styles.dateTimeContainer}>
        {/* <View style={styles.iconTextContainer}>
          <Calendar width={16} height={16} color="#4A6FA5" />
          <Text style={styles.eventDate}>{formattedDate}</Text>
        </View> */}
        
        {formattedTime && (
          <View style={styles.iconTextContainer}>
            <Clock width={16} height={16} color="#4A6FA5" />
            <Text style={styles.timeText}>{formattedTime}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.divider} />
      
      <Text style={styles.description}>{item.description}</Text>
    </View>
  )
}

export default DateEventCard

const styles = StyleSheet.create({
    eventCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      padding: 14,
      paddingVertical:9,
      paddingTop:10,
      marginVertical: 5,
      marginHorizontal: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth:1
    },
    menuButton:{
      position: 'absolute',
      top: 10,
      right: 10,
      padding: 5,
      zIndex: 1,
    },
    modalOverlay:{
      flex:1,
      backgroundColor:'rgba(0,0,0,0.2)'
    },
    menuContainer: {
      position: 'absolute',
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      width: 140,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 5,
      overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
},
    menuItemText: {
        marginLeft: 12,
        fontSize: 14,
        color: '#4A5568',
    },
    menuDivider: {
        height: 1,
        backgroundColor: '#E2E8F0',
    },
    eventTypeTag: {
      alignSelf: 'flex-start',
      backgroundColor: '#E8F1FF',
      borderRadius: 16,
      paddingVertical: 4,
      paddingHorizontal: 12,
      marginBottom: 9,
    },
    eventTypeText: {
      color: '#4A6FA5',
      fontSize: 12,
      fontWeight: '600',
    },
    eventTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#2D3748',
      marginBottom: 8,
    },
    dateTimeContainer: {
      marginBottom: 5,
    },
    iconTextContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
    },
    eventDate: {
      marginLeft: 8,
      color: '#4A5568',
      fontSize: 14,
    },
    timeText: {
      marginLeft: 8,
      color: '#4A5568',
      fontSize: 14,
    },
    divider: {
      height: 1,
      backgroundColor: '#E2E8F0',
      marginVertical: 5,
    },
    description: {
      fontSize: 14,
      color: '#718096',
      lineHeight: 20,
    }
  });