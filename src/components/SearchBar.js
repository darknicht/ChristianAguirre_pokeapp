import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchBar = ({ onChange }) => (
  <View style={styles.container}>
    <Icon name="search" size={20} style={styles.icon} />
    <TextInput
      style={styles.input}
      placeholder="Buscar"
      onChangeText={onChange}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    border: 2,
    borderColor: '#888',
    borderStyle: 'solid',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.5,
    marginTop: 25,
    marginBottom: 25,
  },
  icon: {
    margin: 5,
    color: '#888',
  },
  input: {
    flex: 1,
  },
});

export default SearchBar;