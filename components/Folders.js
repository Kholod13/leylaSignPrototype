import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { GenStyles } from '../styles/style';
import { useNavigation } from '@react-navigation/native';
import NavigationMenu from './NavigationMenu';
import { useUsers } from './UserContext';
import React, { useState } from 'react';

export default function Folders() {
    const navigation = useNavigation();
    const { usersList, currentUserEmail } = useUsers();
    const currentUser = usersList.find(user => user.email === currentUserEmail);
    const folders = currentUser?.folders || [];
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState(null);

  return (
    <View style={GenStyles.containerLoggedIn}>
        <View style={GenStyles.containerContent}>
            <Text style={GenStyles.title}>FOLDER CONTAINER</Text>
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
              <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: -20, height: '65%' }}>
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
        </View>
        <NavigationMenu />
    </View>
  );
}

const styles = StyleSheet.create({

});
