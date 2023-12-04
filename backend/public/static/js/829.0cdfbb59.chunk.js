/*! For license information please see 829.0cdfbb59.chunk.js.LICENSE.txt */
(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[829],{7163:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return C}});var i=t(3433),r=t(1413),s=t(4165),c=t(5861),a=t(9439),o=t(2791),u=t(5630),l=t(3360),d=t(1087),f=t(7689),m=t(9806),p=t(1632),h=t(9085),v=(t(5462),t(1243)),x=(t(678),t(814)),g=t(2643),j=t(184),b=function(e){var n=(0,o.useContext)(x.A);return(0,j.jsxs)("div",{className:"product-item",children:[(0,j.jsx)("div",{className:"product-item__img",children:(0,j.jsx)("img",{src:e.image,alt:"product"})}),(0,j.jsxs)("div",{className:"product-item__info",children:[(0,j.jsxs)("div",{className:"product-item__info-top",children:[(0,j.jsxs)("div",{className:"product-name",children:[(0,j.jsx)("a",{href:"/chi-tiet-san-pham/".concat(e.id),children:e.name}),e.voucher&&e.discountValid&&(0,j.jsxs)("span",{className:"discount",children:[(0,j.jsx)(m.G,{className:"tag-icon",icon:p.LEN}),(0,j.jsxs)("a",{href:"/khuyen-mai/".concat(e.voucher._id),children:["Gi\u1ea3m gi\xe1 ",e.discountPercent]})]})]}),e.voucher&&e.discountValid?(0,j.jsxs)("div",{className:"group-price",children:[(0,j.jsx)("span",{className:"sell-price",children:(0,g.T)(e.price)}),(0,j.jsx)("span",{className:"origin-price",children:(0,g.T)(e.sellPrice)})]}):(0,j.jsx)("div",{className:"group-price",children:(0,j.jsx)("span",{className:"sell-price",children:(0,g.T)(e.price)})})]}),(0,j.jsxs)("div",{className:"product-item__info-bottom",children:[(0,j.jsxs)("div",{className:"quantity-group-btn",children:[e.qty>1?(0,j.jsx)("div",{className:"minus-btn visible",onClick:function(){n.reduceQty(e.id)},children:"-"}):(0,j.jsx)("div",{className:"minus-btn",children:"-"}),(0,j.jsx)("div",{className:"qty",children:e.qty}),(0,j.jsx)("div",{className:"plus-btn visible",onClick:function(){n.increaseQty(e.id)},children:"+"})]}),(0,j.jsxs)("button",{className:"delete-btn",onClick:function(){n.deleteItem(e.id)},children:[(0,j.jsx)(m.G,{className:"icon-trash-can",icon:p.Vui}),"X\xf3a"]})]})]})]})},N=t(5668),y=t(8451),_=t(1717),C=function(){var e=(0,o.useContext)(x.A),n=(0,o.useContext)(y.y),t=(0,o.useState)([]),C=(0,a.Z)(t,2),k=C[0],Z=C[1],q=(0,o.useState)([]),S=(0,a.Z)(q,2),E=S[0],w=S[1],P=(0,o.useState)(!0),V=(0,a.Z)(P,2),G=(V[0],V[1]),I=(0,N.Z)("username"),O=decodeURIComponent(I),T=(0,f.s0)(),A=(0,o.useState)([]),D=(0,a.Z)(A,2),B=D[0],Q=D[1],L=(0,o.useState)(!1),R=(0,a.Z)(L,2),U=R[0],X=R[1],z=e.items.map((function(e){return e.id}));(0,o.useEffect)((function(){0!==e.items.length&&G(!1)}),[]),(0,o.useEffect)((function(){var e=function(){var e=(0,c.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.Z.get("".concat("https://now2tech-f987dbd48ed8.herokuapp.com/","/product/get-product-in-cart"),{params:{products:z}}).then((function(e){Z(e.data)})).catch((function(e){return console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]),(0,o.useEffect)((function(){var n=k.map((function(n){var t=e.items.find((function(e){return e.id===n._id}));if(t)return(0,r.Z)((0,r.Z)({},n),{},{qty:t.qty})}));w(n)}),[k,e.items]),console.log(E);var F=function(e){console.log(e.target.value);var n=E.find((function(n){return n._id===e.target.value}));console.log(n),X(!1),B.includes(n)?Q(B.filter((function(e){return e._id!==n._id}))):Q([].concat((0,i.Z)(B),[n]))};(0,o.useEffect)((function(){e.items.length===B.length&&X(!0)}),[B,e.items.length]);var H=function(){var e=(0,c.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:"false"!==O?(n.setSelectedItems(B),T("/thong-tin-giao-hang")):(0,h.Am)("Vui l\xf2ng \u0111\u0103ng nh\u1eadp \u0111\u1ec3 mua h\xe0ng");case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,j.jsxs)("div",{className:"cart-page",children:[(0,j.jsx)(h.Ix,{}),(0,j.jsxs)("div",{className:"cart-page__main",children:[(0,j.jsx)("p",{className:"cart-page__title",children:"Gi\u1ecf h\xe0ng c\u1ee7a b\u1ea1n:"}),0===e.items.length?(0,j.jsxs)("div",{className:"cart-empty",children:[(0,j.jsx)(m.G,{className:"cart-plus__icon",icon:p.qD8}),(0,j.jsx)("p",{children:"Gi\u1ecf h\xe0ng c\u1ee7a b\u1ea1n \u0111ang tr\u1ed1ng"}),(0,j.jsx)(d.OL,{to:"/",children:"Quay v\u1ec1 trang ch\u1ee7"})]}):(0,j.jsxs)("div",{children:[(0,j.jsx)("div",{className:"cart-page__list-item",children:E?(0,j.jsxs)(u.Z,{className:"list-item__form",children:[(0,j.jsx)(u.Z.Check,{className:"custom-checkbox",label:"Ch\u1ecdn t\u1ea5t c\u1ea3",onChange:function(){Q(U?[]:E),X(!U)},checked:U,value:"select-all",name:"item",inline:!0}),E.map((function(e){return(0,j.jsxs)("div",{className:"list-item__single-item",children:[(0,j.jsx)(u.Z.Check,{value:e._id,checked:B.includes(e),onChange:F,className:"custom__check-box",name:"item","aria-label":"option"}),(0,j.jsx)(b,{id:e._id,name:e.name,qty:e.qty,sellPrice:e.sellPrice,price:e.price,discountValid:e.discountValid,discountPercent:e.discountPercent,voucher:e.voucher,image:e.image})]},e._id)}))]}):(0,j.jsx)(_.Z,{})}),(0,j.jsxs)("div",{className:"total-cost",children:[(0,j.jsxs)("span",{children:["T\u1ea1m t\xednh (",B.reduce((function(e,n){return e+n.qty}),0)," s\u1ea3n ph\u1ea9m):"]}),(0,j.jsx)("span",{children:(0,g.T)(B.reduce((function(e,n){return e+(n.vouchers?n.price*(100-n.vouchers.percent)/100*n.qty:n.price*n.qty)}),0))})]}),(0,j.jsx)("div",{className:"cart-page__btn",children:(0,j.jsx)(l.Z,{onClick:H,className:"cart-page__custom-btn",variant:"danger",disabled:0===B.length,children:"\u0110\u1eb6T H\xc0NG"})})]})]})]})}},5341:function(e,n,t){"use strict";t.d(n,{FT:function(){return a}});var i=t(9439),r=t(2791),s=t(184),c=["as","disabled"];function a(e){var n=e.tagName,t=e.disabled,i=e.href,r=e.target,s=e.rel,c=e.role,a=e.onClick,o=e.tabIndex,u=void 0===o?0:o,l=e.type;n||(n=null!=i||null!=r||null!=s?"a":"button");var d={tagName:n};if("button"===n)return[{type:l||"button",disabled:t},d];var f=function(e){(t||"a"===n&&function(e){return!e||"#"===e.trim()}(i))&&e.preventDefault(),t?e.stopPropagation():null==a||a(e)};return"a"===n&&(i||(i="#"),t&&(i=void 0)),[{role:null!=c?c:"button",disabled:void 0,tabIndex:t?void 0:u,href:i,target:"a"===n?r:void 0,"aria-disabled":t||void 0,rel:"a"===n?s:void 0,onClick:f,onKeyDown:function(e){" "===e.key&&(e.preventDefault(),f(e))}},d]}var o=r.forwardRef((function(e,n){var t=e.as,r=e.disabled,o=function(e,n){if(null==e)return{};var t,i,r={},s=Object.keys(e);for(i=0;i<s.length;i++)t=s[i],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,c),u=a(Object.assign({tagName:t,disabled:r},o)),l=(0,i.Z)(u,2),d=l[0],f=l[1].tagName;return(0,s.jsx)(f,Object.assign({},o,d,{ref:n}))}));o.displayName="Button"},1694:function(e,n){var t;!function(){"use strict";var i={}.hasOwnProperty;function r(){for(var e=[],n=0;n<arguments.length;n++){var t=arguments[n];if(t){var s=typeof t;if("string"===s||"number"===s)e.push(t);else if(Array.isArray(t)){if(t.length){var c=r.apply(null,t);c&&e.push(c)}}else if("object"===s){if(t.toString!==Object.prototype.toString&&!t.toString.toString().includes("[native code]")){e.push(t.toString());continue}for(var a in t)i.call(t,a)&&t[a]&&e.push(a)}}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(t=function(){return r}.apply(n,[]))||(e.exports=t)}()},1701:function(e,n,t){"use strict";t.d(n,{Ed:function(){return s},UI:function(){return r},XW:function(){return c}});var i=t(2791);function r(e,n){var t=0;return i.Children.map(e,(function(e){return i.isValidElement(e)?n(e,t++):e}))}function s(e,n){var t=0;i.Children.forEach(e,(function(e){i.isValidElement(e)&&n(e,t++)}))}function c(e,n){return i.Children.toArray(e).some((function(e){return i.isValidElement(e)&&e.type===n}))}},162:function(e,n,t){"use strict";t.d(n,{SC:function(){return u},pi:function(){return a},vE:function(){return c},zG:function(){return o}});var i=t(2791),r=(t(184),["xxl","xl","lg","md","sm","xs"]),s=i.createContext({prefixes:{},breakpoints:r,minBreakpoint:"xs"});s.Consumer,s.Provider;function c(e,n){var t=(0,i.useContext)(s).prefixes;return e||t[n]||n}function a(){return(0,i.useContext)(s).breakpoints}function o(){return(0,i.useContext)(s).minBreakpoint}function u(){return"rtl"===(0,i.useContext)(s).dir}}}]);
//# sourceMappingURL=829.0cdfbb59.chunk.js.map