import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { use } from 'react';
import { GenStyles } from '../styles/style';
import { useNavigation } from '@react-navigation/native';

export default function NavigationMenu() {
    const navigation = useNavigation();

  return (
    <View style={GenStyles.containerFooter}>
        <TouchableOpacity style={styles.iconContainer}>
            <Image style={styles.image} source={require('../assets/icons/House.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
            <Image style={styles.image} source={require('../assets/icons/FolderOpen.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
            <Image style={styles.image} source={require('../assets/icons/PuzzlePiece.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
            <Image style={styles.image} source={require('../assets/icons/UserCircle.png')} />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#FF9D00',
        width: 58,
        height: 58,
    },
    image:{
        width: 24,
        height: 24,
    }
});
