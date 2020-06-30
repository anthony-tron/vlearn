

_recycleBinToggler.addEventListener('click', () => {
    _recycleBinEntries.classList.toggle('hidden')
    _recycleBinToggler.classList.toggle('opened')
    _recycleBinToggler.classList.toggle('closed')
})

once()



// functions:

function once() {
    let wordsLoadedFromLocalStorage = wordsInLocalStorage()
    if (wordsLoadedFromLocalStorage.length > 0) {
        // not empty
        for (const word of wordsLoadedFromLocalStorage) {
            addEntry(word, _entries)
        }
    }
    else {
        // empty
        _noEntriesYetContainer.classList.remove('hidden')
    }
}


function addEntry(word, unordoredListHTML) {
    let li = document.createElement('li')
    li.appendChild(japaneseWordEntryGenerateHTML(word))

    unordoredListHTML.appendChild(li)
}