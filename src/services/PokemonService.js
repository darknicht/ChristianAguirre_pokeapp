import { typeColors } from '../utils/constants';

const API_URL = 'https://pokeapi.co/api/v2';

export const getPokemonDetails = async (id) => {
  const response = await fetch(`${API_URL}/pokemon/${id}`);
  const data = await response.json();

  // Obtener el tipo del Pokémon
  const type = data.types.map((type) => type.type.name);

  // Obtener la lista de movimientos del Pokémon
  const moves = data.moves.slice(0, 7).map((move) => move.move.name);

  // Obtener el color del tipo de Pokémon
  const color = typeColors[type[0]] || "#fff"; // Si no se encuentra el tipo, usar un color blanco

  // Obtener la lista de sprites del Pokémon (limitados a los primeros 5)
  const sprites = Object.values(data.sprites)
    .filter((sprite) => typeof sprite === "string" && sprite.startsWith("https://"))
    .slice(0, 5);

  // Transformar los datos según sea necesario
  return {
    id: data.id,
    name: data.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
    weight: data.weight,
    type: type,
    moves: moves,
    sprites: sprites,
    color: color,
  };
};

export const getPokemons = async (offset = 0, limit = 20) => {
  const response = await fetch(`${API_URL}/pokemon?offset=${offset}&limit=${limit}`);
  const data = await response.json();

  const pokemonPromises = data.results.map(async (pokemon) => {
    const details = await getPokemonDetails(pokemon.url.split("/")[6]);
    return {
      ...pokemon,
      ...details,
    };
  });

  const pokemons = await Promise.all(pokemonPromises);

  return {
    pokemons: pokemons.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
      type: pokemon.type, 
    })),
    next: data.next,
  };
};
