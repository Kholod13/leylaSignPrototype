import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { GenStyles } from '../../styles/style';
import ProgressBarHeader from '../ProgressBarHeader';
import React, { useContext, useEffect, useState } from 'react';
import { ProgressContext } from '../ProgressContext';

export default function RegistrationStep5({ navigation }) {
  const { setProgress } = useContext(ProgressContext);

  useEffect(() => {
    setProgress(70);
  }, []);

  return (
    <View style={GenStyles.container}>
      <View style={{ height: '90%' }}>
        <ProgressBarHeader />
        <Text style={GenStyles.title}>Set your username</Text>
        <View>
            
        </View>
      </View>

      <View>
        <TouchableOpacity
            style={[
                GenStyles.buttonLogin, 
            ]}
          /*style={[
            selectedLanguages > 0 ? GenStyles.buttonLogin : GenStyles.buttonDisabled, 
          ]}
          onPress={() => navigation.navigate('RegistrationStep6')}
          disabled={selectedLanguages.length === 0 }*/

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
