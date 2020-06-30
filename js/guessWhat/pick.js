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
    let instructions

    switch (pick.rule.name) {
        case 'begin':
            instructions = 'Type a word that <strong>begins</strong> with ' + pick.character
            break
        case 'end':
            instructions = 'Type a word that <strong>ends</strong> with ' + pick.character
            break
        case 'contains':
            instructions = 'Type a word that <strong>contains</strong> ' + pick.character
            break
        default: throw `I don't know this rule: ` + pick.rule.name
    }

    if (pick.character == 'ー') instructions += ' (katakana)'
    else if (pick.character == '一') instructions += ' (kanji)'

    return instructions
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