var PageView = require('./base');
var templates = require('../templates');
var TrackView = require('../views/track');


module.exports = PageView.extend({
    pageTitle: 'Tracks',
    template: templates.pages.tracks,
    render: function () {
        this.renderWithTemplate();
        this.renderCollection(this.collection, TrackView, this.queryByHook('track-list'));
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
