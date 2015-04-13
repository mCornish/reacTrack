var AmpersandModel = require('ampersand-model');
var auth = require('../helpers/auth');

module.exports = AmpersandModel.extend({
    type: 'user',
    props: {
        id: ['any'],
        email: ['string', false],
        provider: ['string', true],
        username: ['string', false],
        wants: ['array', true, function() {
            return [];
        }]
    },
    derived: {
        derivedUsername: {
            deps: ['id'],
            fn: function () {
                if (this.username) return this.username;
                else {
                    return auth.getUsername();
                }
            }
        },
        viewUrl: {
            deps: ['id'],
            fn: function () {
                return '/user/' + this.id;
            }
        }
    }
});
