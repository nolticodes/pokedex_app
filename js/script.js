let allPokemons = [];
let currentPokemons = [];
let currentPokemonsCounter = 0;
let currentPokemonStatsMain = [];
let currentPokemonStatsStats = [];

async function logPokemons() {
    try {
        let pokemoonAsHTTPResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=493");
        allPokemons = await pokemoonAsHTTPResponse.json();
    } catch (error) {
        console.error("Error in logPokemons", error)
    }
}

async function init() {
    try {
        await logPokemons();
        await renderTwentyPokemonCards();
    } catch (error) {
        console.log("Error in init", error)
    }
}

// #region POKEMON MAIN CARDS
function renderPokemonCard(pokemonArray) {
    let pokemonCardsRef = document.getElementById("all_pokecards_id");
    let cardsHTML = buildPokemonCardsHTML(pokemonArray);
    pokemonCardsRef.innerHTML = cardsHTML;
}

function renderNewLoadedPokemonCards(newLoadedPokemonArray) {
    let pokemonCardsRef = document.getElementById("all_pokecards_id");
    let cardsHTML = buildPokemonCardsHTML(newLoadedPokemonArray);
    pokemonCardsRef.innerHTML += cardsHTML;
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
    try {
        let firstTwentyPokemons = [];
        for (let i = 0; i < 20; i++) {
            firstTwentyPokemons.push(allPokemons.results[i]);
        }
        let detailedPokemons = await getPokemonDetails(firstTwentyPokemons);
        currentPokemons = detailedPokemons;
        currentPokemonsCounter = 20;
        renderPokemonCard(currentPokemons);
    } catch (error) {
        console.error("Error in renderTwentyPokemonCards", error)
    }
}

async function getPokemonDetails(pokemonArray) {
    try {
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
    } catch (error) {
        console.error("Error in getPokemonDetails, error")
    }
}

// #endregion POKEMON MAIN CARDS

// #region auxiliary functions
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
// #endregion auxiliary functions

// #region POKEMON DETAIL CARDS
async function openPokemonDetailCard(pokemonID) {
    try {
        let pokemon = await buildBaseStatsObjectOfPokemonShown(pokemonID);
        let detailCardHTML = getHTMLForPokemonDetailsForDetailCard(pokemon);
        renderPokemonDetailCard(detailCardHTML);
        await renderAllPokemonStats(pokemonID);
        document.getElementById("pokemon_detail_card_dialog_id").showModal()
    } catch (error) {
        console.error("Error in openPokemonDetailCard", error)
    }
}

async function buildBaseStatsObjectOfPokemonShown(pokemonID) {
    try {
        let pokemonBaseStatsAsHTTPResponse = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonID)
        let pokemonBaseStats = await pokemonBaseStatsAsHTTPResponse.json();
        let currentPokemonBaseStats = {
            name: "",
            types: [],
            id: "",
            url: ""
        }
        currentPokemonBaseStats.name = pokemonBaseStats.name;
        for (let i = 0; i < pokemonBaseStats.types.length; i++) {
            currentPokemonBaseStats.types.push(pokemonBaseStats.types[i].type.name);
        };
        currentPokemonBaseStats.id = pokemonBaseStats.id;
        currentPokemonBaseStats.url = "https://pokeapi.co/api/v2/pokemon/" + pokemonID;
        return currentPokemonBaseStats;
    } catch (error) {
        console.error("Errr in buildBaseStatsObjectOfPokemonShown", error)
    }
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
    try {
        await buildStatsMainArrayOfPokemonShown(pokemonID);
        document.getElementById("stats_main_id").innerHTML = getHTMLForStatsMainOfPokemonShown();
        await buildStatsStatsArrayOfPokemonShown(pokemonID);
        document.getElementById("stats_stats_id").innerHTML = getHTMLForStatsStatsOfPokemonShown();
    } catch (error) {
        console.error("Error in renderAllPokemonStats", error)
    }
}

async function buildStatsMainArrayOfPokemonShown(pokemonID) {
    try {
        currentPokemonStatsMain = [];
        let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonID);
        let pokemonStatsMain = await response.json();
        let fetchedpokemonStatsMain = {
            pokedexID: pokemonStatsMain.id,
            generation: checkWhichGeneration(pokemonID),
            height: pokemonStatsMain.height,
            weight: pokemonStatsMain.weight,
            baseExperience: pokemonStatsMain.base_experience,
            abilities: [],
        };
        for (let i = 0; i < pokemonStatsMain.abilities.length; i++) {
            fetchedpokemonStatsMain.abilities.push(
                pokemonStatsMain.abilities[i].ability.name
            );
        }
        currentPokemonStatsMain.push(fetchedpokemonStatsMain);
        return currentPokemonStatsMain;
    } catch (error) {
        console.error("Error in buildStatsMainArrayOfPokemonShown", error)
    }
}

function checkWhichGeneration(pokemonID) {
    if (pokemonID <= 151) {
        return "1";
    } else if (pokemonID <= 251) {
        return "2";
    } else if (pokemonID <= 386) {
        return "3";
    } else if (pokemonID <= 493) {
        return "4";
    } else {
        return "Not in this Pokedex";
    }
}

