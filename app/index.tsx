import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Soy Metalgreymon</Text>
      <Image 
      source={require('../assets/images/mGreymon.png')}
      style={styles.image}
      />
      <TouchableOpacity
      onPress={() => alert('¿Eres un niño elegido?')}
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
    borderRadius: 50,
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