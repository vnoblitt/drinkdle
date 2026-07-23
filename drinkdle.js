const input = document.getElementById('input');
const output = document.getElementById('output');

input.addEventListener('keydown', function(event) {
    if (event.key == 'Enter') {
        checkGuess(input.value);
        input.value = '';
    };
});

function checkGuess(input) {
    let guessEntry;

    if (!drinks.some((drink) => drink.name.toLowerCase() === input.toLowerCase())) {
        console.log('drink not in database');
        return;
    } else {
        guessEntry = drinks.find((drink) => drink.name.toLowerCase() === input.toLowerCase());
    }

    const guessName = document.createElement('div');
    const guessSpirit = document.createElement('div');
    guessName.textContent = `${guessEntry.name}:` + String.fromCharCode(160);
    guessSpirit.textContent = guessEntry.spirit;

    if (guessEntry === correctGuess()) {
        guessName.classList.add('right');
    } else {
        guessName.classList.add('wrong');
    }

    if (guessEntry.spirit === correctGuess().spirit) {
        guessSpirit.classList.add('right');
    } else {
        guessSpirit.classList.add('wrong');
    }

    output.appendChild(guessName);
    output.appendChild(guessSpirit);
}

function correctGuess() {
    return drinks[1];
}

const drinks = [
    {
        name: 'Margarita',
        ingredients: ['triple-sec', 'lime juice', 'salt'],
        spirit: 'tequila',
    },
    {   
        name: 'Paloma',
        ingredients: ['grapefruit soda', 'lime juice', 'salt'],
        spirit: 'tequila', 
    },
    {
        name: 'Old Fashioned',
        ingredients: ['bitters', 'sugar', 'orange'],
        spirit: 'whiskey',
    },
    {
        name: 'Moscow Mule',
        ingredients: ['ginger ale', 'lime juice'],
        spirit: 'vodka',
    }    
];