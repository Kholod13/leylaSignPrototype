import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import { GenStyles } from '../../styles/style';

export default function AddWordToFolder({navigation, route}) {
    const {selectedWord, translation} = route.params || {};
    const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState('');
  return (
    <View style={[styles.container, {justifyContent: 'flex-start', marginTop: 50}]}>
      <View style={GenStyles.containerHeader}>
        <TouchableOpacity style={{marginLeft: 10}} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/icons/ArrowLeft.png')} />
        </TouchableOpacity>
        <View style={{width: '100%', alignItems: 'center', marginLeft: -40}}>
          <Text style={styles.text}>Add to folder</Text>
        </View>
      </View>
      {/* Modal window for edit translation */}
      <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
      >

      </Modal>
      <View style={GenStyles.wordBlock}>
        <Text style={[GenStyles.title, {textTransform: 'capitalize', width: '100%'}]}>{selectedWord}</Text>
        <Text style={styles.underText}>Translation</Text>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Text style={{
          fontFamily: 'inter-regular',
          fontSize: 18,
          textTransform: 'capitalize',
          marginTop: 10,
        }}>{translation}</Text>
          <TouchableOpacity style={{marginLeft: 10}} onPress={() => navigation.navigate('EditWord', {selectedWord, translation})}>
            <Image source={require('../../assets/icons/NotePencil.png')}></Image>
          </TouchableOpacity>
        </View>
        <Text style={[styles.underText, {marginTop: 20}]}>Hint (optional)</Text>
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={4}
          placeholder="Enter a hint"
          value={text}
          onChangeText={setText}
          textAlignVertical="top"
        />
      </View>
      <View style={{
          borderTopWidth: 1,
          width: '100%',
          borderColor: '#E5E0DC',
          paddingHorizontal: 20,
        }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 20,
            }}
          >
            <Text style={GenStyles.title}>Choose folder</Text>
            <TouchableOpacity>
              <Image source={require('../../assets/icons/Plus.png')} style={{width: 25, height: 25}}/>
            </TouchableOpacity>
          </View>
          {/* List folders */}
          <View>

          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: {
    fontFamily: 'inter-bold',
    fontSize: 20,
    color: '#000',
  },
  underText: {
    fontFamily: 'inter-regular',
    fontSize: 14,
    color: '#918D8A',
  },
  input: {
    width: '100%',
    backgroundColor: '#DCD7D3',
    borderWidth: 0,
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    marginTop: 10,
  },
});
