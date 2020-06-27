const KEY = 'vlearn-remember'

function saveWordInLocalStorage(word) {
    let allWords = wordsInLocalStorage()
    if (!allWords) allWords = []

    allWords.push(word)

    localStorage.setItem(KEY, JSON.stringify(allWords))
}

function deleteWordFromLocalStorage(word) {
    let allWords = wordsInLocalStorage()
    if (!allWords) return

    allWords = allWords.filter(x => {
        return x.word != word.word
    })

    localStorage.setItem(KEY, JSON.stringify(allWords))
}

function wordsInLocalStorage() { // -> [{}, {}, ...]
    return JSON.parse(localStorage.getItem(KEY))
}

function wordsInLocalStorageContains(word) { // -> boolean
    const words = wordsInLocalStorage()
    if (!words) return false

    for (const storedWord of words) {
        if (storedWord.word == word.word)
            return true
    }
    return false
}