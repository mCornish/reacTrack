var Collection = require('ampersand-rest-collection');
var Track = require('./track');


module.exports = Collection.extend({
    model: Track,
    url: '/api/tracks'
});
