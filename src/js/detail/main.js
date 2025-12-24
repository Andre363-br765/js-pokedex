import { getPokemonById } from "./api/detail.js";
import { renderPokemonDetail } from "./components/render.js";
import { initTabs } from "./components/tabs.js";
import { isPokemonLiked, toggleLikePokemon } from "./components/favorite.js";

const params = new URLSearchParams(window.location.search);
const pokemonId = Number(params.get("id"));

const container = document.getElementById("pokemonDetail");

async function loadPokemonDetail(id) {
  const pokemon = await getPokemonById(id);
  container.innerHTML = renderPokemonDetail(pokemon);

  initTabs();
  initLikeButton(id);
}

function initLikeButton(id) {
  const btn = document.querySelector(".curti-btn");

  // estado inicial
  if (isPokemonLiked(id)) {
    btn.textContent = "❤️";
    btn.classList.add("liked");
  }

  btn.addEventListener("click", () => {
    const liked = toggleLikePokemon(id);
    btn.textContent = liked ? "❤️" : "🤍";
    btn.classList.toggle("liked", liked);
  });
}

loadPokemonDetail(pokemonId);
