import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { GenStyles } from '../styles/style';
import { useNavigation } from '@react-navigation/native';
import NavigationMenu from './NavigationMenu';
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';

export default function Profile() {
    const navigation = useNavigation();
    const { logout } = useContext(AuthContext); 

  return (
    <View style={GenStyles.containerLoggedIn}>
        <View style={GenStyles.containerContent}>
            <Text style={GenStyles.title}>PROFILE</Text>
            <View style={{ gap: 10 }}>
              <TouchableOpacity style={GenStyles.buttonLogin} onPress={logout}>
                <Text style={GenStyles.buttonLoginText}>Logout</Text>
              </TouchableOpacity>
            </View>
        </View>
        <NavigationMenu />
    </View>
  );
}

const styles = StyleSheet.create({

});
