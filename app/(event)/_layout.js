import { Tabs } from 'expo-router'
import { View, Text } from 'react-native'
// import { Bell, Calendar } from 'react-native-feather'

const CustomLable = ({ label, focused }) => {
    return(
        <View style={{
            marginTop:-15
        }}>
            <Text
            style={{
                fontSize: 16, 
                fontWeight: '700',
                color : focused ? '#fff': '#c0c2bf',
            }}>
                {label}
            </Text>
        </View>
    )
}
const TabsLayout = () => {
return(
    <Tabs
    screenOptions={{
        headerShown: false,
          tabBarStyle: {
            backgroundColor: '#eaefe9', 
            height: 60,   
          },
          tabBarItemStyle: {
            padding: 0,
            margin: 0,
          },
          tabBarActiveBackgroundColor:'#86e371',
          
    }}>
        <Tabs.Screen
        name = 'Events'
        options={{
            tabBarLabel:({ focused  })=> <CustomLable label="Events" focused={focused}/>,  
            // tabBarIcon: () => <Bell 
            // style={{backgroundColor:'black'}} 
            // width={20} 
            // height={20} color='white'/>,
            // tabBarLabelPosition:'beside-icon',
            tabBarIcon:() => null
            
        }}/>
        <Tabs.Screen
        name='Calendar'
        options={{
            tabBarLabel:({ focused  })=> <CustomLable label="Calendar" focused={focused}/>,
            // tabBarIcon: () => <Calendar style={{backgroundColor:'black'}} width={20} height={20} color='white'/>,
            tabBarIcon:() => null,
            // tabBarLabelPosition:'beside-icon',
            
        }}/>
    </Tabs>

    
)
}

export default TabsLayout
// import { FontAwesome } from '@expo/vector-icons';
// import {  Tabs,useRouter } from 'expo-router';
// import React from 'react';
// import { Text, TouchableOpacity, View,StyleSheet } from 'react-native';
// import { BlurView } from 'expo-blur'

// function CustomTabBarButton({children,onPress}){
//     const   router = useRouter();
    
//   return(  
//   <TouchableOpacity style={styles.barButton}
//     onPress={()=>router.push('/(tabs)')}
//     >
//         {children}
//     </TouchableOpacity>)
// }


// export default function TabsLayout() {
//     return (
//         <Tabs
//         screenOptions={ ({route,navigation})=>({

//             tabBarOnPress:(e)=>{
//                 if(route.name==='about'){
//                     e.preventDefault();
//                     alert('You Pressed Profile')
//                     console.warn('gooo')
//                 }else{
//                     e.default();
//                     console.warn('gooo')
//                 }
//                         },
//              tabBarActiveTintColor:'yellow',
//              tabBarActiveBackgroundColor:'red',
//             //  tabBarStyle:{
//             //      position:'absolute',
//             //     //  marginBottom:'50px',
//             //     //  height:'120px'
//             //  },
//             //  tabBarBackground:()=>(
//             //      <BlurView tint='light' intensity={100} style={styles.blurView}/>
//             //  )
//                      // tabBarActiveTintColor:'green'
//         }) }
//         >
//             <Tabs.Screen
//                 name='Home'
//                 options={{
//                     title: 'Home',
//                     headerShown:false,
//                     tabBarIcon: ({ color, size }) => <FontAwesome size={size} name='home' color={color} />,
//                     tabBarLabel:({focused,color, size})=><Text style={{marginLeft:'15px',alignSelf:'center',color:focused?color:'gray',fontSize:size}}>
//                         Home
//                     </Text>,
//                     tabBarLabelPosition:'beside-icon',
//                     tabBarIconStyle:{
//                         marginBottom:'5px',
//                         fontSize:'2px',
                    
//                     },
//                     tabBarBadge:'3',
//                     tabBarBadgeStyle:{
//                         backgroundColor:'red',
//                         color:'white',
//                     },
//                     tabBarAccessibilityLabel: 'Home screen',
//                     // tabBarButton:(props) => <CustomTabBarButton {...props}/>,
//                     // tabBarActiveBackgroundColor:'green',
//                     tabBarActiveTintColor:'green'
//                 }}  
//             />
//             <Tabs.Screen
//                 name='About'
//                 options={{
//                      title: 'About',
//                      headerShown:false,
//                      tabBarLabelPosition:'beside-icon',
//                     tabBarIcon: ({ color, size }) => <FontAwesome name='address-card' size={size} color={color} />,
//                    tabBarItemStyle:{
//                     padding:'20px',
//                     backgroundColor:'green'
//                    } 
//                 }}
//             />
            
//         </Tabs>
//     );
// }

// const styles = StyleSheet.create({
//     barButton:{
//         flex: 1,
//         flexDirection:'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'tomato',
//         // borderRadius: 50,
     
       
//     },
//     blurView:{
//         ...StyleSheet.absoluteFill,
//         height:'60px'
//     }
// })