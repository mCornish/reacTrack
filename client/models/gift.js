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
        male: ['boolean'],
        recipient: ['string'],
        occasion: ['string'],
        created: ['date', true, Date.now()],
        upvotes: ['number', true, 0],
        downvotes: ['number', true, 0]
    },
    derived: {
        viewUrl: {
            deps: ['id'],
            fn: function () {
                return '/gift/' + this.id;
            }
        },
        editUrl: {
            deps: ['id'],
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

                var user = app.users.get(this.user_id);
                if(user) {
                    return user.toJSON();
                }
            }
        },
        username: {
            deps: ['user_id'],
            fn: function () {
                if (this.user) return this.user.username;
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
