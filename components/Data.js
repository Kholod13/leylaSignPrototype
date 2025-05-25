import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { GenStyles } from '../styles/style';
import { useNavigation } from '@react-navigation/native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function Data(User) {
    const navigation = useNavigation();

    const UserData = []

    const User = {
        name: '',
        email: '',
        password: '',
        nativeLanguage: '',
        learningLanguage: '',
        levelLanguage: '',
        interests: [],
    }
    const setUser = (user) => {
        User.name = user.name;
        User.email = user.email;
        User.password = user.password;
        User.nativeLanguage = user.nativeLanguage;
        User.learningLanguage = user.learningLanguage;
        User.levelLanguage = user.levelLanguage;
        User.interests = user.interests;
    }
    const pushUser = (user) => {
        UserData.push(user);
    }
    const getUsers = () => {
        return UserData;
    }
  return (
    
    getUser()
  );
}

const styles = StyleSheet.create({

});
