import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useContext } from 'react';
import { ProgressContext } from './ProgressContext';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProgressBarHeader() {
  const { progress } = useContext(ProgressContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('../assets/icons/ArrowLeft.png')} />
      </TouchableOpacity>
      <View style={styles.item}>
        <LinearGradient colors={['#F9D423', '#FF9853']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }} style={[styles.bar, { width: `${progress}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 50,
    gap: 15,
  },
  item: {
    height: 8,
    backgroundColor: '#E5E0DC',
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: 'red',
    borderRadius: 5,
  },
});
