var Firebase = require('firebase');
var ref = new Firebase('sizzling-fire-6725.firebaseIO.com');

var data;

exports.init = function() {
    ref.onAuth(function(authData) {
        if (authData) {
            // $('.unauthed').hide();
            // $('.authed').show();

            me.id = authData.uid.replace('simplelogin:', '').replace('facebook:', '');
            me.username = getUsername(authData);
            me.provider = authData.provider;
            me.email = getEmail(authData);

            data = authData;

            app.users.fetch({
                success: function() {

                    var user = app.users.get(me.id);

                    if (!user) {
                        me.wants = [];
                        app.users.create(me.toJSON(), {
                            wait: true,
                            success: function (collection, res) {
                                //app.navigate('/');
                            }
                        });
                    } else {
                        me.wants = user.wants;
                        //app.navigate('/');
                    }
                }
            });

        } else {
            app.navigate('/login');
        }
    });
};

exports.getUsername = function() {
    ref.onAuth(function(authData) {
        switch(authData.provider) {
            case 'password':
                return authData.password.email.replace(/@.*/, '');
            case 'twitter':
                return authData.twitter.displayName;
            case 'facebook':
                return authData.facebook.displayName;
       }
   });
};

var getUsername = function(authData) {
    switch(authData.provider) {
        case 'password':
            return authData.password.email.replace(/@.*/, '');
        case 'twitter':
            return authData.twitter.displayName;
        case 'facebook':
            return authData.facebook.displayName;
   }
};

var getEmail = function(authData) {
    switch(authData.provider) {
        case 'password':
            return authData.password.email;
        case 'twitter':
            return authData.twitter.email;
        case 'facebook':
            return authData.facebook.email;
   }
};
