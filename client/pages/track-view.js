/*global app, alert*/
var PageView = require('./base');
var templates = require('../templates');


module.exports = PageView.extend({
    pageTitle: 'Track',
    template: templates.pages.trackView,
    bindings: {
        'model.name': {
            hook: 'name'
        },
        'model.length': {
            hook: 'length',
        },
        'model.editUrl': {
            type: 'attribute',
            hook: 'edit',
            name: 'href'
        }
    },
    initialize: function (spec) {
        var self = this;
        app.tracks.getOrFetch(spec.id, {all: true}, function (err, model) {
            if (err) alert('couldnt find a model with slug: ' + spec.id);
            self.model = model;
        });
    }
});
