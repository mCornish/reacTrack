var View = require('ampersand-view');
var templates = require('../templates');
var Masonry = require('../helpers/masonry');


module.exports = View.extend({
    template: templates.includes.gift,
    bindings: {
        'model.title': {
            hook: 'title'
        },
        'model.image': {
            type: 'attribute',
            hook: 'image',
            name: 'src'
        },
        'model.viewUrl': {
            type: 'attribute',
            hook: 'view',
            name: 'href'
        },
        'model.username': {
            hook: 'user'
        },
        'model.time': {
            hook: 'time-passed'
        }
    },
    render: function() {
        this.renderWithTemplate();

        this.trigger('masonry-loaded');
    },
});
