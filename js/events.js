function hideColorPicker(event) {
    event.target.parentElement.parentElement.getElementsByTagName('input')[3].classList.toggle('invisible')
}

function removeColor(event) {
    if (event.button == 0) // left click
        event.target.parentElement.parentElement.remove();
}

function addColor() {
    let colorTable = document.getElementById('color-table')

    let row = colorTable.insertRow(-1)

    let colorCell = row.insertCell(-1)
    let newColor = document.createElement('input')
    
    newColor.type = 'color'
    newColor.value = sample(coolColors)
    colorCell.appendChild(newColor)

    let removeButtonCell = row.insertCell(-1)
    let removeButton = document.createElement('button')
    removeButton.innerHTML = '-'
    removeButton.classList.add('delete-button')
    removeButton.addEventListener('mouseup', removeColor)
    removeButtonCell.appendChild(removeButton)
}

function addRow() {
    let last = document.getElementById('last')
    if (last.value != '') {
        last.removeAttribute('id')
        last.removeAttribute('onchange')

        let entriesTable = document.getElementById('entries')
        let row = entriesTable.insertRow(-1) // insert to the end

        let kanjiCell = row.insertCell(-1) // insert to the end
        let kanjiEntry = document.createElement('input')
        kanjiEntry.type = 'text'
        kanjiEntry.placeholder = 'Kanji'
        kanjiEntry.id = 'last'
        kanjiEntry.onchange = addRow
        kanjiCell.appendChild(kanjiEntry)
    
        let readingCell = row.insertCell(-1) // insert to the end
        let readingEntry = document.createElement('input')
        readingEntry.type = 'text'
        readingEntry.placeholder = 'Reading'
        readingCell.appendChild(readingEntry)

        let customCell = row.insertCell(-1)
        let checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.addEventListener('mouseup', hideColorPicker)
        customCell.appendChild(checkbox)

        let customColorCell = row.insertCell(-1)
        let colorPicker = document.createElement('input')
        colorPicker.type = 'color'
        colorPicker.value = sample(coolColors)
        colorPicker.classList.add('invisible')
        customColorCell.appendChild(colorPicker)
    }
}