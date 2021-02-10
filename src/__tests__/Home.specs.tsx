import React, { useContext } from 'react';
import Context from '../Context/Context';
// import Home from '../components/Home';
import { render, cleanup, waitFor, act, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import { singularJoke, emptySingularStory } from '../fixtures/Joke';
// import { getARandomJoke } from '../services/jokeApi';
import { mocked } from 'ts-jest/utils';

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

jest.mock('../services/jokeApi');

const mockedAxios = mocked(getARandomJoke);

test('Renders home correctly', async () => {
  await act(async () => {
    const { getByTestId } = render(<Home />);
    expect(getByTestId('jokeContainer')).toBeInTheDocument();
  });
});

test('Renders a joke correctly', async () => {
  mockedAxios.mockImplementationOnce(() => Promise.resolve(singularJoke));

  await act(async () => {
    const { getByText } = render(<Home />);
    await waitFor(() => [
      expect(
        getByText(
          'Chuck Norris invented the internet so people could talk about how great Chuck Norris is.',
        ),
      ).toBeTruthy(),
    ]);
  });
});

test('Renders empty a joke correctly', async () => {
  mockedAxios.mockImplementationOnce(() => Promise.resolve(emptySingularStory));

  await act(async () => {
    render(<Home />);
    await waitFor(() => [expect(screen.getByTestId('jokeText')).toHaveTextContent('')]);
  });
});