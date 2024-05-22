import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAssets } from 'expo-asset';

const App = () => {

const [selectedImage, setSelectedImage] = useState<{ localUri: string } | null>(null);
const [assets] = useAssets([require('../assets/images/mGreymon.png')]);

//To access the camera roll
let openImagePickerAsync = async () => {
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setSelectedImage({ localUri: pickerResult.assets[0].uri });
    }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Soy Metalgreymon</Text>
      <Image
      source={{
        uri: selectedImage?.localUri || assets?.[0]?.localUri || undefined,
      }}
      style={styles.image}
      />
      <TouchableOpacity
      onPress={openImagePickerAsync}
      //onPress={() => alert('¿Eres un niño elegido?')}
      style={styles.button}
      >
        <Text style={styles.buttonText}>Presioname</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#292929"
  },
  title: {
    fontSize: 30,
    color: '#fff'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: 'contain',
    margin: 20
  },
  button: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 20
  }
  
});

export default App;