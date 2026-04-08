function getHTMLForPokemonCard(pokemon) {
    return `
        <div class="main_content_pokecard" onclick="openPokemonDetailCard(${pokemon.id})">
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

function getHTMLForPokemonDetailsForDetailCard(pokemon) {
    return `
        <section class="pokemon_detail_card_upper_half">
            <div class="pokemon_detail_card_upper_half_title">
                <h2>#${pokemon.id} ${capitalizeFirstLetter(pokemon.name)}</h2>
            </div>

            ${getPokemonBackgroundForDetailCardHTML(pokemon)}

            <div class="pokemon_detail_card_upper_half_img_type">
                ${renderPokemonType(pokemon.types)}
            </div>

            <div class="img_next_button" onclick="nextPokemon(${pokemon.id})">
                <img src="./assets/img/img/next_prev_icon.svg">
            </div>

            <div class="img_prev_button" onclick="previousPokemon(${pokemon.id})">
                <img src="./assets/img/img/next_prev_icon.svg">
            </div>
            
        </section>

        <section class="pokemon_detail_card_lower_half">
            <div class="pokemon_detail_card_lower_half_categories">
                <div id="category_main_id" class="pokemon_detail_card_lower_half_categories_title selected" onclick="switchCategory('stats_main_id', 'category_main_id')">
                    <h4>main</h4>
                </div>
                <div id="category_stats_id" class="pokemon_detail_card_lower_half_categories_title" onclick="switchCategory('stats_stats_id', 'category_stats_id')">
                    <h4>stats</h4>
                </div>
                <div id="category_evo_id" class="pokemon_detail_card_lower_half_categories_title" onclick="switchCategory('stats_evo_id', 'category_evo_id')">
                    <h4>evo chain</h4>
                </div>
            </div>

            <div id="stats_main_id">
            </div>

            <div id="stats_stats_id" class="display_none">
            </div>

            <div id="stats_evo_id" class="display_none">
            </div>
        </section>
    `;
}

function getSingleTypeBackgroundForDetailCardHTML(pokemon) {
    return `
        <div class="pokemon_detail_card_upper_half_img_pokemon type_background" style="background-image: url('${getHTMLForPokemonTypeBackground(pokemon.types[0])}');">
            <div class="pokemon_detail_card_upper_half_img_pokemon_img">        
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg">
            </div>
        </div>
    `;
}

function getDoubleTypeBackgroundForDetailCardHTML(pokemon) {
    return `
        <div class="pokemon_detail_card_upper_half_img_pokemon type_background_split">
            <div class="background_left">
                <img src="${getHTMLForPokemonTypeBackground(pokemon.types[0])}">
            </div>
            <div class="background_right">
                <img src="${getHTMLForPokemonTypeBackground(pokemon.types[1])}">
            </div>
            <div class="pokemon_detail_card_upper_half_img_pokemon_img">        
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg">
            </div>
        </div>
    `;
}

function getHTMLForStatsMainOfPokemonShown() {
    return `
        <div class="pokemon_detail_card_lower_half_stats">
            <div class="pokemin_detail_card_lower_half_stats_textline"><p>Height: </p> <span>${Number(currentPokemonStatsMain[0].height) / 10} m</span></div>
            <div class="pokemin_detail_card_lower_half_stats_textline"><p>Weight: </p> <span>${currentPokemonStatsMain[0].weight} kg</span></div>
            <div class="pokemin_detail_card_lower_half_stats_textline"><p>Base Experience: </p> <span>${currentPokemonStatsMain[0].baseExperience}</span></div>
            <div class="pokemin_detail_card_lower_half_stats_textline"><p>Abilities: </p> <span>${currentPokemonStatsMain[0].abilities.join(", ")}</span></div>
        </div>
    `
}

function getHTMLForStatsStatsOfPokemonShown() {
    return `
        <div class="pokemon_detail_card_lower_half_stats">
            <div class="pokemin_detail_card_lower_half_stats_textline"> <p>hp:</p> <span> ${currentPokemonStatsStats.hp}</span> </div>
            <div class="pokemin_detail_card_lower_half_stats_textline"> <p>attack:</p> <span> ${currentPokemonStatsStats.attack}</span> </div>
            <div class="pokemin_detail_card_lower_half_stats_textline"> <p>defense:</p> <span> ${currentPokemonStatsStats.defense}</span> </div>
            <div class="pokemin_detail_card_lower_half_stats_textline"> <p>special-attack:</p> <span> ${currentPokemonStatsStats["special-attack"]}</span> </div>
            <div class="pokemin_detail_card_lower_half_stats_textline"> <p>special-defense:</p> <span> ${currentPokemonStatsStats["special-defense"]}</span> </div>
            <div class="pokemin_detail_card_lower_half_stats_textline"> <p>speed:</p> <span> ${currentPokemonStatsStats.speed}</span> </div>
        </div>
    `
}