import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#292929",
    padding: 100
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
  },
  userContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    resizeMode: 'center'
  },
});

export default styles;
