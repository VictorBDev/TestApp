import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAssets } from 'expo-asset';
import * as Sharing from 'expo-sharing';

const App = () => {

const [selectedImage, setSelectedImage] = useState<{ localUri: string } | null>(null);
const [assets] = useAssets([require('../assets/images/mGreymon.png')]);

//Función para abrir el selector de imágenes
const openImagePickerAsync = async () => {
  // Solicitar permisos si no se han concedido
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }

  //To pick the image
  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  // Verificar si el usuario ha seleccionado una imagen
  if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
    setSelectedImage({ localUri: pickerResult.assets[0].uri });
  }

  //To pick the image
  // const pickerResult = await ImagePicker.launchImageLibraryAsync();
  //   if (!pickerResult.canceled) {
  //     setSelectedImage({ localUri: pickerResult.assets[0].uri });
  //   }
};

//To share the image
const openShareDialog = async() => {
  if (!(await Sharing.isAvailableAsync())) {
    alert("Sharing is not available on your platform.");
    return;
  }

  //add the image to the share dialog
  const imageUri = selectedImage?.localUri ?? (assets && assets.length > 0 ? assets[0].localUri : '');

  if (imageUri) {
    await Sharing.shareAsync(imageUri);
  } else {
    alert('No image available to share.');
  }
  
  // if (selectedImage?.localUri) {
  //   await Sharing.shareAsync(selectedImage.localUri);
  // } else if (assets && assets.length > 0) {
  //   await Sharing.shareAsync(assets[0].localUri);
  // }

  // await Sharing.shareAsync(selectedImage?.localUri || assets?.[0]?.localUri || '');
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elije una imagen:</Text>
      <TouchableOpacity onPress={openImagePickerAsync}>
        <Image
        source={{
          uri: selectedImage?.localUri || assets?.[0]?.localUri || undefined,
        }}
        style={styles.image}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={openShareDialog} style={styles.button}>
        <Text style={styles.buttonText}>Comparte esta imagen</Text>
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
    width: 300,
    height: 300,
    borderRadius: 200,
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