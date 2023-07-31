import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { typeColors } from '../utils/constants';

const PokemonCard = ({ pokemon }) => {
  const type = pokemon.type && pokemon.type[0]?.toLowerCase();
  const color = typeColors[type] || '#fff'; // Obtener el color del tipo de Pokémon

  return (
    <View style={[styles.container, { backgroundColor: color, borderColor: color }]}>
      <Image source={{ uri: pokemon.image }} style={styles.image} />
      <Text style={styles.number}>#{pokemon.id}</Text>
      <Text style={styles.name}>{pokemon.name}</Text>
      {type && <Text style={[styles.type, { backgroundColor: color, borderColor: color }]}>{type}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    margin: 15,
    alignItems: 'center',
    marginTop: 10,
    width: 175,
    height: 175,
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
  number: {
    fontSize: 18,
    letterSpacing: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  type: {
    fontSize: 1,
    color: '#000',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});

export default PokemonCard;
