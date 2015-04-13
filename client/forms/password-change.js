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
                label: 'Current Password',
                name: 'oldPassword',
                type: 'password',
                parent: this
            }),
            new ExtendedInput({
                label: 'New Password',
                name: 'newPassword',
                type: 'password',
                parent: this
            })
        ];
    }
});
