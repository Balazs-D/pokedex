export const getEvolutionImgs = (array, source) => {
  // Functions check if a second and / or third evolution level exists.
  // Returns the img of each evolution level of the selected pokemon

  let arr = [];
  // context.allPokemonDetails.map((item) => {
  array.map((item) => {
    if (item.name === source.chain.species.name) {
      arr.push(item.sprites.other.dream_world.front_default);
    } else if (
      source.chain.evolves_to.length > 0 &&
      item.name === source.chain.evolves_to[0].species.name
    ) {
      arr.push(item.sprites.other.dream_world.front_default);
    } else if (
      source.chain.evolves_to.length > 0 &&
      source.chain.evolves_to[0].evolves_to.length > 0 &&
      item.name === source.chain.evolves_to[0].evolves_to[0].species.name
    ) {
      arr.push(item.sprites.other.dream_world.front_default);
    }
  });
  return arr;
};

// Function pulls out each name of the evolution level
// Returns array of sources
export const getEvolutionNames = (source) => {
  let arr = [];
  arr.push(source.chain.species.name);
  arr.push(source.chain.evolves_to[0].species.name);
  arr.push(source.chain.evolves_to[0].evolves_to[0].species.name);
  return arr;
};
