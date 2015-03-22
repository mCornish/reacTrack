var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var SelectView = require('ampersand-select-view');
var templates = require('../templates');
var ExtendedInput = InputView.extend({
    template: templates.includes.formInput()
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
            }),
            new SelectView({
                label: 'Recipient',
                name: 'recipient',
                value: this.model && this.model.recipient,
                required: false,
                unselectedText: 'Who is the gift for?',
                options: ['Dad', 'Mom', 'Sister', 'Brother'],
                parent: this
            }),
            new SelectView({
                label: 'Occasion',
                name: 'occasion',
                value: this.model && this.model.occasion,
                required: false,
                unselectedText: 'Why did you get the gift?',
                options: ['Birthday', 'Christmas', 'Anniversary'],
                parent: this
            })
        ];
    }
});
