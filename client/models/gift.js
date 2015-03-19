var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    props: {
        _id: 'any',
        user_id: 'any',
        title: ['string', true, 'Title'],
        image: ['string', true, 'Image'],
        description: ['string', false, 'Description'],
        link: ['string', false, ''],
        categories: ['array'],
        created: ['date', true, Date.now()]
    },
    derived: {
        viewUrl: {
            deps: ['_id'],
            fn: function () {
                return '/gift/' + this._id;
            }
        },
        editUrl: {
            deps: ['_id'],
            fn: function () {
                return '/gift/' + this._id + '/edit';
            }
        },
        time: {
            deps: ['date'],
            fn: function () {
                return analyzeDate(this.created);
            }
        },
        user: {
            deps: ['user_id'],
            fn: function () {
                return; //request user
            }
        },
        username: {
            deps: ['user_id'],
            fn: function () {
                return this.user.username;
            }
        },
        userUrl: {
            deps: ['user_id'],
            fn: function () {
                return '/user/' + this.user_id;
            }
        }
    }
});


function analyzeDate(date) {

    var now = new Date();
    var diff = Math.round(now - date);

    if ( diff < 1000 ) {
        return('Now');

    } else if ( diff >= 1000 && diff < 60*1000) {
        return( Math.round(diff/1000) +' seconds ago');

    } else if ( diff >= 60000 && diff < 60*60*1000) {
        return ( Math.round(diff/60000) +' minutes ago'); // 55 minutes ago

    } else if ( diff > 60*60*100 && diff < 86400000) {
        return ( Math.round(diff/3600000) + ' hours ago');
    } else {
        return reformatDate(date);
    }
}

function reformatDate(date) {

    var fullDate = [];
    var fullTime = [];

    var day = date.getDate()+'';
    var month = date.getMonth()+1+'';
    var year = date.getFullYear()+'';
    var hours = date.getHours()+'';
    var minutes = date.getMinutes()+'';

    if (day.length < 2) { day = '0' + day; }
    if (month.length < 2) { month = '0' + month; }
    if (year.length < 2) { year = '0' + year;}
    if (hours.length < 2) { hours = '0' + hours; }
    if (minutes.length < 2) { minutes = '0'+ minutes;}

    fullDate.push(month);
    fullDate.push(day);
    fullDate.push( year.slice(-2) );
    fullTime.push(hours);
    fullTime.push(minutes);

    return fullDate.join('.')+' '+fullTime.join(':');
}
