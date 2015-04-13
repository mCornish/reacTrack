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
                label: 'Reset Password',
                name: 'email',
                placeholder: 'Email Address',
                type: 'email',
                parent: this
            })
        ];
    }
});
