var Collection = require('ampersand-rest-collection');
var Reaction = require('./reaction');


module.exports = Collection.extend({
    model: Reaction,
    url: '/api/reactions'
});
