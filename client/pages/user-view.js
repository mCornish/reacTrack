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


module.exports = PageView.extend({
    pageTitle: 'Profile',
    template: templates.pages.userView,
    bindings: {
        'model.derivedUsername': {
            hook: 'name'
        },
        'model.image': {
            type: 'attribute',
            hook: 'image',
            name: 'src'
        },
    },
    initialize: function (spec) {
        var self = this;
        var _id = spec.id;

        app.users.getOrFetch(_id, {all: true}, function (err, model) {
            if (err) alert('Couldn\'t find a model with id: ' + _id);
            self.model = model;
        });

        // Make sure users and gifs are ready for rendering wants
        app.users.fetch({
            success: function() {
                app.gifts.fetch({
                    success: function() {
                        self.render();
                    }
                });
            }
        });
    },
    render: function() {
        this.renderWithTemplate();
        var wants = [];
        me.wants.forEach(function(giftID) {
            wants.push(app.gifts.get(giftID));
        });
        var wantsCollection = new AmpersandCollection(wants, {
            model: Gift
        });

        this.renderCollection(wantsCollection, GiftView, this.queryByHook('gift-list'), {
            reverse: true
        });
    }
});
