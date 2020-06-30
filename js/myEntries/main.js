let _entries = document.getElementById('entries')
let _noEntriesYetContainer = document.getElementById('no-entries-yet-container')
let wordsLoadedFromLocalStorage = wordsInLocalStorage()

if (wordsLoadedFromLocalStorage.length > 0) {
    // not empty
    for (const word of wordsLoadedFromLocalStorage) {
        addEntry(word)
    }
}
else {
    // empty
    _noEntriesYetContainer.classList.remove('hidden')
}

function addEntry(word) {
    let li = document.createElement('li')
    li.appendChild(japaneseWordEntryGenerateHTML(word))

    _entries.appendChild(li)
}