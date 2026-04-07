let allPokemons = [];
let currentPokemons = [];
let currentPokemonsCounter = 0;

async function logPokemons() {
    let pokemoonAsHTTPResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=493");
    allPokemons = await pokemoonAsHTTPResponse.json();
}

async function init() {
    await logPokemons();
    await renderTwentyPokemonCards();
}

// #region POKEMON MAIN CARDS
function renderPokemonCard(pokemonArray) {
    let pokemonCardsRef = document.getElementById("all_pokecards_id");
    let cardsHTML = buildPokemonCardsHTML(pokemonArray);
    pokemonCardsRef.innerHTML = cardsHTML;
}

function buildPokemonCardsHTML(pokemonArray) {
    let html = "";
    for (let i = 0; i < pokemonArray.length; i++) {
        html += getHTMLForPokemonCard(pokemonArray[i]);
    }
    return html;
}

function renderPokemonType(pokemonTypes) {
    let typeHTML = "";
    for (let i = 0; i < pokemonTypes.length; i++) {
        typeHTML += getHTMLForPokemonType(pokemonTypes[i])
    }
    return typeHTML
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
        fetchedPokemonDetails.url = pokemonArray[i].url;
        fetchedPokemonDetails.id = pokemonDetails.id;
        for (let j = 0; j < pokemonDetails.types.length; j++) {
            fetchedPokemonDetails.types.push(pokemonDetails.types[j].type.name);
        }
        currentPokemonDetails.push(fetchedPokemonDetails);
    }
    return currentPokemonDetails;
}

// #endregion POKEMON MAIN CARDS

// #region auxiliary functions
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
// #endregion auxiliary functions

// #region POKEMON DETAIL CARDS
async function openPokemonDetailCard(pokemonID) {
    let pokemon = currentPokemons[pokemonID - 1];
    let detailCardHTML = getHTMLForPokemonDetailsForDetailCard(pokemon);
    renderPokemonDetailCard(detailCardHTML);
    await renderAllPokemonStats(pokemonID)
    document.getElementById("pokemon_detail_card_dialog_id").showModal()
}

function renderPokemonDetailCard(detailCardHTML) {
    let dialogRef = document.getElementById("pokemon_detail_card_dialog_id");
    dialogRef.innerHTML = "";
    dialogRef.innerHTML = detailCardHTML;
}

function getPokemonBackgroundForDetailCardHTML(pokemon) {
    if (pokemon.types.length === 1) {
        return getSingleTypeBackgroundForDetailCardHTML(pokemon);
    } else {
        return getDoubleTypeBackgroundForDetailCardHTML(pokemon);
    }
}

async function renderAllPokemonStats(pokemonID) {
    await buildStatsMainArrayOfPokemonShown(pokemonID);
    document.getElementById("stats_main_id").innerHTML = renderStatsMainOfPokemonShown();
}

function renderStatsMainOfPokemonShown() {
    return `
        <div class="pokemon_detail_card_lower_half_stats">
            <p>height: ${currentPokemonStatsMain[0].height}</p>
            <p>weight: ${currentPokemonStatsMain[0].weight}</p>
            <p>base experience: ${currentPokemonStatsMain[0].baseExperience}</p>
            <p>abilities: ${currentPokemonStatsMain[0].abilities}</p>
        </div>
    `
}

let currentPokemonStatsMain = [];

async function buildStatsMainArrayOfPokemonShown(pokemonID) {
    currentPokemonStatsMain = [];
    let pokemonStatsMainAsHTTPResoponse = await fetch(currentPokemons[pokemonID - 1].url);
    let pokemonStatsMain = await pokemonStatsMainAsHTTPResoponse.json();
    let fetchedpokemonStatsMain = {
        height: "",
        weight: "",
        baseExperience: "",
        abilities: [],
    };
    fetchedpokemonStatsMain.height = pokemonStatsMain.height;
    fetchedpokemonStatsMain.weight = pokemonStatsMain.weight;
    fetchedpokemonStatsMain.baseExperience = pokemonStatsMain.base_experience;
    for (let i = 0; i < pokemonStatsMain.abilities.length; i++) {
        fetchedpokemonStatsMain.abilities.push(pokemonStatsMain.abilities[i].ability.name)
    }
    currentPokemonStatsMain.push(fetchedpokemonStatsMain);
    return currentPokemonStatsMain;
}

// #endregion POKEMON DETAIL CARDS

// #region LOAD POKEMON BUTTON
async function loadMorePokemons() {
    showLoadingSpinner();
    let nextPokemons = allPokemons.results.slice(currentPokemonsCounter, currentPokemonsCounter + 20);
    let nextPokemonsWithDetails = await getPokemonDetails(nextPokemons);
    for (let i = 0; i < nextPokemonsWithDetails.length; i++) {
        currentPokemons.push(nextPokemonsWithDetails[i]);
    }
    currentPokemonsCounter = currentPokemonsCounter + 20;
    renderPokemonCard(currentPokemons);
    setTimeout(() => {
        hideLoadingSpinner();
    }, 2000);
}
// #endregion LOAD POKEMON BUTTON

// #region SEARCH POKEMON 
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
// #endregion SEARCH POKEMON */

// #region LAODIGNSPINNER
function showLoadingSpinner() {
    document.getElementById("loader_id").classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function hideLoadingSpinner() {
    document.getElementById("loader_id").classList.add("hidden");
    document.body.style.overflow = "auto";
}
// #endregion LAODIGNSPINNER









