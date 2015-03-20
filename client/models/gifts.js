var Collection = require('ampersand-rest-collection');
var Gift = require('./gift');


module.exports = Collection.extend({
    model: Gift,
    url: '/gifts',
    mainIndex: 'id'
});
