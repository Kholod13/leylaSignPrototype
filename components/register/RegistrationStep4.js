import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { GenStyles } from '../../styles/style';
import ProgressBarHeader from '../ProgressBarHeader';
import React, { useContext, useEffect, useState } from 'react';
import { ProgressContext } from '../ProgressContext';
import { setInterests } from './TempRegistrationData';

const languages = [
  { key: '1', label: 'Fashion'},
  { key: '2', label: 'Art'},
  { key: '3', label: 'Literature'},
  { key: '4', label: 'Music'},
  { key: '5', label: 'European history'},
  { key: '6', label: 'Psychology'},
  { key: '7', label: 'Medicine'},
  { key: '8', label: 'Biographies'},
  { key: '9', label: 'Natural wonders'},
  { key: '10', label: 'Science'},
  { key: '11', label: 'AI'},
  { key: '12', label: 'Culturology'},
  { key: '13', label: 'World news'},
  { key: '14', label: 'Business and startups'},
  { key: '15', label: 'Technology and IT'},
  { key: '16', label: 'Politics'},
  { key: '17', label: 'Cooking'},
  { key: '18', label: 'Travel'},
  { key: '19', label: 'Quotes'},
  { key: '20', label: 'Health and fitness'},
  { key: '21', label: 'Humor'},
  { key: '22', label: 'Self-development'},
];

export default function RegistrationStep4({ navigation }) {
  const { setProgress } = useContext(ProgressContext);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  useEffect(() => {
    setProgress(56);
  }, []);

  return (
    <View style={GenStyles.container}>
      <View style={{ height: '90%' }}>
        <ProgressBarHeader />
        <Text style={GenStyles.title}>Choose your interests</Text>
        <View style={GenStyles.containerInterests}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.key}
                style={[
                  GenStyles.blockInterests,
                  styles.radioContainer,
                  selectedLanguages.includes(lang.key) && styles.selectedBlockBorder,
                ]}
                onPress={() => {
                  let updatedSelection;

                  if (selectedLanguages.includes(lang.key)) {
                    updatedSelection = selectedLanguages.filter(id => id !== lang.key);
                  } else {
                    updatedSelection = [...selectedLanguages, lang.key];
                  }

                  setSelectedLanguages(updatedSelection);

                  // Преобразуем ключи в названия
                  const selectedLabels = languages
                    .filter(item => updatedSelection.includes(item.key))
                    .map(item => item.label);

                  setInterests(selectedLabels); // сохраняем читаемые интересы
                }}
              >
                
                <View>
                  <Text style={GenStyles.textBlock}>{lang.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={[
            selectedLanguages.length > 0 ? GenStyles.buttonLogin : GenStyles.buttonDisabled, 
          ]}
          onPress={() => navigation.navigate('RegistrationStep5')}
          disabled={selectedLanguages.length === 0 }

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
