/*global me, app*/
var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var UserAddPage = require('./pages/user-add');
var UserViewPage = require('./pages/user-view');
var GiftsPage = require('./pages/gifts');
var GiftViewPage = require('./pages/gift-view');
var GiftAddPage = require('./pages/gift-add');
var GiftEditPage = require('./pages/gift-edit');
var BlogPage = require('./pages/blog');
var PostAddPage = require('./pages/post-add');
var PostEditPage = require('./pages/post-edit');
var PostViewPage = require('./pages/post-view');
var AllPostsPage = require('./pages/all-posts');
var LoginPage = require('./pages/login');
var CollectionDemo = require('./pages/collection-demo');
var InfoPage = require('./pages/info');
var PersonAddPage = require('./pages/person-add');
var PersonEditPage = require('./pages/person-edit');
var PersonViewPage = require('./pages/person-view');
var TracksPage = require('./pages/tracks');
var TrackViewPage = require('./pages/track-view');
var ReactionsPage = require('./pages/reactions');
var ReactionViewPage = require('./pages/reaction-view');
var Firebase = require('firebase');
var ref = new Firebase('sizzling-fire-6725.firebaseIO.com');


module.exports = Router.extend({
    routes: {
        '': 'home',
        'register': 'userAdd',
        'user/:id': 'userView',
        'profile': 'meView',
        'ygmyg': 'gifts',
        'gift/:id': 'giftView',
        'new-gift': 'giftAdd',
        'gift/:id/edit': 'giftEdit',
        'posts': 'blog',
        'blog': 'blog',
        'post/:id': 'postView',
        'new-post': 'postAdd',
        'post/:id/edit': 'postEdit',
        'all-posts': 'allPosts',
        'login': 'login',
        'collections': 'collectionDemo',
        'info': 'info',
        'person/add': 'personAdd',
        'person/:id': 'personView',
        'person/:id/edit': 'personEdit',
        'tracks': 'tracks',
        'tracks/:id': 'trackView',
        'reactions': 'reactions',
        'reactions/:id': 'reactionView',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home: function () {
        this.trigger('page', new HomePage({
            model: me
        }));
    },

    userAdd: function () {
        this.trigger('page', new UserAddPage());
    },

    userView: function (id) {
        this.trigger('page', new UserViewPage({
            id: id
        }));
    },

    meView: function () {
        this.trigger('page', new UserViewPage({
            id: me.id
        }));
    },

    gifts: function () {
        this.trigger('page', new GiftsPage({
            model: me,
            collection: app.gifts
        }));
    },

    giftView: function (id) {
        this.trigger('page', new GiftViewPage({
            id: id
        }));
    },

    giftAdd: function () {
        this.authenticate(new GiftAddPage());
    },

    giftEdit: function(id) {
        this.authenticate(new GiftEditPage({
            id: id
        }));
    },

    blog: function () {
        this.trigger('page', new BlogPage({
            model: me,
            collection: app.blog
        }));
    },

    postAdd: function () {
        this.authenticate(new PostAddPage());
    },

    postEdit: function(id) {
        this.authenticate(new PostEditPage({
            id: id
        }));
    },

    postView: function (id) {
        this.trigger('page', new PostViewPage({
            id: id
        }));
    },

    allPosts: function() {
        this.authenticate(new AllPostsPage({
            model: me,
            collection: app.blog
        }));
    },

    login: function () {
        this.trigger('page', new LoginPage({
            model: me
        }));
    },

    collectionDemo: function () {
        this.trigger('page', new CollectionDemo({
            model: me,
            collection: app.people
        }));
    },

    info: function () {
        this.trigger('page', new InfoPage({
            model: me
        }));
    },

    personAdd: function () {
        this.trigger('page', new PersonAddPage());
    },

    personEdit: function (id) {
        this.trigger('page', new PersonEditPage({
            id: id
        }));
    },

    personView: function (id) {
        this.trigger('page', new PersonViewPage({
            id: id
        }));
    },

    tracks: function () {
        this.trigger('page', new TracksPage({
            model: me,
            collection: app.tracks
        }));
    },

    trackView: function (id) {
        this.trigger('page', new TrackViewPage({
            id: id,
            collection: app.reactions
        }));
    },

    reactions: function () {
        this.trigger('page', new ReactionsPage({
            model: me,
            collection: app.reactions
        }));
    },

    reactionView: function (id) {
        this.trigger('page', new ReactionViewPage({
            id: id
        }));
    },

    catchAll: function () {
        this.redirectTo('');
    },

    // ------- USED TO AUTHENTICATE ADMIN PAGES ---------
    authenticate: function(page) {
        if (ref.getAuth()) {
            this.trigger('page', page);
        } else {
            this.redirectTo('login');
        }
    }
});
