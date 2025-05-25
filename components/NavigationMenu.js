import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { use } from 'react';
import { GenStyles } from '../styles/style';
import { useNavigation } from '@react-navigation/native';

export default function NavigationMenu() {
    const navigation = useNavigation();

  return (
    <View style={GenStyles.containerFooter}>
        <Text style={GenStyles.title}>Navigation Menu</Text>
    </View>
  );
}

const styles = StyleSheet.create({
});
