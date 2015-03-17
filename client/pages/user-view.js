/*global app, alert*/
var PageView = require('./base');
var templates = require('../templates');


module.exports = PageView.extend({
    pageTitle: 'Profile',
    template: templates.pages.userView,
    bindings: {
        'model.username': {
            hook: 'name'
        }
    },
    initialize: function (spec) {
        var self = this;
        var _id = spec.id;

        app.users.getOrFetch(_id, {all: true}, function (err, model) {
            if (err) alert('Couldn\'t find a model with id: ' + _id);
            self.model = model;
        });
    }
});
