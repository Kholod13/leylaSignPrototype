import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { GenStyles } from '../../styles/style';
import ProgressBarHeader from '../ProgressBarHeader';
import React, { useContext, useEffect, useState } from 'react';
import { ProgressContext } from '../ProgressContext';

const languages = [
  { key: 'A1', label: 'Beginner', underLabel: 'I can say hello' },
  { key: 'A2', label: 'Elementary', underLabel: 'Understand short conversations' },
  { key: 'B1', label: 'Intermediate', underLabel: 'Talk about familiar topics' },
  { key: 'B2', label: 'Upper Intermediate', underLabel: 'Understand complex content'},
  { key: 'C1', label: 'Advanced', underLabel: 'Speak confidently'},
  { key: 'C2', label: 'Proficient', underLabel: 'Speak like a native' },
];

export default function RegistrationStep3({ navigation }) {
  const { setProgress } = useContext(ProgressContext);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    setProgress(42);
  }, []);

  return (
    <View style={GenStyles.container}>
      <View style={{ height: '90%' }}>
        <ProgressBarHeader />
        <Text style={GenStyles.title}>Choose your language level</Text>
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
                onPress={() => setSelectedLanguage(lang.key)}
              >
                <View>
                  <Text style={GenStyles.languageLevels}>{lang.key}</Text>
                </View>
                <View style={{ alignItems: 'left', gap: 5 }}>
                  <Text style={GenStyles.textBlock}>{lang.label}</Text>
                  <Text style={GenStyles.underTextBlock}>{lang.underLabel}</Text>
                </View>
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
          onPress={() => navigation.navigate('RegistrationStep4')}
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
