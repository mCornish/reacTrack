var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    props: {
        id: ['any', true, null],
        track: ['any', true, null],
        posed: ['date', true, 'Date'],
        author: ['string', true, 'Author'],
        text: ['string', true, 'Text here!'],
        time: ['number', true, 0],
    }
});
