function downloadAll(canvasAreaID) {
    var zip = new JSZip();

    let canvasArea = document.getElementById(canvasAreaID)
    let allCanvas = canvasArea.getElementsByTagName('canvas')
    
    if (allCanvas.length == 0) return

    for (let i = 0; i < allCanvas.length; ++i) {
        console.log(allCanvas[i])
        let img = allCanvas[i].toDataURL()
        img = img.substr(22)
        img = atob(img)
        zip.file(allCanvas[i].name + '.png', img, {binary: true})
    }

    zip.generateAsync({type:"blob"})
        .then(function(content) {
            // see FileSaver.js
            saveAs(content, "supertest.zip")
        })
}