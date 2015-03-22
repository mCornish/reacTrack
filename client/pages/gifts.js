var PageView = require('./base');
var templates = require('../templates');
var GiftView = require('../views/gift');


module.exports = PageView.extend({
    pageTitle: 'Gifts',
    template: templates.pages.gifts,
    events: {
        'click [data-hook~=female]': 'filterFemale',
    },
    render: function() {
        this.renderWithTemplate();
        this.renderCollection(this.collection, GiftView, this.queryByHook('gift-list'));
        if (!this.collection.length) {
            this.collection.fetch();
        }
    },
    filterFemale: function() {
        this.renderWithTemplate();
        this.renderCollection(this.collection, GiftView, this.queryByHook('gift-list'), {
            filter: function(gift) {
                return gift.recipient === 'Mom' || gift.recipient === 'Sister' || gift.recipient === 'Daughter';
            }
        });
    }
});
