var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    type: 'user',
    props: {
        id: ['string'],
        email: ['string', true, ''],
        username: ['string', false, '']
    },
    derived: {
        auth: {
            fn: function() {
                return;
            }
        }
    }
});
