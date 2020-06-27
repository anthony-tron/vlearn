class NotFoundError extends Error {
    constructor(message) {
        super(message)
        this.name = 'NotFoundError'
    }
}

JpVoc = {
    list: vocV1,

    search: function (word) {
        if (!word) throw new TypeError('Missing parameter')

        for (const v of this.list) {
            if (v.word === word || v.reading === word) return v;
        }

        throw new NotFoundError('In function JpVoc.search () : ' + word + ' was not found.')
    },

    searchByReading(wantedReading, resultNumbers = 1, functor = (r1, r2) => r1 == r2) {
        if (!wantedReading) throw new TypeError('Missing parameter')
        if (resultNumbers <= 0) throw new 'resultNumbers must be 1 or more'

        let array = []

        for (const v of this.list) {
            const reading = v.reading || v.word
            if (functor(reading, wantedReading)) {
                if (resultNumbers == 1)
                    return v;
                else {
                    array.push(v)
                    if (array.length == resultNumbers)
                        return array
                }
            }
        }

        if (array.length == 0) throw new NotFoundError('In function JpVoc.searchByReading () : ' + word + ' was not found.')

        return array
    },

    random: function () {
        return sample(this.list)
    }
}


function sample(array) {
    return array[Math.floor(Math.random() * (array.length))];
}

/*
abandonné car + complexe et peu performant

V2 = {
    voc: vocV2,

    search: function (word) {

        if (this.voc[word[0]])
            for (const v of this.voc[word[0]])
                if (v.word === word) return v

        for (const v of this.voc.other) {
            if (v.word === word || v.reading === word) return v
        }

        throw new NotFoundError('In function V2.search () : ' + word + ' was not found.')

        // regardez dans le tableau correspondant à la premiere lettre: this.voc[word[0]]
        // si pas trouvé:
        //  regardez dans la catégorie autre: this.voc.other
        //    si pas trouvé:
        //      lever une exception
    }
}
*/
