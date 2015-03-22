var _ = require('underscore');

var Firebase = require('firebase');
var ref = new Firebase('sizzling-fire-6725.firebaseIO.com');
var usersRef = new Firebase('sizzling-fire-6725.firebaseIO.com/YGMYG/users');
var giftsRef = new Firebase('sizzling-fire-6725.firebaseIO.com/YGMYG/gifts');
var postsRef = new Firebase('sizzling-fire-6725.firebaseIO.com/blog/posts');

// var MongoClient = require('mongodb').MongoClient;
// var dbUrl = 'mongodb://admin:admin123@ds061767.mongolab.com:61767/heroku_app34829943';


var tracks = [
    {
        id: 111,
        name: 'Whiplash',
        created: '3/4/15',
        author: 'admin',
        length: '1:46:59',
        reactions: [
            {
                id: 121,
                track: 111,
                author: 'Reactor 1',
                time: 15000,
                text: 'That was AWESOME!!!',
                posted: '3/4/15'
            },
            {
                id: 122,
                track: 111,
                author: 'Reactor 2',
                time: 70000,
                text: 'That guy just got filled in.',
                posted: '3/2/15'
            }
        ],
        slug: 'whiplash'
    },
    {
        id: 112,
        name: 'Big Hero 6',
        created: '1/25/15',
        author: 'admin',
        length: '1:48:00',
        reactions: [
            {
                id: 123,
                track: 112,
                author: 'Reactor 3',
                time: 244500,
                text: 'Domo arigato Hairy Baby.',
                posted: '1/30/15'
            },
            {
                id: 124,
                track: 112,
                author: 'Reactor 4',
                time: 235432,
                text: 'Iron Giant wannabe. Oh please.',
                posted: '2/2/15'
            }
        ],
        slug: 'big-hero-6'
    }
];

var people = [
    {
        id: 1,
        firstName: 'Henrik',
        lastName: 'Joreteg',
        coolnessFactor: 11
    },
    {
        id: 2,
        firstName: 'Bob',
        lastName: 'Saget',
        coolnessFactor: 2
    },
    {
        id: 3,
        firstName: 'Larry',
        lastName: 'King',
        coolnessFactor: 4
    },
    {
        id: 4,
        firstName: 'Diana',
        lastName: 'Ross',
        coolnessFactor: 6
    },
    {
        id: 5,
        firstName: 'Crazy',
        lastName: 'Dave',
        coolnessFactor: 8
    },
    {
        id: 6,
        firstName: 'Larry',
        lastName: 'Johannson',
        coolnessFactor: 4
    }
];



exports.getUser = function (req, res) {
    var id = 'simplelogin:' + req.params.id;
    var user;

    usersRef.child(id).on('value', function(snap) {

        user = snap.val();

        res.send(user);

    }, function(errorObj) {
        console.log('Could not get user: ' + errorObj.code);
    });
};

exports.addUser = function (req, res) {
    var user = req.body;
    console.log(user);
    ref.child('users').child(user.id).set(user, function(error) {
        if (error) {
            alert('User could not be created: ' + error);
        } else {
            res.send(user);
        }
    });

};

exports.listUsers = function (req, res) {
    var users = [];

    usersRef.once("value", function(snapshot) {
        var snap = snapshot.val();

        for (key in snap) {
            users.push(snap[key]);
        }

        res.send(users);

    }, function(errorObj) {
        console.log('Error fetching users: ' + errorObj.code);
    });
};

exports.updateUser = function(req, res) {
    var id = req.params.id;
    var data = req.body;

    usersRef.child(id).update(data, function(error) {
        if (error) {
            alert('User could not be updated: ' + error);
        } else {

            res.send(data);

        }

    });
};


exports.getGift = function (req, res) {
    var id = req.params.id;
    var gift = {};

    giftsRef.child(id).on('value', function(snap) {

        gift = snap.val();
        gift.id = snap.key();
    });

    res.send(gift);
};

exports.addGift = function (req, res) {
    var gift = req.body;

    var newGiftRef = giftsRef.push(gift, function(error) {
        if (error) {
            console.log('Error: ' + error);
        } else {

            gift.id = newGiftRef.key();
            res.send(gift);
        }
    });
};

exports.listGifts = function (req, res) {
    var gifts = [];

    giftsRef.once("value", function(snapshot) {
        var snap = snapshot.val();

        for (key in snap) {
            snap[key].id = key;
            gifts.push(snap[key]);
        }

        res.send(gifts);

    }, function(errorObj) {
        console.log('Error: ' + errorObj.code);
    });
};

exports.updateGift = function(req, res) {
    var id = req.params.id;
    var data = req.body;

    giftsRef.child(id).update(data, function(error) {
        if (error) {
            alert('Gift could not be saved: ' + error);
        } else {
            res.send(data);
        }

    });
};


exports.addPost = function (req, res) {
    var post = req.body;

    post.slug = post.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/ /g, '-');

    var newPostRef = postsRef.push(post, function(error) {
        if (error) {
            console.log('Error: ' + error);
        } else {

            post.id = newPostRef.key();

            postsRef.child(post.id).update(post, function(error) {
                if (error) {
                    console.log('Error: ' + error);
                }
            });

            res.status(201).send(post);
        }
    });
};

function getPost(id) {
    var post = {};

    postsRef.child(id).on('value', function(snap) {
        post = snap.val();

        post.id = snap.key();
    });

    return post;
};

exports.getPost = function (req, res) {
    var found = getPost(req.params.id);

    res.status(found ? 200 : 404);
    res.send(found);
};

