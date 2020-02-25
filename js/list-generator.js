const coolColors = ['#ffa41b', '#ff5151', '#9818d6', '#29c7ac', '#fd2eb3', '#3d3d3d', '#3de06d', '#df8543', '#0f4c75', '#0c9463', '#79473a', '#2ec1c3', '#e469ba', '#9d69e4', '#418206']

function random(min, max) {
    return Math.random() * (max - min) + min
}

function sample(array) {
    return array[Math.floor(Math.random() * (array.length))]
}

function generate() {
    let t1 = performance.now()

    let canvasArea = document.getElementById('canvas-area')
    while (canvasArea.lastChild) {
        canvasArea.removeChild(canvasArea.lastChild)
        // remove all children
        // note : do not use innerHTML = "" as nodes instances will persist
    }
    
    let entriesTable = document.getElementById('entries')
    let allEntries = entriesTable.getElementsByTagName('input')

    let colorTable = document.getElementById('color-table')
    let allColors = colorTable.getElementsByTagName('input')

    let infoGiver = document.getElementById('info-giver')
    
    if (allEntries.length == 4 && allEntries[0].value == '') {
        infoGiver.innerHTML = 'You have no flashcards to generate.'
        return
    }
    
    let numberGenerated = 0
    let numberToGenerate = 0

    let colors = [...allColors] // copy by value

    for (let i = 0; i < allEntries.length; i=i+4) {
        let kanji = allEntries[i].value
        if (kanji == '') continue
        ++numberToGenerate

        let kanjiFontSize
        switch (kanji.length) {
            case 1:
            case 2:
                kanjiFontSize = '200px'
                break
            case 3:
                kanjiFontSize = '133px'
                break
            case 4:
                kanjiFontSize = '100px'
                break
            case 5:
                kanjiFontSize = '80px'
                break
            default:
                kanjiFontSize = '67px'
                break
        }

        let reading = allEntries[i+1].value
        
        let canvas = document.createElement('canvas')
        let widthSelector = document.getElementById('width-selector')
        let heightSelector = document.getElementById('height-selector')

        canvas.width = widthSelector.value
        canvas.height = heightSelector.value
        canvas.title = 'Click to download'
        canvas.name = kanji

        let checkbox = allEntries[i+2]
        let flashcardColor

        if (checkbox.checked) {
            flashcardColor = allEntries[i+3].value // color input
        } else {
            let pickedColor = sample(colors)
            flashcardColor = pickedColor.value
        }

        if (drawFlashcard(canvas,
            {kanji: kanji, reading: reading},
            {backgroundColor: flashcardColor, fontFamily: 'appli-mincho', kanjiSize: kanjiFontSize, readingSize: '80px'})) {

            canvas.addEventListener('mouseup', function (event) {
                if (event.button == 0) { // left click
                    downloadCanvasAsPNG(canvas)
                }
            })

            canvasArea.appendChild(canvas)

            ++numberGenerated
        } else {
            infoGiver.innerHTML = 'Something went wrong with the 2d context.'
            return
        }

        infoGiver.innerHTML = 'Generated ' + numberGenerated + ' flashcard(s) out of ' + numberToGenerate + ' in ' + (performance.now() - t1).toFixed(3) + ' milliseconds.'
    }
}


function drawFlashcard(canvas, info, options) {

    if (info.kanji == '' || !canvas.getContext) return false

    let context = canvas.getContext('2d')

    context.fillStyle = options.backgroundColor
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.font = options.kanjiSize + ' ' + options.fontFamily
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillStyle = '#ffffff'
    context.fillText(info.kanji, canvas.width/2, canvas.height/2)

    context.font = options.readingSize + ' ' + options.fontFamily
    context.textBaseline = 'top'
    context.fillText(info.reading, canvas.width/2, canvas.height/2 + 100)

    return true
}