/*global app*/
var PageView = require('./base');
var templates = require('../templates');
var UserForm = require('../forms/user');
var Firebase = require('firebase');
var ref = new Firebase('sizzling-fire-6725.firebaseIO.com');
var usersRef = new Firebase('sizzling-fire-6725.firebaseIO.com/YGMYG/users');


module.exports = PageView.extend({
    pageTitle: 'Register',
    template: templates.pages.userAdd,
    subviews: {
        form: {
            container: 'form',
            prepareView: function (el) {
                return new UserForm({
                    el: el,
                    submitCallback: function (user) {

                        app.users.create(user, {
                            wait: true,
                            success: function (collection, res) {

                                app.navigate('/user/' + res._id);
                                app.users.fetch();
                            }
                        });

                        // ref.createUser(data, function(error, userData) {
                        //     if (error) {
                        //         console.log('Error creating user: ' + error);
                        //     } else {
                        //
                        //         ref.authWithPassword(data, function(error, authData) {
                        //             if (error) {
                        //                 console.log('Login failed: ' + error);
                        //             } else {
                        //
                        //                 me.id = authData.uid.replace('simplelogin:', '');
                        //                 me.username = authData.password.email.replace(/@.*/, '');
                        //                 me.provider = authData.provider;
                        //                 me.email = authData.password.email;
                        //
                        //                 var user = {
                        //                     id: authData.uid.replace('simplelogin:', ''),
                        //                     username: authData.password.email.replace(/@.*/, ''),
                        //                     provider: authData.provider,
                        //                     email: authData.password.email
                        //                 }
                        //
                        //                 app.users.create(user, {
                        //                     wait: true,
                        //                     success: function (collection, res) {
                        //
                        //                         app.navigate('/user/' + res.id);
                        //                         app.users.fetch();
                        //                     }
                        //                 });
                        //             }
                        //         });
                        //
                        //     }
                        // });

                    }
                });
            }
        }
    }
});
