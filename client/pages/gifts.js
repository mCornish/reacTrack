var PageView = require('./base');
var templates = require('../templates');
var GiftView = require('../views/gift');

var auth = require('../helpers/auth');


module.exports = PageView.extend({
    pageTitle: 'Gifts',
    template: templates.pages.gifts,
    events: {
        'click [data-hook~=female]': 'filterFemale',
        'click [data-hook~=male]': 'filterMale',
        'click [data-hook~=birthday]': 'filterBirthday',
        'click [data-hook~=christmas]': 'filterChristmas'
    },
    render: function() {
        this.renderWithTemplate();
        this.renderCollection(this.collection, GiftView, this.queryByHook('gift-list'), {
            reverse: true
        });
        if (!this.collection.length) {
            this.collection.fetch();
        }
    },
    filterFemale: function() {
        $('[data-hook="gift-list"]').empty();
        this.renderCollection(this.collection, GiftView, this.queryByHook('gift-list'), {
            filter: function(gift) {
                return gift.recipient === 'Mom' || gift.recipient === 'Sister' || gift.recipient === 'Daughter';
            },
            reverse: true
        });
    },
    filterMale: function() {
        $('[data-hook="gift-list"]').empty();
        this.renderCollection(this.collection, GiftView, this.queryByHook('gift-list'), {
            filter: function(gift) {
                return gift.recipient === 'Dad' || gift.recipient === 'Brother' || gift.recipient === 'Son';
            }
        });
    },
    filterBirthday: function() {
        $('[data-hook="gift-list"]').empty();
        this.renderCollection(this.collection, GiftView, this.queryByHook('gift-list'), {
            filter: function(gift) {
                return gift.occasion === 'Birthday';
            }
        });
    },
    filterChristmas: function() {
        $('[data-hook="gift-list"]').empty();
        this.renderCollection(this.collection, GiftView, this.queryByHook('gift-list'), {
            filter: function(gift) {
                return gift.occasion === 'Christmas';
            }
        });
    }
});
