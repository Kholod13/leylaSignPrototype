import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { GenStyles } from '../../styles/style';
import ProgressBarHeader from '../ProgressBarHeader';
import { ProgressContext } from '../ProgressContext';
import { LinearGradient } from 'expo-linear-gradient';
import { setUsernameTemp } from './TempRegistrationData';

export default function RegistrationStep5({ navigation }) {
  const { setProgress } = useContext(ProgressContext);
  const [username, setUsername] = useState('');
  const [isFocused, setFocused] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [checking, setChecking] = useState(false);

  const isUsernameValid = username.trim().length > 0;

  useEffect(() => {
    setProgress(70);
  }, []);

  // Debounce username check
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (isUsernameValid) {
        checkUsernameFromAPI(username);
      } else {
        setUsernameTaken(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [username]);

  const checkUsernameFromAPI = async (nickname) => {
    try {
      setChecking(true);
      const response = await fetch(
        'https://28yah1ied5.execute-api.us-east-1.amazonaws.com/dev/check_nickname',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nickname }),
        }
      );

      const data = await response.json();
      setUsernameTaken(data.taken); // true если имя занято
      console.log('Проверка ника:', nickname, 'Занято:', data.taken);
    } catch (error) {
      console.error('Ошибка при проверке ника:', error);
      setUsernameTaken(false); // по умолчанию считаем свободным
    } finally {
      setChecking(false);
    }
  };

  const handleContinue = () => {
    setUsernameTemp(username);
    navigation.navigate('RegistrationStep6');
  };

  return (
    <View style={GenStyles.container}>
      {/* Background circles */}
      <LinearGradient
        colors={['#FF8330', '#F9D423']}
        style={GenStyles.circleNamePage1}
      />
      <LinearGradient
        colors={['#FF9A57', '#F9D423']}
        style={GenStyles.circleNamePage2}
      />
      <LinearGradient
        colors={['#FF9A57', '#F9D423']}
        style={GenStyles.circleNamePage3}
      />

      {/* Content */}
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
          {usernameTaken && (
            <Text style={GenStyles.textError}>
              Username already in use. Try another
            </Text>
          )}
        </View>
      </View>

      {/* Button */}
      <View>
        <TouchableOpacity
          style={[
            isUsernameValid && !usernameTaken && !checking
              ? GenStyles.buttonLogin
              : GenStyles.buttonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!isUsernameValid || usernameTaken || checking}
        >
          <Text style={GenStyles.buttonLoginText}>
            {checking ? 'Checking...' : 'Continue'}
          </Text>
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
