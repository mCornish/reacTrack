var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.includes.giftList,
    bindings: {
        'model.title': {
            hook: 'title'
        },
        'model.username': {
            hook: 'username'
        },
        'model.time': {
            hook: 'time'
        },
        'model.viewUrl': {
            type: 'attribute',
            hook: 'view',
            name: 'href'
        }
    },
    events: {
        'change [data-hook="featured"]': 'updateGift'
    },
    render: function() {
        var gift = this.model;

        this.renderWithTemplate();

        if(gift.featured === true) {
            this.queryByHook('featured').checked = true;
        }
    },
    updateGift: function() {
        var gift = this.model;
        var featuredValue = this.queryByHook('featured').checked;

        var data = {
            featured: featuredValue
        }

        gift.save(data, {
            wait: true
        });
    }
});
