var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.includes.postEditable,
    bindings: {
        'model.date': {
            hook: 'date'
        },
        'model.title': {
            hook: 'title'
        },
        'model.editUrl': {
            type: 'attribute',
            hook: 'edit',
            name: 'href'
        }
    }
});
