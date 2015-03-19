var login = require('./login');
var signup = require('./signup');

var MongoClient = require('mongodb').MongoClient;
var dbUrl = 'mongodb://admin:admin123@ds061767.mongolab.com:61767/heroku_app34829943';


module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');console.log(user);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        MongoClient.connect(dbUrl, function(err, db) {
            console.log('Connected to Mongo server.');
            var collection = db.collection('users');
            collection.findOne({_id: id}, function(err, user) {

                console.log('deserializing user:', user);
                done(err, user);

                db.close();
            });
        });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);

}
