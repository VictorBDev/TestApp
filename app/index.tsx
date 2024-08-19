import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, Button, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAssets } from 'expo-asset';
import * as Sharing from 'expo-sharing';
import UsuarioData from './Usuario.json';
import styles from '../styles/style'; // Importa los estilos desde la carpeta styles

const App = () => {
  //Define el tipo de dato Usuario
  type Usuario = {
    "nombre": String,
    "apellido": String,
    "edad": Number,
    "esCasado": Boolean
  }

  const [selectedImage, setSelectedImage] = useState<{ localUri: string } | null>(null);
  const [assets] = useAssets([require('../assets/images/mGreymon.png')]);
  //Datos de usuarios
  const [datos, setDatos] = useState<Usuario[]>([]);

  //Page to users
  const [page, setPage] = useState<Usuario[]>([]);

  useEffect(() => {
    //Inicializa los datos de los usuarios
    setDatos(UsuarioData);
  }, []);

  //Función para agregar un usuario
  const addUser = () => {
    setPage((prevPage: Usuario[]) => [...prevPage, ...UsuarioData]);
  };

  return (
    <View style={styles.container}>
      <Button title="Agregar Usuario" onPress={addUser}/>
      {/*Renderizado de datos*/}
      {datos.map((usuario, index) => (
        <View key={index} style={styles.userContainer}>
          <Text>Nombre: {usuario.nombre}</Text>
          <Text>Apellido: {usuario.apellido}</Text>
          <Text>Edad: {usuario.edad.toString()}</Text>
          <Text>Casado: {usuario.esCasado ? 'Sí' : 'No'}</Text>
        </View>
      ))}
      
      <Text style={styles.title}>Usuarios Agregados:</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {page.map((usuario, index) => (
          <View key={index} style={styles.userContainer}>
            <Text>Nuevo usuario {index + 1}</Text>
            <Text>Nombre: {usuario.nombre}</Text>
            <Text>Apellido: {usuario.apellido}</Text>
            <Text>Edad: {usuario.edad.toString()}</Text>
            <Text>Casado: {usuario.esCasado ? 'Sí' : 'No'}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  //Función para abrir el selector de imágenes
  const openImagePickerAsync = async () => {
    // Solicitar permisos si no se han concedido
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // Elegir una imagen
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    // Verificar si el usuario ha seleccionado una imagen
    if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
      setSelectedImage({ localUri: pickerResult.assets[0].uri });
    }
  };

  // Compartir la imagen seleccionada
  const openShareDialog = async() => {
    if (!(await Sharing.isAvailableAsync())) {
      alert("Sharing is not available on your platform.");
      return;
    }

    // Agrega la imagen seleccionada
    const imageUri = selectedImage?.localUri ?? (assets && assets.length > 0 ? assets[0].localUri : '');

    if (imageUri) {
      await Sharing.shareAsync(imageUri);
    } else {
      alert('No image available to share.');
    }
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

export default App;
