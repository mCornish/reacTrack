var PageView = require('./base');
var templates = require('../templates');
var LoginForm = require('../forms/login');
var Firebase = require('firebase');
var ref = new Firebase('sizzling-fire-6725.firebaseIO.com');
var flash = require('connect-flash');


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

                        $.ajax({
                            url: '/users',
                            data: data,
                            method: 'POST',
                            success: function(data) {
                                console.log('Data: ' + data);
                            }
                        });

                        // ref.authWithPassword(data, function(error, authData) {
                        //     if (error) {
                        //         console.log('Login failed: ' + error);
                        //     } else {
                        //
                        //         me.id = authData.uid;
                        //         me.username = authData.password.email.replace(/@.*/, '');
                        //         me.provider = authData.provider;
                        //         me.email = authData.password.email;
                        //
                        //         if (!app.users.getOrFetch(authData.uid)) {
                        //             var user = {
                        //                 id: authData.uid,
                        //                 username: authData.password.email.replace(/@.*/, ''),
                        //                 provider: authData.provider,
                        //                 email: authData.password.email
                        //             }
                        //
                        //             app.users.create(user, {
                        //                 wait: true,
                        //                 success: function (collection, res) {
                        //
                        //                     app.navigate('/user/' + res.id.replace('simplelogin:', ''));
                        //                     app.users.fetch();
                        //                 }
                        //             });
                        //         } else {
                        //             app.navigate('/user/' + authData.uid.replace('simplelogin:', ''));
                        //         }
                        //     }
                        // });
                    }
                });
            }
        }
    }
});


function getName(authData) {
    switch(authData.provider) {
     case 'password':
       return authData.password.email.replace(/@.*/, '');
     case 'twitter':
       return authData.twitter.displayName;
     case 'facebook':
       return authData.facebook.displayName;
  }
}
