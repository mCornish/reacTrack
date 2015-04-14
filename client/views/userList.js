var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.includes.userList,
    bindings: {
        'model.username': {
            hook: 'username'
        },
        'model.viewUrl': {
            type: 'attribute',
            hook: 'view',
            name: 'href'
        }
    }
});
