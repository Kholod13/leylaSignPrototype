import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { GenStyles } from '../../styles/style';
import ProgressBarHeader from '../ProgressBarHeader';
import React, { useContext, useEffect, useState } from 'react';
import { ProgressContext } from '../ProgressContext';
import { setNativeLanguage } from './TempRegistrationData'; // Ensure this path is correct

const languages = [
  { key: 'en_us', label: 'English (United State)', icon: require('../../assets/icons/USA.png') },
  { key: 'en_uk', label: 'English (United Kingdom)', icon: require('../../assets/icons/UnitedKingdom.png') },
  { key: 'de', label: 'German', icon: require('../../assets/icons/Germany.png') },
  { key: 'fr', label: 'French', icon: require('../../assets/icons/France.png') },
  { key: 'es', label: 'Spanish', icon: require('../../assets/icons/Spain.png') },
  { key: 'it', label: 'Italian', icon: require('../../assets/icons/Italy.png') },
  { key: 'pl', label: 'Polish', icon: require('../../assets/icons/Poland.png') },
  { key: 'cz', label: 'Czech', icon: require('../../assets/icons/Czech.png') },
  { key: 'ua', label: 'Ukrainian', icon: require('../../assets/icons/Ukraine.png') },
  { key: 'ru', label: 'Russian', icon: require('../../assets/icons/Russia.png') },
];

export default function Registration({ navigation }) {
  const { setProgress } = useContext(ProgressContext);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    setProgress(14);
  }, []);

  return (
    <View style={GenStyles.container}>
      <View style={{ height: '90%' }}>
        <ProgressBarHeader />
        <Text style={GenStyles.title}>Choose your native language</Text>
        <View style={{ height: '82%' }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.key}
                style={[
                  GenStyles.block,
                  styles.radioContainer,
                  selectedLanguage === lang.key && styles.selectedBlockBorder,
                ]}
                onPress={() => {
                  setSelectedLanguage(lang.key);
                  setNativeLanguage(lang.key);
                }}
              >
                <Image style={GenStyles.IconStyle} source={lang.icon} />
                <Text style={GenStyles.textBlock}>{lang.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={[
            selectedLanguage ? GenStyles.buttonLogin : GenStyles.buttonDisabled, 
          ]}
          onPress={() => navigation.navigate('RegistrationStep2')}
          disabled={!selectedLanguage}
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
