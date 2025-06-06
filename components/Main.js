import { StyleSheet, Text, View, Modal, TouchableOpacity, Animated, Image } from 'react-native';
import { GenStyles } from '../styles/style';
import { useNavigation } from '@react-navigation/native';
import NavigationMenu from './NavigationMenu';
import React, { useState, useRef } from 'react';
import { translateWord } from './api/translateWord';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatList, Dimensions } from 'react-native';
import { useWindowDimensions } from 'react-native';

const {width} = Dimensions.get('window');

const paginateText = (text, firstPageLimit = 900, otherPagesLimit = 1200) => {
  const paragraphs = text.split('\n').map(p => p.trim()).filter(p => p.length > 0);
  const pages = [];
  let currentPage = '';
  let currentLength = 0;
  let isFirstPage = true;

  for (let i = 0; i < paragraphs.length; i++) {
    const para = paragraphs[i];
    const limit = isFirstPage ? firstPageLimit : otherPagesLimit;

    if ((currentLength + para.length) > limit && currentPage.length > 0) {
      pages.push(currentPage.trim());
      currentPage = para + '\n\n';
      currentLength = para.length;
      isFirstPage = false;
    } else {
      currentPage += para + '\n\n';
      currentLength += para.length;
    }
  }

  if (currentPage.length > 0) {
    pages.push(currentPage.trim());
  }

  return pages;
};

