/* global console */
var path = require('path');
var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Moonboots = require('moonboots-express');
var compress = require('compression');
var config = require('getconfig');
var semiStatic = require('semi-static');
var serveStatic = require('serve-static');
var stylizer = require('stylizer');
var templatizer = require('templatizer');
var app = express();

// a little helper for fixing paths for various environments
var fixPath = function (pathString) {
    return path.resolve(path.normalize(pathString));
};


// -----------------
// Configure express
// -----------------
app.use(compress());
app.use(serveStatic(fixPath('public')));

// we only want to expose tests in dev
if (config.isDev) {
    app.use(serveStatic(fixPath('test/assets')));
    app.use(serveStatic(fixPath('test/spacemonkey')));
}

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// in order to test this with spacemonkey we need frames
if (!config.isDev) {
    app.use(helmet.xframe());
}
app.use(helmet.xssFilter());
app.use(helmet.nosniff());

app.set('view engine', 'jade');


// -----------------
// Set up our little demo API
// -----------------
var api = require('./fakeApi');

app.get('/users', api.M_listUsers);
app.post('/users', api.M_addUser);
app.get('/users/:id', api.M_getUser);
app.put('/users/:id', api.updateUser);

app.get('/gifts', api.M_listGifts);
app.post('/gifts', api.M_addGift);
app.get('/gifts/:id', api.M_getGift);
app.put('/gifts/:id', api.M_updateGift);

app.get('/posts', api.listPosts);
app.post('/posts', api.addPost);
app.get('/posts/:id', api.getPost);
app.put('/posts/:id', api.updatePost);
app.get('/posts/:id/edit', api.getPost);

app.get('/api/reactions', api.listReactions);
app.get('/api/reactions/:id', api.getReaction);

app.get('/api/tracks', api.listTracks);
app.get('/api/tracks/:id', api.getTrack);

app.get('/api/people', api.listPeople);
app.get('/api/people/:id', api.getPerson);
app.delete('/api/people/:id', api.deletePerson);
app.put('/api/people/:id', api.updatePerson);
app.post('/api/people', api.addPerson);


// -----------------
// Enable the functional test site in development
// -----------------
if (config.isDev) {
    app.get('/test*', semiStatic({
        folderPath: fixPath('test'),
        root: '/test'
    }));
}


// -----------------
// Set our client config cookie
// -----------------
app.use(function (req, res, next) {
    res.cookie('config', JSON.stringify(config.client));
    next();
});


// ---------------------------------------------------
// Configure Moonboots to serve our client application
// ---------------------------------------------------
new Moonboots({
    moonboots: {
        jsFileName: 'ampersand-app',
        cssFileName: 'ampersand-app',
        main: fixPath('client/app.js'),
        developmentMode: config.isDev,
        libraries: [
        ],
        stylesheets: [
            fixPath('public/css/bootstrap.css'),
            fixPath('public/css/app.css')
        ],
        browserify: {
            debug: false
        },
        beforeBuildJS: function () {
            // This re-builds our template files from jade each time the app's main
            // js file is requested. Which means you can seamlessly change jade and
            // refresh in your browser to get new templates.
            if (config.isDev) {
                templatizer(fixPath('templates'), fixPath('client/templates.js'));
            }
        },
        beforeBuildCSS: function (done) {
            // This re-builds css from stylus each time the app's main
            // css file is requested. Which means you can seamlessly change stylus files
            // and see new styles on refresh.
            if (config.isDev) {
                stylizer({
                    infile: fixPath('public/css/app.styl'),
                    outfile: fixPath('public/css/app.css'),
                    development: true
                }, done);
            } else {
                done();
            }
        }
    },
    server: app
});

app.set('port', (process.env.PORT || 5000));
// listen for incoming http requests on the port as specified in our config
app.listen(app.get('port'), function() {
    console.log('Ampersand App is running at: http://localhost:' + app.get('port') + ' Yep. That\'s pretty awesome.');
});
