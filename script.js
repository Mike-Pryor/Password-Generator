// Need to generate uppercase letters, lowercase letters, numbers, and symbols. Created 4 different functions that do this.

// The DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

// Creates an object called "randomFunc". Places the 4 functions into this.
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Event for copying password to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) { return; }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!');
});

// Event for generating password
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

    if(typesCount === 0) {
        return '';
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    return generatedPassword.slice(0, length);
}

// Using numbers from the 'Browser Character Set'
function getRandomLower() {
    const randomValues = new Uint32Array(1);
    crypto.getRandomValues(randomValues);
    return String.fromCharCode((randomValues[0] % 26) + 97);
}

function getRandomUpper() {
    const randomValues = new Uint32Array(1);
    crypto.getRandomValues(randomValues);
    return String.fromCharCode((randomValues[0] % 26) + 65);
}

function getRandomNumber() {
    const randomValues = new Uint32Array(1);
    crypto.getRandomValues(randomValues);
    return String.fromCharCode((randomValues[0] % 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    const randomValues = new Uint32Array(1);
    crypto.getRandomValues(randomValues);
    return symbols[randomValues[0] % symbols.length];
}
