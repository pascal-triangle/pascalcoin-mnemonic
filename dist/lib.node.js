module.exports=function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=0)}([function(e,r,t){"use strict";t.r(r),t.d(r,"generateKey",function(){return f}),t.d(r,"keyFromMnemonic",function(){return a});const n=t(1),o=t(2),i=t(3),u=t(4),l=192,c=48,s={secp256k1:0,p384:16,sect283k1:32,p521:48},p={secp256k1:new o("secp256k1"),p384:new o("p384"),p521:new o("p521")};function f(e,r="english"){if(!u.wordlists.hasOwnProperty(r))throw new Error("Language not supported");if(!s.hasOwnProperty(e))throw new Error("Curve not supported");const t=n(24);t[0]=t[0]&(255^(l|c))|s[e];const o=u.entropyToMnemonic(t,u.wordlists[r]);let f=null;if(p.hasOwnProperty(e)){const r=p[e].genKeyPair({entropy:i.toHex(t),entropyEnc:"hex"});f=i.toHex(r.getPrivate().toArray())}return[o,f]}function a(e){if(18!=e.trim().split(/\s+/g).length)throw new Error("Invalid word length");let r=null;for(let t in u.wordlists)if(u.wordlists.hasOwnProperty)try{r=i.toArray(u.mnemonicToEntropy(e,u.wordlists[t]),"hex")}catch(e){}if(null==r)throw new Error("Invalid mnemonic");if(0!=(r[0]&l))throw new Error("Invalid mnemonic version");const t=r[0]&c;let n=null;for(let e in s)if(s.hasOwnProperty(e)&&s[e]==t){n=e;break}if(null==n)throw new Error("Invalid curve");let o=null;if(p.hasOwnProperty(n)){const e=p[n].genKeyPair({entropy:i.toHex(r),entropyEnc:"hex"});o=i.toHex(e.getPrivate().toArray())}return[n,o]}},function(e,r){e.exports=require("brorand")},function(e,r){e.exports=require("elliptic/lib/elliptic/ec/index")},function(e,r){e.exports=require("minimalistic-crypto-utils")},function(e,r){e.exports=require("bip39")}]);