var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.includes.post,
    bindings: {
        'model.created': {
            hook: 'date'
        },
        'model.title': {
            hook: 'title'
        },
        'model.content': {
            hook: 'content',
        },
        'model.viewUrl': {
            type: 'attribute',
            hook: 'view',
            name: 'href'
        }
    }
});
