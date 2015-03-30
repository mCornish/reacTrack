var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.includes.comment,
    bindings: {
        'model.time': {
            hook: 'time'
        },
        'model.author': {
            hook: 'author'
        },
        'model.authorUrl': {
            type: 'attribute',
            hook: 'authorUrl',
            name: 'href'
        },
        'model.content': {
            hook: 'content'
        },
    }
});