async function buildStatsStatsArrayOfPokemonShown(pokemonID) {
    try {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonID);
        let pokemonStatsStats = await response.json();
        currentPokemonStatsStats = {};
        for (let i = 0; i < pokemonStatsStats.stats.length; i++) {
            let statName = pokemonStatsStats.stats[i].stat.name;
            let statValue = pokemonStatsStats.stats[i].base_stat;
            currentPokemonStatsStats[statName] = statValue;
        }
        return currentPokemonStatsStats;
    } catch (error) {
        console.error("Error in buildStatsStatsArrayOfPokemonShown", error)
    }
}

function switchCategory(category, categoryTitle) {
    document.getElementById("stats_main_id").classList.add("display_none");
    document.getElementById("category_main_id").classList.remove("selected");
    document.getElementById("stats_stats_id").classList.add("display_none");
    document.getElementById("category_stats_id").classList.remove("selected");
    document.getElementById("stats_evo_id").classList.add("display_none");
    document.getElementById("category_evo_id").classList.remove("selected");
    document.getElementById(category).classList.remove("display_none");
    document.getElementById(categoryTitle).classList.add("selected");
}

function nextPokemon(pokemonID) {
    if (pokemonID < 493) {
        openPokemonDetailCard(pokemonID + 1)
        document.getElementById("next_button_id_" + pokemonID).classList.add("display_none")
    }
}

function previousPokemon(pokemonID) {
    if (pokemonID > 1) {
        openPokemonDetailCard(pokemonID - 1)
        document.getElementById("prev_button_id_" + pokemonID).classList.add("display_none")
    }
}

// #endregion POKEMON DETAIL CARDS

// #region LOAD POKEMON BUTTON
async function loadMorePokemons() {
    try {
        showLoadingSpinner();
        let nextPokemons = allPokemons.results.slice(currentPokemonsCounter, currentPokemonsCounter + 20);
        let nextPokemonsWithDetails = await getPokemonDetails(nextPokemons);
        for (let i = 0; i < nextPokemonsWithDetails.length; i++) {
            currentPokemons.push(nextPokemonsWithDetails[i]);
        }
        currentPokemonsCounter = currentPokemonsCounter + 20;
        renderNewLoadedPokemonCards(nextPokemonsWithDetails)
        setTimeout(() => {
            hideLoadingSpinner();
        }, 1000);
    } catch (error) {
        console.error("Error in loadMorePokemons", error)
    }
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
}

function hideLoadingSpinner() {
    document.getElementById("loader_id").classList.add("hidden");
}
// #endregion LAODIGNSPINNER

// #region EVO CHAIN
async function getPokemonEvoChainURL(pokemonID) {
    let pokemonEvoURLasHTTPResponse = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + pokemonID + "/");
    let pokemonEvoURL = await pokemonEvoURLasHTTPResponse.json();
    let fetchedPokemonEvoChainData = {}
    let pokemonEvoData = {}
    try {
        fetchedPokemonEvoChainData = {
            name: pokemonEvoURL.name,
            id: pokemonEvoURL.id,
            evoURL: pokemonEvoURL.evolution_chain.url,
            evoFrom: pokemonEvoURL.evolves_from_species.name,
        }
        pokemonEvoData = Object.assign(fetchedPokemonEvoChainData, await getPokemonEvoChainData(pokemonEvoURL.evolution_chain.url, pokemonEvoURL.name, pokemonEvoURL.id, pokemonEvoURL.evolves_from_species.name))
    } catch (error) {
        fetchedPokemonEvoChainData = {
            name: pokemonEvoURL.name,
            id: pokemonEvoURL.id,
            evoURL: pokemonEvoURL.evolution_chain.url,
        }
        pokemonEvoData = Object.assign(fetchedPokemonEvoChainData, await getPokemonEvoChainData(pokemonEvoURL.evolution_chain.url, pokemonEvoURL.name, pokemonEvoURL.id))

    }
    return pokemonEvoData
}

async function getPokemonEvoChainData(evoURL, name, id, evoFromName) {
    let pokemonEvoDataAsHTTPResponse = await fetch(evoURL);
    let pokemonEvoData = await pokemonEvoDataAsHTTPResponse.json();
    let evoStageNull = pokemonEvoData.chain;
    let evoStageOne = checkStage(evoStageNull);
    let evoStageTwo = checkStage(evoStageOne);
    let fetchedPokemonEvoChain = {
        currentPokemonName: name,
        currentPokemonId: id,
        evoFromName: evoFromName,
        evoStageNullName: evoStageNull.species.name,
    };
    
    if (evoStageOne === null) {
        fetchedPokemonEvoChain = fetchedPokemonEvoChain
    } else if (evoStageTwo === null) {
        fetchedPokemonEvoChain = Object.assign(fetchedPokemonEvoChain, {
            evoStageOneName: evoStageOne.species.name,
        })
    } else {
        fetchedPokemonEvoChain = Object.assign(fetchedPokemonEvoChain, {
            evoStageOneName: evoStageOne.species.name,
            evoStageTwoName: evoStageTwo.species.name,
        })
    }
    return fetchedPokemonEvoChain
}

function checkStage(stageChain) {
    if (!stageChain) {
        return null;
    }
    if (!stageChain.evolves_to || stageChain.evolves_to.length === 0) {
        return null;
    }
    return stageChain.evolves_to[0];
}

// #endregion EVOCHAIN











