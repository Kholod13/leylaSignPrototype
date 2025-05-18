import { StyleSheet, Text, View } from 'react-native';
import MainStack from './navigate';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';

const fonts = () => Font.loadAsync({
  'inter-regular': require('./assets/fonts/Inter_18pt-Regular.ttf'),
  'inter-light': require('./assets/fonts/Inter_18pt-Light.ttf'),
  'inter-bold': require('./assets/fonts/Inter_18pt-Bold.ttf'),
  'inter-medium': require('./assets/fonts/Inter_18pt-Medium.ttf'),
  'inter-italic': require('./assets/fonts/Inter_18pt-Italic.ttf'),
  'inter-semiBold': require('./assets/fonts/Inter_18pt-SemiBold.ttf'),
});

export default function App() {
  const [font, setFont] = useState(false);
  
  if(font){
    return (
      <MainStack />
    );
  }else {
    return (
      <AppLoading
      startAsync={fonts}
      onFinish={() => setFont(true)}
      onError={console.warn}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
