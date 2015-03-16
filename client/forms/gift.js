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
                label: 'Title',
                name: 'title',
                value: this.model && this.model.title,
                required: true,
                placeholder: 'What is the gift?',
                parent: this
            }),
            new ExtendedInput({
                label: 'Image',
                name: 'image',
                value: this.model && this.model.image,
                required: true,
                placeholder: 'Image URL',
                parent: this
            }),
            new ExtendedInput({
                label: 'Description',
                name: 'description',
                value: this.model && this.model.description,
                required: false,
                placeholder: 'Tell us about the gift',
                parent: this
            }),
            new ExtendedInput({
                label: 'Link',
                name: 'link',
                value: this.model && this.model.link,
                required: false,
                placeholder: 'Where can we buy the gift online?',
                parent: this
            })
        ];
    }
});
