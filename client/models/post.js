var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    props: {
        id: 'any',
        title: ['string', true, 'Title'],
        created: ['date', true, Date.now()],
        content: ['string', true, 'Content here.'],
        categories: ['string', false, ''],
        tags: ['string', false, ''],
        slug: 'string'
    },
    derived: {
        viewUrl: {
            deps: ['id'],
            fn: function () {
                return '/posts/' + encodeURIComponent(this.slug);
            }
        },
        editUrl: {
            deps: ['id'],
            fn: function () {
                return '' + this.viewUrl + '/edit';
            }
        }
    }
});
