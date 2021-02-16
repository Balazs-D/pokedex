export const pokemonStyleColor = (pokeStyle: string): string => {
  switch (pokeStyle) {
    case "poison":
      return "#EED1F0";
    case "grass":
      return "#42B66C";
    case "fire":
      return "#FFAA99";
    case "bug":
      return "#44F1AC";
    case "ghost":
      return "#F2FFF6";
    case "water":
      return "#CADFFF";
    case "fairy":
      return "#F9DDF0";
    case "rock":
      return "#ABABAB";
    case "normal":
      return "#FAFADC";
    case "flying":
      return "#5890CC ";
    case "dragon":
      return "#FF6565";
    case "fighting":
      return "#FFB861";
    case "electric":
      return "#B7DE28 ";
    case "steel":
      return "#465B78";
    case "psychic":
      return "#28D5DE";
    case "ground":
      return "#7D7368";
    case "dark":
      return "#0E1433";
    case "ice":
      return "#00DEFF";

    default:
      return "#FAFADC";
  }
};
