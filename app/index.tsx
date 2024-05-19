import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Soy Metalgreymon</Text>
      <Image 
      source={require('../assets/images/mGreymon.png')}
      style={styles.image}
      />
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
  }
  
});

export default App;