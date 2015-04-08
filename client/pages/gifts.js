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
var moment = require('moment');

var originalCollection, currentCollection, self;
var pageSize = currentPageSize = 20;


module.exports = PageView.extend({
    pageTitle: 'Gifts',
    template: templates.pages.gifts,
    events: {
        'change [data-hook=female]': 'filter',
        'change [data-hook=male]': 'filter',
        'change [data-hook=either]': 'filter',
        'change [data-hook=recipient-list]': 'filter',
        'change [data-hook=occasion-list]': 'filter',
        'change [data-hook=age-list]': 'filter',
        'change [data-hook=price-min]': 'filter',
        'change [data-hook=price-max]': 'filter',
        'change [data-hook=time-list]': 'filter',
        'click [data-hook=more-button]': 'addGifts'
    },
    render: function() {
        self = this;

        this.renderWithTemplate();
        this.collection.fetch({
            success: function() {
                var giftArray = self.collection.toJSON();

                // Prepare and preserve original collection
                giftArray.sort(function(a, b) {
                    return b.created - a.created;
                });
                originalCollection = new AmpersandCollection(giftArray.slice(0, pageSize), {
                    model: Gift
                });

                // Get gifts from today
                var compareDate = moment().subtract(1, 'day').startOf('day');
                var newGifts = [];

                giftArray.forEach(function(gift, index) {
                    var date = moment(gift.created);

                    if(date.isBetween(compareDate, moment())) {
                        newGifts.push(giftArray[index]);
                    }
                });
                giftArray = newGifts;

                // Sort gifts by when they were created
                giftArray.sort(function(a, b) {
                    return b.created - a.created;
                });

                // Get the proper number of gifts
                giftArray = giftArray.slice(0, pageSize);


                var giftCollection = new AmpersandCollection(giftArray, {
                    model: Gift
                });
                self.renderCollection(giftCollection, GiftView, self.queryByHook('gift-list'));
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
        var eitherFilter = this.queryByHook('either').checked;

        var recipientFilter = this.queryByHook('recipient-list').value;
        recipientFilter === 'Recipient' ? recipientFilter = null : '';

        var occasionFilter = this.queryByHook('occasion-list').value;
        occasionFilter === 'Occasion' ? occasionFilter = null : '';

        var ageFilter = this.queryByHook('age-list').value;
        ageFilter === 'Age' ? ageFilter = null : '';

        var timeFilter = this.queryByHook('time-list').value;

        var priceMinFilter = this.queryByHook('price-min').value;
        var priceMaxFilter = this.queryByHook('price-max').value;

        var gifts = originalCollection.toJSON();

        femaleFilter ? gifts = filterGender('female', gifts) : '';
        maleFilter ? gifts = filterGender('male', gifts): '';
        eitherFilter ? gifts = filterGender('either', gifts): '';
        recipientFilter ? gifts = filterRecipient(recipientFilter, gifts) : '';
        occasionFilter ? gifts = filterOccasion(occasionFilter, gifts) : '';
        ageFilter ? gifts = filterAge(ageFilter, gifts) : '';
        priceMinFilter ? gifts = filterMinPrice(priceMinFilter, gifts): '';
        priceMaxFilter ? gifts = filterMaxPrice(priceMaxFilter, gifts): '';
        timeFilter ? gifts = filterTime(timeFilter, gifts) : '';

        gifts = gifts.sort(function(a, b) {
            return b.created - a.created;
        });
        gifts = gifts.slice(0, currentPageSize);
        var filteredCollection = new AmpersandCollection(gifts, {
            model: Gift
        });

        $('[data-hook="gift-list"]').empty();
        this.renderCollection(filteredCollection, GiftView, this.queryByHook('gift-list'));
    },

    addGifts: function() {
        this.collection.fetch({
            success: function() {
                currentPageSize = currentPageSize + pageSize;
                var giftArray = self.collection.toJSON();

                // Sort gifts by when they were created
                giftArray.sort(function(a, b) {
                    return b.created - a.created;
                });

                // Get the proper number of gifts
                giftArray = giftArray.slice(0, currentPageSize);

                originalCollection = new AmpersandCollection(giftArray, {
                    model: Gift
                });

                // Filter and render new page of gifts
                self.filter();
            }
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
    var gender = gender.toLowerCase();
    var newGifts = [];

    if(gender === 'either') {
        newGifts = gifts;
    }

    // Adjust recipient list to selected gender
    var recipients;

    if (gender === 'male') {
        recipients = new AmpersandCollection(Recipients.male, {
            model: Category
        });
    } else if (gender === 'female') {
        recipients = new AmpersandCollection(Recipients.female, {
            model: Category
        });
    } else {
        recipients = new AmpersandCollection(Recipients.model, {
            model: Category
        });
    }

    $('[data-hook="recipient-list"]').empty();
    var recipientNode = createNode('option', 'Recipient');
    self.queryByHook('recipient-list').appendChild(recipientNode);
    self.renderCollection(recipients, CategoryListView, self.queryByHook('recipient-list'));


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

var filterTime = function(time, gifts) {
    var newGifts = [];
    var time = time.toLowerCase();
    var compareDate, date;
    var today = moment();

    if(time.indexOf('today') > -1) {

        timeString = 'day';

    } else if(time.indexOf('week') > -1) {

        timeString = 'week';

    } else if(time.indexOf('month') > -1) {

        timeString = 'month';

    } else if(time.indexOf('year') > -1) {

        timeString = 'year';

    } else {

        return gifts;

    }

    compareDate = moment().subtract(1, timeString).startOf('day');

    gifts.forEach(function(gift, index) {
        date = moment(gift.created);

        if(date.isBetween(compareDate, today)) {
            newGifts.push(gifts[index]);
        }
    });

    return newGifts;
};
