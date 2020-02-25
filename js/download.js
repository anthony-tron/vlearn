// Function to download data to a file
function download(data, filename, type) {
    //https://stackoverflow.com/questions/13405129/javascript-create-and-save-file
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

function downloadCanvasAsPNG(canvas) {
    canvas.toBlob(function(blob) {
        let link = document.createElement('a')
        link.download = canvas.name + '.png'

        link.href = URL.createObjectURL(blob)
        link.click()

        URL.revokeObjectURL(link.href)
    })
}

function downloadAll(canvasAreaID) {
    var zip = new JSZip();

    let canvasArea = document.getElementById(canvasAreaID)
    let allCanvas = canvasArea.getElementsByTagName('canvas')
    
    if (allCanvas.length == 0) return

    let numerateCheckBox = document.getElementById('numerate')
    let numerate = numerateCheckBox.checked

    for (let i = 0; i < allCanvas.length; ++i) {
        console.log(allCanvas[i])
        let img = allCanvas[i].toDataURL()
        img = img.substr(22)
        img = atob(img)

        let filename = (numerate ? (i+1)　+ '.' : '') + allCanvas[i].name + '.png'
        zip.file(filename, img, {binary: true})
    }

    zip.generateAsync({type:"blob"})
        .then(function(content) {
            // see FileSaver.js
            //saveAs(content, "supertest.zip")
            download(content, "vlearn.zip", '')
        })
}