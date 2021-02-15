
import { createContext } from "react";

interface ContextInterface {
  url?: string;
  setUrl: (url: string) => void,
  urlEvolution?: string;
  setUrlEvolution: (urlEvolution: string) => void,
  allPokemonDetails?: any[];
  setAllPokemonDetails: (allPokemonDetails: any[]) => void,
  loadSelectedPokemon: (id: number) => void;
  loadAllPokeDetails: () => void,
  soloPokemon?: any[];
  setSoloPokemon: (soloPokemon: any[]) => void,
  evolution?: any[];
  setEvolution: (evolution: any[]) => void,
  allEvolutions?: any[];
  setAllEvolutions: (allEvolutions: any[]) => void,
  loadPokemonEvolution: (name: string) => void;
};
export const Context = createContext<ContextInterface>(null)
