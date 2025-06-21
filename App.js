import { StyleSheet, Text, View } from 'react-native';
import MainStack from './navigate';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from './navigate';
import { useEffect } from 'react';
import { AuthProvider } from './AuthContext';
import { UserProvider} from './components/UserContext';

const fonts = () => Font.loadAsync({
  'inter-regular': require('./assets/fonts/Inter_18pt-Regular.ttf'),
  'inter-light': require('./assets/fonts/Inter_18pt-Light.ttf'),
  'inter-bold': require('./assets/fonts/Inter_18pt-Bold.ttf'),
  'inter-medium': require('./assets/fonts/Inter_18pt-Medium.ttf'),
  'inter-italic': require('./assets/fonts/Inter_18pt-Italic.ttf'),
  'inter-semiBold': require('./assets/fonts/Inter_18pt-SemiBold.ttf'),
});

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [font, setFont] = useState(false);
  const [fontLoaded, setFontLoaded] = React.useState(false);
  
  if(!fontLoaded) {
    return (
      <AppLoading
        startAsync={fonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }
  
  return (
    <AuthProvider>
      <UserProvider>
        <Navigation />
      </UserProvider>
    </AuthProvider>
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
