import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { GenStyles } from '../styles/style';
import { useNavigation } from '@react-navigation/native';
import NavigationMenu from './NavigationMenu';
import React, { useState } from 'react';

const translateWord = async (word) => {
  try {
    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: word,
        source: 'en',
        target: 'uk',
        format: 'text',
      }),
    });

    if (!response.ok) throw new Error('HTTP error ' + response.status);

    const data = await response.json();
    return data.translatedText || '? Переклад не знайдено';
  } catch (error) {
    console.error('Помилка перекладу:', error);
    return '❌ Помилка перекладу';
  }
};

export default function Main() {
  const fullText = 'A dog is a loyal and intelligent animal that has been a companion to humans for thousands of years. Dogs come in many breeds, each with unique characteristics, sizes, and temperaments. Some dogs are small and energetic, while others are large and calm. They are often trained to perform various tasks, such as guarding homes, assisting people with disabilities, or working in law enforcement.\n\nDogs communicate through barking, body language, and facial expressions. They are social animals that form strong bonds with their owners and families. Proper care, including regular exercise, a balanced diet, and veterinary check-ups, is essential for keeping a dog healthy and happy.\n\nMany people enjoy having dogs as pets because of their affectionate nature and loyal companionship. Dogs playful are known for forming strong bonds with their owners, often providing emotional support and a sense of security. Their playful';

  const [selectedWord, setSelectedWord] = useState(null);
  const [translation, setTranslation] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleWordPress = async (word) => {
  setSelectedWord(word);
  setTranslation('⏳ Перекладаємо...');
  setModalVisible(true);

  // Чекаємо переклад окремо — але модалка вже відкрилась
  try {
    const translated = await translateWord(word);
    setTranslation(translated);
  } catch (error) {
    console.error('handleWordPress error:', error);
    setTranslation('❌ Помилка перекладу');
  }
};


  const words = fullText.split(/(\s+)/); // сохраняет пробелы

  return (
    <View style={GenStyles.containerLoggedIn}>
        <View style={GenStyles.containerContent}>
            <Text style={[GenStyles.title, {margin: 20, paddingTop: 20}]}>The Loyal Companion</Text>
            <View>
              <Text style={[GenStyles.text, {paddingLeft: 20, paddingRight: 20}]}>
                {words.map((word, index) =>
                  word.trim().length > 0 ? (
                    <Text key={index} onPress={() => handleWordPress(word)} style={styles.word}>
                      {word}
                    </Text>
                  ) : (
                    <Text key={index}>{word}</Text> // для пробелов
                  )
                )}
              </Text>

              <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <Text style={styles.wordTitle}>{selectedWord}</Text>
                    <Text style={styles.translation}>{translation}</Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Text style={styles.closeButton}>Закрыть</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
            <View style={GenStyles.textPageIndicator}>

            </View>
        </View>
        <NavigationMenu />
    </View>
  );
}

const styles = StyleSheet.create({
container: {
    padding: 16,
  },
  text: {
    fontSize: 18,
    flexWrap: 'wrap',
    lineHeight: 28,
  },
  word: {
    color: 'black',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  wordTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  translation: {
    fontSize: 16,
    marginVertical: 12,
  },
  closeButton: {
    color: '#0388F5',
    marginTop: 10,
    fontSize: 16,
  },
});
