const STORAGE_KEY = "likedPokemons";

function getLikedPokemons() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveLikedPokemons(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function isPokemonLiked(id) {
  return getLikedPokemons().includes(id);
}

export function toggleLikePokemon(id) {
  let liked = getLikedPokemons();

  if (liked.includes(id)) {
    liked = liked.filter((p) => p !== id);
  } else {
    liked.push(id);
  }

  saveLikedPokemons(liked);
  return liked.includes(id);
}
