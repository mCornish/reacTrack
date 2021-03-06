var AmpersandModel = require('ampersand-model');
var moment = require('moment');


module.exports = AmpersandModel.extend({
    urlRoot: function() {
        return '/gifts';
    },
    props: {
        id: 'any',
        user_id: 'any',
        title: ['string', true, 'Title'],
        created: ['date', true, Date.now()],
        image: ['any', true, 'http://crowisland36pto.org/wp-content/uploads/gift_box_blue.png'],
        description: ['string', false, 'Description'],
        link: ['string', false, ''],
        recipient: ['string'],
        age: ['number'],
        price: ['number'],
        occasion: ['string'],
        wants: ['number', true, 0],
        featured: ['boolean', true, false]
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
            deps: ['created'],
            fn: function () {
                return moment(this.created).fromNow();
            }
        },
        date: {
            deps: ['created'],
            fn: function () {
                return moment(this.created).format('MMM DD, YYYY');
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
        },
        gender: {
            deps: ['recipient'],
            fn: function () {

                var category = app.categories.get(this.recipient);
                return category.gender;
            }
        },
        wantButtonText: {
            fn: function() {
                if (me.wants.indexOf(this.id) < 0) {
                    return 'Want';
                } else {
                    return 'You want this';
                }
            }
        },
        wantText: {
            deps: ['wants'],
            fn: function () {
                return this.wants + ' people want this gift';
            }
        }

    }
});
