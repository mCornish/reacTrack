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
        var id = 'simplelogin:' + spec.id;

        app.users.getOrFetch(id, {all: true}, function (err, model) {
            if (err) alert('couldnt find a model with id: ' + id);
            self.model = model;
        });
    }
});
