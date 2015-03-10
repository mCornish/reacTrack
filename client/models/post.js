var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    props: {
        id: ['any', true, null],
        title: ['string', true, 'Title'],
        created: ['date', true, Date.now()],
        content: ['string', true, 'Content here.'],
        categories: ['array', true, function() { return []; }],
        tags: ['array', true, function() { return []; }]
    },
    derived: {
        viewUrl: {
            deps: ['id'],
            fn: function () {
                return '/posts/' + encodeURIComponent(this.id);
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
