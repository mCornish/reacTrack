var Collection = require('ampersand-rest-collection');
var Category = require('./category');


module.exports = Collection.extend({
    model: Category,
    url: '/categories',
    mainIndex: 'id'
});
