export function renderPokemonDetail(pokemon) {
  const mainType = pokemon.types[0].type.name;

  const typesHtml = pokemon.types
    .map((t) => `<span class="types ${t.type.name}">${t.type.name}</span>`)
    .join("");

  const abilities = pokemon.abilities.map((a) => a.ability.name).join(", ");

  return `
    <main class="pokemon-details"
          style="--type-color: var(--type-${mainType})">

      <header class="details-header">
        <div class="header-actions">
          <button class="back-btn" onclick="history.back()">←</button>
          <button class="curti-btn">🤍</button>
        </div>

        <h1 class="title">
          ${pokemon.name}
          <span class="pokemon-id">
            #${pokemon.id.toString().padStart(3, "0")}
          </span>
        </h1>

        ${typesHtml}
      </header>

      <figure class="pokemon-image">
        <img
          src="${
            pokemon.sprites.other.dream_world.front_default ||
            pokemon.sprites.front_default
          }"
          alt="${pokemon.name}"
        />
      </figure>

      <nav class="tabs" role="tablist">
        <button class="tab active" aria-controls="about">About</button>
        <button class="tab" aria-controls="stats">Base Stats</button>
        <button class="tab" aria-controls="moves">Moves</button>
      </nav>

      <section class="tab-content">
        <dl id="about" role="tabpanel">
          <dt>Height</dt>
          <dd>${pokemon.height / 10} m</dd>

          <dt>Weight</dt>
          <dd>${pokemon.weight / 10} kg</dd>

          <dt>Abilities</dt>
          <dd>${abilities}</dd>
        </dl>

        <section id="stats" role="tabpanel" hidden>
          ${pokemon.stats
            .map(
              (s) => `<p><strong>${s.stat.name}:</strong> ${s.base_stat}</p>`
            )
            .join("")}
        </section>

        <section id="moves" role="tabpanel" hidden>
          <div class="moves-layout">
            <!-- LISTA DE MOVES (seu código original) -->
            <div class="moves-list">
              ${pokemon.moves
                .slice(0, 10)
                .map((m) => `<p>${m.move.name}</p>`)
                .join("")}
            </div>
  
            <!-- POKÉMON ANIMADO -->
            <div class="pokemon-anim">
              <img src="${
                pokemon.sprites.versions?.["generation-v"]?.["black-white"]
                  ?.animated?.front_default || pokemon.sprites.front_default
              }" 
              alt="${pokemon.name}">
            </div>
          </div>
        </section>
      </section>
    </main>
  `;
}
