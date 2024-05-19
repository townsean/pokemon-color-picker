const data = {};

await main();

/**
 * Application starting point
 */
async function main() {
    const colors = await getPokemonColors();
    let colorSection = document.getElementById('color-section');
    for (let color of colors) {
        const button = document.createElement('button');
        button.classList.add('color-button');
        button.title = color.name;
        button.style.backgroundColor = color.name;


        button.addEventListener('click', async () => {
            let pokemon = [];

            if (data[color.url]) {
                pokemon = data[color.url];
            } else {
                pokemon = data[color.url] = await getPokemonByColor(color.url);
            }

            let randomIndex = getRandomInt(0, pokemon.length);
            const randomPokemon = pokemon[randomIndex];

            if (randomPokemon) {
                const randomPokemonStats = await getPokemonByName(randomPokemon.name);

                const figcaption = document.getElementById('pokemon-figcaption');
                figcaption.innerText = randomPokemon.name;

                const img = document.getElementById('pokemon-image');
                img.src = randomPokemonStats.sprites.front_default;
                console.log(randomPokemon.name, randomPokemon.url, img.src);
            }
        });

        colorSection.appendChild(button);
    }
}

/**
 * Get all available Pokemon colors
 * @returns 
 */
async function getPokemonColors() {
    let colors = [];
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon-color');
        if (response.ok) {
            const json = await response.json();
            colors = json.results;
        }

    } catch (e) {
        console.error(e);
    }

    return colors;
}

/**
 * Get all pokemon associated with a given color url
 * @param {number} id 
 * @returns 
 */
async function getPokemonByColor(url) {
    let pokemon = [];
    try {
        const response = await fetch(url);
        if (response.ok) {
            const json = await response.json();
            pokemon = json.pokemon_species;
        }
    } catch (e) {
        console.error(e);
    }

    return pokemon;
}

/**
 * Get data for a given pokemon by it's name
 * @param {string} name 
 * @returns 
 */
async function getPokemonByName(name) {
    let pokemon = {};
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (response.ok) {
            pokemon = await response.json();
        }
    } catch (e) {
        console.error(e);
    }

    return pokemon;
}


/**
 * Gets a random number between min (inclusive) and max (exclusive)
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
 * @param {*} min Minimum number
 * @param {*} max Maximum number
 * @returns A random number between min and max
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}