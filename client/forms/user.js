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
                name: 'email',
                value: this.model && this.model.email,
                required: true,
                placeholder: 'Email',
                parent: this
            }),
            new ExtendedInput({
                name: 'password',
                value: this.model && this.model.password,
                required: true,
                placeholder: 'Password',
                type: 'password',
                parent: this
            })
        ];
    }
});
