const mongoose = require('mongoose');



const countrySchema = new mongoose.Schema({
	alpha2Code: String,
    alpha3Code: String,
    altSpellings: [ String ],
    area: Number,
    borders: [ String ],
    callingCodes: [],
    capital: String,
    cioc: String,
    currencies: {
        type: [
            { code: String, name: String, symbol: String }
        ]
    },
    demonym: String,
    flag: String,
    flags: {
        type: {
            png: String,
            svg: String
        }
    },
    independent: Boolean,
    languages: {
        type: [
            { iso639_1: String, iso639_2: String, name: String, nativeName: String }
        ]
    },
    latlng: [ Number ],
    name: { type: String, required: true },
    nativeName: String,
    numericCode: String,
    population: Number,
    region: String,
    regionalBlocs: {
        type: [
            { acronym: String, name: String }
        ]
    },
    subregion: String,
    timezones: [ String ],
    topLevelDomain: [ String ],
    translations: {
        type: {
            br: String,
            de: String,
            es: String,
            fa: String,
            fr: String,
            hr: String,
            hu: String,
            it: String,
            ja: String,
            nl: String,
            pt: String
        }
    }
	
});

module.exports = mongoose.model('Country', countrySchema);
