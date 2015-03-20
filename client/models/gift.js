var AmpersandModel = require('ampersand-model');
var moment = require('moment');


module.exports = AmpersandModel.extend({
    props: {
        id: 'any',
        user_id: 'any',
        title: ['string', true, 'Title'],
        image: ['string', true, 'Image'],
        description: ['string', false, 'Description'],
        link: ['string', false, ''],
        categories: ['array'],
        created: ['date', true, Date.now()],
        upvotes: ['number', true, 0],
        downvotes: ['number', true, 0]
    },
    derived: {
        viewUrl: {
            deps: ['_id'],
            fn: function () {
                return '/gift/' + this.id;
            }
        },
        editUrl: {
            deps: ['_id'],
            fn: function () {
                return '/gift/' + this.id + '/edit';
            }
        },
        time: {
            deps: ['date'],
            fn: function () {
                return moment(this.created).fromNow();
            }
        },
        user: {
            deps: ['user_id'],
            fn: function () {
                app.users.getOrFetch(this.user_id, {all: true}, function (err, user) {
                    if (err) console.log('Couldn\'t find a user with id: ' + this.user_id);
                    return user;
                });
            }
        },
        username: {
            deps: ['user_id'],
            fn: function () {
                return this.user.username;
            }
        },
        userUrl: {
            deps: ['user_id'],
            fn: function () {
                return '/user/' + this.user_id;
            }
        }
    }
});
