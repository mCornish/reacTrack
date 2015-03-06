var PageView = require('./base');
var templates = require('../templates');
var ReactionView = require('../views/reaction');


module.exports = PageView.extend({
    pageTitle: 'Reactions',
    template: templates.pages.reactions,
    render: function () {
        this.renderWithTemplate();
        this.renderCollection(this.collection, ReactionView, this.queryByHook('reaction-list'));
        if (!this.collection.length) {
            this.fetchCollection();
        }
    },
    fetchCollection: function () {
        this.collection.fetch();
        return false;
    },
    resetCollection: function () {
        this.collection.reset();
    }
});
