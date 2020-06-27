const pickRules = {
    begin: {
        name: 'begin',
        verify: (input, character) => input[0] == character
    },
    end: {
        name: 'end',
        verify: (input, character) => input[input.length - 1] == character
    },
    contains: {
        name: 'contains',
        verify: (input, character) => input.includes(character)
    }
}

function pick(rule) { // { originWord, rule, character }
    const word = JpVoc.random()
    const reading = word.reading ? word.reading : word.word

    if (!rule) rule = sample([pickRules.begin, pickRules.end, pickRules.contains])

    let character

    // TO CHANGE
    switch (rule.name) {
        case 'begin':
            character = reading[0]
            break
        case 'end':
            character = reading[reading.length - 1]
            break
        case 'contains':
            character = sample(reading)
            break
    }

    return {
        originWord: word,
        rule: rule,
        character: character
    }
}

function respectsRules(input, pick) { // -> boolean
    return pick.rule.verify(input, pick.character)
}

function pickInstructions(pick) {
    // TO CHANGE
    switch (pick.rule.name) {
        case 'begin':
            return 'Type a word that <strong>begins</strong> with ' + pick.character
        case 'end':
            return 'Type a word that <strong>ends</strong> with ' + pick.character
        case 'contains':
            return 'Type a word that <strong>contains</strong> ' + pick.character
    }
}

function pickHint(pick) {
    // TO CHANGE
    switch (pick.rule.name) {
        case 'begin':
            return pick.character + '...'
        case 'end':
            return '...' + pick.character
        case 'contains':
            return '...' + pick.character + '...'
    }
}