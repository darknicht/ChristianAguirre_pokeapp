import React from 'react';
import { render } from '@testing-library/react-native';
import PokemonCard from '../components/PokemonCard';

describe('<PokemonCard />', () => {
  it('renders the correct name and image', () => {
    const pokemon = {
      id: 1,
      name: 'bulbasaur',
      image: 'test-image-url',
      type: ['grass'],
    };
    const { getByText, getByTestId } = render(<PokemonCard pokemon={pokemon} />);

    expect(getByText('#1')).toBeTruthy();
    expect(getByText('bulbasaur')).toBeTruthy();
    expect(getByTestId('pokemon-image').props.source.uri).toBe('test-image-url');
  });
});
