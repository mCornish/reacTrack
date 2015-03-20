var Firebase = require('firebase');
var ref = new Firebase('sizzling-fire-6725.firebaseIO.com');


exports.init = function() {
    ref.onAuth(function(authData) {
        if (authData) {
            $('.unauthed').hide();
            $('.authed').show();

            me.id = authData.uid.replace('simplelogin:', '');
            me.username = authData.password.email.replace(/@.*/, '');
            me.provider = authData.provider;
            me.email = authData.password.email;

            if (!app.users.getOrFetch(authData.uid)) {

                app.users.create(me.toJSON(), {
                    wait: true,
                    success: function (collection, res) {

                        app.navigate('/user/' + res.id.replace('simplelogin:', ''));
                        app.users.fetch();
                    }
                });
            } else {
                app.navigate('/user/' + authData.uid.replace('simplelogin:', ''));
            }
        } else {
            $('.unauthed').show();
            $('.authed').hide();
        }
    });
}

exports.getUsername = function() {
    ref.getAuth(function(authData) {
        switch(authData.provider) {
            case 'password':
                return authData.password.email.replace(/@.*/, '');
            case 'twitter':
                return authData.twitter.displayName;
            case 'facebook':
                return authData.facebook.displayName;
       }
   });
}
