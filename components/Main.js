import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { GenStyles } from '../styles/style';

export default function Main() {
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
        <Text style={GenStyles.title}>Hi!</Text>
        <Text style={GenStyles.text}>We will help you learn the language. You will improve:</Text>
        {/* blocks */}
        <View>
            <View style={GenStyles.block}>
                <Image source={require('../assets/icons/Note.png')} />
                <Text style={GenStyles.textBlock}>Improve your vocabulary</Text>
            </View>
            <View style={GenStyles.block}>
                <Image source={require('../assets/icons/Media.png')} />
                <Text style={GenStyles.textBlock}>Understand complex texts</Text>
            </View>
            <View style={GenStyles.block}>
                <Image source={require('../assets/icons/Facts.png')} />
                <Text style={GenStyles.textBlock}>Read interesting facts</Text>
            </View>
        </View>
        {/* buttons */}
        <View>
            <Button style={GenStyles.buttonLogin} title="Log In" onPress={() => {}} />
            <Button style={GenStyles.buttonRegister} title="Sign Up" onPress={() => {}} />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({

});
