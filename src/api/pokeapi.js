const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchCharacters = async (page = 1, search = '') => {
  const offset = (page - 1) * 20;
  const url = search
    ? `${API_BASE_URL}/pokemon/${search.toLowerCase()}`
    : `${API_BASE_URL}/pokemon?offset=${offset}&limit=20`;
  const response = await fetch(url);
  return response.json();
};

export const fetchCharacterDetails = async (id) => {
  const url = `${API_BASE_URL}/pokemon/${id}`;
  const response = await fetch(url);
  return response.json();
};