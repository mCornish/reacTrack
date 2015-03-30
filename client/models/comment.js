var AmpersandModel = require('ampersand-model');
var moment = require('moment');


module.exports = AmpersandModel.extend({
    props: {
        id: 'any',
        created: ['date', true, Date.now()],
        content: ['string', true],
        author: ['string', false]
    },
    derived: {
        time: {
            deps: ['created'],
            fn: function () {
                return moment(this.created).fromNow();
            }
        },
        viewUrl: {
            deps: ['id'],
            fn: function () {
                return '/comment/' + this.id;
            }
        }
    }
});
