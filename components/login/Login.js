import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import { GenStyles } from '../../styles/style';
import ProgressBarHeader from '../ProgressBarHeader';
import React, { useContext, useEffect, useState } from 'react';
import { ProgressContext } from '../ProgressContext';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../AuthContext';

const users = [
  { key: '1', label: 'leyla@gmail.com', password: '123456gG' },
  { key: '2', label: 'admin@gmail.com', password: '123456gG' },
];

export default function Login({ navigation }) {
  const { login } = useContext(AuthContext);

  const { setProgress } = useContext(ProgressContext);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const isMailValid = mail.trim().length > 0;
  const isPasswordValid = password.trim().length > 0;
  const userKey = users.find(user => user.label === mail)?.key;

  function checkMail() {
  for (let i = 0; i < users.length; i++) {
    if (users[i].label === mail) {
      return true; // Email already exists
    }
  }
  return false;
}

  function checkPassword() {
    const user = users.find(user => user.label === mail);
    return user ? user.password === password : false;
  }


  useEffect(() => {
    setProgress(84);
  }, []);

  return (
    <View style={GenStyles.container}>
      {/* background */}
        <LinearGradient
            colors={['#FF8330', '#F9D423']}
            style={GenStyles.circleLogin1}>
        </LinearGradient>
        <LinearGradient
            colors={['#FF9A57', '#F9D423']}
            style={GenStyles.circleLogin2}>
        </LinearGradient>
      {/* content */}
      <View style={{ height: '82%' }}>
        <TouchableOpacity style={{marginTop: 30}} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/icons/ArrowLeft.png')} />
        </TouchableOpacity>
        <Text style={GenStyles.title}>Log in</Text>
        <View style={{position: 'relative'}}>
            <Text style={GenStyles.inputText}>Email</Text>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#918D8A"
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              style={[GenStyles.input, emailFocused && GenStyles.inputFocused]}
              onChangeText={(text) => setMail(text)}
              value={mail}
              />
              {isMailValid && !checkMail() && (
                <Text style={GenStyles.textError}>No user with this email address is registered</Text>
              )}

              {/* PASSWORD */}
            <Text style={GenStyles.inputText}>Password</Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#918D8A"
                    secureTextEntry={!showPassword}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    style={[GenStyles.input, passwordFocused && GenStyles.inputFocused]}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
                {isPasswordValid && !checkPassword() && (
                  <Text style={GenStyles.textError}>The password is incorrect</Text>
                )}
                <TouchableOpacity
                    style={GenStyles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Image
                    source={
                        showPassword
                        ? require('../../assets/icons/Eye.png')
                        : require('../../assets/icons/EyeClosed.png')
                    }
                    style={GenStyles.eyeIcon}
                    />
                </TouchableOpacity>
            </View>
            <View>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 40, marginTop: 10}}> 
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={{fontFamily: 'inter-semiBold', fontSize: 16}}><Text style={{color: '#0388F5'}}>Forgot password?</Text></Text>
                </TouchableOpacity>
              </View>
            </View>
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
        {/* TEXT LOGIN */}
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 40}}> 
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{fontFamily: 'inter-semiBold', fontSize: 16}}>Don't have an account  <Text style={{color: '#0388F5'}}>Sign Up</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
             style={[
                checkMail() && checkPassword() ? GenStyles.buttonLogin : GenStyles.buttonDisabled,
              ]}
              onPress={login}
              disabled={!(checkMail() && checkPassword())}

        >
          <Text style={GenStyles.buttonLoginText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
});
