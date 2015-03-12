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
                name: 'email',
                value: this.model && this.model.email,
                placeholder: 'Email',
                type: 'email',
                parent: this
            }),
            new ExtendedInput({
                name: 'password',
                value: this.model && this.model.password,
                placeholder: 'Password',
                type: 'password',
                parent: this
            })
        ];
    }
});
