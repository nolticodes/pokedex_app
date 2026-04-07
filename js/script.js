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

function renderPokemonCard(pokemonArray) {
    let pokemonCardsRef = document.getElementById("all_pokecards_id");
    pokemonCardsRef.innerHTML = ""
    for (let i = 0; i < pokemonArray.length; i++) {
        let pokemon = pokemonArray[i];
        let pokecardHTML = `
            <div class="main_content_pokecard" onclick="openPokemonDetailCard(${pokemon.id}, '${pokemon.name}')">
                <div class="main_content_pokecard_header">
                    <h3>#<span>${pokemon.id}</span></h3>
                    <h3>${capitalizeFirstLetter(pokemon.name)}</h3>
                </div>

                ${getPokemonBackgroundHTML(pokemon)}


                <div class="main_content_pokecard_footer">
                    <div class="main_content_pokecard_footer_types">
                        ${renderPokemonType(pokemon.types)}
                    </div>
                </div>
            </div>
        `;
        pokemonCardsRef.innerHTML += pokecardHTML
    }
}

function openPokemonDetailCard(pokemonID, pokemonName) {
    document.getElementById("dialog_pokemon_name_id").innerHTML = pokemonID + capitalizeFirstLetter(pokemonName);
    document.getElementById("pokemon_detail_card_dialog_id").showModal();
}

function getPokemonBackgroundHTML(pokemon) {
    if (pokemon.types.length === 1) {
        return `
            <div class="main_content_pokecard_main type_background" style="background-image: url('${getHTMLForPokemonTypeBackground(pokemon.types[0])}');">
                
                <div class="main_content_pokecard_main_pokemon_img">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg">
                </div>
            </div>
        `;
    } else {
        return `
            <div class="main_content_pokecard_main type_background_split">

                <div class="background_left">
                    <img src="${getHTMLForPokemonTypeBackground(pokemon.types[0])}">
                </div>

                <div class="background_right">
                    <img src="${getHTMLForPokemonTypeBackground(pokemon.types[1])}">
                </div>

                <div class="main_content_pokecard_main_pokemon_img">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg">
                </div>

            </div>
        `;
    }
}

function getHTMLForPokemonTypeBackground(pokemonType) {
    switch (pokemonType) {
        case "normal":
            return "./assets/img/type_backgrounds/type_normal_background.png";
        case "fire":
            return "./assets/img/type_backgrounds/type_fire_background.png";
        case "water":
            return "./assets/img/type_backgrounds/type_water_background.png";
        case "electric":
            return "./assets/img/type_backgrounds/type_electric_background.png";
        case "grass":
            return "./assets/img/type_backgrounds/type_grass_background.png";
        case "ice":
            return "./assets/img/type_backgrounds/type_ice_background.png";
        case "fighting":
            return "./assets/img/type_backgrounds/type_fighting_background.png";
        case "poison":
            return "./assets/img/type_backgrounds/type_poison_background.png";
        case "ground":
            return "./assets/img/type_backgrounds/type_ground_background.png";
        case "flying":
            return "./assets/img/type_backgrounds/type_flying_background.png";
        case "psychic":
            return "./assets/img/type_backgrounds/type_psychic_background.png";
        case "bug":
            return "./assets/img/type_backgrounds/type_bug_background.png";
        case "rock":
            return "./assets/img/type_backgrounds/type_rock_background.png";
        case "ghost":
            return "./assets/img/type_backgrounds/type_ghost_background.png";
        case "dragon":
            return "./assets/img/type_backgrounds/type_dragon_background.png";
        case "dark":
            return "./assets/img/type_backgrounds/type_dark_background.png";
        case "steel":
            return "./assets/img/type_backgrounds/type_steel_background.png";
        case "fairy":
            return "./assets/img/type_backgrounds/type_fairy_background.png";
        default:
            return "";
    }
}

function getHTMLForPokemonType(pokemonType) {
    switch (pokemonType) {
        case "normal":
            return "<img src='./assets/img/type_icons/Type=Normal.svg'>";
        case "fire":
            return "<img src='./assets/img/type_icons/Type=Fire.svg'>";
        case "water":
            return "<img src='./assets/img/type_icons/Type=Water.svg'>";
        case "electric":
            return "<img src='./assets/img/type_icons/Type=Electric.svg'>";
        case "grass":
            return "<img src='./assets/img/type_icons/Type=Grass.svg'>";
        case "ice":
            return "<img src='./assets/img/type_icons/Type=Ice.svg'>";
        case "fighting":
            return "<img src='./assets/img/type_icons/Type=Fighting.svg'>";
        case "poison":
            return "<img src='./assets/img/type_icons/Type=Poison.svg'>";
        case "ground":
            return "<img src='./assets/img/type_icons/Type=Ground.svg'>";
        case "flying":
            return "<img src='./assets/img/type_icons/Type=Flying.svg'>";
        case "psychic":
            return "<img src='./assets/img/type_icons/Type=Psychic.svg'>";
        case "bug":
            return "<img src='./assets/img/type_icons/Type=Bug.svg'>";
        case "rock":
            return "<img src='./assets/img/type_icons/Type=Rock.svg'>";
        case "ghost":
            return "<img src='./assets/img/type_icons/Type=Ghost.svg'>";
        case "dragon":
            return "<img src='./assets/img/type_icons/Type=Dragon.svg'>";
        case "dark":
            return "<img src='./assets/img/type_icons/Type=Dark.svg'>";
        case "steel":
            return "<img src='./assets/img/type_icons/Type=Steel.svg'>";
        case "fairy":
            return "<img src='./assets/img/type_icons/Type=Fairy.svg'>";
        default:
            return "unknown type";
    }
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

// LAODIGNSPINNER
function showLoadingSpinner() {
    document.getElementById("loader_id").classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function hideLoadingSpinner() {
    document.getElementById("loader_id").classList.add("hidden");
    document.body.style.overflow = "auto";
}








