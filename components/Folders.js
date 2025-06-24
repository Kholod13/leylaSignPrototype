import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { GenStyles } from '../styles/style';
import { useNavigation } from '@react-navigation/native';
import NavigationMenu from './NavigationMenu';
import { useUsers } from './UserContext';
import React, { useState } from 'react';

export default function Folders() {
    const navigation = useNavigation();
    const { usersList, currentUserEmail, addFolderToUser } = useUsers();
    const currentUser = usersList.find(user => user.email === currentUserEmail);
    const folders = currentUser?.folders || [];
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [newFolderName, setNewFolderName] = useState('');

  return (
    <View style={GenStyles.containerLoggedIn}>
        <View style={GenStyles.containerContent}>
            <View style={[GenStyles.containerHeader, {backgroundColor: '#fff', marginTop: -20, marginBottom: 30, alignItems: 'center', paddingTop: 45, paddingBottom: 15, paddingHorizontal: 10}]}>
                      <View style={{width: 20}}></View>
                      <Text style={[GenStyles.text, {fontFamily: 'inter-bold', fontSize: 20}]}>My folders</Text>
                      <TouchableOpacity onPress={() => setModalVisible1(true)}>
                        <Image source={require('../assets/icons/Plus.png')} style={{width: 25, height: 25, marginTop: -15}}/>
                      </TouchableOpacity>
                  </View>
              <Modal visible={modalVisible} animationType="slide">
                <View style={{ flex: 1, alignItems: 'center', marginTop: 30 }}>
                  <View style={GenStyles.containerHeader}>
                      <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Image source={require('../assets/icons/ArrowLeft.png')} />
                      </TouchableOpacity>
                      <Text style={GenStyles.title}>{selectedFolder?.name}</Text>
                      <Text>Test page</Text>
                  </View>
                  <ScrollView contentContainerStyle={{ padding: 20 }}>
                    {selectedFolder?.words?.length > 0 ? (
                      selectedFolder.words.map((item, index) => (
                        <View key={index} style={{ marginBottom: 16 }}>
                          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.word}</Text>
                          <Text style={{ fontSize: 14, color: '#555' }}>Translation: {item.translation}</Text>
                          <Text style={{ fontSize: 14, fontStyle: 'italic', color: '#888' }}>Hint: {item.hint}</Text>
                        </View>
                      ))
                    ) : (
                      <Text style={{ fontSize: 14, color: '#888' }}>No words in this folder</Text>
                    )}
                  </ScrollView>
                </View>
              </Modal>
              <Modal visible={modalVisible1} transparent animationType="slide">
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
                        <Image source={require('../assets/icons/ArrowLeft.png')} />
                      </TouchableOpacity>
                      <Text style={{ fontFamily: 'inter-bold', fontSize: 18 }}>New Folder</Text>
                      <TouchableOpacity
                        onPress={() => {
                          const newId = `f${Date.now()}`; // генерируем уникальный ID
                          const newFolder = { id: newId, name: newFolderName, words: [] };
                          addFolderToUser(currentUser.email, newFolder);
                          // Сначала закроем модалку и сбросим состояние
                          setModalVisible1(false);
                          setNewFolderName('');
                          // Перейдём на главный экран
                          navigation.navigate('Folders');
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
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={require('../assets/icons/USA.png')} style={{width: 15, height: 15, marginTop: -30, marginLeft: 20}} />
                <Text style={[GenStyles.underText, {marginBottom: 30, color: '#918D8A', marginLeft: 10}]}>English</Text>
              </View>
              <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: -20, height: '65%', paddingHorizontal: 20 }}>
                {folders.length > 0 ? (
                  folders.map((folder, index) => (
                    <TouchableOpacity key={index} 
                      onPress={() => {
                        setModalVisible(true)
                        setSelectedFolder(folder);
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
                      <Image source={require('../assets/icons/FolderGray.png')} style={{marginRight: 16}} />
                      <Text style={{ fontFamily: 'inter-regular', fontSize: 16 }}>{folder.name}</Text>
                    </TouchableOpacity>
                    ))
                      ) : (
                        <Text style={{ fontFamily: 'inter-regular', fontSize: 14, color: '#918D8A' }}>
                          No folders yet
                        </Text>
                      )}
              </ScrollView>
              {/* hidden menu "Archive" */}
        </View>
        <NavigationMenu />
    </View>
  );
}

const styles = StyleSheet.create({

});
