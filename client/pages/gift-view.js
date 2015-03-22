/*global app, alert*/
var PageView = require('./base');
var templates = require('../templates');


module.exports = PageView.extend({
    pageTitle: 'Gift',
    template: templates.pages.giftView,
    bindings: {
        'model.title': {
            hook: 'title'
        },
        'model.image': {
            type: 'attribute',
            hook: 'image',
            name: 'src'
        },
        'model.username': {
            hook: 'user'
        },
        'model.time': {
            hook: 'time-passed'
        },
        'model.description': {
            hook: 'description'
        }
    },
    initialize: function (spec) {
        var self = this;
        app.gifts.getOrFetch(spec.id, {all: true}, function (err, model) {
            if (err) alert('couldnt find a model with id: ' + spec.id);
            self.model = model;
        });
    }
});
