let allPokemons = [];
let currentPokemons = [];
let currentPokemonsCounter = 0;
let currentPokemonStatsMain = [];
let currentPokemonStatsStats = [];
let currentPokemonEvoData = {};
let filterdPokemons = [];
let currentIndex = 0;

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
        await loadMorePokemons();
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

function getCurrentIndex(pokemonID) {
    if (filterdPokemons.length > 0) {
            currentIndex = -1;
            for (let i = 0; i < filterdPokemons.length; i++) {
                if (pokemonID == filterdPokemons[i].url.split("/")[6]) {
                    currentIndex = i;
                }
            }
        } else {
            currentIndex = -1;
        }
}
// #endregion auxiliary functions

// #region POKEMON DETAIL CARDS
async function openPokemonDetailCard(pokemonID) {
    try {
        getCurrentIndex(pokemonID)
        let pokemon = await buildBaseStatsObjectOfPokemonShown(pokemonID);
        let detailCardHTML = getHTMLForPokemonDetailsForDetailCard(pokemon);
        renderPokemonDetailCard(detailCardHTML);
        await renderAllPokemonStats(pokemonID);
        document.getElementById("pokemon_detail_card_dialog_id").showModal();
    } catch (error) {
        console.error("Error in openPokemonDetailCard", error);
    }
}

function closePokemonDetailCard() {
    document.getElementById("pokemon_detail_card_dialog_id").close()
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
        await getPokemonEvoChainURL(pokemonID)
        document.getElementById("stats_evo_id").innerHTML = getHTMLForEvoChainOfPokemonShown();
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
    if (filterdPokemons.length === 0) {
        if (pokemonID < 493) {
            openPokemonDetailCard(pokemonID + 1);
        }
    } else {
        if (currentIndex < filterdPokemons.length - 1) {
            let nextID = filterdPokemons[currentIndex + 1].url.split("/")[6];
            openPokemonDetailCard(nextID);
        }
    }
}

function previousPokemon(pokemonID) {
    if (filterdPokemons.length === 0) {
        if (pokemonID > 1) {
            openPokemonDetailCard(pokemonID - 1);
        }
    } else {
        if (currentIndex > 0) {
            let prevID = filterdPokemons[currentIndex - 1].url.split("/")[6];
            openPokemonDetailCard(prevID);
        }
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
        if (currentPokemonsCounter === 0) {
            renderPokemonCard(currentPokemons);
        } else {
            renderNewLoadedPokemonCards(nextPokemonsWithDetails);
        }
        currentPokemonsCounter = currentPokemonsCounter + 20;
        setTimeout(() => {
            hideLoadingSpinner();
        }, 1000);
    } catch (error) {
        console.error("Error in loadMorePokemons", error);
    }
}
// #endregion LOAD POKEMON BUTTON

// #region SEARCH POKEMON 
async function searchPokemon() {
    let searchInputRef = document.getElementById("search_input_id").value.trim().toLowerCase();
    if (searchInputRef.length < 3) {
        renderPokemonCard(currentPokemons);
        return;
    }
    filterdPokemons = allPokemons.results.filter(function (pokemon) {
        return comparePokemonNames(pokemon, searchInputRef);
    });
    console.log(filterdPokemons)
    renderPokemonCard(await getPokemonDetails(filterdPokemons));
    document.getElementById("loadMorePokemonsButtonID").classList.add("display_none");
    document.getElementById("resetFilteredPokemonsButtonID").classList.remove("display_none")
}

function resetFilteredPokemons() {
    renderPokemonCard(currentPokemons);
    document.getElementById("loadMorePokemonsButtonID").classList.remove("display_none");
    document.getElementById("resetFilteredPokemonsButtonID").classList.add("display_none");
    filterdPokemons = [];
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
    currentPokemonEvoData = {}
    try {
        fetchedPokemonEvoChainData = {
            name: pokemonEvoURL.name,
            id: pokemonEvoURL.id,
            evoURL: pokemonEvoURL.evolution_chain.url,
            evoFrom: pokemonEvoURL.evolves_from_species.name,
        }
        currentPokemonEvoData = Object.assign(fetchedPokemonEvoChainData, await getPokemonEvoChainData(pokemonEvoURL.evolution_chain.url, pokemonEvoURL.name, pokemonEvoURL.id, pokemonEvoURL.evolves_from_species.name))
    } catch (error) {
        fetchedPokemonEvoChainData = {
            name: pokemonEvoURL.name,
            id: pokemonEvoURL.id,
            evoURL: pokemonEvoURL.evolution_chain.url,
        }
        currentPokemonEvoData = Object.assign(fetchedPokemonEvoChainData, await getPokemonEvoChainData(pokemonEvoURL.evolution_chain.url, pokemonEvoURL.name, pokemonEvoURL.id))
    }
    return currentPokemonEvoData
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
        evoStageNullID: getPokemonIDWithPokemonName(evoStageNull.species.name)
    };

    if (evoStageOne === null) {
        return fetchedPokemonEvoChain
    } else if (evoStageTwo === null) {
        fetchedPokemonEvoChain = Object.assign(fetchedPokemonEvoChain, {
            evoStageOneName: evoStageOne.species.name,
            evoStageOneID: getPokemonIDWithPokemonName(evoStageOne.species.name)
        })
    } else {
        fetchedPokemonEvoChain = Object.assign(fetchedPokemonEvoChain, {
            evoStageOneName: evoStageOne.species.name,
            evoStageOneID: getPokemonIDWithPokemonName(evoStageOne.species.name),
            evoStageTwoName: evoStageTwo.species.name,
            evoStageTwoID: getPokemonIDWithPokemonName(evoStageTwo.species.name),
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

function getPokemonIDWithPokemonName(pokemonName) {
    let pokemonObject = allPokemons.results.find(function (pokemon) {
        return pokemon.name === pokemonName;
    });
    let pokemonID = pokemonObject.url.split("/")[6];
    return pokemonID
}

// #endregion EVOCHAIN











