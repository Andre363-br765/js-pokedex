export function convertPokemonToLi(pokemon) {
  return `
    <li class="pokemon ${pokemon.type}">
        <a href="./src/pages/pokemon-detail.html?id=${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((t) => `<li class="type ${t}">${t}</li>`)
                      .join("")}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </a>
    </li>`;
}

export function renderPokemonList(pokemonListElement, pokemons) {
  const newHtml = pokemons.map(convertPokemonToLi).join("");
  pokemonListElement.innerHTML += newHtml;
}
