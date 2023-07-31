import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { getPokemonDetails } from "../services/PokemonService";

const DetailsScreen = ({ route, navigation }) => {
  const { pokemon, pokemons } = route.params;
  const pokemonIndex = pokemons.findIndex((p) => p.id === pokemon.id);

  // Estado para almacenar los detalles del Pokémon
  const [details, setDetails] = useState(null);
  const [types, setTypes] = useState("N/A"); // Inicializar con "N/A" 

  useEffect(() => {
    // Llamar a la función getPokemonDetails para obtener los detalles del Pokémon
    const fetchPokemonDetails = async () => {
      const details = await getPokemonDetails(pokemon.id);
      setDetails(details);
      setTypes(details.type);
    };
    fetchPokemonDetails();
  }, [pokemon.id]);

  const handleNext = () => {
    if (pokemonIndex < pokemons.length - 1) {
      navigation.replace("Details", {
        pokemon: pokemons[pokemonIndex + 1],
        pokemons,
      });
    }
  };

  const handlePrev = () => {
    if (pokemonIndex > 0) {
      navigation.replace("Details", {
        pokemon: pokemons[pokemonIndex - 1],
        pokemons,
      });
    }
  };

  if (!details) {
    // Mientras se obtienen los detalles del Pokémon, mostrar un mensaje de carga
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const movesToShow = details.moves.slice(0, 12);

  return (
    <View style={[styles.container, { backgroundColor: details.color }]}>
      <Image source={{ uri: details.image }} style={styles.image} />
      <View style={styles.row}>
        <Text style={styles.number}>#{details.id}</Text>
        <Text style={styles.name}>
          {details.name.charAt(0).toUpperCase() + details.name.slice(1)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.sectionTitle}>Tipos</Text>
        <Text style={styles.details}>
          {types === "N/A" ? types : types.join(", ")}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.sectionTitle}>Peso</Text>
        <Text style={styles.details}>{details.weight} kg</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.sectionTitle}>Sprites</Text>
        <View style={styles.spritesContainer}>
          {Array.isArray(details.sprites) ? (
            details.sprites.map((sprite, index) => (
              <Image
                key={index}
                source={{ uri: sprite }}
                style={styles.spriteImage}
              />
            ))
          ) : (
            <Text>N/A</Text>
          )}
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.sectionTitle}>Movimientos</Text>
        <View style={styles.movesContainer}>
          <Text style={styles.moveText}>
            {movesToShow.map((move, index) => (
              <React.Fragment key={index}>
                {index > 0 && ", "}
                {move}
              </React.Fragment>
            ))}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    position: "relative",
  },
  row: {
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 5,
  },
  number: {
    fontSize: 20,
    alignSelf: "center",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    alignSelf: "center",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  details: {
    fontSize: 18,
    marginBottom: 15,
  },
  spritesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginBottom: 60,
    marginTop: 10,
    
  },
  spriteImage: {
    width: 70,
    height: 70,
    backgroundColor: "#fff",
    borderRadius: 50,
    marginRight: 5,
  },
  movesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  moveItem: {
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  moveText: {
    fontSize: 18,
  },
});

export default DetailsScreen;
