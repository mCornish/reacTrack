var PageView = require('./base');
var templates = require('../templates');
var GiftView = require('../views/gift');


module.exports = PageView.extend({
    pageTitle: 'Gifts',
    template: templates.pages.gifts,
    render: function () {
        this.renderWithTemplate();
        this.renderCollection(this.collection, GiftView, this.queryByHook('gift-list'));
        if (!this.collection.length) {
            this.collection.fetch();
        }
    }
});
