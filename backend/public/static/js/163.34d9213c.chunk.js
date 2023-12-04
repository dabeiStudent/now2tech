"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[163],{7163:function(e,n,t){t.r(n),t.d(n,{default:function(){return k}});var c=t(3433),s=t(1413),i=t(4165),a=t(5861),r=t(9439),l=t(2791),d=t(5630),o=t(3360),u=t(1087),m=t(7689),h=t(9806),p=t(1632),f=t(9085),x=(t(5462),t(1243)),v=(t(678),t(814)),g=t(2643),j=t(184),N=function(e){var n=(0,l.useContext)(v.A);return(0,j.jsxs)("div",{className:"product-item",children:[(0,j.jsx)("div",{className:"product-item__img",children:(0,j.jsx)("img",{src:"".concat("https://now2tech-f987dbd48ed8.herokuapp.com","/images/").concat(e.image),alt:"product"})}),(0,j.jsxs)("div",{className:"product-item__info",children:[(0,j.jsxs)("div",{className:"product-item__info-top",children:[(0,j.jsxs)("div",{className:"product-name",children:[(0,j.jsx)("a",{href:"/chi-tiet-san-pham/".concat(e.id),children:e.name}),e.voucher&&e.discountValid&&(0,j.jsxs)("span",{className:"discount",children:[(0,j.jsx)(h.G,{className:"tag-icon",icon:p.LEN}),(0,j.jsxs)("a",{href:"/khuyen-mai/".concat(e.voucher._id),children:["Gi\u1ea3m gi\xe1 ",e.discountPercent]})]})]}),e.voucher&&e.discountValid?(0,j.jsxs)("div",{className:"group-price",children:[(0,j.jsx)("span",{className:"sell-price",children:(0,g.T)(e.price)}),(0,j.jsx)("span",{className:"origin-price",children:(0,g.T)(e.sellPrice)})]}):(0,j.jsx)("div",{className:"group-price",children:(0,j.jsx)("span",{className:"sell-price",children:(0,g.T)(e.price)})})]}),(0,j.jsxs)("div",{className:"product-item__info-bottom",children:[(0,j.jsxs)("div",{className:"quantity-group-btn",children:[e.qty>1?(0,j.jsx)("div",{className:"minus-btn visible",onClick:function(){n.reduceQty(e.id)},children:"-"}):(0,j.jsx)("div",{className:"minus-btn",children:"-"}),(0,j.jsx)("div",{className:"qty",children:e.qty}),(0,j.jsx)("div",{className:"plus-btn visible",onClick:function(){n.increaseQty(e.id)},children:"+"})]}),(0,j.jsxs)("button",{className:"delete-btn",onClick:function(){n.deleteItem(e.id)},children:[(0,j.jsx)(h.G,{className:"icon-trash-can",icon:p.Vui}),"X\xf3a"]})]})]})]})},_=t(5668),b=t(8451),Z=t(1717),k=function(){var e=(0,l.useContext)(v.A),n=(0,l.useContext)(b.y),t=(0,l.useState)([]),k=(0,r.Z)(t,2),y=k[0],C=k[1],q=(0,l.useState)([]),S=(0,r.Z)(q,2),w=S[0],G=S[1],P=(0,l.useState)(!0),T=(0,r.Z)(P,2),V=(T[0],T[1]),E=(0,_.Z)("username"),I=decodeURIComponent(E),A=(0,m.s0)(),Q=(0,l.useState)([]),L=(0,r.Z)(Q,2),D=L[0],H=L[1],O=(0,l.useState)(!1),R=(0,r.Z)(O,2),U=R[0],X=R[1],z=e.items.map((function(e){return e.id}));(0,l.useEffect)((function(){0!==e.items.length&&V(!1)}),[]),(0,l.useEffect)((function(){var e=function(){var e=(0,a.Z)((0,i.Z)().mark((function e(){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.Z.get("".concat("https://now2tech-f987dbd48ed8.herokuapp.com","/product/get-product-in-cart"),{params:{products:z}}).then((function(e){C(e.data)})).catch((function(e){return console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]),(0,l.useEffect)((function(){var n=y.map((function(n){var t=e.items.find((function(e){return toString(e.id)===toString(n._id)}));if(t)return(0,s.Z)((0,s.Z)({},n),{},{qty:t.qty})}));G(n)}),[y,e.items]);var B=function(e){var n=w.find((function(n){return toString(n._id)===toString(e.target.value)}));X(!1),D.includes(n)?H(D.filter((function(e){return e._id!==n._id}))):H([].concat((0,c.Z)(D),[n]))};(0,l.useEffect)((function(){e.items.length===D.length&&X(!0)}),[D,e.items.length]);var F=function(){var e=(0,a.Z)((0,i.Z)().mark((function e(){return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:"false"!==I?(n.setSelectedItems(D),A("/thong-tin-giao-hang")):(0,f.Am)("Vui l\xf2ng \u0111\u0103ng nh\u1eadp \u0111\u1ec3 mua h\xe0ng");case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,j.jsxs)("div",{className:"cart-page",children:[(0,j.jsx)(f.Ix,{}),(0,j.jsxs)("div",{className:"cart-page__main",children:[(0,j.jsx)("p",{className:"cart-page__title",children:"Gi\u1ecf h\xe0ng c\u1ee7a b\u1ea1n:"}),0===e.items.length?(0,j.jsxs)("div",{className:"cart-empty",children:[(0,j.jsx)(h.G,{className:"cart-plus__icon",icon:p.qD8}),(0,j.jsx)("p",{children:"Gi\u1ecf h\xe0ng c\u1ee7a b\u1ea1n \u0111ang tr\u1ed1ng"}),(0,j.jsx)(u.OL,{to:"/",children:"Quay v\u1ec1 trang ch\u1ee7"})]}):(0,j.jsxs)("div",{children:[(0,j.jsx)("div",{className:"cart-page__list-item",children:w?(0,j.jsxs)(d.Z,{className:"list-item__form",children:[(0,j.jsx)(d.Z.Check,{className:"custom-checkbox",label:"Ch\u1ecdn t\u1ea5t c\u1ea3",onChange:function(){H(U?[]:w),X(!U)},checked:U,value:"select-all",name:"item",inline:!0}),w.map((function(e){return(0,j.jsxs)("div",{className:"list-item__single-item",children:[(0,j.jsx)(d.Z.Check,{checked:D.includes(e),onChange:B,className:"custom__check-box",value:e._id,name:"item","aria-label":"option"}),(0,j.jsx)(N,{id:e._id,name:e.name,qty:e.qty,sellPrice:e.sellPrice,price:e.price,discountValid:e.discountValid,discountPercent:e.discountPercent,voucher:e.voucher,image:e.image})]},e._id)}))]}):(0,j.jsx)(Z.Z,{})}),(0,j.jsxs)("div",{className:"total-cost",children:[(0,j.jsxs)("span",{children:["T\u1ea1m t\xednh (",D.reduce((function(e,n){return e+n.qty}),0)," s\u1ea3n ph\u1ea9m):"]}),(0,j.jsx)("span",{children:(0,g.T)(D.reduce((function(e,n){return e+(n.vouchers?n.price*(100-n.vouchers.percent)/100*n.qty:n.price*n.qty)}),0))})]}),(0,j.jsx)("div",{className:"cart-page__btn",children:(0,j.jsx)(o.Z,{onClick:F,className:"cart-page__custom-btn",variant:"danger",disabled:0===D.length,children:"\u0110\u1eb6T H\xc0NG"})})]})]})]})}}}]);
//# sourceMappingURL=163.34d9213c.chunk.js.map