var PageView = require('./base');
var templates = require('../templates');
var AmpersandCollection = require('ampersand-collection');
var Gift = require('../models/gift');
var FeaturedGiftView = require('../views/featuredGift');
var Category = require('../models/category');
var CategoryListView = require('../views/categoryList')

var auth = require('../helpers/auth');
var Occasions = require('../helpers/occasions');
var Recipients = require('../helpers/recipients');

var originalCollection, currentCollection;
var groupSize = 5;


module.exports = PageView.extend({
    pageTitle: 'Home',
    template: templates.pages.home,
    events: {
    },
    render: function() {
        var self = this;

        this.renderWithTemplate();
        this.collection.fetch({
            success: function() {

                var giftArray = self.collection.toJSON();
                var featuredArray = [];
                giftArray.forEach(function(gift) {
                    if (gift.featured) {
                        featuredArray.push(gift);
                    }
                });
                var sizedArray = featuredArray.slice(0, groupSize);
                var featuredCollection = new AmpersandCollection(sizedArray, {
                    model: Gift
                });
                self.renderCollection(featuredCollection, FeaturedGiftView, self.queryByHook('featured'));

                giftArray = self.collection.toJSON();
                giftArray.sort(function(a, b) {
                    return b.wants - a.wants;
                });
                sizedArray = giftArray.slice(0, groupSize);
                popularCollection = new AmpersandCollection(sizedArray, {
                    model: Gift
                });
                self.renderCollection(popularCollection, FeaturedGiftView, self.queryByHook('popular'));
            }
        });
    }
});
