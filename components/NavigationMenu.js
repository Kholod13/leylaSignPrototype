import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { use } from 'react';
import { GenStyles } from '../styles/style';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function NavigationMenu() {
    const navigation = useNavigation();
    const route = useRoute();

    const currentScreen = route.name;

  return (
    <View style={GenStyles.containerFooter}>
        <TouchableOpacity
            style={currentScreen === 'Main' ? styles.iconContainerActive : styles.iconContainer}
            onPress={() => navigation.navigate('Main')}
        >
            <Image
                style={currentScreen === 'Main' ? styles.image : styles.imageHouse} 
                source={
                    currentScreen === 'Main'
                    ? require('../assets/icons/HouseActive.png')
                    : require('../assets/icons/House.png')
                }
            />
        </TouchableOpacity>
        <TouchableOpacity
            style={currentScreen === 'Folders' ? styles.iconContainerActive : styles.iconContainer}
            onPress={() => navigation.navigate('Folders')}
        >
            <Image
                style={styles.image} 
                source={
                    currentScreen === 'Folders'
                    ? require('../assets/icons/FolderOpenActive.png')
                    : require('../assets/icons/FolderOpen.png')
                }
            />
        </TouchableOpacity>
        <TouchableOpacity
            style={currentScreen === 'Simulator' ? styles.iconContainerActive : styles.iconContainer}
            onPress={() => navigation.navigate('Simulator')}
        >
            <Image
                style={styles.image} 
                source={
                    currentScreen === 'Simulator'
                    ? require('../assets/icons/PuzzlePieceActive.png')
                    : require('../assets/icons/PuzzlePiece.png')
                }
            />
        </TouchableOpacity>
        <TouchableOpacity
            style={currentScreen === 'Profile' ? styles.iconContainerActive : styles.iconContainer}
            onPress={() => navigation.navigate('Profile')}
        >
            <Image
                style={styles.image} 
                source={
                    currentScreen === 'Profile'
                    ? require('../assets/icons/UserCircleActive.png')
                    : require('../assets/icons/UserCircle.png')
                }
            />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#EBE7E5',
        width: 58,
        height: 58,
    },
    image:{
        width: 24,
        height: 24,
    },
    imageHouse:{
        width: 18,
        height: 18,
    },
    iconContainerActive: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#FF9D00',
        width: 58,
        height: 58,
    }
});
