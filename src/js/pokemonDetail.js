// pokemonDetail.js
import { convertPokeApiDetailToPokemon } from './poke-api.js'

const pokemonInfo = document.getElementById('pokemonInfo')
const backButton = document.getElementById('backButton')

// Botão "Voltar"
backButton.addEventListener('click', () => window.history.back())

// Pegar o número do Pokémon na URL
const urlParams = new URLSearchParams(window.location.search)
const number = urlParams.get('number')

if (!number) {
    pokemonInfo.innerHTML = '<p>Pokémon não encontrado!</p>'
} else {
    fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
        .then(res => {
            if (!res.ok) throw new Error('Erro ao buscar Pokémon')
            return res.json()
        })
        .then(convertPokeApiDetailToPokemon)
        .then(pokemon => {
            // Renderizar detalhes
            pokemonInfo.innerHTML = `
                <h1>${pokemon.name} (#${pokemon.number})</h1>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
                
                <p>Tipo:</p>
                <p>
                    ${pokemon.types.map(t => `<span class="type-badge ${t}">${t}</span>`).join('')}
                </p>

                <p>Stats:</p>
                <ul>
                    ${pokemon.stats ? pokemon.stats.map(s => `<li>${s.stat.name}: ${s.base_stat}</li>`).join('') : ''}
                </ul>

                <p>Habilidades:</p>
                <ul>
                    ${pokemon.abilities ? pokemon.abilities.map(a => `<li>${a.ability.name}</li>`).join('') : ''}
                </ul>
            `
        })
        .catch(err => {
            console.error(err)
            pokemonInfo.innerHTML = '<p>Erro ao carregar os dados do Pokémon.</p>'
        })
}