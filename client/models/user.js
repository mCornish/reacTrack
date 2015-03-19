var AmpersandModel = require('ampersand-model');
var bcrypt = require('bcrypt-nodejs');


module.exports = AmpersandModel.extend({
    type: 'user',
    props: {
        _id: ['any'],
        email: ['string', true],
        password: ['string', true],
        username: ['string', true]
    },
    derived: {
        hashedPassword: {
            deps: ['password'],
            fn: function () {
                return bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
            }
        },
        viewUrl: {
            deps: ['_id'],
            fn: function () {
                return '/user/' + this._id;
            }
        }
    }
});
