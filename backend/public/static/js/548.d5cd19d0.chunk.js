/*! For license information please see 548.d5cd19d0.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[548],{4337:function(t,e,r){r.d(e,{Z:function(){return i}});r(2791);var n=r(7689),o=r(184),i=function(t){var e=(0,n.s0)();return(0,o.jsxs)("div",{className:"voucher-card",id:t.id,children:[(0,o.jsx)("img",{src:"".concat("https://now2tech-f987dbd48ed8.herokuapp.com","/images/vouchers/").concat(t.image),alt:"voucher"}),(0,o.jsx)("div",{className:"voucher-card-body",children:(0,o.jsx)("p",{children:t.name})}),(0,o.jsx)("button",{onClick:function(){e("/khuyen-mai/".concat(t.id))},className:"voucher-card__btn",children:"Xem chi ti\u1ebft"})]})}},548:function(t,e,r){r.r(e),r.d(e,{default:function(){return v}});var n=r(4165),o=r(5861),i=r(9439),a=r(2791),c=r(7689),s=r(1243),u=r(9806),l=r(1632),h=(r(2809),r(841)),f=r(1717),d=r(4337),p=r(184),v=function(){var t=(0,c.UO)(),e=t.keyword,r=t.page,v=(0,c.s0)(),m=(0,a.useState)(!1),g=(0,i.Z)(m,2),y=g[0],x=(g[1],(0,a.useState)([])),w=(0,i.Z)(x,2),j=w[0],b=w[1],N=(0,a.useState)(new Date),L=(0,i.Z)(N,2),k=L[0],Z=L[1],_=(0,a.useState)([]),E=(0,i.Z)(_,2),O=E[0],S=E[1],G=(0,a.useState)(0),T=(0,i.Z)(G,2),P=T[0],R=T[1],C=(0,a.useState)(0),F=(0,i.Z)(C,2),A=F[0],I=F[1],D=(0,a.useState)(1),H=(0,i.Z)(D,2),Y=H[0],K=H[1],M=(0,a.useState)(!1),U=(0,i.Z)(M,2),q=U[0],B=U[1],X=(0,a.useRef)(0),z=(0,a.useRef)(0);(0,a.useEffect)((function(){var t=function(){var t=(0,o.Z)((0,n.Z)().mark((function t(){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.Z.get("".concat("https://now2tech-f987dbd48ed8.herokuapp.com","/product/get-all-product?keyword=").concat(e,"&page=").concat(r)).then((function(t){S(t.data.result),R(t.data.maxLength);var e=Math.ceil(t.data.maxLength/12);I(e)})).catch((function(t){return console.log(t)}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();t()}),[e,q]);(0,a.useEffect)((function(){var t=function(){var t=(0,o.Z)((0,n.Z)().mark((function t(){return(0,n.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.Z.get("".concat("https://now2tech-f987dbd48ed8.herokuapp.com","/voucher/get-all-voucher")).then((function(t){b(t.data)})).catch((function(t){console.log(t)}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();t(),Z(new Date)}),[]);var J=j.filter((function(t){return new Date(t.end)>k}));return(0,p.jsx)(a.Fragment,{children:(0,p.jsx)("div",{className:"search-page",children:(0,p.jsx)("div",{className:"search-page-container",children:(0,p.jsxs)("div",{className:"right-container",children:[(0,p.jsxs)("h1",{children:["T\xecm v\u1edbi t\u1eeb kh\xf3a: ",e]}),O?O.length>0?(0,p.jsxs)(a.Fragment,{children:[(0,p.jsxs)("h2",{children:["T\xecm th\u1ea5y: ",P," s\u1ea3n ph\u1ea9m"]}),(0,p.jsx)("div",{className:"search-results",children:O.map((function(t){return(0,p.jsx)("div",{className:"custom-product-card",children:(0,p.jsx)(h.Z,{id:t._id,name:t.name,price:t.sellPrice,avgRating:t.avgRating,numOfReview:t.numOfReview,image:t.pimage[0],voucher:t.voucher},t._id)},t._id)}))})]}):(0,p.jsxs)("div",{className:"product-not-found",children:[(0,p.jsx)("div",{className:"icon-container",children:(0,p.jsx)(u.G,{className:"magnify-glass-icon",icon:l.q9v})}),(0,p.jsx)("p",{children:"Kh\xf4ng c\xf3 s\u1ea3n ph\u1ea9m ph\xf9 h\u1ee3p"})]}):(0,p.jsx)(f.Z,{}),(0,p.jsx)("div",{className:"pages",children:(0,p.jsx)("ul",{className:"pages-bar",children:Array.from({length:A},(function(t,r){return(0,p.jsx)("li",{className:Y===r+1?"selected":"",onClick:function(){!function(t){v("/tim-kiem/".concat(e,"/").concat(t)),B(!q)}(r+1),K(r+1)},children:r+1},r+1)}))})}),(0,p.jsx)("div",{className:"voucher-container",children:(0,p.jsxs)("div",{className:"voucher-container__main",children:[(0,p.jsx)("h2",{children:"CH\u01af\u01a0NG TR\xccNH KHUY\u1ebeN M\xc3I"}),(0,p.jsx)("div",{className:"scroll",ref:X,children:(0,p.jsx)("div",{ref:z,className:"voucher-container__list",children:J.map((function(t){return(0,p.jsx)(d.Z,{name:t.name,id:t._id,image:t.image},t._id)}))})}),(0,p.jsx)("button",{className:"prev-btn",style:y?{display:"flex"}:{display:"none"},onClick:function(){var t=X.current;t&&(t.scrollLeft-=1200)},children:(0,p.jsx)(u.G,{icon:l.A35})}),(0,p.jsx)("button",{className:"next-btn",style:y?{display:"flex"}:{display:"none"},onClick:function(){var t=X.current;t&&(t.scrollLeft+=1200)},children:(0,p.jsx)(u.G,{icon:l._tD})})]})})]})})})})}},841:function(t,e,r){r.d(e,{Z:function(){return h}});var n=r(9439),o=r(2791),i=r(1087),a=r(1243),c=r(2643),s=r(6912),u=r(9085),l=(r(5462),r(184)),h=function(t){var e=(0,o.useState)(null),r=(0,n.Z)(e,2),h=r[0],f=r[1];return(0,o.useEffect)((function(){t.voucher&&a.Z.get("".concat("https://now2tech-f987dbd48ed8.herokuapp.com","/voucher/get-voucher-by-name?vname=").concat(t.voucher)).then((function(t){f(t.data)})).catch((function(t){(0,u.Am)(t)}))}),[]),(0,l.jsx)(i.OL,{to:"/chi-tiet-san-pham/".concat(t.id),children:(0,l.jsxs)("div",{className:"product-card",children:[(0,l.jsx)(u.Ix,{}),(0,l.jsx)("div",{className:"product-img",children:(0,l.jsx)("img",{src:"".concat("https://now2tech-f987dbd48ed8.herokuapp.com","/images/").concat(t.image),alt:"place",height:200})}),(0,l.jsx)("h3",{children:t.name}),(0,l.jsxs)("div",{className:"product-rating",children:[(0,l.jsx)(s.Z,{rating:t.avgRating}),(0,l.jsxs)("span",{className:"num-rating",children:[t.numOfReview," \u0111\xe1nh gi\xe1"]})]}),null!=h?(0,l.jsxs)("div",{className:"product-card-price-div",children:[(0,l.jsxs)("strong",{className:"product-price",children:[(0,c.T)((100-h.percent)*t.price/100)," "]}),(0,l.jsxs)("strong",{className:"product-price-old",children:[(0,c.T)(t.price)," "]})]}):(0,l.jsx)("strong",{className:"product-price",children:(0,c.T)(t.price)})]})})}},2809:function(t,e,r){t.exports=r.p+"static/media/SearchBanner.49a020dbf9d93012510b.png"},5861:function(t,e,r){function n(t,e,r,n,o,i,a){try{var c=t[i](a),s=c.value}catch(u){return void r(u)}c.done?e(s):Promise.resolve(s).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function c(t){n(a,o,i,c,s,"next",t)}function s(t){n(a,o,i,c,s,"throw",t)}c(void 0)}))}}r.d(e,{Z:function(){return o}})},4165:function(t,e,r){r.d(e,{Z:function(){return o}});var n=r(1002);function o(){o=function(){return e};var t,e={},r=Object.prototype,i=r.hasOwnProperty,a=Object.defineProperty||function(t,e,r){t[e]=r.value},c="function"==typeof Symbol?Symbol:{},s=c.iterator||"@@iterator",u=c.asyncIterator||"@@asyncIterator",l=c.toStringTag||"@@toStringTag";function h(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{h({},"")}catch(t){h=function(t,e,r){return t[e]=r}}function f(t,e,r,n){var o=e&&e.prototype instanceof x?e:x,i=Object.create(o.prototype),c=new T(n||[]);return a(i,"_invoke",{value:E(t,r,c)}),i}function d(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=f;var p="suspendedStart",v="suspendedYield",m="executing",g="completed",y={};function x(){}function w(){}function j(){}var b={};h(b,s,(function(){return this}));var N=Object.getPrototypeOf,L=N&&N(N(P([])));L&&L!==r&&i.call(L,s)&&(b=L);var k=j.prototype=x.prototype=Object.create(b);function Z(t){["next","throw","return"].forEach((function(e){h(t,e,(function(t){return this._invoke(e,t)}))}))}function _(t,e){function r(o,a,c,s){var u=d(t[o],t,a);if("throw"!==u.type){var l=u.arg,h=l.value;return h&&"object"==(0,n.Z)(h)&&i.call(h,"__await")?e.resolve(h.__await).then((function(t){r("next",t,c,s)}),(function(t){r("throw",t,c,s)})):e.resolve(h).then((function(t){l.value=t,c(l)}),(function(t){return r("throw",t,c,s)}))}s(u.arg)}var o;a(this,"_invoke",{value:function(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}})}function E(e,r,n){var o=p;return function(i,a){if(o===m)throw new Error("Generator is already running");if(o===g){if("throw"===i)throw a;return{value:t,done:!0}}for(n.method=i,n.arg=a;;){var c=n.delegate;if(c){var s=O(c,n);if(s){if(s===y)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===p)throw o=g,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=m;var u=d(e,r,n);if("normal"===u.type){if(o=n.done?g:v,u.arg===y)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(o=g,n.method="throw",n.arg=u.arg)}}}function O(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,O(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),y;var i=d(o,e.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,y;var a=i.arg;return a?a.done?(r[e.resultName]=a.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,y):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,y)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function G(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function P(e){if(e||""===e){var r=e[s];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function r(){for(;++o<e.length;)if(i.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return a.next=a}}throw new TypeError((0,n.Z)(e)+" is not iterable")}return w.prototype=j,a(k,"constructor",{value:j,configurable:!0}),a(j,"constructor",{value:w,configurable:!0}),w.displayName=h(j,l,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===w||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,j):(t.__proto__=j,h(t,l,"GeneratorFunction")),t.prototype=Object.create(k),t},e.awrap=function(t){return{__await:t}},Z(_.prototype),h(_.prototype,u,(function(){return this})),e.AsyncIterator=_,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new _(f(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},Z(k),h(k,l,"Generator"),h(k,s,(function(){return this})),h(k,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=P,T.prototype={constructor:T,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(G),!e)for(var r in this)"t"===r.charAt(0)&&i.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function n(n,o){return c.type="throw",c.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],c=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var s=i.call(a,"catchLoc"),u=i.call(a,"finallyLoc");if(s&&u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&i.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,y):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),G(r),y}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;G(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:P(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),y}},e}}}]);
//# sourceMappingURL=548.d5cd19d0.chunk.js.map