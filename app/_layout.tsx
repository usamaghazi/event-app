import { Stack } from 'expo-router'
import React from 'react';
import { StatusBar } from "expo-status-bar";
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import store,{ persistor } from '../Store/store'
import PersistLoad from '../components/PersistGate/PersistLoad'

const RootLayout = () => {
 
  return(
    <Provider store={store}>
    <PersistGate loading={<PersistLoad/>} persistor={persistor}>
      <StatusBar style="light" translucent={false} backgroundColor="#000" />
      <Stack
        screenOptions={{
       headerShown:false
      }}/>
    </PersistGate>
    </Provider>
  ) 
}

export default RootLayout







// "splash": {
//   "image": "./assets/images/splash-icon.png",
//   "resizeMode": "contain",
//   "backgroundColor": "#ffffff"
// },