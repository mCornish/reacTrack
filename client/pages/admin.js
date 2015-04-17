/*global app, alert*/
var AmpersandCollection = require('ampersand-collection');

var PageView = require('./base');
var templates = require('../templates');
var UserListView = require('../views/userList')
var Gift = require('../models/gift');
var GiftListView = require('../views/giftList')

var Firebase = require('firebase');
var ref = new Firebase('sizzling-fire-6725.firebaseIO.com');

var sort = '';
var reverse = false;


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

        checkReverse('title');

        if (reverse === true) {
            sortTable(this, function(gifts) {
                gifts.sort(function(a, b) {
                    if (a.title < b.title) {
                        return 1;
                    }
                    if (a.title > b.title) {
                        return -1;
                    }
                    return 0;
                });
            });

            hideArrows(this);
            this.query('[data-hook="header-title"] .arrow-up').style.display = 'inline-block';
        } else {
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

            hideArrows(this);
            this.query('[data-hook="header-title"] .arrow-down').style.display = 'inline-block';
        }

        sort = 'title';

    },
    sortByUser: function() {

        checkReverse('user');

        if (reverse === true) {
            sortTable(this, function(gifts) {
                gifts.sort(function(a, b) {
                    if (a.user < b.user) {
                        return 1;
                    }
                    if (a.user > b.user) {
                        return -1;
                    }
                    return 0;
                });
            });

            hideArrows(this);
            this.query('[data-hook="header-user"] .arrow-up').style.display = 'inline-block';
        } else {
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

            hideArrows(this);
            this.query('[data-hook="header-user"] .arrow-down').style.display = 'inline-block';
        }

        sort = 'user';

    },
    sortByCreated: function() {

        checkReverse('created');

        if (reverse === true) {

            sortTable(this, function(gifts) {
                gifts.sort(function(a, b) {
                    return a.created - b.created;
                });
            });

            hideArrows(this);
            this.query('[data-hook="header-created"] .arrow-up').style.display = 'inline-block';

        } else {

            sortTable(this, function(gifts) {
                gifts.sort(function(a, b) {
                    return b.created - a.created;
                });
            });

            hideArrows(this);
            this.query('[data-hook="header-created"] .arrow-down').style.display = 'inline-block';

        }

        sort = 'created';
    },
    sortByFeatured: function() {

        checkReverse('featured');

        if (reverse === true) {

            sortTable(this, function(gifts) {
                gifts.sort(function(a, b) {
                    return a.featured - b.featured;
                });
            });

            hideArrows(this);
            this.query('[data-hook="header-featured"] .arrow-up').style.display = 'inline-block';

        } else {

            sortTable(this, function(gifts) {
                gifts.sort(function(a, b) {
                    return b.featured - a.featured;
                });
            });

            hideArrows(this);
            this.query('[data-hook="header-featured"] .arrow-down').style.display = 'inline-block';

        }

        sort = 'featured';
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
};

var sortTable = function(self, sortFunction) {
    self.queryByHook('table-view').innerHTML = '';

    var gifts = app.gifts.toJSON();

    sortFunction(gifts);

    var giftsCollection = new AmpersandCollection(gifts, {
        model: Gift
    });

    self.renderCollection(giftsCollection, GiftListView, self.queryByHook('table-view'));
};

var checkReverse = function(header) {
    if (sort === header) {
        reverse = !reverse;
    } else {
        reverse = false;
    }
};

var hideArrows = function(self) {
    self.queryAll('.arrow-down').forEach(function(arrow) {
        arrow.style.display = 'none';
    });

    self.queryAll('.arrow-up').forEach(function(arrow) {
        arrow.style.display = 'none';
    });
};
