var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var SelectView = require('ampersand-select-view');
var CheckboxView = require('ampersand-checkbox-view');
var templates = require('../templates');

var Occasions = require('../helpers/occasions');
var Recipients = require('../helpers/recipients');

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
                required: false,
                type: 'url',
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
                type: 'url',
                placeholder: 'Where can someone buy the gift online?',
                parent: this
            }),
            new ExtendedInput({
                label: 'Gift price',
                name: 'price',
                value: this.model && this.model.price,
                required: false,
                type: 'number',
                placeholder: 'How much did the gift cost?',
                parent: this
            }),
            // new CheckboxView({
            //     label: 'Gender',
            //     name: 'male',
            //     value: 'false',
            //     required: false,
            //     parent: this
            // }),
            new SelectView({
                label: 'Occasion',
                name: 'occasion',
                value: this.model && this.model.occasion,
                required: false,
                unselectedText: 'Why did you get the gift?',
                options: Occasions.array,
                parent: this
            }),
            new SelectView({
                label: 'Recipient',
                name: 'recipient',
                value: this.model && this.model.recipient,
                required: false,
                unselectedText: 'Who is the gift for?',
                options: Recipients.array,
                parent: this
            }),
            new ExtendedInput({
                label: 'Recipient Age',
                name: 'age',
                value: this.model && this.model.age,
                required: false,
                type: 'number',
                placeholder: 'How old is that lucky person?',
                parent: this
            })
        ];
    }
});
