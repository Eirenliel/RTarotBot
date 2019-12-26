const cardsMajor = ['ar00', 'ar01', 'ar02', 'ar03', 'ar04', 'ar05', 'ar06', 'ar07', 'ar08', 'ar09',
    'ar10', 'ar11', 'ar12', 'ar13', 'ar14', 'ar15', 'ar16', 'ar17', 'ar18', 'ar19',
    'ar20', 'ar21'];
const cardsMinor = ['cu02', 'cu03', 'cu04', 'cu05', 'cu06', 'cu07', 'cu08', 'cu09', 'cuac', 'cuki', 'cukn', 'cupa', 'cuqu',
    'pe02', 'pe03', 'pe04', 'pe05', 'pe06', 'pe07', 'pe08', 'pe09', 'peac', 'peki', 'pekn', 'pepa', 'pequ',
    'sw02', 'sw03', 'sw04', 'sw05', 'sw06', 'sw07', 'sw08', 'sw09', 'swac', 'swki', 'swkn', 'swpa', 'swqu',
    'wa02', 'wa03', 'wa04', 'wa05', 'wa06', 'wa07', 'wa08', 'wa09', 'waac', 'waki', 'wakn', 'wapa', 'waqu'];
const cards = cardsMajor.concat(cardsMinor);

const packs = {
    pcs1909: {
        cards: require('./packs/pack.base.js')('pcs1909', 'jpg'),
        name: 'Pamela Coleman Smith, 1909'
    }
};
const defaultPack = 'pcs1909';

module.exports = {
    cards: cards,
    cardsMajor: cardsMajor,
    cardsMinor: cardsMinor,
    packs: packs,
    defaultPack: packs[defaultPack],
    randomCard: (pack) => {
        let card = cards[Math.floor(Math.random() * (cards.length))];
        return pack.cards[card];
    },
    randomMinor: (pack) => {
        let card = cardsMinor[Math.floor(Math.random() * (cardsMinor.length))];
        return pack.cards[card];
    },
    randomMajor: (pack) => {
        let card = cardsMajor[Math.floor(Math.random() * (cardsMajor.length))];
        return pack.cards[card];
    },
};
