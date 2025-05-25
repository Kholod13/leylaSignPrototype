import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import { GenStyles } from '../../styles/style';
import ProgressBarHeader from '../ProgressBarHeader';
import React, { useContext, useEffect, useState } from 'react';
import { ProgressContext } from '../ProgressContext';
import { LinearGradient } from 'expo-linear-gradient';

const users = [
  { key: '1', label: 'leyla@gmail.com', password: '123456gG' },
  { key: '2', label: 'admin@gmail.com', password: '123456gG' },
];

export default function ForgotPassword({ navigation }) {
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

  useEffect(() => {
    setProgress(84);
  }, []);

  return (
    <View style={GenStyles.container}>
      {/* background */}
        <LinearGradient
            colors={['#FF8330', '#F9D423']}
            style={GenStyles.circleForgotPassword1}>
        </LinearGradient>
        <LinearGradient
            colors={['#FF9A57', '#F9D423']}
            style={GenStyles.circleForgotPassword2}>
        </LinearGradient>
        <LinearGradient
            colors={['#FF8330', '#F9D423']}
            style={GenStyles.circleForgotPassword3}>
        </LinearGradient>
        <LinearGradient
            colors={['#FF9A57', '#F9D423']}
            style={GenStyles.circleForgotPassword4}>
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
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
        <TouchableOpacity
             style={[
                isMailValid ? GenStyles.buttonLogin : GenStyles.buttonDisabled,
              ]}
              onPress={() => navigation.navigate('CheckMail', {email: mail})}
              disabled={!isMailValid}

        >
          <Text style={GenStyles.buttonLoginText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
});
