import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Dimensions, StyleSheet, Text } from 'react-native';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import { getPokemons, getPokemonDetails } from '../services/PokemonService';
import { typeColors } from '../utils/constants';
import Icon from 'react-native-vector-icons/FontAwesome'; // Por ejemplo, aquí utilizaremos íconos de FontAwesome

const HomeScreen = ({ navigation }) => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');
  const limit = 4;

  // Cargar la lista completa de Pokémon al montar el componente
  useEffect(() => {
    loadAllPokemons();
  }, []);

  // Cargar la lista completa de Pokémon
  const loadAllPokemons = async () => {
    const { pokemons } = await getPokemons(0, limit * 1000);
    setPokemons(pokemons);
    setCurrentPage(0); // Restablecer la página actual a 0 al cargar la lista completa
  };

  // Filtrar Pokémon por nombre
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredPokemons.length / limit);

  // Obtener los Pokémon para la página actual
  const getCurrentPagePokemons = () => {
    const startIndex = currentPage * limit;
    return filteredPokemons
      .slice(startIndex, startIndex + limit)
      .map((pokemon) => ({
        ...pokemon,
        color: typeColors[pokemon.type?.[0]?.toLowerCase()] || "#f0f0f0", // Asignar el color correspondiente al tipo o blanco si no se encuentra
      }));
  };

  // Manejar el scroll infinito
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Calcular el ancho de cada tarjeta de Pokémon en función del ancho de la pantalla
  const numColumns = 2;
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth / numColumns - 20; // Resta un margen de 10 entre cada tarjeta

  return (
    <View>
      <SearchBar onChange={(text) => setSearch(text)} />
      <FlatList
        data={getCurrentPagePokemons()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Details', { pokemon: item, pokemons: filteredPokemons })
            }
          >
            <View
              style={[
                styles.cardContainer,
                { width: cardWidth, height: cardWidth, backgroundColor: item.color, borderColor: item.color },
              ]}
            >
              <PokemonCard pokemon={item} />
            </View>
          </TouchableOpacity>
        )}
        numColumns={numColumns} // Configura el número de columnas para la cuadrícula
        contentContainerStyle={styles.gridContainer} // Añade estilos adicionales para la cuadrícula
      />
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          onPress={handlePrevPage}
          style={[styles.buttonStyle, { opacity: currentPage === 0 ? 0.5 : 1 }]}
          disabled={currentPage === 0}
        >
          <Icon name="chevron-left" size={15} color="white" />
          <Text style={styles.buttonTitleStyle}>Atrás</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNextPage}
          style={[styles.buttonStyle, { opacity: currentPage === totalPages - 1 ? 0.5 : 1 }]}
          disabled={currentPage === totalPages - 1}
        >
          <Text style={styles.buttonTitleStyle}>Siguiente</Text>
          <Icon name="chevron-right" size={15} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  cardContainer: {
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1,
    padding: 2,
    borderWidth: 2,
    borderStyle: 'solid',
    opacity: 0.9,
    marginBottom: 15,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonStyle: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonTitleStyle: {
    marginLeft: 5,
    marginRight: 5, 
    color: 'white',
  },
});

export default HomeScreen;
