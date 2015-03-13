/*global app*/
var PageView = require('./base');
var templates = require('../templates');
var PostForm = require('../forms/post');
var Firebase = require('firebase');
var ref = new Firebase('sizzling-fire-6725.firebaseIO.com');
var postsRef = new Firebase('sizzling-fire-6725.firebaseIO.com/blog/posts');


module.exports = PageView.extend({
    pageTitle: 'New Post',
    template: templates.pages.postAdd,
    subviews: {
        form: {
            container: 'form',
            prepareView: function (el) {
                return new PostForm({
                    el: el,
                    submitCallback: function (data) {
                        app.blog.create(data, {
                            wait: true,
                            success: function (collection, res) {
                                app.navigate('/post/' + res.id);
                                app.blog.fetch();
                            }
                        });
                    }
                });
            }
        }
    }
});
