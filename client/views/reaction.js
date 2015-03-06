var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.includes.reaction,
    bindings: {
        'model.trackName': {
            hook: 'track'
        },
        'model.author': {
            hook: 'author'
        },
        'model.text': {
            hook: 'text'
        }
    }
});
