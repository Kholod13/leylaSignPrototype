import { StyleSheet, Text, View } from 'react-native';
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
        <Text>Hi!</Text>
        <Text>We will help you learn the language. You will improve:</Text>
        {/* blocks */}
        <View>

        </View>
        {/* buttons */}
        <View>

        </View>
    </View>
  );
}

const styles = StyleSheet.create({

});
