/*global app, alert*/
var AmpersandCollection = require('ampersand-collection');

var PageView = require('./base');
var templates = require('../templates');
var UserListView = require('../views/userList')
var Gift = require('../models/gift');
var GiftListView = require('../views/giftList')

var Firebase = require('firebase');
var ref = new Firebase('sizzling-fire-6725.firebaseIO.com');


module.exports = PageView.extend({
    pageTitle: 'Admin Dashboard',
    template: templates.pages.admin,
    events: {
        'click [data-hook=users-button]': 'displayUsers',
        'click [data-hook=gifts-button]': 'displayGifts',
        'click [data-hook="header-title"]': 'sortByTitle',
        'click [data-hook="header-user"]': 'sortByUser',
        'click [data-hook="header-created"]': 'sortByCreated',
        'click [data-hook="header-featured"]': 'sortByFeatured'
    },
    displayUsers: function() {
        $('thead').hide();
        this.queryByHook('users-head').style.display = 'table-header-group';

        this.queryByHook('table-view').innerHTML = '';
        this.renderCollection(app.users, UserListView, this.queryByHook('table-view'), {
            reverse: true
        });
    },
    displayGifts: function() {
        var self = this;

        $('thead').hide();
        this.queryByHook('gifts-head').style.display = 'table-header-group';
        this.queryByHook('table-view').innerHTML = '';

        getOrFetchCollection(app.gifts, function() {
            self.renderCollection(app.gifts, GiftListView, self.queryByHook('table-view'), {
                reverse: true
            });
        });

    },
    sortByTitle: function() {

        sortTable(this, function(gifts) {
            gifts.sort(function(a, b) {
                if (a.title > b.title) {
                    return 1;
                }
                if (a.title < b.title) {
                    return -1;
                }
                return 0;
            });
        });

    },
    sortByUser: function() {

        sortTable(this, function(gifts) {
            gifts.sort(function(a, b) {
                if (a.user > b.user) {
                    return 1;
                }
                if (a.user < b.user) {
                    return -1;
                }
                return 0;
            });
        });

    },
    sortByCreated: function() {

        sortTable(this, function(gifts) {
            gifts.sort(function(a, b) {
                return b.created - a.created;
            });
        });

    },
    sortByFeatured: function() {

        sortTable(this, function(gifts) {
            gifts.sort(function(a, b) {
                return b.featured - a.featured;
            });
        });

    }
});


var getOrFetchCollection = function(collection, callback) {
    if(collection.length <= 0) {
        collection.fetch({
            success: callback()
        });
    } else {
        callback();
    }
}

var sortTable = function(self, sortFunction) {
    self.queryByHook('table-view').innerHTML = '';

    var gifts = app.gifts.toJSON();

    sortFunction(gifts);

    var giftsCollection = new AmpersandCollection(gifts, {
        model: Gift
    });

    self.renderCollection(giftsCollection, GiftListView, self.queryByHook('table-view'));
}
