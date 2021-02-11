import React, { useContext } from 'react';
import PokemonList from '../Components/PokemonList'
// import '@testing-library/jest-dom/extend-expect'
// import TestRenderer from 'react-test-renderer';

// import {Context} from '../Context/Context';
// import ShallowRenderer from 'react-test-renderer/shallow';
// // import Home from '../components/Home';
import { render, cleanup, waitFor, act, screen } from '@testing-library/react';

// import '@testing-library/jest-dom';
// // import { singularJoke, emptySingularStory } from '../fixtures/Joke';
// // import { getARandomJoke } from '../services/jokeApi';
// import { mocked } from 'ts-jest/utils';


afterEach(() => {
  // realUseContext = useContext;
  // useContextMock = useContext = jest.fn();
  cleanup();
  jest.resetAllMocks();
});

describe("<PokemonList />", () => {
  test("should display a blank login form, with remember me checked by default", async () => {
    console.log('ok')
  });
});


