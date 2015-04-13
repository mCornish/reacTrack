var AmpersandModel = require('ampersand-model');
var moment = require('moment');


module.exports = AmpersandModel.extend({
    urlRoot: function() {
        return '/comments';
    },
    props: {
        id: 'any',
        user_id: ['any', true],
        gift_id: ['any', true],
        created: ['date', true, Date.now()],
        content: ['string', true],
    },
    derived: {
        author: {
            deps: ['user_id'],
            fn: function () {
                var author = app.users.get(this.user_id);
                if(author) {
                    return author.toJSON().username;
                } else {
                    return 'Author';
                }
            }
        },
        authorUrl: {
            deps: ['user_id'],
            fn: function () {
                return '/users/' + this.user_id
            }
        },
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
