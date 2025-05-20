import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { GenStyles } from '../styles/style';
import { useNavigation } from '@react-navigation/native';

export default function Main() {
    const navigation = useNavigation();

  return (
    <View style={GenStyles.container}>
        <View style={{ gap: 10 }}>
            <TouchableOpacity style={GenStyles.buttonLogin} onPress={() => navigation.navigate('Login')}>
                <Text style={GenStyles.buttonLoginText}>Log In</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({

});
