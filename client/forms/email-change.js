var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var templates = require('../templates');
var ExtendedInput = InputView.extend({
    template: templates.includes.formInput()
});

module.exports = FormView.extend({
    fields: function () {
        return [
            new ExtendedInput({
                label: 'New Email Address',
                name: 'email',
                value: this.model && this.model.email,
                type: 'email',
                parent: this
            }),
            new ExtendedInput({
                label: 'Password',
                name: 'password',
                type: 'password',
                parent: this
            })
        ];
    }
});
