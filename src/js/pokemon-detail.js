import { pokeApi } from './pokemon-api/poke-api'

const params = new URLSearchParams(window.location.search)
const pokemonId = params.get('id')

const container = document.getElementById('pokemonDetail')

function loadPokemonDetail(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(pokemon => {
            container.innerHTML = `
                <h2>${pokemon.name}</h2>
                <img src="${
                    pokemon.sprites.other.dream_world.front_default ||
                    pokemon.sprites.front_default
                }" alt="${pokemon.name}">
                <p><strong>ID:</strong> ${pokemon.id}</p>
                <p><strong>Altura:</strong> ${pokemon.height}</p>
                <p><strong>Peso:</strong> ${pokemon.weight}</p>
            `
        })
}

loadPokemonDetail(pokemonId)
