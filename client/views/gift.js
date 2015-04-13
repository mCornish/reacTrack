var View = require('ampersand-view');
var AmpersandCollection = require('ampersand-collection');

var templates = require('../templates');
var Comment = require('../models/comment');
var CommentView = require('../views/comment');
var CommentForm = require('../forms/comment');

var Firebase = require('firebase');
var ref = new Firebase('sizzling-fire-6725.firebaseIO.com');
var usersRef = new Firebase('sizzling-fire-6725.firebaseIO.com/YGMYG/users');


module.exports = View.extend({
    template: templates.includes.gift,
    bindings: {
        'model.title': {
            hook: 'title'
        },
        'model.image': {
            type: 'attribute',
            hook: 'image',
            name: 'src'
        },
        'model.editUrl': {
            type: 'attribute',
            hook: 'edit',
            name: 'href'
        },
        'model.username': {
            hook: 'user'
        },
        'model.time': {
            hook: 'time-passed'
        },
        'model.wantButtonText': {
            hook: 'wantButton'
        },
        'model.wantText': {
            hook: 'wants'
        }
    },
    events: {
        'click [data-hook~=action-want]': 'toggleWant',
        'click [data-hook~=image]': 'popupInfo',
        'click [data-hook~=close]': 'popupClose',
        'click [data-hook~=shade]': 'popupClose'
    },
    render: function() {
        var self = this;
        var gift = this.model;
        this.renderWithTemplate();
        if(me.id === gift.user_id) {
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
                    submitCallback: function (data) {

                        data.gift_id = gift.id;
                        data.user_id = me.id;

                        app.comments.create(data, {
                            wait: true,
                            success: function (collection, res) {
                                $('[data-hook="comment-list"]').empty();
                                renderComments(self, gift);
                            },
                            error: function () {
                                alert('Error while adding comment');
                            }
                        });
                    }
                });
            }
        }
    },
    wantOnText: 'You want this',
    wantOffText: 'Want',
    toggleWant: function(e) {
        var self = this;
        var gift = this.model;
        var user = app.users.get(me.id);

        if (user.wants.indexOf(gift.id) < 0) {

            this.queryByHook('wantButton').innerHTML = this.wantOnText;

            // Add 1 to gift.wants
            var data = {
                wants: gift.wants + 1
            };
            // Update gift model and save to database
            gift.save(data, {
                 wait: true
            });

            // Add giftID to user.wants
            me.wants.push(gift.id);

            // Update user in database
            usersRef.child(me.id).child('wants').set(me.wants, function(error) {
                if (error) {
                    alert.log('Error: ' + error);
                }
            });

        } else if(gift.wants > 0) {

            this.queryByHook('wantButton').innerHTML = this.wantOffText;

            // Remove 1 from gift.wants
            var data = {
                wants: gift.wants - 1
            };
            // Update gift model and save to database
            gift.save(data, {
                wait: true
            });

            // Get index of giftID in user.want and remove it
            var index = me.wants.indexOf(gift.id);
            me.wants.splice(index, 1);

            // Update user in database
            usersRef.child(me.id).child('wants').set(me.wants, function(error) {
                if (error) {
                    alert.log('Error: ' + error);
                }
            });

        }
    },
    popupInfo: function() {
        this.queryByHook('popup').style.display = 'block';
        this.queryByHook('shade').style.display = 'block';
        this.queryByHook('close').style.display = 'block';

        renderComments(this, this.model);
    },
    popupClose: function() {
        this.queryByHook('popup').style.display = 'none';
        this.queryByHook('shade').style.display = 'none';
        this.queryByHook('close').style.display = 'none';
    },
    noCommentText: 'No comments yet.'
});


var renderComments = function(self, gift) {

    app.comments.fetch({
        success: function() {
            var comments = [];
            var commentCollection = app.comments.toJSON();

            commentCollection.forEach(function(comment) {

                if(comment.gift_id === gift.id) {
                    comments.push(comment);
                }
            });
            if (comments.length > 0) {

                commentsCollection = new AmpersandCollection(comments, {
                    model: Comment
                });

                self.renderCollection(commentsCollection, CommentView, self.queryByHook('comment-list'));

            } else {

                self.queryByHook('comment-list').innerHTML = self.noCommentText;
            }
        }
    });
}
