var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    props: {
        id: 'any',
        title: ['string', true, 'Title'],
        user: ['string', true, 'User'],
        image: ['string', true, 'Image'],
        description: ['string', false, 'Description'],
        link: ['string', false, ''],
        categories: ['array']
    },
    derived: {
        viewUrl: {
            deps: ['id'],
            fn: function () {
                return '/gift' + this.id;
            }
        },
        editUrl: {
            deps: ['id'],
            fn: function () {
                return '/gift/' + this.id + '/edit';
            }
        }
    }
});
