import { View, Text , StyleSheet,TouchableOpacity, Modal,Alert} from 'react-native'
import React, { useState , useRef } from 'react'
import { Calendar, Clock, MoreHorizontal, Edit, Trash2 } from 'react-native-feather'
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux'

import { selectedEditIndex, deleteEvent } from '../../Slices/Event/eventSlice'

const EventCard = ({ item, index, cardBorderColor }) => {

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const menuButtonRef = useRef(null);

  const router = useRouter()
  const dispatch = useDispatch()

  const openMenu = () => {
    menuButtonRef.current.measure((x,y,width,height, pageX, pageY)=>{
      // console.log('X',x, 'Y',y, 'Width', width, "height", height, "PageX",pageX, "PageY",pageY)
      const top = pageY + height
      const right = pageX
      console.log('Top', top , 'Right', pageX)
    })
    
    if (menuButtonRef.current) {
        menuButtonRef.current.measure((x, y, width, height, pageX, pageY) => {
            setMenuPosition({
                top: pageY + height,
                right: pageX
            });
            setMenuVisible(true);
        });
    }
};

  const handleEditModal = () => {
    // console.log('Index Of -----',index)
    dispatch(selectedEditIndex(index))
    router.push('/(main)/edit-event/')
    setMenuVisible(false);
    }

    const handleDelete = () => {
      let eventDate = new Date(item.dateTime).toLocaleString()
      Alert.alert(
        `Are you sure you want to delete?`,                 
        `${item.eventType} on ${eventDate}`,      
        [
          {
            text: 'Cancel',
            onPress: () => setMenuVisible(false),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
                dispatch(deleteEvent(item.id))
                setMenuVisible(false)
            },
          },
        ],
        { cancelable: false }       
      );
      
    } 

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

      <TouchableOpacity
      ref={menuButtonRef}
      style={styles.menuButton}
      onPress={openMenu}
      >
        <MoreHorizontal width={18} height={18} color='#4A5568'/>
      </TouchableOpacity>

      <Modal
      visible={menuVisible}
      transparent={true}
      animationType='fade'
      onRequestClose={()=>setMenuVisible(false)}>

        <TouchableOpacity
        style={styles.modalOverlay}
        onPress={()=> setMenuVisible(false)}>

          <View
          style={[styles.menuContainer,{ 
                            position: 'absolute',
                            top: menuPosition.top - 5, 
                            right: 30 // Fixed right margin
          }]}>

            <TouchableOpacity 
            style={styles.menuItem} 
            onPress={handleEditModal}
            >
              <Edit width={16} height={16} color="#4A6FA5" />
              <Text style={styles.menuItemText}>Edit</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity 
            style={styles.menuItem} 
            onPress={handleDelete}>
                <Trash2 width={16} height={16} color="#E53E3E" />
                <Text style={[styles.menuItemText, {color: '#E53E3E'}]}>Delete</Text>
            </TouchableOpacity>

          </View>

        </TouchableOpacity>
      </Modal>

      <View style={styles.eventTypeTag}>
        <Text style={styles.eventTypeText}>{item.eventType}</Text>
      </View>
      
      <Text style={styles.eventTitle}>{item.name}</Text>
      
      <View style={styles.dateTimeContainer}>
        <View style={styles.iconTextContainer}>
          <Calendar width={16} height={16} color="#4A6FA5" />
          <Text style={styles.eventDate}>{formattedDate}</Text>
        </View>
        
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

export default EventCard

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