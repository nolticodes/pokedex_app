let allPokemons = [];
let currentPokemons = [];
let currentPokemonsCounter = 0;

async function logPokemons() {
    let pokemoonAsHTTPResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=500");
    allPokemons = await pokemoonAsHTTPResponse.json();
}

async function init() {
    await logPokemons();
    await renderTwentyPokemonCards();
}

function renderPokemonCard(pokemonArray) {
    let pokemonCardsRef = document.getElementById("all_pokecards_id");
    pokemonCardsRef.innerHTML = ""
    for (let i = 0; i < pokemonArray.length; i++) {
        let pokemon = pokemonArray[i];
        let pokecardHTML = `
            <div class="main_content_pokecard">
                <div class="main_content_pokecard_header">
                    <h3>#<span>${pokemon.id}</span></h3>
                    <h3>${capitalizeFirstLetter(pokemon.name)}</h3>
                </div>
                <div class="main_content_pokecard_main">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg">
                </div>
                <div class="main_content_pokecard_footer">
                    <div>
                    
                    </div>
                </div>
            </div>
        `;
        pokemonCardsRef.innerHTML += pokecardHTML
    }
}

async function renderTwentyPokemonCards() {
    let firstTwentyPokemons = [];
    for (let i = 0; i < 20; i++) {
        firstTwentyPokemons.push(allPokemons.results[i]);
    }
    let detailedPokemons = await getPokemonDetails(firstTwentyPokemons);
    currentPokemons = detailedPokemons;
    currentPokemonsCounter = 20;
    renderPokemonCard(currentPokemons);
}

async function getPokemonDetails(pokemonArray) {
    let currentPokemonDetails = [];
    for (let i = 0; i < pokemonArray.length; i++) {
        let pokemonDetailsAsHTTPResponse = await fetch(pokemonArray[i].url);
        let pokemonDetails = await pokemonDetailsAsHTTPResponse.json();
        let fetchedPokemonDetails = {
            name: "",
            url: "",
            id: "",
            types: [],
        };
        fetchedPokemonDetails.name = pokemonDetails.name;
        fetchedPokemonDetails.url = pokemonDetails.url;
        fetchedPokemonDetails.id = pokemonDetails.id;
        for (let j = 0; j < pokemonDetails.types.length; j++) {
            fetchedPokemonDetails.types.push(pokemonDetails.types[j].type.name);
        }
        currentPokemonDetails.push(fetchedPokemonDetails);
    }
    return currentPokemonDetails;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function loadMorePokemons() {
    let nextPokemons = allPokemons.results.slice(currentPokemonsCounter, currentPokemonsCounter + 20);
    let nextPokemonsWithDetails = await getPokemonDetails(nextPokemons);
    for (let i = 0; i < nextPokemonsWithDetails.length; i++) {
        currentPokemons.push(nextPokemonsWithDetails[i]);
    }
    currentPokemonsCounter = currentPokemonsCounter + 20;
    renderPokemonCard(currentPokemons);
}

function searchPokemon() {
    let searchInputRef = document.getElementById("search_input_id").value.trim().toLowerCase();
    if (searchInputRef.length < 3) {
        renderPokemonCard(currentPokemons);
        return;
    }
    let currentPokemonsFiltered = currentPokemons.filter(function (pokemon) {
        return comparePokemonNames(pokemon, searchInputRef);
    });
    renderPokemonCard(currentPokemonsFiltered);
}

function comparePokemonNames(pokemon, searchInputRef) {
    return pokemon.name.toLowerCase().includes(searchInputRef);
}









