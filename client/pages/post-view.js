/*global app, alert*/
var PageView = require('./base');
var templates = require('../templates');


module.exports = PageView.extend({
    pageTitle: 'Track',
    template: templates.pages.postView,
    bindings: {
        'model.created': {
            hook: 'date'
        },
        'model.title': {
            hook: 'title'
        },
        'model.content': {
            hook: 'content',
        },
        'model.editUrl': {
            type: 'attribute',
            hook: 'edit',
            name: 'href'
        }
    },
    initialize: function (spec) {
        var self = this;
        console.log('init');
        app.blog.fetch(spec.id, {all: true}, function (err, model) {
            if (err) alert('couldnt find a model with id: ' + spec.id);
            console.log(model);
            self.model = model;
        });
    }
});
