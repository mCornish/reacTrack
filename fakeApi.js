var _ = require('underscore');
var Firebase = require('firebase');
var postsRef = new Firebase('sizzling-fire-6725.firebaseIO.com/blog/posts');

var posts = [
    {
        id: 11,
        title: 'Sample Title 1',
        created: '3/4/15',
        content: 'Test content 1',
        categories: ['categories'],
        tags: ['tags']
    },
    {
        id: 12,
        title: 'Sample Title 2',
        created: '3/9/15',
        content: 'Test content 2',
        categories: ['categories'],
        tags: ['tags']
    }
];

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
var id = 7;

exports.addPost = function (req, res) {
    var post = req.body;
    var newPostRef = postsRef.push(post, function(error) {
        if (error) {
            console.log('Error: ' + error);
        }
    });
    post.id = newPostRef.key();
    post.slug = post.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/ /g, '-');
    console.log(post.slug);
    res.status(201).send(post);
};

// function getPost(id) {
//     return postsRef.child(id);
// };

exports.listPosts = function (req, res) {
    res.send(postsRef);
};

exports.getPost = function (req, res) {
    var found;
    postsRef.orderByChild('slug').equalTo(req.params.slug).once('value', function(snap) {
        found = snap;
    });
    console.log(found);
    res.status(found ? 200 : 404);
    res.send(found);
};


function getTrack(id) {
    return _.findWhere(tracks, {id: id});
};

exports.listTracks = function (req, res) {
    res.send(tracks);
};

exports.getTrack = function (req, res) {
    var found = get(req.params.id);
    res.status(found ? 200 : 404);
    res.send(found);
};

function getReaction(id) {
    return _.findWhere(reactions, {id: id});
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

exports.getReaction = function (req, res) {
    var found = get(req.params.id);
    res.status(found ? 200 : 404);
    res.send(found);
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
