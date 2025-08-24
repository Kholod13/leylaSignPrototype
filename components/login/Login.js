import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import { GenStyles } from '../../styles/style';
import ProgressBarHeader from '../ProgressBarHeader';
import React, { useContext, useEffect, useState } from 'react';
import { ProgressContext } from '../ProgressContext';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../AuthContext';
import { useUsers } from '../UserContext';

export default function Login({ navigation }) {
  const { login } = useContext(AuthContext);
  const { setProgress } = useContext(ProgressContext);
  const { setCurrentUserEmail } = useUsers();

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProgress(84);
  }, []);

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch("https://28yah1ied5.execute-api.us-east-1.amazonaws.com/dev/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: mail, password })
      });

      const data = await response.json();

      if (response.ok && data.user_id) {
        // Успешная авторизация
        await AsyncStorage.setItem("user_id", String(data.user_id));
        setCurrentUserEmail(mail);
        login(); // твой контекст логина
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error, try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={GenStyles.container}>
      {/* background */}
      <LinearGradient colors={['#FF8330', '#F9D423']} style={GenStyles.circleLogin1} />
      <LinearGradient colors={['#FF9A57', '#F9D423']} style={GenStyles.circleLogin2} />

      {/* content */}
      <View style={{ height: '82%' }}>
        <TouchableOpacity style={{marginTop: 30}} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/icons/ArrowLeft.png')} />
        </TouchableOpacity>
        <Text style={GenStyles.title}>Log in</Text>

        {/* EMAIL */}
        <Text style={GenStyles.inputText}>Email</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#918D8A"
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
          style={[GenStyles.input, emailFocused && GenStyles.inputFocused]}
          onChangeText={setMail}
          value={mail}
        />

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
            onChangeText={setPassword}
            value={password}
          />
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

        {error ? <Text style={GenStyles.textError}>{error}</Text> : null}

        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 40, marginTop: 10}}> 
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={{fontFamily: 'inter-semiBold', fontSize: 16}}>
              <Text style={{color: '#0388F5'}}>Forgot password?</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* footer */}
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 40}}> 
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{fontFamily: 'inter-semiBold', fontSize: 16}}>
              Don't have an account  <Text style={{color: '#0388F5'}}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            mail && password ? GenStyles.buttonLogin : GenStyles.buttonDisabled,
          ]}
          onPress={handleLogin}
          disabled={!mail || !password || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={GenStyles.buttonLoginText}>Log In</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center'
  }
});
