/*global app, alert*/
var PageView = require('./base');
var templates = require('../templates');
var UserEditForm = require('../forms/user-edit');


module.exports = PageView.extend({
    pageTitle: 'Edit User',
    template: templates.pages.userEdit,
    events: {
        'click [data-hook=cancel-button]': 'cancel'
    },
    initialize: function (spec) {
        var self = this;
        app.users.getOrFetch(spec.id, {all: true}, function (err, model) {
            if (err) alert('Couldn\'t find a model with id: ' + spec.id);
            self.model = model;
        });
    },
    subviews: {
        form: {
            // this is the css selector that will be the `el` in the
            // prepareView function.
            container: 'form',
            // this says we'll wait for `this.model` to be truthy
            waitFor: 'model',
            prepareView: function (el) {
                var model = this.model;
                return new UserEditForm({
                    el: el,
                    model: this.model,
                    submitCallback: function (data) {
                        model.save(data, {
                            wait: true,
                            success: function (collection, res) {
                                app.navigate('/user/' + res.id);
                            }
                        });
                    }
                });
            }
        }
    },
    cancel: function() {
        app.navigate('/user/' + me.id);
    }
});
