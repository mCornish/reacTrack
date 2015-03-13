/*global app, alert*/
var PageView = require('./base');
var templates = require('../templates');
var PostForm = require('../forms/post');


module.exports = PageView.extend({
    pageTitle: 'edit person',
    template: templates.pages.postEdit,
    initialize: function (spec) {
        var self = this;
        app.blog.getOrFetch(spec.id, {all: true}, function (err, model) {
            if (err) alert('couldnt find a model with id: ' + spec.id);
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
                return new PostForm({
                    el: el,
                    model: this.model,
                    submitCallback: function (data) {
                        app.blog.save(data, {
                            wait: true,
                            success: function (collection, res) {
                                app.navigate('/posts/' + res.id);
                            }
                        });
                    }
                });
            }
        }
    }
});
