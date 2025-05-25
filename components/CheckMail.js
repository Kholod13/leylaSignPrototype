import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import { GenStyles } from '../styles/style';
import React, { useContext, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const users = [
  { key: '1', label: 'leyla@gmail.com', password: '123456gG' },
  { key: '2', label: 'admin@gmail.com', password: '123456gG' },
];

export default function CheckMail({ route, navigation }) {
    const { email } = route.params; // Get the email from the route parameters

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
            colors={['#FF8330', '#F9D423']}
            style={GenStyles.circleCheckMail1}>
        </LinearGradient>
        <LinearGradient
            colors={['#FF9A57', '#F9D423']}
            style={GenStyles.circleCheckMail2}>
        </LinearGradient>
        <LinearGradient
            colors={['#FF8330', '#F9D423']}
            style={GenStyles.circleCheckMail3}>
        </LinearGradient>
        <LinearGradient
            colors={['#FF9A57', '#F9D423']}
            style={GenStyles.circleCheckMail4}>
        </LinearGradient>
      {/* content */}
      <View style={{ height: '80%', justifyContent: 'center', alignItems: 'center', padding: 30, marginTop: 60}}>
        <Text style={GenStyles.title}>Check your email</Text>
        <Text style={[GenStyles.text, {textAlign: 'center'}]}>The password has been sent an email to <Text style={{fontFamily: 'inter-bold'}}>{email}</Text></Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
        
        <TouchableOpacity
             style={[
                GenStyles.buttonLogin,
              ]}
              onPress={() => navigation.navigate('Login')}
        >
          <Text style={GenStyles.buttonLoginText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
});
