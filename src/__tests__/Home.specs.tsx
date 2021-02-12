import React, { useContext } from 'react';
import  {Context}  from '../Context/Context';
import PokemonList from '../Components/PokemonList'
import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from '@testing-library/react-hooks'



it("fetches-all-pokemon-details-on-render-through-context", async () => {
  const loadAllPokeDetails = jest.fn()
  act(() => {
    render(
      <Context.Provider value={{ loadAllPokeDetails }}>
        <PokemonList />
      </Context.Provider>
    )
  });
  
  await waitFor(() => { 
    expect(loadAllPokeDetails).toHaveBeenCalledTimes(1)
  })
});


describe('fetch-next-pokemon-group-on-click', () => {
  it('context update', async () => {
    const TestComponent = () => {
      const { loadAllPokeDetails, allPokemonDetails, url } = useContext(Context);
      
      return <>
        <div data-testid='value'>{allPokemonDetails.length}</div>
        <div data-testid='url'>{url}</div>
        <button onClick={loadAllPokeDetails}>Fetch</button>
      </>
    }

    const ContextValues = jest.mock("../Context/Context", () => ({
      __esModule: true,
      default: React.createContext(Context)
    }));


    const wrapper = render(
      <Context.Provider value={ContextValues}>
        <TestComponent />
      </Context.Provider>
    );
    
      
    expect(wrapper.getByTestId('value').textContent).toBe('0');
    expect(wrapper.getByTestId('url').textContent).toBe('https://pokeapi.co/api/v2/evolution-chain?offset=0&limit=21');
    fireEvent.click(wrapper.getByText('Fetch'));
    await waitFor(() => expect(wrapper.getByTestId('value').textContent).toBe('21'))
  });
})


    
   





