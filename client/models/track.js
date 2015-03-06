var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    props: {
        id: ['any', true, null],
        name: ['string', true, 'Name'],
        created: ['date', true, 'Date'],
        author: ['string', true, 'Author'],
        length: ['string', true, '0:00'],
        reactions: ['array', true, '[]'],
        slug: ['string', true, 'slug']
    },
    derived: {
        viewUrl: {
            deps: ['id'],
            fn: function () {
                return '/tracks/' + encodeURIComponent(this.id);
            }
        },
        reactUrl: {
            deps: ['name'],
            fn: function () {
                return '' + this.viewUrl + '/edit';
            }
        }
    }
});
