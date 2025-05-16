import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowAlert: true
  })
})

export const registerForPushNotificationsAsync = async () => {
      try {

        const { status } = await Notifications.getPermissionsAsync()
        const existingStatus = status
        let finalStatus = existingStatus

        if(existingStatus !== 'granted'){
          const { status } = await Notifications.requestPermissionsAsync()
          finalStatus = status
        }
        
        if(finalStatus !== 'granted'){
          alert('Failed to get Push Notification')
          return;
        }
      } catch (error) {
        console.log('Error getting notification permission:', error);

      }
    }


 export const scheduleNotification = async (eventDetails) => {
      try {
        const notificationTime = new Date(eventDetails.dateTime);
        notificationTime.setMinutes(notificationTime.getMinutes() - 10)


        const notificationId = await Notifications.scheduleNotificationAsync({
          content: {
            title: eventDetails.name,
            body : `Your ${eventDetails.eventType} is strating in 10 minutes`,
            data: { eventDetails }
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,            
            date: notificationTime,
            
          }
        })
        
        return notificationId

      } catch (error) {
        console.error('Error scheduling notification:', error);
        return null;
      }

    }



export { Notifications }