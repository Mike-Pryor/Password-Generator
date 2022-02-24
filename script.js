
// Need to generate uppercase letters, lowercase letters, numbers and symbols. Created 4 different 'functions' that do this.

    // The DOM elements
const resultEl = document.getElementById('result') // The 'result' or output box/field.
const lengthEl = document.getElementById('length') // The 'Passwood length' input box.
const uppercaseEl = document.getElementById('uppercase') // The 'checkbox'.
const lowercaseEl = document.getElementById('lowercase') // The 'checkbox'.
const numbersEl = document.getElementById('numbers') // The 'checkbox'.
const symbolsEl = document.getElementById('symbols') // The 'checkbox'.
const generateEl = document.getElementById('generate') // The 'Generate password' button.
const clipboardEl = document.getElementById('clipboard') // The 'clipboard' button.

    //  Creates 'object' called "randomFunc". Places the 4 functions from bottom of page into this.
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}
     // Start of events. Total of 2 events. 
clipboardEl.addEventListener('click', () => { //For the coping feature from clipboard icon.
    const textarea = document.createElement('textarea')
    const password = resultEl.innerText

    if(!password) { return } //If nothing in input field, return nothing.

    textarea.value = password //adds the value of whatever the password is.
    document.body.appendChild(textarea) //passing in the text area. Places it in the body.
    textarea.select() //Call select
    document.execCommand('copy') //Allows it to copy. Using the copy command.
    textarea.remove() // Removes the text area.
    alert('Password copied to clipboard!') // Success message modal.
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value //'+' symbol turns string into a number.
    const hasLower = lowercaseEl.checked //Verifies if checked or not. Like a true or false.
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
})
    // End of 2 events.

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '' //Initializes the variable.
    const typesCount = lower + upper + number + symbol //Counts the number of checked items.
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]) // An 'array' based on the 4 items. Need the {} to make an array of objects. Using the 'filter' method to get rid of any 'false' value.
    
    if(typesCount === 0) { //If nothing is checked, will not return a password.
        return ''
    }

    //Will loop over the length. "typesCount" is the number of checked boxes.
    for(let i = 0; i < length; i += typesCount) { 
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0] // loop thru and provide the 1st value (0).
            generatedPassword += randomFunc[funcName]()
        })
    }

    //allows for 1-2 character passwords.
    const finalPassword = generatedPassword.slice(0, length) 

    return finalPassword
}

// Using numbers from the 'Browser Character Set' - https://www.w3schools.com/html/html_charset.asp
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97) // 26 letters in alphabet. 97 = lowercase 'a'.
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65) // 26 letters in alphabet. 65 = uppercase 'A'.
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48) // 10 possible number options (0-9). 48 = the number zero.
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.' // A 'string' of all the possible symbols.
    return symbols[Math.floor(Math.random() * symbols.length)] //returning a character from a 'string'. Returning a random symbol, and multiplying the length of the 'string'.
}