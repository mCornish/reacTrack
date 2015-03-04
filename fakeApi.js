var _ = require('underscore');

var tracks = [
    {
        id: 111,
        name: 'Whiplash',
        created: '3/4/15',
        author: 'admin',
        length: 55670030,
        reactions: [
            {
                id: 121,
                author: 'CobraxGunnerz',
                time: '15000',
                text: 'That was AWESOME!!!',
                posted: '3/4/15'
            },
            {
                id: 122,
                author: 'xPhillyDxX',
                time: '70000',
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
        length: 25600230,
        reactions: [
            {
                id: 123,
                author: 'Shahashi',
                time: '244500',
                text: 'Domo arigato Hairy Baby.',
                posted: '1/30/15'
            },
            {
                id: 124,
                author: 'ShadowWarrior95',
                time: '235432',
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
