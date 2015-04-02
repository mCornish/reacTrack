var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.includes.categoryList,
    bindings: {
        'model.name': {
            hook: 'name'
        }
    }
});