exports.updatePost = function(req, res) {
    var id = req.params.id;
    var data = req.body;

    postsRef.child(id).update(data, function(error) {
        if (error) {
            alert('Post could not be saved: ' + error);
        } else {

        }

        res.send(data);
    });
};

exports.listPosts = function (req, res) {
    var posts = [];

    postsRef.on("value", function(snapshot) {
        var snap = snapshot.val();

        for (key in snap) {
            posts.push(snap[key]);
        }

        res.send(posts);

    }, function(errorObj) {
        console.log('Error: ' + errorObj.code);
    });
};


function getTrack(id) {
    return _.findWhere(tracks, {id: id});
};

exports.getTrack = function (req, res) {
    var found = get(req.params.id);
    res.status(found ? 200 : 404);
    res.send(found);
};

exports.listTracks = function (req, res) {
    res.send(tracks);
};


function getReaction(id) {
    return _.findWhere(reactions, {id: id});
};

exports.getReaction = function (req, res) {
    var found = get(req.params.id);
    res.status(found ? 200 : 404);
    res.send(found);
};

exports.listReactions = function (req, res) {
    var reactionArray = [];

    tracks.forEach(function(track) {
        track.reactions.forEach(function(reaction) {
            reactionArray.push(reaction);
        });
    });

    res.send(reactionArray);
};

exports.listReactionsByTrack = function (req, res) {
    res.send(reactions);
};


function getPerson(id) {
    return _.findWhere(people, {id: parseInt(id + '', 10)});
};

exports.listPeople = function (req, res) {
    res.send(people);
};

exports.addPerson = function (req, res) {
    var person = req.body;
    person.id = id++;
    people.push(person);
    res.status(201).send(person);
};

exports.getPerson = function (req, res) {
    var found = get(req.params.id);
    res.status(found ? 200 : 404);
    res.send(found);
};

exports.deletePerson = function (req, res) {
    var found = get(req.params.id);
    if (found) people = _.without(people, found);
    res.status(found ? 200 : 404);
    res.send(found);
};

exports.updatePerson = function (req, res) {
    var found = get(req.params.id);
    if (found) _.extend(found, req.body);
    res.status(found ? 200 : 404);
    res.send(found);
};


// exports.M_getUser = function (req, res) {
//     var id = req.params.id;
//
//     MongoClient.connect(dbUrl, function(err, db) {
//         console.log('Connected to Mongo server.');
//         var collection = db.collection('users');
//         collection.findOne({_id: id}, function(e, result) {
//             if(e) console.log('Could not find user: ' + e);
//
//             res.send(result);
//             db.close();
//         });
//     });
// };
//
// exports.M_addUser = function (req, res) {
//     var user = req.body;
//
//     MongoClient.connect(dbUrl, function(err, db) {
//         console.log('Connected to Mongo server.');
//         var collection = db.collection('users');
//         collection.insert(user, function(e, result) {
//             if(e) console.log('Could not add user: ' + e);
//             res.send(user);
//             db.close();
//         });
//     });
// };
//
// exports.M_listUsers = function (req, res) {
//
//     MongoClient.connect(dbUrl, function(err, db) {
//         console.log('Connected to Mongo server.');
//         var collection = db.collection('users');
//         collection.find().toArray(function(e, result) {
//             if(e) console.log('Could not find collection: ' + e);
//             res.send(result);
//             db.close();
//         });
//     });
// };
//
//
// exports.M_addGift = function (req, res) {
//     var gift = req.body;
//
//     MongoClient.connect(dbUrl, function(err, db) {
//         if (err) {
//             console.log('Could not connect to Mongo server: ' + err);
//             db.close();
//         }
//         console.log('Connected to Mongo server.');
//         var collection = db.collection('gifts');
//         collection.insert(gift, function(e, result) {
//             if(e) console.log('Could not add gift: ' + e);
//             res.send(gift);
//             db.close();
//         });
//     });
// };
//
// exports.M_listGifts = function (req, res) {
//
//     MongoClient.connect(dbUrl, function(err, db) {
//         if (err) {
//             console.log('Could not connect to Mongo server: ' + err);
//             db.close();
//         }
//         console.log('Connected to Mongo server.');
//         var collection = db.collection('gifts');
//         collection.find().toArray(function(e, result) {
//             if(e) console.log('Could not find gift collection: ' + e);
//             res.send(result);
//             db.close();
//         });
//     });
// };
//
// exports.M_getGift = function (req, res) {
//     var id = req.params.id;
//
//     MongoClient.connect(dbUrl, function(err, db) {
//         if (err) {
//             console.log('Could not connect to Mongo server: ' + err);
//             db.close();
//         }
//         console.log('Connected to Mongo server.');
//         var collection = db.collection('gifts');
//         collection.findOne({_id: id}, function(e, result) {
//             if(e) console.log('Could not find gift: ' + e);
//
//             res.send(result);
//             db.close();
//         });
//     });
// };
//
// exports.M_updateGift = function (req, res) {
//     var id = req.params.id;
//     var gift = req.body;
//
//     MongoClient.connect(dbUrl, function(err, db) {
//         if (err) {
//             console.log('Could not connect to Mongo server: ' + err);
//             db.close();
//         }
//         console.log('Connected to Mongo server.');
//         var collection = db.collection('gifts');
//         collection.update({_id: id}, gift, function(e, result) {
//             if(e) console.log('Could not find gift: ' + e);
//
//             res.send(result);
//             db.close();
//         });
//     });
// };
