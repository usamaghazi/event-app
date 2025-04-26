import * as Notifications from 'expo-notifications'

export const initializeNotifications = async () => {
    console.log('Initialized')
    await Notifications.requestPermissionsAsync()
    Notifications.requestPermissionsAsync({
        handleNotification: async () => ({
            shouldPlaySound: true,
            shouldSetBadge: true,
            shouldShowAlert: true
          })
    })
}