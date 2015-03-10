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
            new ExtendedInput({
                name: 'title',
                value: this.model && this.model.title,
                required: true,
                placeholder: 'Headline',
                parent: this
            }),
            new ExtendedTextarea({
                name: 'content',
                value: this.model && this.model.content,
                required: true,
                placeholder: 'Get typing...',
                parent: this
            }),
            new ExtendedInput({
                name: 'tags',
                value: this.model && this.model.tags,
                required: false,
                placeholder: 'Tags',
                parent: this
            }),
            new ExtendedInput({
                name: 'categories',
                value: this.model && this.model.categories,
                required: false,
                placeholder: 'Categories',
                parent: this
            })
        ];
    }
});
