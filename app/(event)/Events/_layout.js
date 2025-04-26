import { Stack } from 'expo-router'

const EventsStackLayout = () => {
    return (
    <Stack>
        <Stack.Screen
        name='index'
        options={{
            headerShown:false
        }}/>
    </Stack>
)
        
    
}

export default EventsStackLayout