import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput, ScrollView } from 'react-native';
import { GenStyles } from '../../styles/style';
import { useUsers } from '../UserContext';
import { tempUserData } from '../register/TempRegistrationData';

export default function AddWordToFolder({navigation, route}) {
    const {selectedWord, translation} = route.params || {};
    const [isEditing, setIsEditing] = useState(false);
    const [editedTranslation, setEditedTranslation] = useState(translation);
    const [text, setText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [selectedFolder, setSelectedFolder] = useState(null);

    const { usersList, setUsersList, currentUserEmail, addFolderToUser, addWordToFolder } = useUsers();
    const currentUser = usersList.find(user => user.email === currentUserEmail);

    const handleAddWord = (id, word, translation, hint) => {
      const folderId = id;
      const newWord = {
        word: word,
        translation: translation,
        hint: hint,
      };

      addWordToFolder(currentUserEmail, folderId, newWord);
    }

    const getUserFolders = (email) => {
    const user = usersList.find(u => u.email === email);
      return user?.folders || [];
    };

    const folders = currentUser?.folders || [];

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
      <View style={GenStyles.wordBlock}>
        <Text style={[GenStyles.title, {textTransform: 'capitalize', width: '100%'}]}>{selectedWord}</Text>
        <Text style={styles.underText}>Translation</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          {isEditing ? (
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputInside}
                value={editedTranslation}
                onChangeText={setEditedTranslation}
                autoFocus
              />
              <TouchableOpacity
                style={styles.inputButton}
                onPress={() => setIsEditing(false)}
              >
                <Image source={require('../../assets/icons/CheckCircleGray.png')} />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={{
                fontFamily: 'inter-regular',
                fontSize: 18,
                textTransform: 'capitalize',
                marginTop: 10,
              }}>{editedTranslation}</Text>
              <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => setIsEditing(true)}>
                <Image source={require('../../assets/icons/NotePencil.png')} />
              </TouchableOpacity>
            </>
          )}
        </View>
        <Text style={[styles.underText, {marginTop: 20}]}>Hint (optional)</Text>
        
        <TextInput
          style={styles.input}
          numberOfLines={4}
          placeholder="Enter a hint"
          value={text}
          onChangeText={setText}
          textAlignVertical="top"
          multiline
          maxLength={120}
          blurOnSubmit={true}
        />
        {text.length >= 120 && (
          <Text style={{color: '#EC5050', paddingTop: 5}}>Maximum 120 characters allowed</Text>
        )}
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
            <Modal visible={modalVisible} transparent animationType="slide">
              <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)'
              }}>
                <View style={{
                  backgroundColor: '#fff',
                  padding: 20,
                  borderRadius: 12,
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  paddingTop: 50,
                }}>
                  <View style={GenStyles.containerHeader}>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginRight: 10 }}>
                      <Image source={require('../../assets/icons/ArrowLeft.png')} />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'inter-bold', fontSize: 18 }}>New Folder</Text>
                    <TouchableOpacity
                      onPress={() => {
                        const newId = `f${Date.now()}`; // генерируем уникальный ID
                        const newFolder = { id: newId, name: newFolderName, words: [] };
                        addFolderToUser(currentUser.email, newFolder);
                        // Сначала закроем модалку и сбросим состояние
                        setModalVisible(false);
                        setNewFolderName('');

                        // Добавим слово в эту новую папку
                        handleAddWord(newId, selectedWord, editedTranslation, text);

                        // Перейдём на главный экран
                        navigation.navigate('Main');
                      }}
                    >
                      <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#0388F5' }}>Save</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{width: '100%', flex: 1}}>
                    <Text style={[styles.underText, {marginTop: 30, textAlign: 'left'}]}>Folder name</Text>
                    <TextInput
                      placeholder="Folder name"
                      value={newFolderName}
                      onChangeText={setNewFolderName}
                      style={styles.input}
                    />
                    </View>
                </View>
              </View>
            </Modal>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image source={require('../../assets/icons/Plus.png')} style={{width: 25, height: 25}}/>
            </TouchableOpacity>
          </View>
          {/* List folders */}
              <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: -20, height: '65%' }}>
                {folders.length > 0 ? (
                  folders.map((folder, index) => (
                    <TouchableOpacity key={index} 
                      onPress={() => {
                        setSelectedFolder(folder);
                        handleAddWord(folder.id, selectedWord, editedTranslation, text);
                        navigation.navigate('Main');
                      }}
                      style={{ 
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        backgroundColor: '#ffffff',
                        borderRadius: 16,
                        borderColor: '#E5E0DC',
                        borderWidth: 1,
                        padding: 16,
                        marginVertical: 4,
                      }}>
                      <Image source={require('../../assets/icons/FolderGray.png')} style={{marginRight: 16}} />
                      <Text style={{ fontFamily: 'inter-regular', fontSize: 16 }}>{folder.name}</Text>
                    </TouchableOpacity>
                    ))
                      ) : (
                        <Text style={{ fontFamily: 'inter-regular', fontSize: 14, color: '#918D8A' }}>
                          No folders yet
                        </Text>
                      )}
              </ScrollView>
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
  inputWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#DCD7D3',
  borderRadius: 12,
  paddingHorizontal: 16,
  marginTop: 10,
  position: 'relative',
  width: '100%',
},
inputButton: {
  marginLeft: 8,
},
inputInside: {
  flex: 1,
  fontSize: 16,
  paddingVertical: 16,
  fontFamily: 'inter-regular',
},
});
