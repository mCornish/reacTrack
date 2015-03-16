var Collection = require('ampersand-rest-collection');
var User = require('./user');


module.exports = Collection.extend({
    model: User,
    url: '/users',
    mainIndex: 'id'
});
