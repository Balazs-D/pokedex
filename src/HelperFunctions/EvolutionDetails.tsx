// Functions check if a second and / or third evolution level exists.
// Returns the img and name of each evolution level of the selected pokemon
export const getEvolutionImgs = (array: any[], source: any[]) => {
  let arr = [[], [], []];
  array.map((item) => {
    if (item.name === source.chain.species.name) {
      arr[0].push(item.sprites.other.dream_world.front_default);
      arr[0].push(source.chain.species.name);
    } else if (
      source.chain.evolves_to.length > 0 &&
      item.name === source.chain.evolves_to[0].species.name
    ) {
      arr[1].push(item.sprites.other.dream_world.front_default);
      arr[1].push(source.chain.evolves_to[0].species.name);
    } else if (
      source.chain.evolves_to.length > 0 &&
      source.chain.evolves_to[0].evolves_to.length > 0 &&
      item.name === source.chain.evolves_to[0].evolves_to[0].species.name
    ) {
      arr[2].push(item.sprites.other.dream_world.front_default);
      arr[2].push(source.chain.evolves_to[0].evolves_to[0].species.name);
    }
  });
  return arr;
};
