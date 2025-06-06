// AddWordScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GenStyles } from '../../styles/style';

export default function AddWordToFolder({navigation, route}) {
    const {selectedWord} = route.params || {};
  return (
    <View style={styles.container}>
      <Text style={GenStyles.text}>Your word <Text style={{fontFamily: 'inter-bold'}}>{selectedWord}</Text></Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={GenStyles.buttonLogin}>
            <Text style={GenStyles.buttonLoginText}>Go Back</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
