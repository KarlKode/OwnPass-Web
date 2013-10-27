(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("application", function(exports, require, module) {
var Application, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = Application = (function(_super) {
  __extends(Application, _super);

  function Application() {
    _ref = Application.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  return Application;

})(Chaplin.Application);
});

;require.register("controllers/base/appcontroller", function(exports, require, module) {
var Controller, HeaderView, HomeController, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('controllers/base/controller');

HeaderView = require('views/home/header-view');

module.exports = HomeController = (function(_super) {
  __extends(HomeController, _super);

  function HomeController() {
    _ref = HomeController.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  HomeController.prototype.beforeAction = function() {
    HomeController.__super__.beforeAction.apply(this, arguments);
    return this.compose('header', HeaderView, {
      region: 'header'
    });
  };

  return HomeController;

})(Controller);
});

;require.register("controllers/base/controller", function(exports, require, module) {
var Controller, SiteView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SiteView = require('views/site-view');

module.exports = Controller = (function(_super) {
  __extends(Controller, _super);

  function Controller() {
    _ref = Controller.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Controller.prototype.beforeAction = function() {
    return this.compose('site', SiteView);
  };

  return Controller;

})(Chaplin.Controller);
});

;require.register("controllers/devices-controller", function(exports, require, module) {
var Controller, DevicesController, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('controllers/base/controller');

module.exports = DevicesController = (function(_super) {
  __extends(DevicesController, _super);

  function DevicesController() {
    _ref = DevicesController.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  return DevicesController;

})(Controller);
});

;require.register("controllers/home-controller", function(exports, require, module) {
var AppController, HeaderView, HomeController, HomePageView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AppController = require('controllers/base/appcontroller');

HeaderView = require('views/home/header-view');

HomePageView = require('views/home/home-page-view');

module.exports = HomeController = (function(_super) {
  __extends(HomeController, _super);

  function HomeController() {
    _ref = HomeController.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  HomeController.prototype.index = function() {
    return this.view = new HomePageView({
      region: 'main'
    });
  };

  return HomeController;

})(AppController);
});

;require.register("controllers/locations-controller", function(exports, require, module) {
var AppController, Collection, Location, LocationView, LocationsController, LocationsView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AppController = require('controllers/base/appcontroller');

LocationsView = require('views/locations-view');

LocationView = require('views/location-view');

Collection = require('models/base/collection');

Location = require('models/location');

module.exports = LocationsController = (function(_super) {
  __extends(LocationsController, _super);

  function LocationsController() {
    _ref = LocationsController.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  LocationsController.prototype.index = function() {
    this.locations = new Collection(null, {
      model: Location
    });
    this.locations.url = "" + window.api + "logins";
    this.view = new LocationsView({
      collection: this.locations,
      region: 'main'
    });
    this.view.render();
    return this.locations.fetch();
  };

  return LocationsController;

})(AppController);
});

;require.register("controllers/login-controller", function(exports, require, module) {
var AuthorizeView, Controller, LoginView, LoginsController, RegisterView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('controllers/base/controller');

LoginView = require('views/login-view');

RegisterView = require('views/register-view');

AuthorizeView = require('views/authorize-view');

module.exports = LoginsController = (function(_super) {
  __extends(LoginsController, _super);

  function LoginsController() {
    _ref = LoginsController.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  LoginsController.prototype.index = function() {
    return this.view = new LoginView({
      region: 'main'
    });
  };

  LoginsController.prototype.register = function() {
    return this.view = new RegisterView({
      region: 'main'
    });
  };

  LoginsController.prototype.authorize = function(opts) {
    return this.view = new AuthorizeView({
      devid: opts.devid,
      devhash: opts.devhash,
      region: 'main'
    });
  };

  return LoginsController;

})(Controller);
});

;require.register("controllers/password-controller", function(exports, require, module) {
var AppController, Collection, Password, PasswordView, PasswordsController, PasswordsView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AppController = require('controllers/base/appcontroller');

PasswordsView = require('views/passwords-view');

PasswordView = require('views/password-view');

Collection = require('models/base/collection');

Password = require('models/password');

module.exports = PasswordsController = (function(_super) {
  __extends(PasswordsController, _super);

  function PasswordsController() {
    _ref = PasswordsController.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  PasswordsController.prototype.index = function() {
    this.passwords = new Collection(null, {
      model: Password
    });
    this.passwords.url = "" + window.api + "passwords";
    this.view = new PasswordsView({
      collection: this.passwords,
      region: 'main'
    });
    this.view.render();
    return this.passwords.fetch();
  };

  PasswordsController.prototype.edit = function(id) {
    return this.view = new PasswordView({
      region: 'main'
    });
  };

  PasswordsController.prototype.edit = function(id) {
    return this.view = new PasswordView({
      region: 'main'
    });
  };

  return PasswordsController;

})(AppController);
});

;require.register("controllers/user-controller", function(exports, require, module) {
var AppController, UsersController, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AppController = require('controllers/base/appcontroller');

module.exports = UsersController = (function(_super) {
  __extends(UsersController, _super);

  function UsersController() {
    _ref = UsersController.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  return UsersController;

})(AppController);
});

;require.register("initialize", function(exports, require, module) {
var Application, routes;

Application = require('application');

routes = require('routes');

window.api = "https://ownpass.marcg.ch/";

$(function() {
  $.ajaxSetup({
    beforeSend: function(xhr) {
      if (window.user != null) {
        return xhr.setRequestHeader("Authorization", "Basic " + btoa(window.user.email + ":" + window.user.password));
      }
    },
    statusCode: {
      400: function(xhr) {
        var json;
        json = $.parseJSON(xhr.responseText);
        if ((json.id != null) && (json.device != null)) {
          Chaplin.helpers.redirectTo('login#authorize', {
            devid: json.id,
            devhash: json.device
          });
          return;
        }
        alertify.error(json.message);
        return Chaplin.helpers.redirectTo('login#index', {});
      },
      403: function(xhr) {
        alertify.error("Invalid resource");
        return Chaplin.helpers.redirectTo('login#index', {});
      },
      404: function(xhr) {
        var json;
        json = $.parseJSON(xhr.responseText);
        return alertify.error(json.message);
      },
      406: function(xhr) {
        return alertify.error("Please fill out the form");
      },
      409: function(xhr) {
        return alertify.error("User name taken");
      },
      500: function(xhr) {
        alertify.error("OOPPSSS! Some thing unexpected happened!");
        return Chaplin.helpers.redirectTo('login#index', {});
      }
    }
  });
  return new Application({
    title: 'OwnPass',
    pushState: false,
    controllerSuffix: '-controller',
    routes: routes
  });
});
});

;require.register("lib/cryptojs", function(exports, require, module) {
var CryptoJS=CryptoJS||function(h,s){var f={},t=f.lib={},g=function(){},j=t.Base={extend:function(a){g.prototype=this;var c=new g;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
q=t.WordArray=j.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=s?c:4*a.length},toString:function(a){return(a||u).stringify(this)},concat:function(a){var c=this.words,d=a.words,b=this.sigBytes;a=a.sigBytes;this.clamp();if(b%4)for(var e=0;e<a;e++)c[b+e>>>2]|=(d[e>>>2]>>>24-8*(e%4)&255)<<24-8*((b+e)%4);else if(65535<d.length)for(e=0;e<a;e+=4)c[b+e>>>2]=d[e>>>2];else c.push.apply(c,d);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=h.ceil(c/4)},clone:function(){var a=j.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],d=0;d<a;d+=4)c.push(4294967296*h.random()|0);return new q.init(c,a)}}),v=f.enc={},u=v.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++){var e=c[b>>>2]>>>24-8*(b%4)&255;d.push((e>>>4).toString(16));d.push((e&15).toString(16))}return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b+=2)d[b>>>3]|=parseInt(a.substr(b,
2),16)<<24-4*(b%8);return new q.init(d,c/2)}},k=v.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var d=[],b=0;b<a;b++)d.push(String.fromCharCode(c[b>>>2]>>>24-8*(b%4)&255));return d.join("")},parse:function(a){for(var c=a.length,d=[],b=0;b<c;b++)d[b>>>2]|=(a.charCodeAt(b)&255)<<24-8*(b%4);return new q.init(d,c)}},l=v.Utf8={stringify:function(a){try{return decodeURIComponent(escape(k.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return k.parse(unescape(encodeURIComponent(a)))}},
x=t.BufferedBlockAlgorithm=j.extend({reset:function(){this._data=new q.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=l.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,d=c.words,b=c.sigBytes,e=this.blockSize,f=b/(4*e),f=a?h.ceil(f):h.max((f|0)-this._minBufferSize,0);a=f*e;b=h.min(4*a,b);if(a){for(var m=0;m<a;m+=e)this._doProcessBlock(d,m);m=d.splice(0,a);c.sigBytes-=b}return new q.init(m,b)},clone:function(){var a=j.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});t.Hasher=x.extend({cfg:j.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){x.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,d){return(new a.init(d)).finalize(c)}},_createHmacHelper:function(a){return function(c,d){return(new w.HMAC.init(a,
d)).finalize(c)}}});var w=f.algo={};return f}(Math);
(function(h){for(var s=CryptoJS,f=s.lib,t=f.WordArray,g=f.Hasher,f=s.algo,j=[],q=[],v=function(a){return 4294967296*(a-(a|0))|0},u=2,k=0;64>k;){var l;a:{l=u;for(var x=h.sqrt(l),w=2;w<=x;w++)if(!(l%w)){l=!1;break a}l=!0}l&&(8>k&&(j[k]=v(h.pow(u,0.5))),q[k]=v(h.pow(u,1/3)),k++);u++}var a=[],f=f.SHA256=g.extend({_doReset:function(){this._hash=new t.init(j.slice(0))},_doProcessBlock:function(c,d){for(var b=this._hash.words,e=b[0],f=b[1],m=b[2],h=b[3],p=b[4],j=b[5],k=b[6],l=b[7],n=0;64>n;n++){if(16>n)a[n]=
c[d+n]|0;else{var r=a[n-15],g=a[n-2];a[n]=((r<<25|r>>>7)^(r<<14|r>>>18)^r>>>3)+a[n-7]+((g<<15|g>>>17)^(g<<13|g>>>19)^g>>>10)+a[n-16]}r=l+((p<<26|p>>>6)^(p<<21|p>>>11)^(p<<7|p>>>25))+(p&j^~p&k)+q[n]+a[n];g=((e<<30|e>>>2)^(e<<19|e>>>13)^(e<<10|e>>>22))+(e&f^e&m^f&m);l=k;k=j;j=p;p=h+r|0;h=m;m=f;f=e;e=r+g|0}b[0]=b[0]+e|0;b[1]=b[1]+f|0;b[2]=b[2]+m|0;b[3]=b[3]+h|0;b[4]=b[4]+p|0;b[5]=b[5]+j|0;b[6]=b[6]+k|0;b[7]=b[7]+l|0},_doFinalize:function(){var a=this._data,d=a.words,b=8*this._nDataBytes,e=8*a.sigBytes;
d[e>>>5]|=128<<24-e%32;d[(e+64>>>9<<4)+14]=h.floor(b/4294967296);d[(e+64>>>9<<4)+15]=b;a.sigBytes=4*d.length;this._process();return this._hash},clone:function(){var a=g.clone.call(this);a._hash=this._hash.clone();return a}});s.SHA256=g._createHelper(f);s.HmacSHA256=g._createHmacHelper(f)})(Math);
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(){var h=CryptoJS,j=h.lib.WordArray;h.enc.Base64={stringify:function(b){var e=b.words,f=b.sigBytes,c=this._map;b.clamp();b=[];for(var a=0;a<f;a+=3)for(var d=(e[a>>>2]>>>24-8*(a%4)&255)<<16|(e[a+1>>>2]>>>24-8*((a+1)%4)&255)<<8|e[a+2>>>2]>>>24-8*((a+2)%4)&255,g=0;4>g&&a+0.75*g<f;g++)b.push(c.charAt(d>>>6*(3-g)&63));if(e=c.charAt(64))for(;b.length%4;)b.push(e);return b.join("")},parse:function(b){var e=b.length,f=this._map,c=f.charAt(64);c&&(c=b.indexOf(c),-1!=c&&(e=c));for(var c=[],a=0,d=0;d<
e;d++)if(d%4){var g=f.indexOf(b.charAt(d-1))<<2*(d%4),h=f.indexOf(b.charAt(d))>>>6-2*(d%4);c[a>>>2]|=(g|h)<<24-8*(a%4);a++}return j.create(c,a)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(u,p){var d={},l=d.lib={},s=function(){},t=l.Base={extend:function(a){s.prototype=this;var c=new s;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=l.WordArray=t.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=p?c:4*a.length},toString:function(a){return(a||v).stringify(this)},concat:function(a){var c=this.words,e=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var k=0;k<a;k++)c[j+k>>>2]|=(e[k>>>2]>>>24-8*(k%4)&255)<<24-8*((j+k)%4);else if(65535<e.length)for(k=0;k<a;k+=4)c[j+k>>>2]=e[k>>>2];else c.push.apply(c,e);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=u.ceil(c/4)},clone:function(){var a=t.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],e=0;e<a;e+=4)c.push(4294967296*u.random()|0);return new r.init(c,a)}}),w=d.enc={},v=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++){var k=c[j>>>2]>>>24-8*(j%4)&255;e.push((k>>>4).toString(16));e.push((k&15).toString(16))}return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j+=2)e[j>>>3]|=parseInt(a.substr(j,
2),16)<<24-4*(j%8);return new r.init(e,c/2)}},b=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++)e.push(String.fromCharCode(c[j>>>2]>>>24-8*(j%4)&255));return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j++)e[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new r.init(e,c)}},x=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(b.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return b.parse(unescape(encodeURIComponent(a)))}},
q=l.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=x.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,e=c.words,j=c.sigBytes,k=this.blockSize,b=j/(4*k),b=a?u.ceil(b):u.max((b|0)-this._minBufferSize,0);a=b*k;j=u.min(4*a,j);if(a){for(var q=0;q<a;q+=k)this._doProcessBlock(e,q);q=e.splice(0,a);c.sigBytes-=j}return new r.init(q,j)},clone:function(){var a=t.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:t.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,e){return(new a.init(e)).finalize(b)}},_createHmacHelper:function(a){return function(b,e){return(new n.HMAC.init(a,
e)).finalize(b)}}});var n=d.algo={};return d}(Math);
(function(){var u=CryptoJS,p=u.lib.WordArray;u.enc.Base64={stringify:function(d){var l=d.words,p=d.sigBytes,t=this._map;d.clamp();d=[];for(var r=0;r<p;r+=3)for(var w=(l[r>>>2]>>>24-8*(r%4)&255)<<16|(l[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|l[r+2>>>2]>>>24-8*((r+2)%4)&255,v=0;4>v&&r+0.75*v<p;v++)d.push(t.charAt(w>>>6*(3-v)&63));if(l=t.charAt(64))for(;d.length%4;)d.push(l);return d.join("")},parse:function(d){var l=d.length,s=this._map,t=s.charAt(64);t&&(t=d.indexOf(t),-1!=t&&(l=t));for(var t=[],r=0,w=0;w<
l;w++)if(w%4){var v=s.indexOf(d.charAt(w-1))<<2*(w%4),b=s.indexOf(d.charAt(w))>>>6-2*(w%4);t[r>>>2]|=(v|b)<<24-8*(r%4);r++}return p.create(t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
(function(u){function p(b,n,a,c,e,j,k){b=b+(n&a|~n&c)+e+k;return(b<<j|b>>>32-j)+n}function d(b,n,a,c,e,j,k){b=b+(n&c|a&~c)+e+k;return(b<<j|b>>>32-j)+n}function l(b,n,a,c,e,j,k){b=b+(n^a^c)+e+k;return(b<<j|b>>>32-j)+n}function s(b,n,a,c,e,j,k){b=b+(a^(n|~c))+e+k;return(b<<j|b>>>32-j)+n}for(var t=CryptoJS,r=t.lib,w=r.WordArray,v=r.Hasher,r=t.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;r=r.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(q,n){for(var a=0;16>a;a++){var c=n+a,e=q[c];q[c]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360}var a=this._hash.words,c=q[n+0],e=q[n+1],j=q[n+2],k=q[n+3],z=q[n+4],r=q[n+5],t=q[n+6],w=q[n+7],v=q[n+8],A=q[n+9],B=q[n+10],C=q[n+11],u=q[n+12],D=q[n+13],E=q[n+14],x=q[n+15],f=a[0],m=a[1],g=a[2],h=a[3],f=p(f,m,g,h,c,7,b[0]),h=p(h,f,m,g,e,12,b[1]),g=p(g,h,f,m,j,17,b[2]),m=p(m,g,h,f,k,22,b[3]),f=p(f,m,g,h,z,7,b[4]),h=p(h,f,m,g,r,12,b[5]),g=p(g,h,f,m,t,17,b[6]),m=p(m,g,h,f,w,22,b[7]),
f=p(f,m,g,h,v,7,b[8]),h=p(h,f,m,g,A,12,b[9]),g=p(g,h,f,m,B,17,b[10]),m=p(m,g,h,f,C,22,b[11]),f=p(f,m,g,h,u,7,b[12]),h=p(h,f,m,g,D,12,b[13]),g=p(g,h,f,m,E,17,b[14]),m=p(m,g,h,f,x,22,b[15]),f=d(f,m,g,h,e,5,b[16]),h=d(h,f,m,g,t,9,b[17]),g=d(g,h,f,m,C,14,b[18]),m=d(m,g,h,f,c,20,b[19]),f=d(f,m,g,h,r,5,b[20]),h=d(h,f,m,g,B,9,b[21]),g=d(g,h,f,m,x,14,b[22]),m=d(m,g,h,f,z,20,b[23]),f=d(f,m,g,h,A,5,b[24]),h=d(h,f,m,g,E,9,b[25]),g=d(g,h,f,m,k,14,b[26]),m=d(m,g,h,f,v,20,b[27]),f=d(f,m,g,h,D,5,b[28]),h=d(h,f,
m,g,j,9,b[29]),g=d(g,h,f,m,w,14,b[30]),m=d(m,g,h,f,u,20,b[31]),f=l(f,m,g,h,r,4,b[32]),h=l(h,f,m,g,v,11,b[33]),g=l(g,h,f,m,C,16,b[34]),m=l(m,g,h,f,E,23,b[35]),f=l(f,m,g,h,e,4,b[36]),h=l(h,f,m,g,z,11,b[37]),g=l(g,h,f,m,w,16,b[38]),m=l(m,g,h,f,B,23,b[39]),f=l(f,m,g,h,D,4,b[40]),h=l(h,f,m,g,c,11,b[41]),g=l(g,h,f,m,k,16,b[42]),m=l(m,g,h,f,t,23,b[43]),f=l(f,m,g,h,A,4,b[44]),h=l(h,f,m,g,u,11,b[45]),g=l(g,h,f,m,x,16,b[46]),m=l(m,g,h,f,j,23,b[47]),f=s(f,m,g,h,c,6,b[48]),h=s(h,f,m,g,w,10,b[49]),g=s(g,h,f,m,
E,15,b[50]),m=s(m,g,h,f,r,21,b[51]),f=s(f,m,g,h,u,6,b[52]),h=s(h,f,m,g,k,10,b[53]),g=s(g,h,f,m,B,15,b[54]),m=s(m,g,h,f,e,21,b[55]),f=s(f,m,g,h,v,6,b[56]),h=s(h,f,m,g,x,10,b[57]),g=s(g,h,f,m,t,15,b[58]),m=s(m,g,h,f,D,21,b[59]),f=s(f,m,g,h,z,6,b[60]),h=s(h,f,m,g,C,10,b[61]),g=s(g,h,f,m,j,15,b[62]),m=s(m,g,h,f,A,21,b[63]);a[0]=a[0]+f|0;a[1]=a[1]+m|0;a[2]=a[2]+g|0;a[3]=a[3]+h|0},_doFinalize:function(){var b=this._data,n=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;n[c>>>5]|=128<<24-c%32;var e=u.floor(a/
4294967296);n[(c+64>>>9<<4)+15]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360;n[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(n.length+1);this._process();b=this._hash;n=b.words;for(a=0;4>a;a++)c=n[a],n[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});t.MD5=v._createHelper(r);t.HmacMD5=v._createHmacHelper(r)})(Math);
(function(){var u=CryptoJS,p=u.lib,d=p.Base,l=p.WordArray,p=u.algo,s=p.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:p.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,r){for(var p=this.cfg,s=p.hasher.create(),b=l.create(),u=b.words,q=p.keySize,p=p.iterations;u.length<q;){n&&s.update(n);var n=s.update(d).finalize(r);s.reset();for(var a=1;a<p;a++)n=s.finalize(n),s.reset();b.concat(n)}b.sigBytes=4*q;return b}});u.EvpKDF=function(d,l,p){return s.create(p).compute(d,
l)}})();
CryptoJS.lib.Cipher||function(u){var p=CryptoJS,d=p.lib,l=d.Base,s=d.WordArray,t=d.BufferedBlockAlgorithm,r=p.enc.Base64,w=p.algo.EvpKDF,v=d.Cipher=t.extend({cfg:l.extend(),createEncryptor:function(e,a){return this.create(this._ENC_XFORM_MODE,e,a)},createDecryptor:function(e,a){return this.create(this._DEC_XFORM_MODE,e,a)},init:function(e,a,b){this.cfg=this.cfg.extend(b);this._xformMode=e;this._key=a;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(e){this._append(e);return this._process()},
finalize:function(e){e&&this._append(e);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(b,k,d){return("string"==typeof k?c:a).encrypt(e,b,k,d)},decrypt:function(b,k,d){return("string"==typeof k?c:a).decrypt(e,b,k,d)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=p.mode={},x=function(e,a,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var d=0;d<b;d++)e[a+d]^=
c[d]},q=(d.BlockCipherMode=l.extend({createEncryptor:function(e,a){return this.Encryptor.create(e,a)},createDecryptor:function(e,a){return this.Decryptor.create(e,a)},init:function(e,a){this._cipher=e;this._iv=a}})).extend();q.Encryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize;x.call(this,e,a,c);b.encryptBlock(e,a);this._prevBlock=e.slice(a,a+c)}});q.Decryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize,d=e.slice(a,a+c);b.decryptBlock(e,a);x.call(this,
e,a,c);this._prevBlock=d}});b=b.CBC=q;q=(p.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(d);c=s.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:q}),reset:function(){v.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,
this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var n=d.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(p.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?s.create([1398893684,
1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=s.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return n.create({ciphertext:a,salt:c})}},a=d.SerializableCipher=l.extend({cfg:l.extend({format:b}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var l=a.createEncryptor(c,d);b=l.finalize(b);l=l.cfg;return n.create({ciphertext:b,key:c,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),p=(p.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=s.random(8));a=w.create({keySize:b+c}).compute(a,d);c=s.create(a.words.slice(b),4*c);a.sigBytes=4*b;return n.create({key:a,iv:c,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:p}),encrypt:function(b,c,d,l){l=this.cfg.extend(l);d=l.kdf.execute(d,
b.keySize,b.ivSize);l.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,l);b.mixIn(d);return b},decrypt:function(b,c,d,l){l=this.cfg.extend(l);c=this._parse(c,l.format);d=l.kdf.execute(d,b.keySize,b.ivSize,c.salt);l.iv=d.iv;return a.decrypt.call(this,b,c,d.key,l)}})}();
(function(){for(var u=CryptoJS,p=u.lib.BlockCipher,d=u.algo,l=[],s=[],t=[],r=[],w=[],v=[],b=[],x=[],q=[],n=[],a=[],c=0;256>c;c++)a[c]=128>c?c<<1:c<<1^283;for(var e=0,j=0,c=0;256>c;c++){var k=j^j<<1^j<<2^j<<3^j<<4,k=k>>>8^k&255^99;l[e]=k;s[k]=e;var z=a[e],F=a[z],G=a[F],y=257*a[k]^16843008*k;t[e]=y<<24|y>>>8;r[e]=y<<16|y>>>16;w[e]=y<<8|y>>>24;v[e]=y;y=16843009*G^65537*F^257*z^16843008*e;b[k]=y<<24|y>>>8;x[k]=y<<16|y>>>16;q[k]=y<<8|y>>>24;n[k]=y;e?(e=z^a[a[a[G^z]]],j^=a[a[j]]):e=j=1}var H=[0,1,2,4,8,
16,32,64,128,27,54],d=d.AES=p.extend({_doReset:function(){for(var a=this._key,c=a.words,d=a.sigBytes/4,a=4*((this._nRounds=d+6)+1),e=this._keySchedule=[],j=0;j<a;j++)if(j<d)e[j]=c[j];else{var k=e[j-1];j%d?6<d&&4==j%d&&(k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255]):(k=k<<8|k>>>24,k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255],k^=H[j/d|0]<<24);e[j]=e[j-d]^k}c=this._invKeySchedule=[];for(d=0;d<a;d++)j=a-d,k=d%4?e[j]:e[j-4],c[d]=4>d||4>=j?k:b[l[k>>>24]]^x[l[k>>>16&255]]^q[l[k>>>
8&255]]^n[l[k&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,t,r,w,v,l)},decryptBlock:function(a,c){var d=a[c+1];a[c+1]=a[c+3];a[c+3]=d;this._doCryptBlock(a,c,this._invKeySchedule,b,x,q,n,s);d=a[c+1];a[c+1]=a[c+3];a[c+3]=d},_doCryptBlock:function(a,b,c,d,e,j,l,f){for(var m=this._nRounds,g=a[b]^c[0],h=a[b+1]^c[1],k=a[b+2]^c[2],n=a[b+3]^c[3],p=4,r=1;r<m;r++)var q=d[g>>>24]^e[h>>>16&255]^j[k>>>8&255]^l[n&255]^c[p++],s=d[h>>>24]^e[k>>>16&255]^j[n>>>8&255]^l[g&255]^c[p++],t=
d[k>>>24]^e[n>>>16&255]^j[g>>>8&255]^l[h&255]^c[p++],n=d[n>>>24]^e[g>>>16&255]^j[h>>>8&255]^l[k&255]^c[p++],g=q,h=s,k=t;q=(f[g>>>24]<<24|f[h>>>16&255]<<16|f[k>>>8&255]<<8|f[n&255])^c[p++];s=(f[h>>>24]<<24|f[k>>>16&255]<<16|f[n>>>8&255]<<8|f[g&255])^c[p++];t=(f[k>>>24]<<24|f[n>>>16&255]<<16|f[g>>>8&255]<<8|f[h&255])^c[p++];n=(f[n>>>24]<<24|f[g>>>16&255]<<16|f[h>>>8&255]<<8|f[k&255])^c[p++];a[b]=q;a[b+1]=s;a[b+2]=t;a[b+3]=n},keySize:8});u.AES=p._createHelper(d)})();
module.exports = CryptoJS
});

;require.register("lib/utils", function(exports, require, module) {
var CryptoJS, utils;

utils = Chaplin.utils.beget(Chaplin.utils);

CryptoJS = require('lib/cryptojs');

_(utils).extend({
  hash_password: function(email, pw) {
    return CryptoJS.SHA256(pw).toString(CryptoJS.enc.Base64);
  },
  get_secret: function() {
    return CryptoJS.SHA256(window.user.plainpw).toString(CryptoJS.enc.Base64);
  },
  get_iv: function() {
    return CryptoJS.SHA256(window.user.plainpw).toString(CryptoJS.enc.Base64);
  },
  encrypt: function(message) {
    var cr;
    cr = CryptoJS.AES.encrypt(message, utils.get_secret());
    return cr.iv.toString(CryptoJS.enc.Base64) + ":" + cr.salt.toString(CryptoJS.enc.Base64) + ":" + cr.ciphertext.toString(CryptoJS.enc.Base64);
  },
  decrypt: function(message) {
    var parts;
    parts = message.split(":");
    return CryptoJS.AES.decrypt(CryptoJS.lib.CipherParams.create({
      iv: CryptoJS.enc.Base64.parse(parts[0]),
      ciphertext: CryptoJS.enc.Base64.parse(parts[2]),
      salt: CryptoJS.enc.Base64.parse(parts[1])
    }), utils.get_secret()).toString(CryptoJS.enc.Utf8);
  }
});

if (typeof Object.seal === "function") {
  Object.seal(utils);
}

module.exports = utils;
});

;require.register("lib/view-helper", function(exports, require, module) {
var register,
  __slice = [].slice;

register = function(name, fn) {
  return Handlebars.registerHelper(name, fn);
};

register('with', function(context, fn) {
  if (!context || Handlebars.Utils.isEmpty(context)) {
    return options.inverse(this);
  } else {
    return options.fn(context);
  }
});

register('withUser', function(context, fn) {
  return context.fn(window.user || {
    email: ""
  });
});

register('withWindow', function(context, fn) {
  return context.fn(window);
});

register('without', function(context, options) {
  var inverse;
  inverse = options.inverse;
  options.inverse = options.fn;
  options.fn = inverse;
  return Handlebars.helpers["with"].call(this, context, options);
});

register('url', function() {
  var options, params, routeName, _i;
  routeName = arguments[0], params = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), options = arguments[_i++];
  return Chaplin.helpers.reverse(routeName, params);
});
});

;require.register("mediator", function(exports, require, module) {
var mediator;

mediator = module.exports = Chaplin.mediator;
});

;require.register("models/base/collection", function(exports, require, module) {
var Collection, Model, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('./model');

module.exports = Collection = (function(_super) {
  __extends(Collection, _super);

  function Collection() {
    _ref = Collection.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Collection.prototype.model = Model;

  return Collection;

})(Chaplin.Collection);
});

;require.register("models/base/model", function(exports, require, module) {
var Model, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = Model = (function(_super) {
  __extends(Model, _super);

  function Model() {
    _ref = Model.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Model.prototype.idAttribute = "id";

  return Model;

})(Chaplin.Model);
});

;require.register("models/devices", function(exports, require, module) {
var Devices, Model, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('/models/base/model');

module.exports = Devices = (function(_super) {
  __extends(Devices, _super);

  function Devices() {
    _ref = Devices.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  return Devices;

})(Model);
});

;require.register("models/location", function(exports, require, module) {
var Location, Model, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('/models/base/model');

module.exports = Location = (function(_super) {
  __extends(Location, _super);

  function Location() {
    _ref = Location.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Location.prototype.urlRoot = "https://ownpass.marcg.ch/logins";

  return Location;

})(Model);
});

;require.register("models/password", function(exports, require, module) {
var Model, Password, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('/models/base/model');

module.exports = Password = (function(_super) {
  __extends(Password, _super);

  function Password() {
    _ref = Password.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Password.prototype.urlRoot = "https://ownpass.marcg.ch/passwords";

  return Password;

})(Model);
});

;require.register("models/user", function(exports, require, module) {
var Model, User, Utils, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('/models/base/model');

Utils = require('lib/utils');

module.exports = User = (function(_super) {
  __extends(User, _super);

  function User() {
    _ref = User.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  User.prototype.urlRoot = "" + window.api + "users";

  return User;

})(Model);
});

;require.register("routes", function(exports, require, module) {
module.exports = function(match) {
  match('', 'login#index');
  match('register', 'login#register');
  match('authorize/:devid/:devhash', 'login#authorize');
  match('passwords', 'password#index');
  match('passwords/:id', 'password#edit');
  return match('locations', 'locations#index');
};
});

;require.register("views/authorize-view", function(exports, require, module) {
var AuthorizeView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

module.exports = AuthorizeView = (function(_super) {
  __extends(AuthorizeView, _super);

  function AuthorizeView() {
    _ref = AuthorizeView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  AuthorizeView.prototype.autoRender = true;

  AuthorizeView.prototype.className = 'home-page';

  AuthorizeView.prototype.template = require('./templates/authorize');

  AuthorizeView.prototype.initialize = function(options) {
    AuthorizeView.__super__.initialize.apply(this, arguments);
    this.devid = options.devid;
    this.devhash = options.devhash;
    return this.delegate('click', '.authorize', this.authorize);
  };

  AuthorizeView.prototype.authorize = function(e) {
    var _this = this;
    e.preventDefault();
    $(e.target).button("loading");
    return $.ajax({
      method: 'PUT',
      data: JSON.stringify({
        device: this.devhash,
        active: true,
        code: this.$el.find('.auth').val()
      }),
      contentType: "application/json; charset=utf-8",
      url: "https://ownpass.marcg.ch/devices/" + this.devid
    }).done(function(response) {
      return Chaplin.helpers.redirectTo('login#index', {});
    }).always(function(response) {
      return $(e.target).button("reset");
    });
  };

  return AuthorizeView;

})(View);
});

;require.register("views/base/collection-view", function(exports, require, module) {
var CollectionView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./view');

module.exports = CollectionView = (function(_super) {
  __extends(CollectionView, _super);

  function CollectionView() {
    _ref = CollectionView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  CollectionView.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

  return CollectionView;

})(Chaplin.CollectionView);
});

;require.register("views/base/view", function(exports, require, module) {
var View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

require('lib/view-helper');

module.exports = View = (function(_super) {
  __extends(View, _super);

  function View() {
    _ref = View.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  View.prototype.optionNames = Chaplin.View.prototype.optionNames.concat(['template']);

  View.prototype.getTemplateFunction = function() {
    return this.template;
  };

  return View;

})(Chaplin.View);
});

;require.register("views/devices-view", function(exports, require, module) {
var DevicesView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

module.exports = DevicesView = (function(_super) {
  __extends(DevicesView, _super);

  function DevicesView() {
    _ref = DevicesView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  DevicesView.prototype.template = require('./templates/devices');

  return DevicesView;

})(View);
});

;require.register("views/home/header-view", function(exports, require, module) {
var HeaderView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

module.exports = HeaderView = (function(_super) {
  __extends(HeaderView, _super);

  function HeaderView() {
    _ref = HeaderView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  HeaderView.prototype.autoRender = true;

  HeaderView.prototype.className = 'navbar navbar-default';

  HeaderView.prototype.tagName = 'header';

  HeaderView.prototype.template = require('./templates/header');

  return HeaderView;

})(View);
});

;require.register("views/home/home-page-view", function(exports, require, module) {
var HomePageView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

module.exports = HomePageView = (function(_super) {
  __extends(HomePageView, _super);

  function HomePageView() {
    _ref = HomePageView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  HomePageView.prototype.autoRender = true;

  HomePageView.prototype.className = 'home-page';

  HomePageView.prototype.template = require('./templates/home');

  return HomePageView;

})(View);
});

;require.register("views/home/templates/header", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var stack1;
  if (stack1 = helpers.email) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.email; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  return escapeExpression(stack1);
  }

function program3(depth0,data) {
  
  var stack1;
  if (stack1 = helpers.api) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.api; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  return escapeExpression(stack1);
  }

  buffer += "\n        <div class=\"navbar-header\">\n          <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n          </button>\n          <a class=\"navbar-brand\" href=\"#\">OwnPass</a>\n        </div>\n        <div class=\"navbar-collapse collapse\">\n          <ul class=\"nav navbar-nav\">\n            <li class=\"active\"><a href=\"#passwords\">Passwords</a></li> \n            <li ><a href=\"#locations\">Locations</a></li> \n            <li ><a href=\"javascript:var e = document.createElement('script');e.setAttribute('language', 'javascript');e.setAttribute('src', 'http://localhost:3333/bookmarklet.js');window.email='";
  options = {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data};
  if (stack1 = helpers.withUser) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.withUser; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.withUser) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "';window.api='";
  options = {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data};
  if (stack1 = helpers.withWindow) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0.withWindow; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers.withWindow) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "';document.body.appendChild(e);void(0);\">Bookmarklet</a></li> \n            \n          </ul>\n          <ul class=\"nav navbar-nav navbar-right\">\n            <li><a href=\"https://github.com/KarlKode/OwnPass-Server\"><i class=\"fa fa-github\"></i> Github Server</a></li> \n            <li><a href=\"https://github.com/KarlKode/OwnPass-Web\"><i class=\"fa fa-github\"></i> Github Client</a></li> \n          </ul>\n        </div><!--/.nav-collapse -->\n\n";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/home/templates/home", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return " <div class=\"jumbotron\">\n        <h1>Navbar example</h1>\n        <p>This example is a quick exercise to illustrate how the default, static navbar and fixed to top navbar work. It includes the responsive CSS and HTML, so it also adapts to your viewport and device.</p>\n        <p>\n          <a class=\"btn btn-lg btn-primary\" href=\"../../components/#navbar\">View navbar docs &raquo;</a>\n        </p>\n      </div>\n";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/location-view", function(exports, require, module) {
var LocationView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

module.exports = LocationView = (function(_super) {
  __extends(LocationView, _super);

  function LocationView() {
    _ref = LocationView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  LocationView.prototype.container = 'body';

  LocationView.prototype.className = 'location_row';

  LocationView.prototype.autoRender = true;

  LocationView.prototype.autoAttach = false;

  LocationView.prototype.template = require('./templates/location');

  return LocationView;

})(View);
});

;require.register("views/locations-view", function(exports, require, module) {
var CollectionView, Location, LocationModel, LocationsView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CollectionView = require('views/base/collection-view');

Location = require('views/location-view');

LocationModel = require('models/location');

module.exports = LocationsView = (function(_super) {
  __extends(LocationsView, _super);

  function LocationsView() {
    _ref = LocationsView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  LocationsView.prototype.container = 'body';

  LocationsView.prototype.listSelector = '.collection';

  LocationsView.prototype.autoRender = false;

  LocationsView.prototype.itemView = Location;

  LocationsView.prototype.template = require('./templates/locations');

  LocationsView.prototype.initialize = function() {
    LocationsView.__super__.initialize.apply(this, arguments);
    return google.maps.visualRefresh = true;
  };

  LocationsView.prototype.render = function() {
    var mapOptions;
    LocationsView.__super__.render.apply(this, arguments);
    mapOptions = {
      zoom: 15,
      center: new google.maps.LatLng(-34.397, 150.644),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    return this.map = new google.maps.Map(this.$el.find('.map-canvas')[0], mapOptions);
  };

  LocationsView.prototype.renderItem = function(model) {
    var marker, myLatlng, self;
    myLatlng = new google.maps.LatLng(model.get('latitude'), model.get('longitude'));
    marker = new google.maps.Marker({
      position: myLatlng,
      map: this.map,
      animation: google.maps.Animation.DROP,
      title: model.get('ip')
    });
    self = this;
    _.defer(function() {
      self = self.map.panTo(myLatlng);
      return google.maps.event.trigger(self.map, "resize");
    });
    $(window).resize();
    return LocationsView.__super__.renderItem.apply(this, arguments);
  };

  LocationsView.prototype.dispose = function() {
    LocationsView.__super__.dispose.apply(this, arguments);
    if (this.map != null) {
      return this.map = null;
    }
  };

  return LocationsView;

})(CollectionView);
});

;require.register("views/login-view", function(exports, require, module) {
var LoginView, Utils, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

Utils = require('lib/utils');

module.exports = LoginView = (function(_super) {
  __extends(LoginView, _super);

  function LoginView() {
    _ref = LoginView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  LoginView.prototype.autoRender = true;

  LoginView.prototype.className = 'home-page';

  LoginView.prototype.template = require('./templates/login');

  LoginView.prototype.initialize = function(options) {
    LoginView.__super__.initialize.apply(this, arguments);
    return this.delegate('click', '.login', this.login);
  };

  LoginView.prototype.login = function(e) {
    var userdata,
      _this = this;
    e.preventDefault();
    $(e.target).button("loading");
    userdata = {
      email: this.$el.find('.email').val(),
      password: Utils.hash_password(this.$el.find('.email').val(), this.$el.find('.password').val()),
      plainpw: this.$el.find('.password').val()
    };
    return $.ajax({
      url: "https://ownpass.marcg.ch/users",
      beforeSend: function(xhr) {
        return xhr.setRequestHeader("Authorization", "Basic " + btoa(userdata.email + ":" + userdata.password));
      }
    }).done(function(response) {
      window.user = userdata;
      return Chaplin.helpers.redirectTo('password#index', {});
    }).always(function(response) {
      return $(e.target).button("reset");
    });
  };

  return LoginView;

})(View);
});

;require.register("views/password-edit-view", function(exports, require, module) {
var PasswordEditView, Utils, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

Utils = require('lib/utils');

module.exports = PasswordEditView = (function(_super) {
  __extends(PasswordEditView, _super);

  function PasswordEditView() {
    _ref = PasswordEditView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  PasswordEditView.prototype.template = require('./templates/password-edit');

  PasswordEditView.prototype.autoRender = true;

  PasswordEditView.prototype.events = {
    'click .cancel': 'cancel',
    'click .delete': 'delete',
    'click .save': 'save'
  };

  PasswordEditView.prototype.getTemplateData = function() {
    var a, data;
    data = this.model.toJSON();
    if (data.username != null) {
      data.username = Utils.decrypt(data.username);
    }
    if (data.password != null) {
      data.password = Utils.decrypt(data.password);
    }
    if (data.site != null) {
      a = $('<a>', {
        href: data.site
      })[0];
      data.domain = a.hostname;
    }
    return data;
  };

  PasswordEditView.prototype.save = function(e) {
    var btn, data, self,
      _this = this;
    e.preventDefault();
    self = this;
    btn = $(e.target).closest('button');
    btn.button("loading");
    data = {
      site: this.$el.find('.site').val(),
      phone: this.$el.find('.phone').val(),
      username: Utils.encrypt(this.$el.find('.username').val()),
      password: Utils.encrypt(this.$el.find('.password').val())
    };
    this.model.unset('new');
    return this.model.save(data).done(function(response) {
      self.ok = true;
      self.model.fetch();
      return self.cancel();
    }).always(function(response) {
      return btn.button("reset");
    });
  };

  PasswordEditView.prototype.cancel = function() {
    this.trigger('dispose');
    return this.dispose();
  };

  PasswordEditView.prototype["delete"] = function() {
    this.model.destroy();
    return this.trigger('remove');
  };

  return PasswordEditView;

})(View);
});

;require.register("views/password-view", function(exports, require, module) {
var EditPasswordView, PasswordView, Utils, View, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

EditPasswordView = require('views/password-edit-view');

Utils = require('lib/utils');

module.exports = PasswordView = (function(_super) {
  __extends(PasswordView, _super);

  function PasswordView() {
    this.editPassword = __bind(this.editPassword, this);
    _ref = PasswordView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  PasswordView.prototype.container = 'body';

  PasswordView.prototype.className = 'password_row';

  PasswordView.prototype.autoRender = true;

  PasswordView.prototype.autoAttach = false;

  PasswordView.prototype.template = require('./templates/password');

  PasswordView.prototype.events = {
    'click .edit': 'editPassword'
  };

  PasswordView.prototype.initialize = function() {
    PasswordView.__super__.initialize.apply(this, arguments);
    return console.log(this.model.toJSON());
  };

  PasswordView.prototype.getTemplateData = function() {
    var a, data;
    data = this.model.toJSON();
    if (data.username != null) {
      data.username = Utils.decrypt(data.username);
    }
    if (data.password != null) {
      data.password = Utils.decrypt(data.password);
    }
    if (data.site != null) {
      a = $('<a>', {
        href: data.site
      })[0];
      data.domain = a.hostname;
    }
    return data;
  };

  PasswordView.prototype.editPassword = function(event) {
    var createNewPassword, self,
      _this = this;
    self = this;
    createNewPassword = function() {
      var container, editPassword;
      container = $('<div>');
      _this.$el.html("");
      _this.$el.append(container);
      editPassword = new EditPasswordView({
        model: _this.model,
        container: container
      });
      editPassword.on('remove', _this.dispose);
      if (_this.model.get('new') === void 0) {
        editPassword.on('dispose', self.render);
      } else {
        editPassword.on('dispose', function() {
          if (!self.model.isNew() && !self.model.isNew()) {
            return self.render();
          } else {
            return self.dispose();
          }
        });
      }
      return _this.subview('editPasswordForm', editPassword);
    };
    return createNewPassword();
  };

  return PasswordView;

})(View);
});

;require.register("views/passwords-view", function(exports, require, module) {
var CollectionView, Password, PasswordModel, PasswordsView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CollectionView = require('views/base/collection-view');

Password = require('views/password-view');

PasswordModel = require('models/password');

module.exports = PasswordsView = (function(_super) {
  __extends(PasswordsView, _super);

  function PasswordsView() {
    _ref = PasswordsView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  PasswordsView.prototype.container = 'body';

  PasswordsView.prototype.listSelector = '.collection';

  PasswordsView.prototype.autoRender = false;

  PasswordsView.prototype.itemView = Password;

  PasswordsView.prototype.template = require('./templates/passwords');

  PasswordsView.prototype.events = {
    'click .add': 'addPassword'
  };

  PasswordsView.prototype.addPassword = function() {
    var pwview;
    pwview = new Password({
      model: new PasswordModel({
        'new': true
      })
    });
    pwview.render();
    this.$el.find('.collection').prepend(pwview.el);
    return pwview.editPassword();
  };

  return PasswordsView;

})(CollectionView);
});

;require.register("views/register-view", function(exports, require, module) {
var RegisterView, User, Utils, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

User = require('models/user');

Utils = require('lib/utils');

module.exports = RegisterView = (function(_super) {
  __extends(RegisterView, _super);

  function RegisterView() {
    _ref = RegisterView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  RegisterView.prototype.autoRender = true;

  RegisterView.prototype.className = 'home-page';

  RegisterView.prototype.template = require('./templates/register');

  RegisterView.prototype.initialize = function(options) {
    RegisterView.__super__.initialize.apply(this, arguments);
    return this.delegate('click', '.register', this.login);
  };

  RegisterView.prototype.login = function(e) {
    var plainpw, self, user, userdata,
      _this = this;
    e.preventDefault();
    if (this.$el.find('.password').val() !== this.$el.find('.repassword').val()) {
      alertify.error("Password do not match");
      return;
    }
    $(e.target).button("loading");
    plainpw = this.$el.find('.password').val();
    userdata = {
      email: this.$el.find('.email').val(),
      phone: this.$el.find('.phone').val(),
      password: Utils.hash_password(this.$el.find('.email').val(), this.$el.find('.password').val())
    };
    user = new User(userdata);
    self = this;
    return user.save().done(function(response) {
      userdata.plainpw = plainpw;
      window.user = userdata;
      return Chaplin.helpers.redirectTo('password#index', {});
    }).always(function(response) {
      return $(e.target).button("reset");
    });
  };

  return RegisterView;

})(View);
});

;require.register("views/site-view", function(exports, require, module) {
var SiteView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

module.exports = SiteView = (function(_super) {
  __extends(SiteView, _super);

  function SiteView() {
    _ref = SiteView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  SiteView.prototype.container = 'body';

  SiteView.prototype.id = 'site-container';

  SiteView.prototype.regions = {
    header: '#header-container',
    main: '#page-container'
  };

  SiteView.prototype.template = require('./templates/site');

  return SiteView;

})(View);
});

;require.register("views/templates/authorize", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return " <form class=\"form-signin\">\n 	<div class=\"logocontainer\">\n 	<i class=\"fa logo fa-unlock\"></i>\n </div>\n        <h2 class=\"form-signin-heading\">Whitelist device</h2>\n        <input type=\"text\" class=\"form-control auth\" placeholder=\"Authorization code\" autofocus>\n         \n        <button class=\"btn btn-lg btn-primary btn-block authorize\" type=\"submit\">Authorize</button>\n        <p><a href=\"/\" class=\"btn btn-link\">Back to login</a></p>\n      </form>\n";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/devices", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/location", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h2>";
  if (stack1 = helpers.ip) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.ip; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/locations", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h2>Locations</h2>\n\n      <div class=\"jumbotron map-canvas\" style=\"height:400px\">\n      	</div>\n<div class=\"collection\"></div>";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/login", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return " <form class=\"form-signin\">\n 	<div class=\"logocontainer\">\n 	<i class=\"fa logo fa-key\"></i>\n </div>\n        <h2 class=\"form-signin-heading\">Please sign in</h2>\n        <input type=\"text\" class=\"form-control email\" placeholder=\"Email address\" autofocus>\n        <input type=\"password\" class=\"form-control password\" placeholder=\"Password\">\n        <button class=\"btn btn-lg btn-primary btn-block login\" type=\"submit\">Sign in</button>\n        <p>Do not have an account yet? <a href=\"/register\" class=\"btn btn-link\">Register here</a></p>\n      </form>\n";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/password-edit", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  
  return "\n  <a class=\"btn btn-danger delete\"><i class=\"fa fa-trash-o\"></i> Delete</a>\n  ";
  }

  buffer += "\n<form class=\"form-inline\" role=\"form\">\n  <div class=\"form-group\">\n    <label class=\"sr-only\" for=\"exampleInputEmail2\">Url</label>\n    <input type=\"text\" class=\"form-control site\" id=\"exampleInputEmail2\" placeholder=\"Url\" value=\"";
  if (stack1 = helpers.site) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.site; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n  </div>\n  <div class=\"form-group\">\n    <label class=\"sr-only\" for=\"exampleInputEmail2\">Username</label>\n    <input type=\"text\" class=\"form-control username\" id=\"exampleInputEmail2\" placeholder=\"Enter username\" value=\"";
  if (stack1 = helpers.username) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.username; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n  </div>\n  <div class=\"form-group\">\n    <label class=\"sr-only\" for=\"exampleInputPassword2\">Password</label>\n    <input type=\"password\" class=\"form-control password\" id=\"exampleInputPassword2\" placeholder=\"Password\" value=\"";
  if (stack1 = helpers.password) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.password; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n  </div> \n  <div class=\" pull-right\">\n  <button type=\"submit\" class=\"btn btn-primary save\"> <i class=\"fa fa-save\"></i> Store</button>\n  ";
  options = {hash:{},inverse:self.program(1, program1, data),fn:self.noop,data:data};
  if (stack1 = helpers['new']) { stack1 = stack1.call(depth0, options); }
  else { stack1 = depth0['new']; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  if (!helpers['new']) { stack1 = blockHelperMissing.call(depth0, stack1, options); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <a class=\"btn btn-default cancel\"><i class=\"fa fa-undo\"></i> Cancel</a>\n</div>\n</form>";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/password", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<a class=\"btn btn-default pull-right edit\"><i class=\"fa fa-pencil\"></i> Edit </a>\n<h2><img src=\"http://g.etfv.co/";
  if (stack1 = helpers.site) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.site; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" /> ";
  if (stack1 = helpers.domain) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.domain; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>";
  return buffer;
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/passwords", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<a class=\"btn btn-default pull-right add\"><i class=\"fa fa-plus\"></i> Add new password </a><h2>Passwords</h2>\n<div class=\"collection\"></div>";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/register", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return " <form class=\"form-signin\">\n 	<div class=\"logocontainer\">\n 	<i class=\"fa logo fa-user\"></i>\n </div>\n        <h2 class=\"form-signin-heading\">Register</h2>\n        <input type=\"text\" class=\"form-control email\" placeholder=\"Email address\" autofocus>\n        <input type=\"password\" class=\"form-control middle password\" placeholder=\"Password\"> \n        <input type=\"password\" class=\"form-control middle repassword\" placeholder=\"Repeat Password\"> \n        <input type=\"text\" class=\"form-control phone\" placeholder=\"Phone nr\" >\n        <button class=\"btn btn-lg btn-primary btn-block register\" type=\"submit\">Register</button>\n        <p>You alread have an account? <a href=\"/\" class=\"btn btn-link\">Login here</a></p>\n      </form>\n";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/templates/site", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return " <div class=\"container\">\n<div class=\"header-container\" id=\"header-container\"></div>\n\n<div class=\"outer-page-container\">\n  <div class=\"page-container\" id=\"page-container\">\n  </div>\n</div>\n</div>\n";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;
//# sourceMappingURL=app.js.map