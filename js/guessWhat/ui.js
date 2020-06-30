let _userInput = document.getElementById('user-input')
let _instructions = document.getElementById('instructions')
let _word = document.getElementById('word')
let _reading = document.getElementById('reading')
let _definitions = document.getElementById('definitions')
let _vocHelper = document.getElementById('voc-helper')
let _validateButton = document.getElementById('validate-button')
let _idkButton = document.getElementById('idk-button')
let _jishoLink = document.getElementById('jisho-link')
let _googleImageLink = document.getElementById('google-image-link')
let _rememberCheckbox = document.getElementById('remember-checkbox')
let _indicator = document.getElementById('indicator')

let _vocNav = document.getElementById('voc-nav')
let _previousButton = document.getElementById('previous-button')
let _nextButton = document.getElementById('next-button')

let displayedWord
let wordsToDisplay
let indexOfCurrentDisplayedWord
let hasAlreadyClickedOnShowAnother

_previousButton.addEventListener('mouseup', () => {
    if (hasAlreadyClickedOnShowAnother) {
        previousWord()
    } else {
        generateWordsToDisplay()
    }

    displayedWord = wordsToDisplay[indexOfCurrentDisplayedWord]
    vocHelperUpdate(displayedWord)
})

_nextButton.addEventListener('mouseup', () => {
    if (hasAlreadyClickedOnShowAnother) {
        nextWord()
    } else {
        generateWordsToDisplay()
    }

    displayedWord = wordsToDisplay[indexOfCurrentDisplayedWord]
    vocHelperUpdate(displayedWord)
})


_userInput.addEventListener('keypress', () => {
    if (event.which == 13 || event.keyCode == 13) {
        onValidate()
    }
})

_validateButton.addEventListener('mouseup', onValidate)

_idkButton.addEventListener('mouseup', () => {
    vocHelperUpdate(currentPick.originWord)
    onPick()
    pickUpdateDisplay()
})

_rememberCheckbox.addEventListener('change', () => {
    if (_rememberCheckbox.checked)
        saveWordInLocalStorage(displayedWord)
    else
        deleteWordFromLocalStorage(displayedWord)
})

function previousWord() {
    if (indexOfCurrentDisplayedWord == 0)
        indexOfCurrentDisplayedWord = wordsToDisplay.length - 1
    else
        --indexOfCurrentDisplayedWord
}

function nextWord() {
    if (indexOfCurrentDisplayedWord == wordsToDisplay.length - 1)
        indexOfCurrentDisplayedWord = 0
    else
        ++indexOfCurrentDisplayedWord
}

function generateWordsToDisplay() {
    hasAlreadyClickedOnShowAnother = true
    indexOfCurrentDisplayedWord = 0
    wordsToDisplay = JpVoc.searchByReading(previousPick.character, 16, previousPick.rule.verify)
    wordsToDisplay.push(displayedWord)
}

function onSuccess(userWord) {
    onPick()
    _indicator.innerText = ''
    _userInput.value = ''
    vocHelperUpdate(userWord)
    pickUpdateDisplay()
}

function onPick() {
    previousPick = currentPick
    currentPick = pick()
    hasAlreadyClickedOnShowAnother = false
}

function onValidate() {
    try {
        const userWord = JpVoc.search(_userInput.value)
        const reading = userWord.reading || userWord.word

        if (respectsRules(reading, currentPick)) {
            onSuccess(userWord)
        } else {
            _indicator.innerText = `Your word doesn't respect the rules!`
            playAnimationOn(_userInput, 'shake', 400)
        }

    } catch (e) {
        if (e instanceof NotFoundError) {
            _indicator.innerText = `Sorry, I don't know this word.`
            playAnimationOn(_userInput, 'shake', 400)
        } else if (e instanceof TypeError) {
            _indicator.innerText = `Uh oh... Did you forget to type something?`
            playAnimationOn(_userInput, 'shake', 400)
        } else {
            console.error()
        }
    }

}

function vocHelperUpdate(word) {
    _vocNav.classList.remove('hidden')

    _word.innerText = word.word

    _reading.innerText = word.reading
    if (_reading.innerText == 'undefined') {
        _reading.classList.add('hidden')
    } else {
        _reading.classList.remove('hidden')
    }

    while (_definitions.lastChild) _definitions.removeChild(_definitions.lastChild)

    for (const meaning of word.meanings) {
        let li = document.createElement('li')
        li.innerText = meaning

        _definitions.appendChild(li)
    }

    _rememberCheckbox.checked = wordsInLocalStorageContains(word)

    _jishoLink.setAttribute('href', 'https://jisho.org/search/' + word.word)
    _googleImageLink.setAttribute('href', 'https://www.google.com/search?tbm=isch&q=' + word.word)

    displayedWord = word
}


function pickUpdateDisplay() {
    _instructions.innerHTML = pickInstructions(currentPick)
    _userInput.placeholder = pickHint(currentPick)
}

function playAnimationOn(htmlElement, animationClass, duration) {
    if (htmlElement.classList.contains(animationClass))
        htmlElement.classList.remove(animationClass)

    htmlElement.classList.add(animationClass)

    setTimeout(() => htmlElement.classList.remove(animationClass), duration)
}