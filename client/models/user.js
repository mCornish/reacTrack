var AmpersandModel = require('ampersand-model');
var bcrypt = require('bcrypt');


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
            return bcrypt.hashSync(this.password, bcrpty.genSaltSync(8), null);
        },
        viewUrl: {
            deps: ['_id'],
            fn: function () {
                return '/user/' + this._id;
            }
        }
    }
});
