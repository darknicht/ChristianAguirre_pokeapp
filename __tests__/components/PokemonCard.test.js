import React from 'react';
import { render } from '@testing-library/react-native';
import PokemonCard from '../src/components/PokemonCard';

test('renders PokemonCard correctly', () => {
  const pokemon = {
    id: '1',
    name: 'Bulbasaur',
    image: 'https://example.com/bulbasaur.png',
  };
  const { getByText, getByTestId } = render(<PokemonCard pokemon={pokemon} />);
  expect(getByText('Bulbasaur')).toBeTruthy();
  expect(getByTestId('pokemon-image').props.source.uri).toBe('https://example.com/bulbasaur.png');
});
