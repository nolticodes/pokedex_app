let allPokemons = [];
let currentPokemons = [];
let currentPokemonsCounter = 0;

async function logPokemons() {
    let pokemoonAsHTTPResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=500");
    allPokemons = await pokemoonAsHTTPResponse.json();
}

async function init() {
    await logPokemons();
    renderTwentyPokemonCards();
}

function renderPokemonCard(pokemonArray) {
    let pokemonCardsRef = document.getElementById("all_pokecards_id");
    pokemonCardsRef.innerHTML = ""
    for (let i = 0; i < pokemonArray.length; i++) {
        let pokemon = pokemonArray[i];
        let pokecardHTML = `
            <div class="main_content_pokecard">
                <div class="main_content_pokecard_header">
                    <h3>#<span>${((pokemon.url).split("/")).at(6)}</span></h3>
                    <h3>${capitalizeFirstLetter(pokemon.name)}</h3>
                </div>
                <div class="main_content_pokecard_main">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${((pokemon.url).split("/")).at(6)}.svg">
                </div>
                <div class="main_content_pokecard_footer">
                    
                </div>
            </div>
        `;
        pokemonCardsRef.innerHTML += pokecardHTML
    }
}

function renderTwentyPokemonCards() {
    for (let i = 0; i < 20; i++) {
        currentPokemons.push(allPokemons.results[i]);
        currentPokemonsCounter = currentPokemonsCounter + 1;
    }
    renderPokemonCard(currentPokemons);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function loadMorePokemons() {
    let nextPokemons = allPokemons.results.slice(currentPokemonsCounter, currentPokemonsCounter + 20);
    for (let i = 0; i < nextPokemons.length; i++) {
        currentPokemons.push(nextPokemons[i]);
    }
    currentPokemonsCounter = currentPokemonsCounter + 20;
    renderPokemonCard(currentPokemons);
};

function searchPokemon() {
    let searchInputRef = document.getElementById("search_input_id").value.toLowerCase();
    if (searchInputRef.length >= 3) {
        let currentPokemonsFiltered = currentPokemons.filter(function (pokemonName) {
            return comparePokemonNames(pokemonName, searchInputRef);
        });
        renderPokemonCard(currentPokemonsFiltered);
    }
}

function comparePokemonNames(pokemonName, searchInputRef) {
    return pokemonName.name.toLowerCase().includes(searchInputRef);
}








