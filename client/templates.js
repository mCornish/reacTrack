(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof root === 'undefined' || root !== Object(root)) {
        throw new Error('templatizer: window does not exist or is not an object');
    } else {
        root.templatizer = factory();
    }
}(this, function () {
    var jade=function(){function e(e){return null!=e&&""!==e}function n(t){return(Array.isArray(t)?t.map(n):t&&"object"==typeof t?Object.keys(t).filter(function(e){return t[e]}):[t]).filter(e).join(" ")}var t={};return t.merge=function r(n,t){if(1===arguments.length){for(var a=n[0],i=1;i<n.length;i++)a=r(a,n[i]);return a}var o=n["class"],s=t["class"];(o||s)&&(o=o||[],s=s||[],Array.isArray(o)||(o=[o]),Array.isArray(s)||(s=[s]),n["class"]=o.concat(s).filter(e));for(var l in t)"class"!=l&&(n[l]=t[l]);return n},t.joinClasses=n,t.cls=function(e,r){for(var a=[],i=0;i<e.length;i++)a.push(r&&r[i]?t.escape(n([e[i]])):n(e[i]));var o=n(a);return o.length?' class="'+o+'"':""},t.style=function(e){return e&&"object"==typeof e?Object.keys(e).map(function(n){return n+":"+e[n]}).join(";"):e},t.attr=function(e,n,r,a){return"style"===e&&(n=t.style(n)),"boolean"==typeof n||null==n?n?" "+(a?e:e+'="'+e+'"'):"":0==e.indexOf("data")&&"string"!=typeof n?(-1!==JSON.stringify(n).indexOf("&")&&console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"),n&&"function"==typeof n.toISOString&&console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0")," "+e+"='"+JSON.stringify(n).replace(/'/g,"&apos;")+"'"):r?(n&&"function"==typeof n.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+e+'="'+t.escape(n)+'"'):(n&&"function"==typeof n.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+e+'="'+n+'"')},t.attrs=function(e,r){var a=[],i=Object.keys(e);if(i.length)for(var o=0;o<i.length;++o){var s=i[o],l=e[s];"class"==s?(l=n(l))&&a.push(" "+s+'="'+l+'"'):a.push(t.attr(s,l,!1,r))}return a.join("")},t.escape=function(e){var n=String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");return n===""+e?e:n},t.rethrow=function a(e,n,t,r){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&n||r))throw e.message+=" on line "+t,e;try{r=r||require("fs").readFileSync(n,"utf8")}catch(i){a(e,null,t)}var o=3,s=r.split("\n"),l=Math.max(t-o,0),f=Math.min(s.length,t+o),o=s.slice(l,f).map(function(e,n){var r=n+l+1;return(r==t?"  > ":"    ")+r+"| "+e}).join("\n");throw e.path=n,e.message=(n||"Jade")+":"+t+"\n"+o+"\n\n"+e.message,e},t}();

    var templatizer = {};
    templatizer["includes"] = {};
    templatizer["pages"] = {};

    // body.jade compiled template
    templatizer["body"] = function tmpl_body() {
        return '<body><nav class="navbar navbar-default"><div class="container-fluid"><div class="navbar-header"><a data-hook="home-link" href="/" class="navbar-brand">yGmyG</a><ul class="nav navbar-nav"><li><a href="/find">Find a Gift</a></li><li><a href="/new-gift">Post a Gift</a></li><!--lia(href="/ygmyg") Gifts--><!--lia(href="/blog") Blog--><!--lia(href="/collections") collection demo--><!--lia(href="/tracks") tracks--><!--lia(href="/reactions") reactions--><li><a href="/profile">Profile</a></li><li><a data-hook="action-logout" class="logout-button">Log Out</a></li></ul></div></div></nav><div class="container"><main data-hook="page-container"></main></div></body>';
    };

    // head.jade compiled template
    templatizer["head"] = function tmpl_head() {
        return '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/><meta name="apple-mobile-web-app-capable" content="yes"/><script src=\'https://cdn.firebase.com/js/client/2.2.1/firebase.js\'></script>';
    };

    // includes/categoryList.jade compiled template
    templatizer["includes"]["categoryList"] = function tmpl_includes_categoryList() {
        return '<option data-hook="name"></option>';
    };

    // includes/comment.jade compiled template
    templatizer["includes"]["comment"] = function tmpl_includes_comment() {
        return '<li class="post list-group-item"><div><span>posted&nbsp;</span><span data-hook="time"></span></div><div><span>by&nbsp;</span><a data-hook="authorUrl"><span data-hook="author"></span></a></div><p data-hook="content"></p></li>';
    };

    // includes/featuredGift.jade compiled template
    templatizer["includes"]["featuredGift"] = function tmpl_includes_featuredGift() {
        return '<div class="featured__item"><a data-hook="view"><img data-hook="image" class="featured__image"/></a></div>';
    };

    // includes/formInput.jade compiled template
    templatizer["includes"]["formInput"] = function tmpl_includes_formInput() {
        return '<div class="form-group"><label data-hook="label"></label><div data-hook="message-container"><div data-hook="message-text" class="alert alert-danger"></div></div><input class="form-control"/></div>';
    };

    // includes/formTextarea.jade compiled template
    templatizer["includes"]["formTextarea"] = function tmpl_includes_formTextarea() {
        return '<div class="form-group"><label data-hook="label"></label><div data-hook="message-container"><div data-hook="message-text" class="alert alert-danger"></div></div><textarea class="form-control"></textarea></div>';
    };

    // includes/gift.jade compiled template
    templatizer["includes"]["gift"] = function tmpl_includes_gift() {
        return '<div class="grid-list__item js-item"><img data-hook="image" class="grid-list__image"/><div class="grid-list__container"><a data-hook="action-want wantButton"></a><p data-hook="wants"></p></div><a data-hook="edit" class="edit-button gift__edit">Edit</a><div data-hook="close" class="popup__close">X</div><div data-hook="shade" class="popup__shade"></div><div data-hook="popup" class="popup"><h2 data-hook="title"></h2><p data-hook="time-passed"></p><img data-hook="image" class="popup__image"/><div class="popup__container"><a data-hook="action-want wantButton"></a><p data-hook="wants"></p></div><form data-hook="comment-form"><fieldset data-hook="field-container"></fieldset><div class="buttons"><button data-hook="reset" type="submit" class="btn btn-primary">Comment</button></div></form><ul data-hook="comment-list" class="comments"></ul></div></div>';
    };

    // includes/person.jade compiled template
    templatizer["includes"]["person"] = function tmpl_includes_person() {
        return '<li class="person list-group-item"><img data-hook="avatar" width="40" height="40"/><a data-hook="name"></a><span class="btn-group pull-right"> <a data-hook="action-edit" class="btn btn-default">edit </a><a href="#" data-hook="action-delete" class="btn btn-danger">delete</a></span></li>';
    };

    // includes/post.jade compiled template
    templatizer["includes"]["post"] = function tmpl_includes_post() {
        return '<li class="post list-group-item"><h3 data-hook="date"></h3><a data-hook="view"><h2 data-hook="title"></h2></a><p data-hook="content"></p></li>';
    };

    // includes/postEditable.jade compiled template
    templatizer["includes"]["postEditable"] = function tmpl_includes_postEditable() {
        return '<li class="post list-group-item"><a data-hook="edit"><span data-hook="date"></span><span> | </span><span data-hook="title"></span></a></li>';
    };

    // includes/reaction.jade compiled template
    templatizer["includes"]["reaction"] = function tmpl_includes_reaction() {
        return '<li class="reaction list-group-item"><h2 data-hook="name"></h2><h3 data-hook="author"></h3><p data-hook="text"></p></li>';
    };

    // includes/track.jade compiled template
    templatizer["includes"]["track"] = function tmpl_includes_track() {
        return '<li class="track list-group-item"><a data-hook="view"><h2 data-hook="name"></h2><h3 data-hook="length"></h3></a></li>';
    };

    // pages/account.jade compiled template
    templatizer["pages"]["account"] = function tmpl_pages_account() {
        return '<section class="page account"><h2>Account Settings</h2><div data-hook="email-wrapper"><span>Email Address:&nbsp;</span><span data-hook="email"></span><a data-hook="email-change" class="pointer">Change Email Address</a></div><form data-hook="email-form" class="temp-hide email-form"><fieldset data-hook="field-container"></fieldset><div class="buttons"><button data-hook="reset" type="submit" class="btn btn-primary">Update</button><a data-hook="email-cancel" class="cancel-button">Cancel</a></div></form><br/><a data-hook="password-change" class="pointer">Change Password</a><form data-hook="password-form" class="temp-hide password-form"><fieldset data-hook="field-container"></fieldset><div class="buttons"><button data-hook="reset" type="submit" class="btn btn-primary">Update</button><a data-hook="password-cancel" class="cancel-button">Cancel</a></div></form></section>';
    };

    // pages/allPosts.jade compiled template
    templatizer["pages"]["allPosts"] = function tmpl_pages_allPosts() {
        return '<section class="page"><h2>All Posts</h2><ul data-hook="post-list" class="list-group"></ul></section>';
    };

    // pages/blog.jade compiled template
    templatizer["pages"]["blog"] = function tmpl_pages_blog() {
        return '<section class="page"><h2>Blog</h2><ul data-hook="post-list" class="list-group"></ul></section>';
    };

    // pages/collectionDemo.jade compiled template
    templatizer["pages"]["collectionDemo"] = function tmpl_pages_collectionDemo() {
        return '<section class="page pageOne"><h2>Collection demo</h2><p>Intelligently rendering collections can be a bit tricky. </p><p><a href="https://github.com/ampersandjs/ampersand-view">ampersand-view\'s</a> <code>renderCollection()</code> method makes it simple.</p><p>The only code required to manage the collection is:</p><pre><code>this.renderCollection(\n   this.collection, \n   PersonView, \n   this.queryByHook(\'people-list\')\n);</code></pre><h3>People container:</h3><ul data-hook="people-list" class="list-group"></ul><p>Try it by clicking the buttons</p><div class="buttons btn-group"><button data-hook="reset" class="btn btn-default">.reset() </button><button data-hook="fetch" class="btn btn-default">.fetch() </button><button data-hook="shuffle" class="btn btn-default">.shuffle() </button><button data-hook="add" class="btn btn-default">.addRandom()</button><a href="/person/add" class="btn btn-default">Add Person</a></div><p>Events are always managed so you don\'t get any leaks.</p></section>';
    };

    // pages/giftAdd.jade compiled template
    templatizer["pages"]["giftAdd"] = function tmpl_pages_giftAdd() {
        return '<section class="page add-gift"><h2>New Gift</h2><form data-hook="gift-form"><fieldset data-hook="field-container"></fieldset><div class="buttons"><button data-hook="reset" type="submit" class="btn btn-primary">Post</button></div></form></section>';
    };

    // pages/giftEdit.jade compiled template
    templatizer["pages"]["giftEdit"] = function tmpl_pages_giftEdit() {
        return '<section class="page edit-gift"><h2>Edit Gift</h2><form data-hook="gift-form"><fieldset data-hook="field-container"></fieldset><div class="buttons"><button data-hook="reset" type="submit" class="btn btn-primary">Update</button></div></form></section>';
    };

    // pages/giftView.jade compiled template
    templatizer["pages"]["giftView"] = function tmpl_pages_giftView() {
        return '<section class="page view-gift"><h2 data-hook="title"></h2><h3><div><span>Posted&nbsp;</span><span data-hook="time-passed"></span><span>&nbsp;by&nbsp;</span><a data-hook="userUrl"><span data-hook="user"></span></a></div></h3><img data-hook="image"/><p data-hook="description"></p><form data-hook="comment-form"><fieldset data-hook="field-container"></fieldset><div class="buttons"><button data-hook="reset" type="submit" class="btn btn-primary">Comment</button></div></form><ul data-hook="comment-list" class="comments"></ul></section>';
    };

    // pages/gifts.jade compiled template
    templatizer["pages"]["gifts"] = function tmpl_pages_gifts() {
        return '<section class="page"><div class="container"></div><h2>Gifts</h2><div class="form-inline"><div class="radio"><label><input data-hook="female" name="gender" type="radio"/><span>Female</span></label></div><div class="radio"><label><input data-hook="male" name="gender" type="radio"/><span>Male</span></label></div><div class="radio"><label><input data-hook="either" name="gender" type="radio" checked="checked"/><span>Either</span></label></div></div><div class="form-inline"><div class="form-group"><select data-hook="time-list" class="form-control"><option>From today</option><option>From this week</option><option>From this month</option><option>From this year</option><option>From whenever</option></select></div><div class="form-group"><select data-hook="recipient-list" class="form-control"></select></div><div class="form-group"><select data-hook="occasion-list" class="form-control"></select></div><div class="form-group"><select data-hook="age-list" class="form-control"><option>Age</option><option>Newborn</option><option>1 - 5</option><option>11 - 15</option><option>16 - 20</option><option>21 - 30</option><option>31 - 40</option><option>41 - 50</option><option>50+</option></select></div><!--.form-groupinput.form-control(data-hook="age-list" placeholder="Age")--><div class="form-group"><div class="input-group"><div class="input-group-addon">$</div><input data-hook="price-min" placeholder="Minimum Price" class="form-control"/></div></div><div class="form-group"><div class="input-group"><div class="input-group-addon">$</div><input data-hook="price-max" placeholder="Maximum Price" class="form-control"/></div></div></div><div data-hook="gift-list" class="grid-list"></div><button data-hook="more-button" class="btn btn-primary">More Gifts</button></section>';
    };

    // pages/home.jade compiled template
    templatizer["pages"]["home"] = function tmpl_pages_home() {
        return '<section class="page home"><h2>Featured Gifts</h2><div data-hook="featured" class="featured"></div><h2>Most Popular Gifts</h2><div data-hook="popular" class="featured"></div></section>';
    };

    // pages/info.jade compiled template
    templatizer["pages"]["info"] = function tmpl_pages_info() {
        return '<section class="page pageTwo"><h2>Simple Page Example</h2><p>This page was rendered by a simple page view file at client/pages/info.js.</p></section>';
    };

    // pages/login.jade compiled template
    templatizer["pages"]["login"] = function tmpl_pages_login(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(message) {
            buf.push('<section class="page login"><h2>Login</h2><form data-hook="login-form"><fieldset data-hook="field-container"></fieldset><div class="buttons"><div class="form-group"><button data-hook="reset" type="submit" class="btn btn-primary">Sign In</button><!--a(href="/register") Register--><div id="message"></div>');
            if (message) {
                buf.push('<h1 class="text-center error-message">' + jade.escape((jade_interp = message) == null ? "" : jade_interp) + "</h1>");
            }
            buf.push("</div></div></form></section>");
        }).call(this, "message" in locals_for_with ? locals_for_with.message : typeof message !== "undefined" ? message : undefined);
        return buf.join("");
    };

    // pages/personAdd.jade compiled template
    templatizer["pages"]["personAdd"] = function tmpl_pages_personAdd() {
        return '<section class="page add-person"><h2>Add Person</h2><p>This form and all behavior is defined by the form view in <code>client/forms/person.js</code>.</p><p>The same form-view is used for both editing and creating new users.</p><form data-hook="person-form"><fieldset data-hook="field-container"></fieldset><div class="buttons"><button data-hook="reset" type="submit" class="btn">Submit</button></div></form></section>';
    };

    // pages/personEdit.jade compiled template
    templatizer["pages"]["personEdit"] = function tmpl_pages_personEdit() {
        return '<section class="page edit-person"><h2>Edit Person</h2><p>This form and all behavior is defined by the form view in <code>client/forms/person.js</code>.</p><p>The same form-view is used for both editing and creating new users.</p><form data-hook="person-form"><fieldset data-hook="field-container"></fieldset><div class="buttons"><button data-hook="reset" type="submit" class="btn">Submit</button></div></form></section>';
    };

    // pages/personView.jade compiled template
    templatizer["pages"]["personView"] = function tmpl_pages_personView() {
        return '<section class="page view-person"><h2 data-hook="name"></h2><img data-hook="avatar" width="80" height="80"/><div class="buttons"><a data-hook="edit" class="btn">Edit</a><button data-hook="delete" class="btn">Delete</button></div></section>';
    };

    // pages/postAdd.jade compiled template
    templatizer["pages"]["postAdd"] = function tmpl_pages_postAdd() {
        return '<section class="page add-post"><h2>New Post</h2><form data-hook="post-form"><fieldset data-hook="field-container"></fieldset><div class="buttons"><button data-hook="reset" type="submit" class="btn btn-primary">Publish</button></div></form></section>';
    };

    // pages/postEdit.jade compiled template
    templatizer["pages"]["postEdit"] = function tmpl_pages_postEdit() {
        return '<section class="page edit-post"><h2>Edit Post</h2><form data-hook="post-form"><fieldset data-hook="field-container"></fieldset><div class="buttons"><button data-hook="reset" type="submit" class="btn btn-primary">Update</button></div></form></section>';
    };

    // pages/postView.jade compiled template
    templatizer["pages"]["postView"] = function tmpl_pages_postView() {
        return '<section class="page view-post"><h3 data-hook="date"></h3><h2 data-hook="title"></h2><a data-hook="edit">Edit</a><p data-hook="content"></p></section>';
    };

    // pages/reactionView.jade compiled template
    templatizer["pages"]["reactionView"] = function tmpl_pages_reactionView() {
        return '<section class="page"><h2 data-hook="name"></h2><h3 data-hook="author"></h3><p data-hook="text"></p></section>';
    };

    // pages/reactions.jade compiled template
    templatizer["pages"]["reactions"] = function tmpl_pages_reactions() {
        return '<section class="page"><h2>Reactions</h2><ul data-hook="reaction-list" class="list-group"></ul></section>';
    };

    // pages/trackView.jade compiled template
    templatizer["pages"]["trackView"] = function tmpl_pages_trackView() {
        return '<section class="page view-person"><h2 data-hook="name"></h2><h3 data-hook="length"></h3><a data-hook="edit">Edit</a><ul data-hook="reaction-list" class="list-group"></ul></section>';
    };

    // pages/tracks.jade compiled template
    templatizer["pages"]["tracks"] = function tmpl_pages_tracks() {
        return '<section class="page"><h2>Tracks</h2><ul data-hook="track-list" class="list-group"></ul></section>';
    };

    // pages/userAdd.jade compiled template
    templatizer["pages"]["userAdd"] = function tmpl_pages_userAdd() {
        return '<section class="page add-user"><h2>Register</h2><form data-hook="user-form"><fieldset data-hook="field-container"></fieldset><div class="buttons"><button data-hook="reset" type="submit" class="btn btn-primary">Register</button></div></form></section>';
    };

    // pages/userEdit.jade compiled template
    templatizer["pages"]["userEdit"] = function tmpl_pages_userEdit() {
        return '<section class="page edit-user"><h2>Update Profile</h2><form data-hook="user-form"><fieldset data-hook="field-container"></fieldset><div class="buttons"><button data-hook="reset" type="submit" class="btn btn-primary">Update</button><a data-hook="cancel-button" class="cancel-button">Cancel</a></div></form></section>';
    };

    // pages/userView.jade compiled template
    templatizer["pages"]["userView"] = function tmpl_pages_userView() {
        return '<section class="page view-user"><a data-hook="edit" href="/profile/edit" class="edit-button">Edit Profile</a><a href="/account">Account Settings</a><h2 data-hook="username"></h2><image data-hook="image"></image><p data-hook="full-name"></p><p data-hook="location"></p><a data-hook="website" target="_blank"></a><h3>Wants</h3><div data-hook="gift-list" class="grid-list"></div></section>';
    };

    return templatizer;
}));