import { drinks } from './drinks.js';

const input = document.getElementById('input');
const output = document.getElementById('output');
const revealButton = document.getElementById('reveal');
const submitButton = document.getElementById('submit');
const hard = document.getElementById('hard');
const attempts = document.getElementById('attempts');

let hardMode = false;
let won = false;
let remainingAttempts = 5;
updateAttempts()

hard.addEventListener('change', (event) => {
    if (event.target.checked) {
        hardMode = true;
    } else {
        hardMode = false;
    }
});

revealButton.addEventListener('click', () =>  {
    if (!won) {
        remainingAttempts = 0;
        updateAttempts();
        revealAnswer();
    }
});

submitButton.addEventListener('click', () => {
    if (remainingAttempts) {
        remainingAttempts--;
        updateAttempts();
        checkGuess(input.value);
        input.value = '';
    }
})

input.addEventListener('keydown', function(event) {
    if (event.key == 'Enter') {
        if (remainingAttempts) {
            remainingAttempts--;
            updateAttempts();
            checkGuess(input.value);
            input.value = '';
        }
    };
});

function updateAttempts() {
    attempts.textContent = `Remaining Guesses: ${remainingAttempts}`;
}
function gameWon() {
    const winnerText = document.createElement('div');
    winnerText.textContent = 'You Win!';
    output.appendChild(winnerText);
    won = true;
}

function gameLost() {
    revealAnswer();
    const loserText = document.createElement('div');
    loserText.textContent = 'You Lose.';
    output.appendChild(loserText);
}

function revealAnswer() {
    const answer = getDrink();

    const answerRow1 = document.createElement('div');
    const answerRow2 = document.createElement('div');
    const answerName = document.createElement('div');
    const answerSpirit = document.createElement('div');
    const answerIngredients = document.createElement('div');

    answerRow1.classList.add('row1');
    answerRow2.classList.add('row2');

    answerName.textContent = `${answer.name}`;
    answerSpirit.textContent = `Spirit: ${answer.spirit}`;
    let ingredients = [];
    for (let ingredient of answer.ingredients) {
        ingredients.push(ingredient);
    }
    answerIngredients.textContent = ingredients.join(', '); 

    answerRow1.appendChild(answerName);
    answerRow1.appendChild(answerSpirit);
    answerRow2.appendChild(answerIngredients);
    output.appendChild(answerRow1);
    output.appendChild(answerRow2); 
}

function checkGuess(input) {
    let guessEntry;
    let cleanInput = input.trim();
    
    const guessRow1 = document.createElement('div');
    const guessRow2 = document.createElement('div');
    const guessName = document.createElement('div');
    const guessSpirit = document.createElement('div');
    const guessIngredientsCorrect = document.createElement('div');
    const guessIngredientsWrong = document.createElement('div');

    if (cleanInput === '') {
        /* The database uses blank strings for alt drink
            names. So we check if the string is blank before
            working on it. This gives you back an attempt. */
        remainingAttempts += 1;
        return updateAttempts();
    }

    if (!drinks.some((drink) => drink.name.toLowerCase() === cleanInput.toLowerCase() 
        || drink.altName.toLowerCase() === cleanInput.toLowerCase())) {

        guessRow1.textContent = `${cleanInput} is not in the database`;
        output.appendChild(guessRow1);
        remainingAttempts++;
        return updateAttempts();
    } else {
        if (drinks.some((drink) => drink.altName.toLowerCase() === cleanInput.toLowerCase())) {
            guessEntry = drinks.find((drink) => drink.altName.toLowerCase() === cleanInput.toLowerCase());
        } else {
            guessEntry = drinks.find((drink) => drink.name.toLowerCase() === cleanInput.toLowerCase());
        }
    }
    
    guessRow1.classList.add('row1');
    guessRow2.classList.add('row2');
    guessName.textContent = `Drink: ${guessEntry.name}`;
    guessSpirit.textContent = `Spirit: ${guessEntry.spirit}`;
    if (!hardMode) {
        let matchedIngredients = [];
        let unmatchedIngredients = [];

        for(let ingredient of guessEntry.ingredients) {
            if (getDrink().ingredients.includes(ingredient)) {
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

    if (guessEntry === getDrink()) {
        guessName.classList.add('right');
    } else {
        guessName.classList.add('wrong');
    }

    if (guessEntry.spirit === getDrink().spirit) {
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
    if (guessEntry.name === getDrink().name) {
        return gameWon();
    } else if (!remainingAttempts) {
        return gameLost();
    }
}

function getDrink() {
    const now = new Date();
    return drinks[now.getDate() - 1];
}

function getArray() {
    return drinks.length;
}

console.log(getArray());

const loserDrinks = [
    'Vodka Martini', 'Pisco Sour', 'Screwdriver', 'Vesper',
    'Adios', 'AMF', 'Adios Motherfucker', 'Long Island Iced Tea',
    'Long Island', 'LIT',
];