import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { GenStyles } from '../../styles/style';
import ProgressBarHeader from '../ProgressBarHeader';
import React, { useContext, useEffect, useState } from 'react';
import { ProgressContext } from '../ProgressContext';
import { LinearGradient } from 'expo-linear-gradient';
import { setUsernameTemp } from './TempRegistrationData';
import { usernameList } from '../Data'; // Assuming names is exported from Data.js

const names = usernameList;

export default function RegistrationStep5({ navigation }) {
  const { setProgress } = useContext(ProgressContext);
  const [isFocused, setFocused] = useState(false);
  const [username, setUsername] = useState('');
  const isUsernameValid = username.trim().length > 0;

  function checkUsername() {
  for (let i = 0; i <names.length; i++) {
    if (names[i].label === username) {
      return true;
    }
  }
  return false;
}

  useEffect(() => {
    setProgress(70);
  }, []);

  return (
    <View style={GenStyles.container}>
      {/* background */}
        <LinearGradient
            colors={['#FF8330', '#F9D423']}
            style={GenStyles.circleNamePage1}>
        </LinearGradient>
        <LinearGradient
            colors={['#FF9A57', '#F9D423']}
            style={GenStyles.circleNamePage2}>
        </LinearGradient>
        <LinearGradient
            colors={['#FF9A57', '#F9D423']}
            style={GenStyles.circleNamePage3}>
        </LinearGradient>
      {/* content */}
      <View style={{ height: '90%' }}>
        <ProgressBarHeader />
        <Text style={GenStyles.title}>Set your username</Text>
        <View>
            <Text style={GenStyles.inputText}>Username</Text>
            <TextInput
              placeholder="Username"
              placeholderTextColor="#918D8A"
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={[GenStyles.input, isFocused && GenStyles.inputFocused]}
              onChangeText={(text) => setUsername(text)}
              value={username}
              />
              {checkUsername() && (
                <Text style={GenStyles.textError}>Username already in use. Try another</Text>
              )}
        </View>
      </View>

      <View>
        <TouchableOpacity
             style={[
                isUsernameValid && !checkUsername() ? GenStyles.buttonLogin : GenStyles.buttonDisabled,
              ]}
              onPress={() => {
                navigation.navigate('RegistrationStep6');
                setUsernameTemp(username);
              }}
              disabled={!isUsernameValid || checkUsername()}

        >
          <Text style={GenStyles.buttonLoginText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  radioContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectedBlockBorder: {
    borderColor: '#FF9D00',
    borderWidth: 2,
  },
});
