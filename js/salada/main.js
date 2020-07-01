let _saladaCirclesContainer = document.getElementById('salada-circles-container')
let _previousCharacterHolder = document.getElementById('previous-character')
let _currentCharacterHolder = document.getElementById('current-character')
let _nextCharacterHolder = document.getElementById('next-character')
let _hintButton = document.getElementById('hint-button')


let contentToMakeCircles = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん'.split('')

let charactersLeftToGuess

let _saladaCirclesList = []


_hintButton.addEventListener('click', () => {
    getGoodButton().classList.add('grow-in-out-loop')
})


function reset(number) {
    while (_saladaCirclesContainer.lastChild)
        _saladaCirclesContainer.removeChild(_saladaCirclesContainer.lastChild)

    let characters = chooseCharacters(contentToMakeCircles, number)
    charactersLeftToGuess = [...characters]

    _saladaCirclesList = []

    for (const character of characters) {
        let saladaCircle = generateSaladaCircle(character, randomHexColor())

        _saladaCirclesContainer.appendChild(saladaCircle)

        _saladaCirclesList.push(saladaCircle)
    }

    positionSaladaCircles()

    updateHolders()
}

function goToNextCharacter() {
    getGoodButton().classList.remove('grow-in-out-loop')
    charactersLeftToGuess.shift()
    updateHolders()
}

function updateHolders() {
    _previousCharacterHolder.innerText = _currentCharacterHolder.innerText || '...'
    _currentCharacterHolder.innerText = charactersLeftToGuess[0] || ''
    _nextCharacterHolder.innerText = charactersLeftToGuess[1] || ''
}

function chooseCharacters(list, number) {
    let set = new Set()
    while (set.size != number)
        set.add(sample(list))

    return set
}


function generateSaladaCircle(character, color) {
    let htmlElement = document.createElement('button')
    htmlElement.classList.add('salada-circle')

    htmlElement.innerText = character
    htmlElement.style.backgroundColor = color
    htmlElement.addEventListener('click', () => onClick(htmlElement))

    return htmlElement
}

function positionSaladaCircles() {
    while (_saladaCirclesContainer.lastChild)
        _saladaCirclesContainer.removeChild(_saladaCirclesContainer.lastChild)

    shuffle(_saladaCirclesList)
    let organizedList = organize(_saladaCirclesList)

    organizedList.map(arrayOfElements => {
        let div = document.createElement('div')
        div.classList.add('row', 'justify-center', 'no-margin')
        for (el of arrayOfElements)
            div.appendChild(el)

        _saladaCirclesContainer.appendChild(div)
    })
}

function onClick(saladaCircle) {
    if (saladaCircle.innerText === charactersLeftToGuess[0]) {
        console.log('yes !')
        goToNextCharacter()
    } else {
        console.error('nah')
    }
}

function getGoodButton() {
    for (el of _saladaCirclesList)
        if (el.innerText == charactersLeftToGuess[0])
            return el

    throw 'Did not find the good button. There must be an error somewhere in the code.'
}

function test() {
    console.time('t')
    reset(20)
    console.timeEnd('t')
}