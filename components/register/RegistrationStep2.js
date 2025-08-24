import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { GenStyles } from '../../styles/style';
import ProgressBarHeader from '../ProgressBarHeader';
import React, { useContext, useEffect, useState } from 'react';
import { ProgressContext } from '../ProgressContext';
import { setLearnedLanguage } from './TempRegistrationData';

export default function RegistrationStep2({ navigation }) {
  const { setProgress } = useContext(ProgressContext);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    setProgress(28);

    // Загрузка языков из API
    const fetchLanguages = async () => {
      try {
        const response = await fetch("https://28yah1ied5.execute-api.us-east-1.amazonaws.com/dev/languages");
        const data = await response.json();
        setLanguages(data);
      } catch (error) {
        console.error("Ошибка загрузки языков:", error);
      }
    };

    fetchLanguages();
  }, []);

  return (
    <View style={GenStyles.container}>
      <View style={{ height: '90%' }}>
        <ProgressBarHeader />
        <Text style={GenStyles.title}>Choose the language you want to learn</Text>
        <View style={{ height: '82%' }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.id}
                style={[
                  GenStyles.block,
                  styles.radioContainer,
                  selectedLanguage === lang.id && styles.selectedBlockBorder,
                ]}
                onPress={() => {
                  setSelectedLanguage(lang.id);
                  setLearnedLanguage(lang.id);
                }}
              >
                <Image
                  style={GenStyles.IconStyle}
                  source={require('../../assets/icons/Ukraine.png')} // заглушка
                />
                <Text style={GenStyles.textBlock}>{lang.name}</Text>
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
          onPress={() => navigation.navigate('RegistrationStep3')}
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
