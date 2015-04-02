var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    props: {
        id: 'any',
        name: ['string', true],
        type: ['string', true], // occasion or recipient
        gender: ['string', false],
        gifts: ['array', true, function() {
            return [];
        }]
    },
    derived: {
        giftsCount: {
            deps: ['gifts'],
            fn: function () {
                return this.gifts.length;
            }
        }
    }
});
