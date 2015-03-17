var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    type: 'user',
    props: {
        _id: ['any'],
        user: ['string', false, ''],
        username: ['string', true, '']
    },
    derived: {
        viewUrl: {
            deps: ['_id'],
            fn: function () {
                return '/user/' + this._id;
            }
        }
    }
});
