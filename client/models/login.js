var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    props: {
        email: ['string', true, ''],
        password: ['string', true, '']
    }
});
