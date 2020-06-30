function japaneseWordEntryGenerateHTML(word) {
    let main

    let wordHTML = document.createElement('li')
    wordHTML.classList.add('word')
    wordHTML.innerText = word.word

    let readingHTML
    if (word.reading) {
        readingHTML = document.createElement('li')
        readingHTML.classList.add('reading')
        readingHTML.innerText = word.reading
    } else {
        wordHTML.classList.add('two-cells')
    }

    let listOfMeaningsHTML = document.createElement('ul')
    for (const meaning of word.meanings) {
        let aMeaningHTML = document.createElement('li')
        aMeaningHTML.innerText = meaning

        listOfMeaningsHTML.appendChild(aMeaningHTML)
    }

    let meaningsHTML = document.createElement('li')
    meaningsHTML.classList.add('meanings')
    meaningsHTML.appendChild(listOfMeaningsHTML)

    let deleteButtonHTML = document.createElement('button')
    deleteButtonHTML.classList.add('full-width', 'full-height')
    deleteButtonHTML.innerText = '⨯'
    deleteButtonHTML.addEventListener('mouseup', () => onClickDeleteButton(main, word))

    let deleteButtonContainerHTML = document.createElement('li')
    deleteButtonContainerHTML.classList.add('no-padding', 'delete-entry-button')
    deleteButtonContainerHTML.appendChild(deleteButtonHTML)

    main = document.createElement('ul')
    main.classList.add('rounded', 'japanese-word-entry')

    if (word.reading)
        main.append(wordHTML, readingHTML, meaningsHTML, deleteButtonContainerHTML)
    else
        main.append(wordHTML, meaningsHTML, deleteButtonContainerHTML)


    return main
}

function onClickDeleteButton(mainParentToDelete, wordToDelete) {
    mainParentToDelete.parentNode.parentNode.removeChild(mainParentToDelete.parentNode)
    // delete main li

    deleteWordFromLocalStorage(wordToDelete)
}