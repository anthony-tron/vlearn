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
    deleteButtonHTML.addEventListener('click', () => onClickDeleteButton(main, deleteButtonHTML), { once: true })

    let deleteButtonContainerHTML = document.createElement('li')
    deleteButtonContainerHTML.classList.add('no-padding', 'delete-entry-button')
    deleteButtonContainerHTML.appendChild(deleteButtonHTML)

    main = document.createElement('ul')
    main.classList.add('rounded', 'japanese-word-entry')
    main.associatedWord = word

    if (word.reading)
        main.append(wordHTML, readingHTML, meaningsHTML, deleteButtonContainerHTML)
    else
        main.append(wordHTML, meaningsHTML, deleteButtonContainerHTML)


    return main
}

function onClickDeleteButton(entryToDelete, refDeleteButton) {

    deleteWordFromLocalStorage(entryToDelete.associatedWord)

    let oldLi = removeHTML(entryToDelete.parentNode)
    // delete main li

    _recycleBinEntries.appendChild(oldLi)

    refDeleteButton.innerText = '↑'
    refDeleteButton.addEventListener('click', () => onClickRecycleButton(entryToDelete, refDeleteButton), { once: true })

    recycledEntriesCount++
    updateCounter()
}

function onClickRecycleButton(entryToRecycle, refRecycleButton) {

    saveWordInLocalStorage(entryToRecycle.associatedWord)

    let oldLi = removeHTML(entryToRecycle.parentNode)

    _entries.appendChild(oldLi)

    refRecycleButton.innerText = '⨯'
    refRecycleButton.addEventListener('click', () => onClickDeleteButton(entryToRecycle, refRecycleButton), { once: true })

    recycledEntriesCount--
    updateCounter()
}

function removeHTML(htmlElement) {
    return htmlElement.parentNode.removeChild(htmlElement)
    // litterally, asking his parent to remove him
}

function updateCounter() {
    if (recycledEntriesCount == 0) {
        _recyledEntriesCounter.innerText = ''
    } else {
        _recyledEntriesCounter.innerText = `(${recycledEntriesCount})`
    }
}