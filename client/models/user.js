var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    type: 'user',
    props: {
        id: ['string'],
        username: ['string', true, ''],
        provider: ['string', true, ''],
        email: ['string', false, '']
    },
    derived: {
        viewUrl: {
            deps: ['id'],
            fn: function () {
                return '/user/' + this.id;
            }
        }
    }
});