export default function Main({navigation}) {
  
  const title = 'The Loyal Companion';
  //const fullText = ' A dog is a loyal and intelligent animal that has been a companion to humans for thousands of years. Dogs come in many breeds, each with unique characteristics, sizes, and temperaments. Some dogs are small and energetic, while others are large and calm. They are often trained to perform various tasks, such as guarding homes, assisting people with disabilities, or working in law enforcement.\nDogs communicate through barking, body language, and facial expressions. They are social animals that form strong bonds with their owners and families. Proper care, including regular exercise, a balanced diet, and veterinary check-ups, is essential for keeping a dog healthy and happy.\nMany people enjoy having dogs as pets because of their affectionate nature and loyal companionship. Dogs playful are known for forming strong bonds with their owners, often providing emotional support and a sense of security. Their playful\nloyal companionship. Dogs are known for forming strong bonds with their owners, often providing emotional support and a sense of security. Their playful behavior and eagerness to please make them excellent family pets, and many people appreciate the daily routines and exercise that come with dog ownership. Additionally, dogs can be trained for various tasks, from simple tricks to important roles like guiding the visually impaired or working with law enforcement.';
  const fullText = 'Once upon a time in a quiet village nestled between rolling hills and whispering forests, there lived a young boy named Eliot. He was known for his boundless curiosity and an imagination that often took him to places far beyond the village boundaries.\nEvery morning, Eliot would wander into the woods, not out of mischief but in search of adventure. The forest was his playground, and each rustling leaf or fluttering bird sparked a story in his mind. He believed the old oak tree near the river could talk, and the fox that crossed his path every Thursday was a secret guardian of the woods.\nOne day, Eliot discovered a strange book buried beneath the roots of the talking oak. The pages were covered in symbols, maps, and drawings of creatures he had only imagined. As he flipped through the pages, the sky darkened, and a wind swirled around him. The forest hushed as if waiting.\nEliot took the book home and hid it beneath his bed. That night, he dreamt of glowing pathways, mountains that breathed, and stars that hummed melodies. When he awoke, the symbols from the book were glowing faintly in the dark.\nDetermined to uncover its secrets, Eliot spent his days deciphering the strange language. He discovered that the book was a gateway—a guide to a hidden world existing in tandem with his own. It spoke of “The Between,” a place where time paused and reality twisted like water.\nWeeks passed, and Eliot grew more distant from his peers. While others played, he studied. While others laughed, he listened to the whispers from the book. It was preparing him for a journey that only he could take.\nOne evening, under a moonlit sky, he traced a symbol from the book onto the ground with salt and river stones. As he chanted the words written on page thirty-three, a portal opened like a shimmering mirror in the air. Without hesitation, he stepped through.\nThe Between was unlike anything he’d ever known. Gravity shifted, colors danced, and thoughts echoed aloud. He encountered sentient shadows, floating libraries, and a creature made of mist who called itself Tether. Tether became his guide, helping him understand that he was a “Walker,” one of few born with the gift to travel across realms.\nThrough trials of fire, wind, and silence, Eliot learned to harness parts of himself he never knew existed—bravery, wisdom, compassion, and sacrifice. He helped mend broken pathways and calm restless spirits. He restored balance to places forgotten by time.\n\
  After what felt like lifetimes, Eliot returned home. Though only a week had passed in his village, he felt older, wiser, transformed. The book no longer glowed—it had given all it could. Eliot hid it once more beneath the oak, for the next curious soul.\n\
Years later, Eliot became the village storyteller. Children gathered around him as he spun tales of forests that spoke and stars that sang. They never doubted him. His eyes held the sparkle of far-off worlds, and his words wove magic into every heart.\n\
Some say that if you listen closely near the old oak on a quiet night, you’ll hear faint whispers. And maybe, just maybe, the book is waiting—again.';
  //modal window and translate
  const [selectedWord, setSelectedWord] = useState(null);
  const [translation, setTranslation] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
//pages and pages indicator
  const pages = paginateText(fullText, 900, 1200);
  const [currentPage, setCurrentPage] = useState(0);
  const {width} = useWindowDimensions();

  const scrollX = useRef(new Animated.Value(0)).current;

  const handleWordPress = async (word) => {
      setSelectedWord(word);
      setTranslation('⏳ Translate...');
      setModalVisible(true);
  // waiting translate but modal window now is opened
  try {
    const translated = await translateWord(word);
    setTranslation(translated);
  } catch (error) {
    console.error('handleWordPress error:', error);
    setTranslation('❌ Error translating');
  }
};

const formatText = (text) => {
  if (!text) return '';
  const cleaned = text.replace(/[^\p{L}\p{N}\s]/gu, ''); // удаление всех символов кроме букв/цифр/пробелов
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
};

  const words = fullText.split(/(\s+)/); // save spaces

  return (
    <View style={GenStyles.containerLoggedIn}>
        <View style={GenStyles.containerContent}>
          <Animated.FlatList
            data={pages}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const page = Math.floor(e.nativeEvent.contentOffset.x / width);
              setCurrentPage(page);
            }}
            onScroll={Animated.event([{ nativeEvent: {contentOffset:
              { x: scrollX } } }],
                {useNativeDriver: false}
            )}
            scrollEventThrottle={16}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={{ width, padding: 20 }}>
                {index === 0 && ( 
                  <Text style={[GenStyles.title, { marginBottom: 10 }]}>{title}</Text>
                )}
                <Text 
                  style={[
                    GenStyles.text,
                    index > 0 ? {marginTop: 20 } : null
                  ]}
                >
                  {
                    item.split(/(\s+)/).map((word, index) => {
                      const cleanWord = word.replace(/[^\p{L}\p{N}]/gu, '');
                      const isSelected = modalVisible && cleanWord.toLowerCase() === selectedWord?.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase();

                      return word.trim().length > 0 ? (
                        <Text
                          key={index}
                          onPress={() => handleWordPress(cleanWord)}
                          style={[styles.word, isSelected && styles.highlightedWord]}
                        >
                          {word}
                        </Text>
                      ) : (
                        <Text key={index}>{word}</Text>
                      );
                    })
                  }
                </Text>
              </View>
            )}
          />
          {/* MODAL WINDOW FOR TRANSLATE WORDS */}
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              {/* Закрытие по нажатию на фон */}
              <TouchableOpacity
                style={StyleSheet.absoluteFill}
                activeOpacity={1}
                onPress={() => setModalVisible(false)}
              />
              
              <View style={styles.modalContent}>
                <View style={styles.buttonAdd}>
                  <TouchableOpacity onPress={() => {
                    navigation.navigate('AddWordToFolder', {selectedWord});
                    setModalVisible(false);
                  }}>
                    <Image source={require('../assets/icons/PlusCircle.png')} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.wordTitle}>{formatText(selectedWord)}</Text>
                <Text style={styles.translation}>{formatText(translation)}</Text>
              </View>
            </View>
          </Modal>
          {/* PAGES INDICATOR */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
            {pages.map((_, index) => {
              const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

              const dotColor = scrollX.interpolate({
                inputRange,
                outputRange: ['#ccc', '#FF9D00', '#ccc'],
                extrapolate: 'clamp',
              });

              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [1, 1.4, 1],
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  key={index}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    margin: 4,
                    backgroundColor: dotColor,
                    transform: [{ scale }],
                  }}
                />
              );
            })}
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
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    width: '80%',
    alignItems: 'center',
    paddingBottom: 50,
  },
  wordTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  translation: {
    fontSize: 18,
    marginVertical: 12,
  },
  buttonAdd: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'flex-end',
  },
  highlightedWord: {
    backgroundColor: '#5CB6FF', // мягкий жёлтый
    borderRadius: 4,
  },
});
