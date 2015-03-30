/*global app, alert*/
var PageView = require('./base');
var templates = require('../templates');
var AmpersandCollection = require('ampersand-collection');
var Comment = require('../models/comment');
var CommentView = require('../views/comment');
var CommentForm = require('../forms/comment');


module.exports = PageView.extend({
    pageTitle: 'Gift',
    template: templates.pages.giftView,
    bindings: {
        'model.title': {
            hook: 'title'
        },
        'model.image': {
            type: 'attribute',
            hook: 'image',
            name: 'src'
        },
        'model.username': {
            hook: 'user'
        },
        'model.time': {
            hook: 'time-passed'
        },
        'model.description': {
            hook: 'description'
        }
    },
    initialize: function (spec) {
        self = this;
        app.gifts.getOrFetch(spec.id, {all: true}, function (err, model) {
            if (err) alert('couldnt find a model with id: ' + spec.id);
            self.model = model;
            viewModel = model;
        });

        // Make sure gifts and comments are ready for rendering comments
        app.gifts.fetch({
            success: function() {
                app.comments.fetch({
                    success: function() {
                        var comments = [];
                        var commentCollection = app.comments.toJSON();

                        commentCollection.forEach(function(comment) {
                            if(comment.gift_id === viewModel.id) {
                                comments.push(comment);
                            }
                        });

                        commentsCollection = new AmpersandCollection(comments, {
                            model: Comment
                        });

                        self.renderCollection(commentsCollection, CommentView, self.queryByHook('comment-list'));
                    }
                });
            }
        });
    },
    // render: function() {
    //     this.renderWithTemplate();
    //     console.log(app.comments.toJSON());
    //     console.log(viewModel);
    //     // var commentsCollection = new AmpersandCollection(comments, {
    //     //     model: Comment
    //     // });
    //     //
    //     // this.renderCollection(commentsCollection, CommentView, this.queryByHook('comment-list'), {
    //     //     reverse: true
    //     // });
    // },
    subviews: {
        form: {
            container: 'form',
            prepareView: function (el) {
                return new CommentForm({
                    el: el,
                    submitCallback: function (data) {

                        data.gift_id = viewModel.id;
                        data.user_id = me.id;

                        app.comments.create(data, {
                            wait: true,
                            success: function (collection, res) {
                                $('[data-hook="comment-list"]').empty();
                                self.renderCollection(app.comments, CommentView, self.queryByHook('comment-list'));
                            }
                        });
                    }
                });
            }
        }
    }
});

var self, viewModel;
