import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { GenStyles } from '../styles/style';
import { useNavigation } from '@react-navigation/native';
import NavigationMenu from './NavigationMenu';

export default function Simulator() {
    const navigation = useNavigation();

  return (
    <View style={GenStyles.containerLoggedIn}>
        <View style={GenStyles.containerContent}>
            <Text style={GenStyles.title}>MAIN CONTAINER</Text>
        </View>
        <NavigationMenu />
    </View>
  );
}

const styles = StyleSheet.create({

});
