import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import { GenStyles } from '../../styles/style';
import ProgressBarHeader from '../ProgressBarHeader';
import React, { useContext, useEffect, useState } from 'react';
import { ProgressContext } from '../ProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

const mails = [
  { key: '1', label: 'leyla@gmail.com'},
  { key: '2', label: 'admin@gmail.com'},
];

export default function RegistrationStep6({ navigation }) {
  const { setProgress } = useContext(ProgressContext);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const isMailValid = mail.trim().length > 0;

  function checkMail() {
  for (let i = 0; i <mails.length; i++) {
    if (mails[i].label === mail) {
      return true;
    }
  }
  return false;
}

    function getPasswordErrors(password) {
  const errors = [];

  if (password.length < 8 && !/[A-Z]/.test(password) || /\s/.test(password) && password.length < 8
    || !/[A-Z]/.test(password) && /\s/.test(password)) {
    errors.push('Password must contain at least 8 characters, including capital letters, without spaces');
  }
  else if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  else if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  else if (/\s/.test(password)) {
    errors.push('Password must not contain spaces');
  }

  return errors;
}

  useEffect(() => {
    setProgress(84);
  }, []);

  return (
    <View style={GenStyles.container}>
      {/* background */}
        <LinearGradient
            colors={['#FF8330', '#F9D423']}
            style={GenStyles.circlePassPage1}>
        </LinearGradient>
        <LinearGradient
            colors={['#FF9A57', '#F9D423']}
            style={GenStyles.circlePassPage2}>
        </LinearGradient>
      {/* content */}
      <View style={{ height: '90%' }}>
        <ProgressBarHeader />
        <Text style={GenStyles.title}>Create an account</Text>
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
              {checkMail() && (
                <Text style={GenStyles.textError}>This email is already taken</Text>
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
                {password.length > 0 && getPasswordErrors(password).length > 0 && (
                <View style={{ marginTop: 5 }}>
                    {getPasswordErrors(password).map((err, index) => (
                    <Text key={index} style={GenStyles.textError}>{err}</Text>
                    ))}
                </View>
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
            {/* CONFIRM */}
            <Text style={GenStyles.inputText}>Confirm password</Text>
            <View style={GenStyles.inputWrapper}>
                <TextInput
                    placeholder="Confirm password"
                    placeholderTextColor="#918D8A"
                    secureTextEntry={!showConfirmPassword}
                    onFocus={() => setConfirmFocused(true)}
                    onBlur={() => setConfirmFocused(false)}
                    style={[GenStyles.input, confirmFocused && GenStyles.inputFocused]}
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                />
                <TouchableOpacity
                    style={GenStyles.eyeButton}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    <Image
                    source={
                        showConfirmPassword
                        ? require('../../assets/icons/Eye.png')
                        : require('../../assets/icons/EyeClosed.png')
                    }
                    style={GenStyles.eyeIcon}
                    />
                </TouchableOpacity>
            </View>
            {confirmPassword.length > 0 && confirmPassword !== password && (
                <Text style={GenStyles.textError}>Passwords don't match</Text>
              )}
              {/* TEXT LOGIN */}
              <View style={{ position: 'absolute', bottom: '-270', width: '100%', alignItems: 'center'}}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{fontFamily: 'inter-semiBold', fontSize: 16}}>I have an account  <Text style={{color: '#0388F5'}}>Log in</Text></Text>
                    </TouchableOpacity>
                </View>
              </View>
        </View>
      </View>

      <View>
        <TouchableOpacity
             style={[
                isMailValid && !checkMail() ? GenStyles.buttonLogin : GenStyles.buttonDisabled,
              ]}
              onPress={() => navigation.navigate('Main')}
              disabled={!isMailValid || checkMail()}

        >
          <Text style={GenStyles.buttonLoginText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
});
