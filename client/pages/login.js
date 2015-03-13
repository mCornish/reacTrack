var PageView = require('./base');
var templates = require('../templates');
var LoginForm = require('../forms/login');
var Firebase = require('firebase');
var ref = new Firebase('sizzling-fire-6725.firebaseIO.com');
var $ = require('jquery-browserify');


module.exports = PageView.extend({
    pageTitle: 'Login',
    template: templates.pages.login,
    subviews: {
        form: {
            // this is the css selector that will be the `el` in the
            // prepareView function.
            container: 'form',
            // this says we'll wait for `this.model` to be truthy
            waitFor: 'model',
            prepareView: function (el) {
                var model = this.model;
                return new LoginForm({
                    el: el,
                    model: this.model,
                    submitCallback: function (data) {
                        ref.authWithPassword(data, function(error, authData) {
                            if (error) {
                                console.log("Login Failed: ", error);
                            } else {
                                app.navigate('/');
                            }
                        })
                    }
                });
            }
        }
    }
});
