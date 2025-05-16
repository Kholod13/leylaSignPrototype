import { StyleSheet, Text, View } from 'react-native';
import MainStack from './navigate';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';

const fonts = () => Font.loadAsync({
  'inter-regular': require('./assets/fonts/Inter_18pt-Regular.ttf'),
  'inter-light': require('./assets/fonts/Inter_18pt-Light.ttf'),
  //bold
  //medium
  //italic
});

export default function App() {
  return (
    <MainStack />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
