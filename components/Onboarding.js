import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { GenStyles } from '../styles/style';
import { useNavigation } from '@react-navigation/native';
import { clearTempUserData, showUserData } from './register/TempRegistrationData';
import { useFocusEffect } from '@react-navigation/native';
 // Clear temporary user data on onboarding screen load

export default function Onboarding() {
    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            clearTempUserData();
            showUserData();
        }, [])
    );

  return (
    <View style={GenStyles.container}>
        {/* background */}
        <LinearGradient
            colors={['#FF8330', '#F9D423']}
            style={GenStyles.circle1}>
        </LinearGradient>
        <LinearGradient
            colors={['#FF9A57', '#F9D423']}
            style={GenStyles.circle2}>
        </LinearGradient>
        <LinearGradient
            colors={['#FF9A57', '#F9D423']}
            style={GenStyles.circle3}>
        </LinearGradient>
        <LinearGradient
            colors={['#FF9A57', '#F9D423']}
            style={GenStyles.circle4}>
        </LinearGradient>
        {/* content */}
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <View>
            <Text style={GenStyles.title}>Hi!</Text>
            <Text style={GenStyles.text}>We will help you learn the language. You will improve:</Text>

            <View style={{ alignItems: 'flex-start', marginBottom: '35%' }}>
                <View style={GenStyles.block}>
                <Image style={GenStyles.IconStyle} source={require('../assets/icons/Note.png')} />
                <Text style={GenStyles.textBlock}>Improve your vocabulary</Text>
                </View>
                <View style={GenStyles.block}>
                <Image style={GenStyles.IconStyle} source={require('../assets/icons/Media.png')} />
                <Text style={GenStyles.textBlock}>Understand complex texts</Text>
                </View>
                <View style={GenStyles.block}>
                <Image style={GenStyles.IconStyle} source={require('../assets/icons/Facts.png')} />
                <Text style={GenStyles.textBlock}>Read interesting facts</Text>
                </View>
            </View>
            </View>

            {/* Кнопки внизу */}
            <View style={{  }}>
            <TouchableOpacity style={GenStyles.buttonLogin} onPress={() => navigation.navigate('Login')}>
                <Text style={GenStyles.buttonLoginText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={GenStyles.buttonRegister} onPress={() => navigation.navigate('Register')}>
                <Text style={GenStyles.buttonRegisterText}>Sign Up</Text>
            </TouchableOpacity>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({

});
