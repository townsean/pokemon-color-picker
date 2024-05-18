await main();

/**
 * Application starting point
 */
async function main() {
    const colors = await getPokemonColors();
    let colorSection = document.getElementById('color-section');
    for(let color of colors) {
        const div = document.createElement('div');
        div.title = color.name;
        div.style.background = color.name;
        div.style.width = '10vmin';
        div.style.height = '10vmin';
        div.style.border = '2px solid black';
        div.style.borderRadius = '50%';

        colorSection.appendChild(div);
    }
}

async function getPokemonColors() {
    let colors = [];
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon-color');
        if(response.ok) {
            const json = await response.json();
            colors = json.results;
        }

    } catch(e) {
        console.error(e);
    }

    return colors;
}