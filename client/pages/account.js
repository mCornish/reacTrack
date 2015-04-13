/*global app, alert*/
var PageView = require('./base');
var templates = require('../templates');
var EmailChangeForm = require('../forms/email-change');
var PasswordChangeForm = require('../forms/password-change');

var Firebase = require('firebase');
var ref = new Firebase('sizzling-fire-6725.firebaseIO.com');


module.exports = PageView.extend({
    pageTitle: 'Edit User',
    template: templates.pages.account,
    bindings: {
        'model.email': {
            hook: 'email'
        },
        'model.image': {
            type: 'attribute',
            hook: 'image',
            name: 'src'
        },
    },
    events: {
        'click [data-hook=email-change]': 'showEmailForm',
        'click [data-hook=password-change]': 'showPasswordForm',
        'click [data-hook=email-cancel]': 'hideEmailForm',
        'click [data-hook=password-cancel]': 'hidePasswordForm'
    },
    initialize: function (spec) {
        var self = this;
        app.users.getOrFetch(spec.id, {all: true}, function (err, model) {
            if (err) alert('Couldn\'t find a model with id: ' + spec.id);
            self.model = model;
        });
    },
    subviews: {
        emailForm: {
            // this is the css selector that will be the `el` in the
            // prepareView function.
            container: '.email-form',
            // this says we'll wait for `this.model` to be truthy
            waitFor: 'model',
            prepareView: function (el) {
                var self = this;
                var model = this.model;

                return new EmailChangeForm({
                    el: el,
                    model: this.model,
                    submitCallback: function (data) {

                        changeEmail(data, self);

                    }
                });
            }
        },
        passwordForm: {
            // this is the css selector that will be the `el` in the
            // prepareView function.
            container: '.password-form',
            // this says we'll wait for `this.model` to be truthy
            waitFor: 'model',
            prepareView: function (el) {
                var self = this;
                var model = this.model;
                
                return new PasswordChangeForm({
                    el: el,
                    model: this.model,
                    submitCallback: function (data) {

                        changePassword(data, self);

                    }
                });
            }
        }
    },
    showEmailForm: function() {
        this.queryByHook('email-wrapper').style.display = 'none';
        this.queryByHook('email-form').style.display = 'block';
    },
    showPasswordForm: function() {
        this.queryByHook('password-change').style.display = 'none';
        this.queryByHook('password-form').style.display = 'block';
    },
    hideEmailForm: function() {
        this.queryByHook('email-wrapper').style.display = 'block';
        this.queryByHook('email-form').style.display = 'none';
    },
    hidePasswordForm: function() {
        this.queryByHook('password-change').style.display = 'block';
        this.queryByHook('password-form').style.display = 'none';
    }
});


var changeEmail = function(data, self) {
    ref.changeEmail({
        oldEmail: me.email,
        newEmail: data.email,
        password: data.password
    }, function(error) {
        if (error === null) {
            alert("Email changed successfully");
            self.queryByHook('email-wrapper').style.display = 'block';
            self.queryByHook('email-form').style.display = 'none';
        } else {
            alert("Error changing email: " + error);
        }
    });
};

var changePassword = function(data, self) {
    ref.changePassword({
        email: me.email,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
    }, function(error) {
        if (error === null) {
            alert("Password changed successfully");
            self.queryByHook('password-change').style.display = 'block';
            self.queryByHook('password-form').style.display = 'none';
        } else {
            alert("Error changing password: " + error);
        }
    });
}
