var PageView = require('./base');
var templates = require('../templates');
var postEditable = require('../views/postEditable');


module.exports = PageView.extend({
    pageTitle: 'All Posts',
    template: templates.pages.allPosts,
    render: function () {
        this.renderWithTemplate();
        this.renderCollection(this.collection, postEditable, this.queryByHook('post-list'));
        if (!this.collection.length) {
            this.collection.fetch();
        }
    }
});
