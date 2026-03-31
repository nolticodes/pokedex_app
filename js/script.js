let allPokemons = [];
let currentPokemons = [];
let currentPokomesIndex = 0;

async function logPokemons() {
    let pokemoonAsHTTPResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=500");
    allPokemons = await pokemoonAsHTTPResponse.json();
    console.log(allPokemons.results[1]);
}

async function init() {
    await logPokemons();
    renderTwentyPokemonCards()
    renderPokemonCard();
}

function renderPokemonCard() {
    pokemonCardsRef = document.getElementById("all_pokecards_id");
    for (let i = 0; i < currentPokemons.length; i++) {
        let pokemon = currentPokemons[i];
        let pokecardHTML = `
            <div class="main_content_pokecard">
                <div class="main_content_pokecard_header">
                    <h3>#<span>${i + 1}</span></h3>
                    <h3>${capitalizeFirstLetter(pokemon.name)}</h3>
                </div>
                <div class="main_content_pokecard_main">
                    <!-- Main content for each pokecard -->
                </div>
                <div class="main_content_pokecard_footer">
                    <!-- Footer content for each pokecard -->
                </div>
            </div>
        `;
        pokemonCardsRef.innerHTML += pokecardHTML
    }
}

function renderTwentyPokemonCards() {
    for (let i = 0; i < 20; i++) {
        console.log(allPokemons.results[i]); 
        currentPokemons.push(allPokemons.results[i]);
    }
    currentPokomesIndex = currentPokomesIndex + 1;
    console.log(currentPokemons)
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}




