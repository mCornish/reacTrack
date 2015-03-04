var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.includes.track,
    bindings: {
        'model.name': {
            hook: 'name'
        },
        'model.length': {
            hook: 'length',
        },
        'model.viewUrl': {
            type: 'attribute',
            hook: 'view',
            name: 'href'
        }
    }
});
