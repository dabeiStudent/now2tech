"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[866],{8866:function(n,e,s){s.r(e),s.d(e,{default:function(){return w}});var c=s(4165),i=s(5861),r=s(9439),a=s(2791),t=s(1243),l=s(7689),o=s(9743),d=s(2677),h=s(9085),u=(s(5462),s(5943)),x=s(5630),p=s(3360),j=s(1087),m=s(9806),g=s(1632),f=s(6850),Z=s(2643),N=s(184),v=function(n){(0,l.s0)();var e=(0,a.useState)(!1),s=(0,r.Z)(e,2),o=s[0],d=s[1],h=(0,a.useState)(""),v=(0,r.Z)(h,2),b=v[0],w=v[1],_=(0,a.useState)(0),k=(0,r.Z)(_,2),T=k[0],y=k[1],G=function(){d(!1)},C=(0,a.useCallback)((function(n){return y(n)}),[]),S=function(){var e=(0,i.Z)((0,c.Z)().mark((function e(s){return(0,c.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s.preventDefault(),0!==T&&""!==b){e.next=3;break}return e.abrupt("return",window.alert("Vui l\xf2ng chia s\u1ebb \u0111\xe1nh gi\xe1 c\u1ee7a b\u1ea1n v\u1ec1 s\u1ea3n ph\u1ea9m."));case 3:return e.next=5,t.Z.post("".concat("https://now2tech-f987dbd48ed8.herokuapp.com","/product/add-review/").concat(n.id),{rating:T,comment:b},{withCredentials:!0}).then((function(e){d(!1),n.setIsReload(!n.isReload)})).catch((function(n){return console.log(n)}));case 5:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,N.jsxs)("li",{className:"order-item__container",children:[(0,N.jsxs)("div",{className:"order-item",children:[(0,N.jsx)("div",{className:"order-item__img",children:(0,N.jsx)("img",{src:n.image,alt:"product"})}),(0,N.jsxs)("div",{className:"order-item__info",children:[(0,N.jsxs)("div",{className:"order-item__info-left",children:[(0,N.jsx)(j.OL,{to:"/chi-tiet-san-pham/".concat(n.id),children:n.name}),(0,N.jsxs)("div",{className:"order-item__qty",children:[(0,N.jsx)("span",{children:"S\u1ed1 l\u01b0\u1ee3ng: "}),(0,N.jsx)("span",{children:n.qty})]})]}),(0,N.jsxs)("div",{className:"group-price",children:[(0,N.jsx)("span",{className:"sell-price",children:(0,Z.T)(n.price)}),(0,N.jsx)("span",{className:"origin-price",children:(0,Z.T)(2e4)})]})]})]}),"Delivered"===n.orderStatus&&(0,N.jsxs)("div",{children:[(0,N.jsx)("div",{className:"order-item__review-btn",children:(0,N.jsx)("button",{onClick:function(){d(!0)},children:"Vi\u1ebft \u0111\xe1nh gi\xe1"})}),(0,N.jsxs)(u.Z,{dialogClassName:"modal-custom",show:o,onHide:G,children:[(0,N.jsx)(u.Z.Header,{closeButton:!0,children:(0,N.jsx)(u.Z.Title,{children:"\u0110\xe1nh gi\xe1"})}),(0,N.jsxs)(x.Z,{onSubmit:S,children:[(0,N.jsx)(u.Z.Body,{children:(0,N.jsxs)("div",{className:"review-item",children:[(0,N.jsx)("div",{className:"review-item__img",children:(0,N.jsx)("img",{src:"".concat("https://now2tech-f987dbd48ed8.herokuapp.com","/images/").concat(n.image),alt:"product"})}),(0,N.jsx)("div",{className:"review-item__name",children:(0,N.jsx)("p",{children:n.name})}),(0,N.jsx)("div",{className:"review-item__rating",children:(0,N.jsxs)("div",{className:"star-rating",children:[(0,N.jsx)("span",{onClick:function(){return C(1)},children:T>=1?(0,N.jsx)(m.G,{className:"icon-star",icon:g.Tab}):T>=.5?(0,N.jsx)(m.G,{className:"icon-star",icon:g.pG1}):(0,N.jsx)(m.G,{className:"icon-star",icon:f.Tab})}),(0,N.jsx)("span",{onClick:function(){return C(2)},children:T>=2?(0,N.jsx)(m.G,{className:"icon-star",icon:g.Tab}):T>=1.5?(0,N.jsx)(m.G,{className:"icon-star",icon:g.pG1}):(0,N.jsx)(m.G,{className:"icon-star",icon:f.Tab})}),(0,N.jsx)("span",{onClick:function(){return C(3)},children:T>=3?(0,N.jsx)(m.G,{className:"icon-star",icon:g.Tab}):T>=2.5?(0,N.jsx)(m.G,{className:"icon-start",icon:g.pG1}):(0,N.jsx)(m.G,{className:"icon-star",icon:f.Tab})}),(0,N.jsx)("span",{onClick:function(){return C(4)},children:T>=4?(0,N.jsx)(m.G,{className:"icon-star",icon:g.Tab}):T>=3.5?(0,N.jsx)(m.G,{className:"icon-star",icon:g.pG1}):(0,N.jsx)(m.G,{className:"icon-star",icon:f.Tab})}),(0,N.jsx)("span",{onClick:function(){return C(5)},children:T>=5?(0,N.jsx)(m.G,{className:"icon-star",icon:g.Tab}):T>=4.5?(0,N.jsx)(m.G,{className:"icon-star",icon:g.pG1}):(0,N.jsx)(m.G,{className:"icon-star",icon:f.Tab})})]})}),(0,N.jsxs)("div",{className:"review-item__comment",children:[(0,N.jsx)("label",{htmlFor:"comment",children:"Vi\u1ebft b\xecnh lu\u1eadn:"}),(0,N.jsx)("textarea",{value:b,onChange:function(n){w(n.target.value)},id:"comment",rows:3,placeholder:"B\xecnh lu\u1eadn c\u1ee7a b\u1ea1n..."})]})]})}),(0,N.jsxs)(u.Z.Footer,{children:[(0,N.jsx)(p.Z,{variant:"danger",onClick:G,children:"H\u1ee7y"}),(0,N.jsx)(p.Z,{variant:"primary",type:"submit",children:"G\u1eedi \u0111\xe1nh gi\xe1"})]})]})]})]})]})},b=s(1717),w=function(){var n=(0,l.UO)().oid,e=(0,a.useState)(),s=(0,r.Z)(e,2),u=s[0],x=s[1],p=(0,a.useState)(!1),j=(0,r.Z)(p,2),m=j[0],g=j[1];(0,a.useEffect)((function(){t.Z.get("".concat("https://now2tech-f987dbd48ed8.herokuapp.com","/order/get-order/").concat(n),{withCredentials:!0}).then((function(n){return x(n.data)})).catch((function(n){alert(n)}))}),[n,m]);return(0,N.jsx)("div",{children:u?(0,N.jsxs)("div",{className:"order-page",children:[(0,N.jsx)(h.Ix,{}),(0,N.jsx)("div",{className:"order-page__top",children:(0,N.jsxs)("h2",{children:["Chi ti\u1ebft \u0111\u01a1n h\xe0ng: #",u._id]})}),(0,N.jsxs)("div",{className:"address-container",children:[(0,N.jsx)("p",{className:"order-page__title",children:"Th\xf4ng tin nh\u1eadn h\xe0ng:"}),(0,N.jsxs)(o.Z,{children:[(0,N.jsx)(d.Z,{lg:3,children:(0,N.jsx)("span",{children:"Ng\u01b0\u1eddi nh\u1eadn:"})}),(0,N.jsx)(d.Z,{lg:9,children:(0,N.jsxs)("span",{children:[u.user.lastName," ",u.user.firstName]})})]}),(0,N.jsxs)(o.Z,{children:[(0,N.jsx)(d.Z,{lg:3,children:(0,N.jsx)("span",{children:"\u0110i\u1ec7n tho\u1ea1i:"})}),(0,N.jsx)(d.Z,{lg:9,children:(0,N.jsx)("span",{children:u.user.phoneNumber})})]}),(0,N.jsxs)(o.Z,{children:[(0,N.jsx)(d.Z,{lg:3,children:(0,N.jsx)("span",{children:"Email: "})}),(0,N.jsx)(d.Z,{lg:9,children:(0,N.jsx)("span",{children:u.user.email})})]}),(0,N.jsxs)(o.Z,{children:[(0,N.jsx)(d.Z,{lg:3,children:(0,N.jsx)("span",{children:"\u0110\u1ecba ch\u1ec9: "})}),(0,N.jsx)(d.Z,{lg:9,children:(0,N.jsx)("span",{children:u.address})})]})]}),(0,N.jsxs)("div",{className:"order-container",children:[(0,N.jsx)("p",{className:"order-page__title",children:"Th\xf4ng tin \u0111\u01a1n h\xe0ng:"}),(0,N.jsxs)(o.Z,{children:[(0,N.jsx)(d.Z,{lg:3,children:(0,N.jsx)("span",{children:"Tr\u1ea1ng th\xe1i:"})}),"Not_proccessed"===u.status?(0,N.jsx)(d.Z,{lg:9,children:(0,N.jsx)("span",{children:"Ch\u1edd x\xe1c nh\u1eadn"})}):"Processing"===u.status?(0,N.jsx)(d.Z,{lg:9,children:(0,N.jsx)("span",{children:"\u0110ang x\u1eed l\xfd"})}):"Shipped"===u.status?(0,N.jsx)(d.Z,{lg:9,children:(0,N.jsx)("span",{children:"\u0110ang giao"})}):"Delivered"===u.status?(0,N.jsx)(d.Z,{lg:9,children:(0,N.jsx)("span",{children:"\u0110\xe3 giao"})}):(0,N.jsx)(d.Z,{lg:9,children:(0,N.jsx)("span",{children:"\u0110\xe3 h\u1ee7y"})})]}),(0,N.jsxs)(o.Z,{children:[(0,N.jsx)(d.Z,{lg:3,children:(0,N.jsx)("span",{children:"Ph\u01b0\u01a1ng th\u1ee9c thanh to\xe1n:"})}),(0,N.jsx)(d.Z,{lg:9,children:(0,N.jsx)("span",{children:u.paymentMethod})})]}),(0,N.jsxs)(o.Z,{children:[(0,N.jsx)(d.Z,{lg:3,children:(0,N.jsx)("span",{children:"Tr\u1ea1ng th\xe1i thanh to\xe1n:"})}),!0===u.paymentStatus.isPaid?(0,N.jsx)(d.Z,{lg:9,children:(0,N.jsxs)("span",{children:["\u0110\xe3 thanh to\xe1n ",u.paymentStatus.paidAt]})}):(0,N.jsx)(d.Z,{lg:9,children:(0,N.jsx)("span",{children:"Ch\u01b0a thanh to\xe1n"})})]})]}),(0,N.jsxs)("div",{className:"detail-container",children:[(0,N.jsx)("p",{className:"order-page__title",children:"Th\xf4ng tin s\u1ea3n ph\u1ea9m:"}),(0,N.jsx)("ul",{className:"list-order-item",children:u.items.map((function(n){return(0,N.jsx)(v,{id:n._id,name:n.name,qty:n.qty,image:n.image,price:n.price,orderStatus:u.status,isReload:m,setIsReload:g},n._id)}))}),(0,N.jsxs)("div",{className:"detail-container__fees",children:[(0,N.jsxs)(o.Z,{children:[(0,N.jsx)(d.Z,{lg:4,children:(0,N.jsxs)("span",{children:["T\u1ed5ng (",u.items.reduce((function(n,e){return n+e.qty}),0)," s\u1ea3n ph\u1ea9m): "]})}),(0,N.jsx)(d.Z,{className:"custom-col",lg:8,children:(0,N.jsx)("span",{children:(0,Z.T)(u.price)})})]}),(0,N.jsxs)(o.Z,{children:[(0,N.jsx)(d.Z,{lg:4,children:(0,N.jsx)("span",{children:"Ph\xed giao h\xe0ng: "})}),(0,N.jsx)(d.Z,{className:"custom-col",lg:8,children:(0,N.jsx)("span",{children:(0,Z.T)(u.shippingFee)})})]}),(0,N.jsxs)(o.Z,{children:[(0,N.jsx)(d.Z,{lg:4,children:(0,N.jsx)("span",{children:"T\u1ed5ng c\u1ed9ng: "})}),(0,N.jsx)(d.Z,{className:"custom-col",lg:8,children:(0,N.jsx)("span",{children:(0,Z.T)(u.totalPrice)})})]}),"VNPAY"===u.paymentMethod&&!1===u.paymentStatus.isPaid&&(0,N.jsx)(o.Z,{className:"payment-btn",children:(0,N.jsx)("button",{onClick:function(){var n=function(){var n=(0,i.Z)((0,c.Z)().mark((function n(){return(0,c.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.Z.post("".concat("https://now2tech-f987dbd48ed8.herokuapp.com","/order/create-vnpay-url/").concat(u._id)).then((function(n){window.open(n.data)})).catch((function(n){return console.log(n)}));case 2:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();n()},children:"Thanh to\xe1n v\u1edbi VNPAY"})}),"Not_proccessed"===u.status&&(0,N.jsx)(o.Z,{className:"cancel-btn",children:(0,N.jsx)("button",{onClick:function(){var n=function(){var n=(0,i.Z)((0,c.Z)().mark((function n(){return(0,c.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.Z.put("".concat("https://now2tech-f987dbd48ed8.herokuapp.com","/order/cancel-order/").concat(u._id),{},{withCredentials:!0}).then((function(n){(0,h.Am)(n.data.msg),g(!m)})).catch((function(n){return console.log(n)}));case 2:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();n()},children:"H\u1ee6Y \u0110\u1eb6T H\xc0NG"})}),"Shipped"===u.status&&(0,N.jsx)(o.Z,{className:"delivered-btn",children:(0,N.jsx)("button",{onClick:function(){var n=window.confirm("B\u1ea1n ch\u1eafc ch\u1eafn \u0111\xe3 nh\u1eadn \u0111\u01b0\u1ee3c h\xe0ng?"),e=function(){var n=(0,i.Z)((0,c.Z)().mark((function n(){return(0,c.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.Z.put("".concat("https://now2tech-f987dbd48ed8.herokuapp.com","/order/update-to-delivered/").concat(u._id),{},{withCredentials:!0}).then((function(n){(0,h.Am)(n.data.msg),g(!m)})).catch((function(n){return console.log(n)}));case 2:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();n&&e()},children:"\u0110\xc3 NH\u1eacN \u0110\u01af\u1ee2C H\xc0NG"})})]})]})]}):(0,N.jsx)(b.Z,{})})}},9743:function(n,e,s){var c=s(1413),i=s(5987),r=s(1694),a=s.n(r),t=s(2791),l=s(162),o=s(184),d=["bsPrefix","className","as"],h=t.forwardRef((function(n,e){var s=n.bsPrefix,r=n.className,t=n.as,h=void 0===t?"div":t,u=(0,i.Z)(n,d),x=(0,l.vE)(s,"row"),p=(0,l.pi)(),j=(0,l.zG)(),m="".concat(x,"-cols"),g=[];return p.forEach((function(n){var e,s=u[n];delete u[n],e=null!=s&&"object"===typeof s?s.cols:s;var c=n!==j?"-".concat(n):"";null!=e&&g.push("".concat(m).concat(c,"-").concat(e))})),(0,o.jsx)(h,(0,c.Z)((0,c.Z)({ref:e},u),{},{className:a().apply(void 0,[r,x].concat(g))}))}));h.displayName="Row",e.Z=h}}]);
//# sourceMappingURL=866.77177c49.chunk.js.map