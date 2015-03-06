/*global app, alert*/
var PageView = require('./base');
var templates = require('../templates');


module.exports = PageView.extend({
    pageTitle: 'Reaction',
    template: templates.pages.reactionView,
    bindings: {
        'model.trackName': {
            hook: 'track'
        },
        'model.text': {
            hook: 'text',
        },
        'model.author': {
            hook: 'author'
        }
    },
    initialize: function (spec) {
        var self = this;
        app.reactions.getOrFetch(spec.id, {all: true}, function (err, model) {
            if (err) alert('couldnt find a reaction with id: ' + spec.id);
            self.model = model;
        });
    }
});
