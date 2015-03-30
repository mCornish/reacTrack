var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var templates = require('../templates');
var ExtendedInput = InputView.extend({
    template: templates.includes.formInput()
});
var ExtendedTextarea = InputView.extend({
    template: templates.includes.formTextarea()
});

module.exports = FormView.extend({
    fields: function () {
        return [
            new ExtendedTextarea({
                name: 'content',
                value: this.model && this.model.content,
                required: true,
                placeholder: 'Comment on this gift...',
                parent: this
            })
        ];
    }
});
