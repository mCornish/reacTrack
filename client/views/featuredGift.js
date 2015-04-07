var View = require('ampersand-view');
var templates = require('../templates');

var Firebase = require('firebase');
var ref = new Firebase('sizzling-fire-6725.firebaseIO.com');
var usersRef = new Firebase('sizzling-fire-6725.firebaseIO.com/YGMYG/users');


module.exports = View.extend({
    template: templates.includes.featuredGift,
    bindings: {
        'model.title': {
            hook: 'title'
        },
        'model.image': {
            type: 'attribute',
            hook: 'image',
            name: 'src'
        },
        'model.viewUrl': {
            type: 'attribute',
            hook: 'view',
            name: 'href'
        },
        'model.username': {
            hook: 'user'
        },
        'model.time': {
            hook: 'time-passed'
        },
        'model.wantButtonText': {
            hook: 'wantButton'
        },
        'model.wantText': {
            hook: 'wants'
        }
    },
    events: {
        'click [data-hook~=action-want]': 'toggleWant',
    },
    render: function() {
        this.renderWithTemplate();
    },
    wantOnText: 'You want this',
    wantOffText: 'Want',
    toggleWant: function(e) {
        var gift = this.model;
        var user = app.users.get(me.id);

        if (user.wants.indexOf(gift.id) < 0) {

            this.queryByHook('wantButton').innerHTML = this.wantOnText;

            // Add 1 to gift.wants
            var data = {
                id: gift.id,
                wants: gift.wants + 1
            };
            // Update gift model and save to database
            gift.save(data, {
                wait: true
            });

            // Add giftID to user.wants
            me.wants.push(gift.id);

            // Update user in database
            usersRef.child(me.id).child('wants').set(me.wants, function(error) {
                if (error) {
                    alert.log('Error: ' + error);
                }
            });

        } else {

            this.queryByHook('wantButton').innerHTML = this.wantOffText;

            // Remove 1 from gift.wants
            var data = {
                id: gift.id,
                wants: gift.wants - 1
            };
            // Update gift model and save to database
            gift.save(data, {
                wait: true
            });

            // Get index of giftID in user.want and remove it
            var index = me.wants.indexOf(gift.id);
            me.wants.splice(index, 1);

            // Update user in database
            usersRef.child(me.id).child('wants').set(me.wants, function(error) {
                if (error) {
                    alert.log('Error: ' + error);
                }
            });

        }
    }
});
