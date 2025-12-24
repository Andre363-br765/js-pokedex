import './components/header.js'

import { pokeApi } from './api/pokemon.js'
import { renderPokemonList } from './components/render.js'

const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

let offset = 0
// const limit = 10
const limit = 100
// let maxRecords = 151
let maxRecords = 1010

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then(pokemons => {
        renderPokemonList(pokemonList, pokemons)
    })
}

// Inicial
loadPokemonItems(offset, limit)

// Botão Load More
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const nextPage = offset + limit

    if (nextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(offset, limit)
    }
})