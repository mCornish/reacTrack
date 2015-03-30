/*global app*/
var PageView = require('./base');
var templates = require('../templates');
var GiftForm = require('../forms/gift');
var Firebase = require('firebase');
var ref = new Firebase('sizzling-fire-6725.firebaseIO.com');
var postsRef = new Firebase('sizzling-fire-6725.firebaseIO.com/YGMYG/gifts');
var $ = require('jquery-browserify');


module.exports = PageView.extend({
    pageTitle: 'New Gift',
    template: templates.pages.giftAdd,
    subviews: {
        form: {
            container: 'form',
            prepareView: function (el) {
                return new GiftForm({
                    el: el,
                    submitCallback: function (data) {

                        data.user_id = me.id;
                        data.created = Date.now();

                        app.gifts.create(data, {
                            wait: true,
                            success: function (collection, res) {
                                app.navigate('/gift/' + res.id);
                            }
                        });
                    }
                });
            }
        }
    }
});
