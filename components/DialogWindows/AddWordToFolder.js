import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
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

    const { usersList, setUsersList, currentUserEmail, addFolderToUser } = useUsers();
    const currentUser = usersList.find(user => user.email === currentUserEmail);


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
          multiline={true}
          numberOfLines={4}
          placeholder="Enter a hint"
          value={text}
          onChangeText={setText}
          textAlignVertical="top"
        />
        {text.length > 120 && (
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
                  width: '80%',
                  alignItems: 'center',
                }}>
                  <Text style={{ fontFamily: 'inter-bold', fontSize: 18 }}>New Folder</Text>
                  <TextInput
                    placeholder="Folder name"
                    value={newFolderName}
                    onChangeText={setNewFolderName}
                    style={styles.input}
                  />
                  <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginRight: 10 }}>
                      <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      addFolderToUser(currentUser.email, { name: newFolderName, words: [] });
                      setModalVisible(false);
                      setNewFolderName('');
                    }}>
                      <Text style={{ fontWeight: 'bold' }}>Create</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image source={require('../../assets/icons/Plus.png')} style={{width: 25, height: 25}}/>
            </TouchableOpacity>
          </View>
          {/* List folders */}
          <View>
            {folders.length > 0 ? (
              folders.map((folder, index) => (
                <View key={index} style={{ paddingVertical: 8 }}>
                  <Text style={{ fontFamily: 'inter-regular', fontSize: 16 }}>{folder.name}</Text>
                </View>
              ))
            ) : (
              <Text style={{ fontFamily: 'inter-regular', fontSize: 14, color: '#918D8A' }}>
                No folders yet
              </Text>
            )}
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
