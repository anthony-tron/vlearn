let entries = document.getElementById('entries')
let allElements = entries.getElementsByTagName('td')

for (let i = 0; i < allElements.length; i = i + 2) {
    let kanji = (allElements[i].innerHTML)
    let reading = (allElements[i+1].innerHTML)

    let canvasArea = document.getElementById('canvas-area')
    let canvas = document.createElement('canvas')
    canvas.width = 476
    canvas.height = 909
    canvas.name = kanji
    canvas.title = 'Click to download'

    if(drawFlashcard(canvas, {kanji, reading}, {backgroundColor: sample(coolColors), fontFamily: 'appli-mincho', kanjiSize: '200px', readingSize: '80px'})) {
        canvas.addEventListener('mouseup', function(event) {
            if (event.button == 0) { // left click
                let img = canvas.toDataURL('image/png')
                saveAs(img, kanji+'.png')
            }
        })
        canvasArea.appendChild(canvas)
    }
}