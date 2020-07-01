function sample(array) {
    return array[Math.round(Math.random() * (array.length - 1))]
}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomHexColor() {
    const possibleChars = '012345789abc' // removing d, e and f makes good background color with a white font color ;)
    let strColor = '#'
    while (strColor.length != 7)
        strColor += sample(possibleChars)

    return strColor
}

function organize(givenList, maxPerRow = 5) {
    let rowNumbers = Math.ceil(givenList.length / maxPerRow)
    if (rowNumbers % 2 == 0 && givenList.length % 2 == 0) rowNumbers++

    let leftElements = [...givenList]

    let org = []
    for (let i = 0; i < rowNumbers; ++i) {
        org.push(i % 2 == 0 ? [] : [leftElements.pop()])
    }

    let currentIndex = 0
    while (leftElements.length != 0) {

        org[currentIndex].push(leftElements.pop())

        // update index (get back to first if last)
        if (currentIndex == rowNumbers - 1) currentIndex = 0
        else ++currentIndex
    }

    return org
}



function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}