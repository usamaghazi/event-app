import { Stack } from 'expo-router'

const CalendarStackLayout = () => {
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

export default CalendarStackLayout