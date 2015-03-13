var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    props: {
        id: 'any',
        title: ['string', true, 'Title'],
        created: ['date', true, Date.now()],
        content: ['string', true, 'Content here.'],
        categories: ['string', false, ''],
        tags: ['string', false, ''],
        slug: ['string', false, '']
    },
    derived: {
        date: {
            deps: ['created'],
            fn: function () {
                var date = this.created;
                return date.getMonth() + '-' + date.getDay() + '-' + date.getFullYear();
            }
        },
        viewUrl: {
            deps: ['id'],
            fn: function () {
                return '/post/' + this.id;
            }
        },
        editUrl: {
            deps: ['id'],
            fn: function () {
                return '/post/' + this.id + '/edit';
            }
        }
    }
});
