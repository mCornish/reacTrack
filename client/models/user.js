var AmpersandModel = require('ampersand-model');
var bcrypt = require('bcrypt-nodejs');
var auth = require('../helpers/auth');


module.exports = AmpersandModel.extend({
    type: 'user',
    props: {
        id: ['any'],
        email: ['string', true],
        provider: ['string', true],
        username: ['string', false]
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
