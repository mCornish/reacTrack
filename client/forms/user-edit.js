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
                label: 'Username',
                name: 'username',
                value: this.model && this.model.username,
                required: true,
                placeholder: 'Choose a username',
                parent: this
            }),
            new ExtendedInput({
                label: 'First Name',
                name: 'firstName',
                value: this.model && this.model.firstName,
                required: false,
                placeholder: 'First Name',
                parent: this
            }),
            new ExtendedInput({
                label: 'Last Name',
                name: 'lastName',
                value: this.model && this.model.lastName,
                required: false,
                placeholder: 'Last Name',
                parent: this
            }),
            new ExtendedInput({
                label: 'Website',
                name: 'website',
                value: this.model && this.model.website,
                required: false,
                type: 'url',
                placeholder: 'Do you have a website?',
                parent: this
            }),
            new ExtendedInput({
                label: 'Location',
                name: 'location',
                value: this.model && this.model.location,
                required: false,
                placeholder: 'Where are you gifting from?',
                parent: this
            })
        ];
    }
});
