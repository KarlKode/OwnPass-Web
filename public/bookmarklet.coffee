`/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
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
`

script = undefined
unless window.jQuery
  script = document.createElement("script")
  script.type = "text/javascript"
  script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"
  document.body.appendChild script
(check_if_loaded = ->
  unless window.jQuery
    setTimeout check_if_loaded, 50
  else
    (($) ->
      (($) ->
        $.fn.extend leanModal: (options) ->
          close_modal = (modal_id) ->
            $("#lean_overlay").fadeOut 200
            $(modal_id).css display: "none"
          defaults =
            top: 100
            overlay: 0.5
            closeButton: null

          overlay = $("<div id='lean_overlay'></div>")
          $("body").append overlay
          options = $.extend(defaults, options)
          o = options
          modal_id = this
          $("#lean_overlay").click ->
            close_modal modal_id

          $(o.closeButton).click ->
            close_modal modal_id

          modal_height = $(modal_id).outerHeight()
          modal_width = $(modal_id).outerWidth()
          $("#lean_overlay").css
            display: "block"
            opacity: 0

          $("#lean_overlay").fadeTo 200, o.overlay
          $(modal_id).css
            display: "block"
            position: "fixed"
            opacity: 0
            "z-index": 11200000
            left: 50 + "%"
            "margin-left": -(modal_width / 2) + "px"
            top: o.top + "px"

          $(modal_id).fadeTo 200, 1

      ) jQuery
      style = """<style type="text/css">
      #test input{
        display: block;
width: 100%;
height: 34px;
padding: 6px 12px;
font-size: 14px;
line-height: 1.428571429;
color: #555555;
vertical-align: middle;
background-color: #ffffff;
border: 1px solid #cccccc;
border-radius: 4px;
-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
-webkit-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
position: relative;
font-size: 16px;
height: auto;
padding: 10px;
-webkit-box-sizing: border-box;
-moz-box-sizing: border-box;
box-sizing: border-box;
      }
      #lean_overlay {position: fixed;z-index:11000000;top: 0px;left: 0px;height:100%;width:100%;background: #000; display: none;}#test{width:600px;padding:30px;display:none;background:#FFF;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;box-shadow:0 0 4px rgba(0,0,0,.7);-webkit-box-shadow:0 0 4px rgba(0,0,0,.7);-moz-box-shadow:0 0 4px rgba(0,0,0,.7)}</style>"""
      $("head").append style
      el = $("""<div id="test" style="display: block; position: fixed; opacity: 1; z-index: 11200000; left: 50%; margin-left: -330px; top: 200px;">
        <form>
        <input type="password" class="pw" placeholder="Master Password" >
        </form>
        </div>"""); 
      $("body").append el
      el.find('form').submit (e)->
          e.preventDefault()
          pw = el.find('.pw').val()
          el.find('.pw').hide()
          utils =
            hash_password: (email, pw)->
              return  CryptoJS.SHA256(pw).toString(CryptoJS.enc.Base64);
            get_secret: ()->
              return CryptoJS.SHA256(pw).toString(CryptoJS.enc.Base64);
            get_iv: ()->
              return CryptoJS.SHA256(pw).toString(CryptoJS.enc.Base64);
            encrypt: (message)->
              cr = CryptoJS.AES.encrypt(message, utils.get_secret())
              return cr.iv.toString(CryptoJS.enc.Base64)+":"+cr.salt.toString(CryptoJS.enc.Base64)+":"+cr.ciphertext.toString(CryptoJS.enc.Base64)
            decrypt: (message)->
              parts = message.split(":") 
              return CryptoJS.AES.decrypt(
                  CryptoJS.lib.CipherParams.create({
                      iv: CryptoJS.enc.Base64.parse(parts[0])
                      ciphertext: CryptoJS.enc.Base64.parse(parts[2])
                      salt: CryptoJS.enc.Base64.parse(parts[1])
                      })
                , utils.get_secret()).toString(CryptoJS.enc.Utf8) 
          $.ajax( {
                url:"https://ownpass.marcg.ch/password",
                beforeSend: (xhr)->
                  xhr.setRequestHeader("Authorization", "Basic " + btoa(window.email + ":" + utils.hash_password(window.email,pw)))
                }).done (response) =>
                  console.log response
                .error (response) =>
                  alert "Error"

      el.leanModal()
    ) window.jQuery
)()