/*global app*/
var PageView = require('./base');
var templates = require('../templates');
var GiftForm = require('../forms/gift');
var Firebase = require('firebase');
var ref = new Firebase('sizzling-fire-6725.firebaseIO.com');
var giftsRef = new Firebase('sizzling-fire-6725.firebaseIO.com/YGMYG/gifts');
var categoriesRef = new Firebase('sizzling-fire-6725.firebaseIO.com/YGMYG/categories');
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

                        var categories = app.categories.toJSON();
                        var newRecipient = false;
                        var newOccasion = false;
                        var recipientGifts = [];
                        var occasionGifts = [];

                        if (categories.length < 1) {
                            newRecipient = newOccasion = true;
                        } else {
                            categories.forEach(function(category) {
                                if (category !== data.recipient) {
                                    newRecipient = true;
                                }
                                if (category !== data.occasion) {
                                    newOccasion = true;
                                }
                            });
                        }

                        data.user_id = me.id;
                        data.created = Date.now();

                        app.gifts.create(data, {
                            wait: true,
                            success: function (collection, res) {
                                app.navigate('/gift/' + res.id);

                                if (newRecipient || newOccasion) {
                                    if(newRecipient) {
                                        newCategory = {
                                            name: data.recipient,
                                            type: 'recipient',
                                            gender: data.gender,
                                            gifts: [res.id]
                                        }
                                        app.categories.create(newCategory, {
                                            wait: true
                                        });
                                    }
                                    if (newOccasion) {
                                        newCategory = {
                                            name: data.occasion,
                                            type: 'occasion',
                                            gender: data.gender,
                                            gifts: [res.id]
                                        }
                                        app.categories.create(newCategory, {
                                            wait: true
                                        });
                                    }
                                } else {
                                    var recipient = app.categories.get(data.recipient);
                                    if(recipient) {
                                        var categoryGifts = recipient.gifts;
                                        categoryGifts.push(res.id);
                                        categoriesRef.child(recipient.id).child('gifts').set(categoryGifts, function(error) {
                                            if (error) {
                                                alert.log('Error: ' + error);
                                            }
                                        });
                                    }
                                    var occasion = app.categories.get(data.occasion);
                                    if(recipient) {
                                        var categoryGifts = occasion.gifts;
                                        categoryGifts.push(res.id);
                                        categoriesRef.child(recipient.id).child('gifts').set(categoryGifts, function(error) {
                                            if (error) {
                                                alert.log('Error: ' + error);
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    }
                });
            }
        }
    }
});

var createGift = function(data) {
    app.gifts.create(data, {
        wait: true,
        success: function (collection, res) {
            app.navigate('/gift/' + res.id);
        }
    });
}
