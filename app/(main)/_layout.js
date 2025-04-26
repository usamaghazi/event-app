import { Stack } from 'expo-router'

const MainLayout = () => {
return(
    <Stack>
        <Stack.Screen
        name='create-event'
        options={{
            headerStyle:{
                backgroundColor:'#86e371'
            },
            title:'Create Event',
            headerTintColor:'white',
            
        }}/>
        <Stack.Screen
        name='edit-event'
        options={{
            headerStyle:{
                backgroundColor:'#86e371'
            },
            title:'Edit Event',
            headerTintColor:'white',
            
        }}/>
    </Stack>
)

}

export default MainLayout