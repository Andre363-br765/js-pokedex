const params = new URLSearchParams(window.location.search)
const pokemonId = params.get('id')

const container = document.getElementById('pokemonDetail')

function loadPokemonDetail(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(pokemon => {
            const types = pokemon.types.map(t => t.type.name)
            const abilities = pokemon.abilities.map(a => a.ability.name)

            container.innerHTML = `
                <button onclick="history.back()">⬅ Voltar</button>

                <h1 class="${types[0]}">${pokemon.name}</h1>

                <img src="${
                    pokemon.sprites.other.dream_world.front_default ||
                    pokemon.sprites.front_default
                }" alt="${pokemon.name}">

                <p><strong>ID:</strong> #${pokemon.id}</p>
                <p><strong>Tipos:</strong> ${types.join(', ')}</p>
                <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
                <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
                <p><strong>Habilidades:</strong> ${abilities.join(', ')}</p>

                <h2>Status Base</h2>
                <ul class="stats">
                    ${pokemon.stats.map(stat => `
                        <li>
                            <strong>${stat.stat.name}:</strong>
                            ${stat.base_stat}
                        </li>
                    `).join('')}
                </ul>
            `
        })
}

loadPokemonDetail(pokemonId)
