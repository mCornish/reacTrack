var Collection = require('ampersand-rest-collection');
var Post = require('./post');


module.exports = Collection.extend({
    model: Post,
    url: '/posts'
});
