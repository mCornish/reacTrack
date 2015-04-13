/*global app, alert*/
var PageView = require('./base');
var templates = require('../templates');
var AmpersandCollection = require('ampersand-collection');
var Gift = require('../models/gift');
var GiftView = require('../views/gift');

var Firebase = require('firebase');
var ref = new Firebase('sizzling-fire-6725.firebaseIO.com');
var giftsRef = new Firebase('sizzling-fire-6725.firebaseIO.com/YGMYG/gifts');
var auth = require('../helpers/auth');

var user, id, self;

module.exports = PageView.extend({
    pageTitle: 'Profile',
    template: templates.pages.userView,
    bindings: {
        'model.derivedUsername': {
            hook: 'username'
        },
        'model.image': {
            type: 'attribute',
            hook: 'image',
            name: 'src'
        },
        'model.fullName': {
            hook: 'full-name'
        },
        'model.location': {
            hook: 'location'
        },
        'model.websiteName': {
            hook: 'website'
        },
        'model.website': {
            type: 'attribute',
            hook: 'website',
            name: 'href'
        }
    },
    initialize: function (spec) {
        self = this;
        id = spec.id;

        app.users.getOrFetch(id, {all: true}, function (err, model) {
            if (err) alert('Couldn\'t find a model with id: ' + id);
            self.model = model;
            user = model;
        });

        // Make sure users and gifs are ready for rendering wants
        app.users.fetch({
            success: function() {
                app.gifts.fetch({
                    success: function() {
                        self.renderWithTemplate();
                        var wants = [];
                        user.wants.forEach(function(giftID) {
                            wants.push(app.gifts.get(giftID));
                        });
                        var wantsCollection = new AmpersandCollection(wants, {
                            model: Gift
                        });

                        self.renderCollection(wantsCollection, GiftView, self.queryByHook('gift-list'), {
                            reverse: true
                        });

                        if(me.id === id) {
                            console.log(self.queryByHook('edit'));
                            self.queryByHook('edit').style.display = 'inline-block';
                        }
                    }
                });
            }
        });
    }
});
