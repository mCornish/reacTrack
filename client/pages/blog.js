var PageView = require('./base');
var templates = require('../templates');
var PostView = require('../views/post');


module.exports = PageView.extend({
    pageTitle: 'Blog',
    template: templates.pages.blog,
    render: function () {
        this.renderWithTemplate();
        this.renderCollection(this.collection, PostView, this.queryByHook('post-list'));
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
