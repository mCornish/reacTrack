var PageView = require('./base');
var templates = require('../templates');
var LoginForm = require('../forms/login');
var PasswordResetForm = require('../forms/password-reset');

var flash = require('connect-flash');

var Firebase = require('firebase');
var ref = new Firebase('sizzling-fire-6725.firebaseIO.com');


module.exports = PageView.extend({
    pageTitle: 'Login',
    template: templates.pages.login,
    events: {
        'click [data-hook="password-reset"]': 'showResetForm',
        'click [data-hook="reset-cancel"]': 'hideResetForm'
    },
    subviews: {
        loginForm: {
            // this is the css selector that will be the `el` in the
            // prepareView function.
            container: '.login-form',
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
                                console.log('Login failed: ' + error);
                            } else {
                                console.log(authData);
                                app.navigate(document.referrer);
                            }
                        });
                    }
                });
            }
        },
        resetForm: {
            // this is the css selector that will be the `el` in the
            // prepareView function.
            container: '.reset-form',
            // this says we'll wait for `this.model` to be truthy
            waitFor: 'model',
            prepareView: function (el) {
                var self = this;
                var model = this.model;
                return new PasswordResetForm({
                    el: el,
                    model: this.model,
                    submitCallback: function (data) {

                        resetPassword(data, self);

                    }
                });
            }
        }
    },
    showResetForm: function() {
        this.queryByHook('password-reset').style.display = 'none';
        this.queryByHook('reset-form').style.display = 'block';
    },
    hideResetForm: function() {
        this.queryByHook('password-reset').style.display = 'inline-block';
        this.queryByHook('reset-form').style.display = 'none';
    }
});


var getName = function(authData) {
    switch(authData.provider) {
     case 'password':
       return authData.password.email.replace(/@.*/, '');
     case 'twitter':
       return authData.twitter.displayName;
     case 'facebook':
       return authData.facebook.displayName;
  }
};

var resetPassword = function(data, self) {
    ref.resetPassword({
        email: data.email
    }, function(error) {
        if (error === null) {
            alert('Password reset email sent successfully');
            self.queryByHook('password-reset').style.display = 'inline-block';
            self.queryByHook('reset-form').style.display = 'none';
        } else {
            alert('Error sending password reset email: ' + error)
        }
    })
};
