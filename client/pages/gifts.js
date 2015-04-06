var PageView = require('./base');
var templates = require('../templates');
var AmpersandCollection = require('ampersand-collection');
var Gift = require('../models/gift');
var GiftView = require('../views/gift');
var Category = require('../models/category');
var CategoryListView = require('../views/categoryList')

var auth = require('../helpers/auth');
var Occasions = require('../helpers/occasions');
var Recipients = require('../helpers/recipients');

var originalCollection, currentCollection;
var pageSize = 20;


module.exports = PageView.extend({
    pageTitle: 'Gifts',
    template: templates.pages.gifts,
    events: {
        'change [data-hook=gender]': 'filter',
        'change [data-hook=male]': 'filter',
        'change [data-hook=either]': 'filter',
        'change [data-hook=recipient-list]': 'filter',
        'change [data-hook=occasion-list]': 'filter',
        'change [data-hook=age-list]': 'filter',
        'change [data-hook=price-min]': 'filter',
        'change [data-hook=price-max]': 'filter'
    },
    render: function() {
        var self = this;

        this.renderWithTemplate();
        this.collection.fetch({
            success: function() {
                var giftArray = self.collection.toJSON();
                var sizedArray = giftArray.slice(0, pageSize);
                var giftCollection = new AmpersandCollection(sizedArray, {
                    model: Gift
                });

                self.renderCollection(giftCollection, GiftView, self.queryByHook('gift-list'), {
                    reverse: true
                });

                originalCollection = currentCollection = giftCollection;
            }
        });

        var recipients = new AmpersandCollection(Recipients.model, {
            model: Category
        });
        var occasions = new AmpersandCollection(Occasions.model, {
            model: Category
        });

        var recipientNode = createNode('option', 'Recipient');
        this.queryByHook('recipient-list').appendChild(recipientNode);
        this.renderCollection(recipients, CategoryListView, self.queryByHook('recipient-list'));

        var occasionNode = createNode('option', 'Occasion');
        this.queryByHook('occasion-list').appendChild(occasionNode);
        this.renderCollection(occasions, CategoryListView, self.queryByHook('occasion-list'));
    },
    filter: function() {
        var femaleFilter = this.queryByHook('female').checked;
        var maleFilter = this.queryByHook('male').checked;

        var recipientFilter = this.queryByHook('recipient-list').value;
        recipientFilter === 'Recipient' ? recipientFilter = null : '';

        var occasionFilter = this.queryByHook('occasion-list').value;
        occasionFilter === 'Occasion' ? occasionFilter = null : '';

        var ageFilter = this.queryByHook('age-list').value;
        ageFilter === 'Age' ? ageFilter = null : '';

        var priceMinFilter = this.queryByHook('price-min').value;
        var priceMaxFilter = this.queryByHook('price-max').value;
        var gifts = originalCollection.toJSON();

        femaleFilter ? gifts = filterGender('female', gifts) : '';
        maleFilter ? gifts = filterGender('male', gifts): '';
        recipientFilter ? gifts = filterRecipient(recipientFilter, gifts) : '';
        occasionFilter ? gifts = filterOccasion(occasionFilter, gifts) : '';
        ageFilter ? gifts = filterAge(ageFilter, gifts) : '';
        priceMinFilter ? gifts = filterMinPrice(priceMinFilter, gifts): '';
        priceMaxFilter ? gifts = filterMaxPrice(priceMaxFilter, gifts): '';

        var filteredCollection = new AmpersandCollection(gifts, {
            model: Gift
        });

        $('[data-hook="gift-list"]').empty();
        this.renderCollection(filteredCollection, GiftView, this.queryByHook('gift-list'), {
            reverse: true
        });
    }
});


var createNode = function(el, text) {
    var elNode = document.createElement(el);
    var textNode = document.createTextNode(text);
    elNode.appendChild(textNode);

    return elNode;
}


var getOccasions = function() {
    var occasions = [];
    app.categories.toJSON().forEach(function(category) {
        if(category.type === 'occasion') {
            occasions.push(category);
        }
    });

    return occasions;
};

var getRecipients = function() {
    var recipients = [];
    app.categories.toJSON().forEach(function(category) {
        if(category.type === 'recipient') {
            recipients.push(category);
        }
    });

    return recipients;
};

var filterGender = function(gender, gifts) {
    var newGifts = [];

    gifts.forEach(function(gift, index) {
        if(gift.gender === gender) {
            newGifts.push(gifts[index]);
        }
    });

    return newGifts;
};

var filterRecipient = function(filter, gifts) {
    var newGifts = [];

    gifts.forEach(function(gift, index) {
        if(gift.recipient === filter) {
            newGifts.push(gifts[index]);
        }
    });

    return newGifts;
};

var filterOccasion = function(filter, gifts) {
    var newGifts = [];

    gifts.forEach(function(gift, index) {
        if(gift.occasion === filter) {
            newGifts.push(gifts[index]);
        }
    });

    return newGifts;
};

var filterAge = function(ageRange, gifts) {
    var newGifts = [];
    var minAge, maxAge;

    if (ageRange.indexOf('Newborn') > -1) {
        minAge = 0;
        maxAge = 1;
    } else if(ageRange.indexOf('+') < 0) {
        var hyphen = ageRange.indexOf('-');
        minAge = ageRange.substr(0, hyphen - 1);
        maxAge = ageRange.substr(hyphen + 1);
    } else {
        minAge = 50;
        maxAge = 150;
    }
    gifts.forEach(function(gift, index) {
        if(gift.age && gift.age >= minAge && gift.age <= maxAge) {
            newGifts.push(gifts[index]);
        }
    });
    console.log(minAge + ' ' + maxAge);
    return newGifts;
};

var filterMinPrice = function(minPrice, gifts) {
    var newGifts = [];

    gifts.forEach(function(gift, index) {
        if(gift.price >= minPrice) {
            newGifts.push(gifts[index]);
        }
    });

    return newGifts;
};

var filterMaxPrice = function(maxPrice, gifts) {
    var newGifts = [];

    gifts.forEach(function(gift, index) {
        if(gift.price <= maxPrice) {
            newGifts.push(gifts[index]);
        }
    });

    return newGifts;
};
