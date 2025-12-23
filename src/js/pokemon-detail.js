const params = new URLSearchParams(window.location.search);
const pokemonId = params.get("id");

const container = document.getElementById("pokemonDetail");

function loadPokemonDetail(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then((pokemon) => {
      const mainType = pokemon.types[0].type.name;
      const typesHtml = pokemon.types
        .map((t) => `<span class="types ${t.type.name}">${t.type.name}</span>`)
        .join("");

      const abilities = pokemon.abilities.map((a) => a.ability.name).join(", ");

      container.innerHTML = `
        <main class="pokemon-details ${mainType}" style="--type-color: var(--type-${mainType})">
          <!-- HEADER -->
          <header class="details-header">
            <div class="header-actions">
              <button class="back-btn" aria-label="Voltar" onclick="history.back()">←</button>
              <button class="curti-btn" aria-label="Curtir">🤍</button>
            </div>

            <h1 class="title">
              ${pokemon.name}
              <span class="pokemon-id">#${pokemon.id
                .toString()
                .padStart(3, "0")}</span>
            </h1>

            ${typesHtml}
          </header>

          <!-- IMAGEM -->
          <figure class="pokemon-image">
            <img 
              src="${
                pokemon.sprites.other.dream_world.front_default ||
                pokemon.sprites.front_default
              }" 
              alt="${pokemon.name}">
          </figure>

          <!-- ABAS -->
          <nav class="tabs" role="tablist" aria-label="Informações do Pokémon">
            <button class="tab active" role="tab" aria-selected="true" aria-controls="about" id="tab-about">About</button>
            <button class="tab" role="tab" aria-selected="false" aria-controls="stats" id="tab-stats">Base Stats</button>
            <button class="tab" role="tab" aria-selected="false" aria-controls="moves" id="tab-moves">Moves</button>
          </nav>

          <!-- CONTEÚDO -->
          <section class="tab-content">

            <dl id="about" role="tabpanel" aria-labelledby="tab-about">
              <dt>Height</dt>
              <dd>${pokemon.height / 10} m</dd>

              <dt>Weight</dt>
              <dd>${pokemon.weight / 10} kg</dd>

              <dt>Abilities</dt>
              <dd>${abilities}</dd>
            </dl>

            <section id="stats" role="tabpanel" aria-labelledby="tab-stats" hidden>
              ${pokemon.stats
                .map(
                  (stat) => `
                <p><strong>${stat.stat.name}:</strong> ${stat.base_stat}</p>
              `
                )
                .join("")}
            </section>

            <section id="moves" role="tabpanel" aria-labelledby="tab-moves" hidden>
              ${pokemon.moves
                .slice(0, 10)
                .map(
                  (m) => `
                <p>${m.move.name}</p>
              `
                )
                .join("")}
            </section>

          </section>
        </main>
      `;

      initTabs();
    });
}

function initTabs() {
  const tabs = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll('[role="tabpanel"]');

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });

      panels.forEach((p) => (p.hidden = true));

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      const panel = document.getElementById(tab.getAttribute("aria-controls"));
      if (panel) panel.hidden = false;
    });
  });
}

loadPokemonDetail(pokemonId);
