const input = document.getElementById('input');
const output = document.getElementById('output');
const resetButton = document.getElementById('reset');
const submitButton = document.getElementById('submit');
const hard = document.getElementById('hard');

let hardMode = false;
hard.addEventListener('change', (event) => {
    if (event.target.checked) {
        hardMode = true;
    } else {
        hardMode = false;
    }
});

resetButton.addEventListener('click', () =>  {
    output.innerHTML = '';
});

submitButton.addEventListener('click', () => {
    checkGuess(input.value);
    input.value = '';
})

input.addEventListener('keydown', function(event) {
    if (event.key == 'Enter') {
        checkGuess(input.value);
        input.value = '';
    };
});

function checkGuess(input) {
    let guessEntry;
    let cleanInput = input.trim();
    const guessRow1 = document.createElement('div');
    const guessRow2 = document.createElement('div');
    const guessName = document.createElement('div');
    const guessSpirit = document.createElement('div');
    const guessIngredientsCorrect = document.createElement('div');
    const guessIngredientsWrong = document.createElement('div');

    if (!drinks.some((drink) => drink.name.toLowerCase() === cleanInput.toLowerCase())) {
        guessRow1.textContent = `${cleanInput} not in database`;
        output.appendChild(guessRow1);
        return;
    } else {
        guessEntry = drinks.find((drink) => drink.name.toLowerCase() === cleanInput.toLowerCase());
    }

    
    guessRow1.classList.add('guess-row1');
    guessRow2.classList.add('guess-row2');
    guessName.textContent = `${guessEntry.name}`;
    guessSpirit.textContent = `Spirit: ${guessEntry.spirit}`;
    if (!hardMode) {
        let matchedIngredients = [];
        let unmatchedIngredients = [];

        for(let ingredient of guessEntry.ingredients) {
            console.log(ingredient);
            if (correctGuess().ingredients.includes(ingredient)) {
                matchedIngredients.push(ingredient);
            } else {
                unmatchedIngredients.push(ingredient);
            }
        }
        let cleanMatched = matchedIngredients.join(', ');
        let cleanUnmatched = unmatchedIngredients.join(', ');
        guessIngredientsCorrect.textContent = cleanMatched
        guessIngredientsWrong.textContent = cleanUnmatched;
        guessIngredientsCorrect.classList.add('right');
        guessIngredientsWrong.classList.add('wrong');
    } 

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

    guessRow1.appendChild(guessName);
    guessRow1.appendChild(guessSpirit);
    guessRow2.appendChild(guessIngredientsWrong);   // These two are flipped for aesthetic reasons
    guessRow2.appendChild(guessIngredientsCorrect); // even though it looks sloppy in code
    output.appendChild(guessRow1);
    if (!hardMode) {
        output.appendChild(guessRow2);
    }
}

function correctGuess() {
    return drinks[1];
}

const drinks = [
    {
        name: 'Margarita',
        ingredients: ['triple-sec', 'lime juice', 'salt'],
        spirit: 'Tequila',
    },
    {   
        name: 'Paloma',
        ingredients: ['grapefruit soda', 'lime juice', 'salt'],
        spirit: 'Tequila', 
    },
    {
        name: 'Old Fashioned',
        ingredients: ['bitters', 'sugar', 'orange'],
        spirit: 'Whiskey',
    },
    {
        name: 'Moscow Mule',
        ingredients: ['ginger ale', 'lime juice'],
        spirit: 'Vodka',
    }    
];