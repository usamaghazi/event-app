import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const PersistLoad = () => {
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size='large' color='#aaf5c6'/>
    </View>
  )
}

export default PersistLoad