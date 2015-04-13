var View = require('ampersand-view');
var templates = require('../templates');

var CommentForm = require('../forms/comment');


module.exports = View.extend({
    template: templates.includes.comment,
    bindings: {
        'model.time': {
            hook: 'time'
        },
        'model.author': {
            hook: 'author'
        },
        'model.authorUrl': {
            type: 'attribute',
            hook: 'authorUrl',
            name: 'href'
        },
        'model.content': {
            hook: 'content'
        }
    },
    events: {
        'click [data-hook=edit]': 'showEditForm',
        'click [data-hook=edit-cancel]': 'hideEditForm'
    },
    render: function() {
        var self = this;
        var comment = this.model;
        this.renderWithTemplate();
        if(me.id === comment.user_id) {
            self.queryByHook('edit').style.display = 'block';
        }
    },
    subviews: {
        form: {
            container: 'form',
            prepareView: function (el) {
                var self = this;
                var gift = this.model;

                return new CommentForm({
                    el: el,
                    model: this.model,
                    submitCallback: function (data) {

                        gift.save(data, {
                            wait: true,
                            success: function (collection, res) {
                                self.hideEditForm();
                            }
                        });
                    }
                });
            }
        }
    },
    showEditForm: function() {
        this.queryByHook('content').style.display = 'none';
        this.queryByHook('edit').style.display = 'none';
        this.queryByHook('edit-form').style.display = 'block';
    },
    hideEditForm: function() {
        this.queryByHook('content').style.display = 'block';
        this.queryByHook('edit').style.display = 'block';
        this.queryByHook('edit-form').style.display = 'none';
    }
});
