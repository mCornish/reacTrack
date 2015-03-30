var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var SelectView = require('ampersand-select-view');
var CheckboxView = require('ampersand-checkbox-view');
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
                required: false,
                type: 'file',
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
                options: [
                    'Anniversary',
                    'Baby Shower',
                    'Bachelor Party',
                    'Bachelorette Party',
                    'Baptism',
                    'Bar/Bat Mitzvah',
                    'Birthday',
                    'Bridal Shower',
                    'Bridesmaid',
                    'Cheer up',
                    'Christening',
                    'Christmas',
                    'Communion',
                    'Congratulations',
                    'Easter',
                    'Engagement',
                    'Farewell',
                    'Get well soon',
                    'Good luck',
                    'Graduation',
                    'Groomsman',
                    'Halloween',
                    'Housewarming',
                    'I miss you',
                    'I\'m sorry',
                    'Retirement',
                    'Thank you',
                    'Thinking of you',
                    'Wedding'
                ],
                parent: this
            }),
            new SelectView({
                label: 'Recipient',
                name: 'recipient',
                value: this.model && this.model.recipient,
                required: false,
                unselectedText: 'Who is the gift for?',
                options: [
                    'Babysitter',
                    'Boyfriend',
                    'Brother',
                    'Client',
                    'Co-worker',
                    'Dad',
                    'Daughter',
                    'Employee',
                    'Friend',
                    'Girldfriend',
                    'Granddaughter',
                    'Grandfather',
                    'Grandmother',
                    'Grandson',
                    'Husband',
                    'Mom',
                    'Nephew',
                    'Niece',
                    'Pet',
                    'Sister',
                    'Son',
                    'Teacher',
                    'Wife'
                ],
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
