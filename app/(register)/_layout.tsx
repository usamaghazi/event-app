import { Stack } from 'expo-router'

const RegisterLayout = () => {
    return(
        <Stack>

            <Stack.Screen
            name='index'
            options={{
                headerShown:false
            }}/>

            <Stack.Screen
            name='signup'
            options={{
                headerStyle:{
                    backgroundColor:'transparent'
                },
                headerTransparent:true,
                headerTintColor:'white',
                headerShadowVisible:false,
                title:'Sign Up'
            }}/>

        </Stack>
    )
}

export default RegisterLayout