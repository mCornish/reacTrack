var AmpersandModel = require('ampersand-model');
var bcrypt = require('bcrypt-nodejs');
var auth = require('../helpers/auth');


module.exports = AmpersandModel.extend({
    type: 'user',
    props: {
        id: ['any'],
        email: ['string', true],
        provider: ['string', true],
        username: ['string', false],
        image: ['string', false],
        firstName: ['string', false],
        lastName: ['string', false],
        website: ['string', false],
        location: ['string', false],
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
        fullName: {
            deps: ['firstName', 'lastName'],
            fn: function () {
                return this.firstName + ' ' + this.lastName;
            }
        },
        viewUrl: {
            deps: ['id'],
            fn: function () {
                return '/user/' + this.id;
            }
        },
        editUrl: {
            deps: ['id'],
            fn: function () {
                return '/user/' + this.id + '/edit';
            }
        },
        websiteName: {
            deps: ['website'],
            fn: function () {
                return this.website.replace('http://www.', '').replace('https://www.', '');
            }
        }
    }
});
