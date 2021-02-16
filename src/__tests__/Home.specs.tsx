import React, {
  useContext,
  createContext,
  FunctionComponent,
  ReactNode,
} from 'react';
import { Context } from '../Context/Context';
import Container from '../Context/Container';
import PokemonList from '../Components/PokemonList';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

// Test if getting and updating context data is working

// note: ------------------- Hard coded context configuration
const defaultConfig = {
  baseurl: 'https://localhost:1948',
  env: 'dev',
};

// const ConfigurationContext = createContext(defaultConfig);
// note: -------------------- Connection to context is not working
const ConfigurationContext = createContext(Container);

const useTestUrl = () => {
  const { url } = useContext(Context);
  // return `${baseurl}/result.pdf`;
  return url;
};

describe('useTestURL (context)', () => {
  const makeWrapper = (value: any): FunctionComponent => ({
    children,
  }: {
    children?: ReactNode;
  }) => <Container value={value}>{children}</Container>;

  it('should use context provided config', () => {
    const { result } = renderHook(() => useTestUrl(), {
      wrapper: makeWrapper({ baseurl: '{baseurl}', env: '{env}' }),
    });

    expect(result.current).toBe('{baseurl}/result.pdf');
  });

  it('should use default config', () => {
    const { result } = renderHook(() => useTestUrl());

    expect(result.current).toBe('https://localhost:1948/result.pdf');
  });
});

// Test if Fetch on render happens
// via context.loadAllPokeDetails()

// describe('fetches-all-pokemon-details-on-render-through-context', () => {
//   it("context call", async () => {
//     const loadAllPokeDetails = jest.fn()
//     act(() => {
//       render(
//         <Context.Provider value={{ loadAllPokeDetails }}>
//           <PokemonList />
//         </Context.Provider>
//       )
//     });

//     await waitFor(() => {
//       expect(loadAllPokeDetails).toHaveBeenCalledTimes(1)
//     })
//   })
// });

// // Test if Fetch next 21 Pokemon when Load More button is clicked
// // via context.loadAllPokeDetails

// describe('fetch-next-pokemon-group-on-click', () => {
//   it('context update', async () => {
//     const TestComponent = () => {
//       const { loadAllPokeDetails, allPokemonDetails, url } = useContext(Context);

//       return <>
//         <div data-testid='value'>{allPokemonDetails.length}</div>
//         <div data-testid='url'>{url}</div>
//         <button onClick={loadAllPokeDetails}>Fetch</button>
//       </>
//     }

//     const ContextValues = jest.mock("../Context/Context", () => ({
//       __esModule: true,
//       default: React.createContext(Context)
//     }));

//     const wrapper = render(
//       <Context.Provider value={ContextValues}>
//         <TestComponent />
//       </Context.Provider>
//     );

//     expect(wrapper.getByTestId('value').textContent).toBe('0');
//     expect(wrapper.getByTestId('url').textContent).toBe('https://pokeapi.co/api/v2/evolution-chain?offset=0&limit=21');
//     fireEvent.click(wrapper.getByText('Fetch'));
//     await waitFor(() => expect(wrapper.getByTestId('value').textContent).toBe('21'))
//   });
// })
