"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[990],{3990:function(e,c,n){n.r(c),n.d(c,{default:function(){return m}});var t=n(9439),a=n(2791),i=n(7689),s=n(841),r=n(1717),l=(n(2809),n(1632)),o=n(9806),d=n(9085),u=(n(5462),n(1243)),h=n(184),m=function(){var e=(0,i.s0)(),c=(0,i.UO)(),n=c.category,m=c.brand,p=c.minp,x=c.maxp,f=c.page,j=(0,a.useState)([]),g=(0,t.Z)(j,2),v=g[0],N=g[1],b=(0,a.useState)([]),k=(0,t.Z)(b,2),Z=k[0],y=k[1],S=(0,a.useState)([]),C=(0,t.Z)(S,2),w=C[0],T=C[1],A=(0,a.useState)(!1),_=(0,t.Z)(A,2),R=_[0],O=_[1],F=(0,a.useState)(null),E=(0,t.Z)(F,2),L=E[0],B=E[1],D=(0,a.useState)(null),G=(0,t.Z)(D,2),I=G[0],q=G[1],K=(0,a.useState)(null),M=(0,t.Z)(K,2),P=M[0],U=M[1],z=(0,a.useState)(null),H=(0,t.Z)(z,2),J=H[0],Q=H[1],V=(0,a.useState)(null),W=(0,t.Z)(V,2),X=(W[0],W[1]),Y=(0,a.useState)(0),$=(0,t.Z)(Y,2),ee=$[0],ce=$[1],ne=(0,a.useState)(1),te=(0,t.Z)(ne,2),ae=te[0],ie=te[1];(0,a.useEffect)((function(){u.Z.get("".concat("https://now2tech-f987dbd48ed8.herokuapp.com","/product/get-all-product/?category=").concat(n,"&brand=").concat(m,"&min=").concat(p,"&max=").concat(x,"&page=").concat(f)).then((function(e){N(e.data.result),X(e.data.maxLength);var c=Math.ceil(e.data.maxLength/12);ce(c),u.Z.get("".concat("https://now2tech-f987dbd48ed8.herokuapp.com","/brand/get-brand-cate/").concat(n)).then((function(e){y(e.data),B(n),q(m),Q(x),U(p)})).catch((function(e){(0,d.Am)(e)}))})).catch((function(e){alert(e)}))}),[R]),(0,a.useEffect)((function(){u.Z.get("".concat("https://now2tech-f987dbd48ed8.herokuapp.com","/category/get-category")).then((function(e){T(e.data)})).catch((function(e){alert("C\xf3 l\u1ed7i khi hi\u1ec3n th\u1ecb")}))}),[]);var se=function(c){q(c),e("/loctheodanhmuc/".concat(L,"/").concat(c,"/0/0/1")),U(null),Q(null),ie(1),O(!R)},re=function(c,n){U(c),Q(n),ie(1),e("/loctheodanhmuc/".concat(L,"/").concat(I,"/").concat(c,"/").concat(n,"/1")),O(!R)};return(0,h.jsxs)("div",{className:"search-page",children:[(0,h.jsx)(d.Ix,{}),(0,h.jsxs)("div",{className:"search-page-container",children:[(0,h.jsxs)("div",{className:"left-container",children:[(0,h.jsx)("h2",{children:"B\u1ed9 l\u1ecdc s\u1ea3n ph\u1ea9m"}),(0,h.jsxs)("div",{className:"search-by-category",children:[(0,h.jsx)("p",{className:"filter-title",children:"Danh m\u1ee5c"}),(0,h.jsx)("ul",{children:w.map((function(c){return(0,h.jsx)("li",{onClick:function(){return n=c.name,B(n),q(null),U(null),Q(null),ie(1),e("/loctheodanhmuc/".concat(n,"/All/0/0/1")),void O(!R);var n},className:L===c.name?"selected":"",value:c._id,children:c.name},c._id)}))})]}),(0,h.jsxs)("div",{className:"search-by-category",children:[(0,h.jsx)("p",{className:"filter-title",children:"Th\u01b0\u01a1ng hi\u1ec7u"}),(0,h.jsxs)("ul",{children:[(0,h.jsx)("li",{onClick:function(){return se("All")},className:"All"===I?"selected":"",value:"All",children:"T\u1ea5t c\u1ea3"}),Z.map((function(e){return(0,h.jsx)("li",{onClick:function(){return se(e.name)},className:I===e.name?"selected":"",value:e._id,children:e.name},e._id)}))]})]}),(0,h.jsxs)("div",{className:"search-by-category",children:[(0,h.jsx)("p",{className:"filter-title",children:"Gi\xe1 b\xe1n"}),(0,h.jsxs)("ul",{children:[(0,h.jsxs)("li",{children:[(0,h.jsx)("input",{type:"checkbox",id:"price-all",checked:0==P&&0==J,onChange:function(){return re(0,0)}}),(0,h.jsx)("label",{htmlFor:"price-all",children:"T\u1ea5t c\u1ea3"})]}),(0,h.jsxs)("li",{children:[(0,h.jsx)("input",{type:"checkbox",id:"price-under-10m",checked:0==P&&1e7==J,onChange:function(){return re(0,1e7)}}),(0,h.jsx)("label",{htmlFor:"price-under-10m",children:"D\u01b0\u1edbi 10 tri\u1ec7u"})]}),(0,h.jsxs)("li",{children:[(0,h.jsx)("input",{type:"checkbox",id:"price-10m-to-15m",checked:1e7==P&&15e6==J,onChange:function(){return re(1e7,15e6)}}),(0,h.jsx)("label",{htmlFor:"price-10m-to-15m",children:"T\u1eeb 10 t\u1edbi 15 tri\u1ec7u"})]}),(0,h.jsxs)("li",{children:[(0,h.jsx)("input",{type:"checkbox",id:"price-over-15m",checked:15e6==P&&1e16==J,onChange:function(){return re(15e6,1e16)}}),(0,h.jsx)("label",{htmlFor:"price-over-15m",children:"Tr\xean 15 tri\u1ec7u"})]})]})]})]}),(0,h.jsxs)("div",{className:"right-container",children:[(0,h.jsxs)("h1",{children:[n," - ","All"===m?"T\u1ea5t c\u1ea3":m]}),v?v.length>0?(0,h.jsx)("div",{className:"search-results",children:v.map((function(e){return(0,h.jsx)("div",{className:"custom-product-card",children:(0,h.jsx)(s.Z,{id:e._id,name:e.name,price:e.sellPrice,avgRating:e.avgRating,numOfReview:e.numOfReview,image:e.pimage[0],voucher:e.voucher},e._id)},e._id)}))}):(0,h.jsxs)("div",{className:"product-not-found",children:[(0,h.jsx)("div",{className:"icon-container",children:(0,h.jsx)(o.G,{className:"magnify-glass-icon",icon:l.q9v})}),(0,h.jsx)("p",{children:"Kh\xf4ng c\xf3 s\u1ea3n ph\u1ea9m ph\xf9 h\u1ee3p"})]}):(0,h.jsx)(r.Z,{}),(0,h.jsx)("div",{className:"pages",children:(0,h.jsx)("ul",{className:"pages-bar",children:Array.from({length:ee},(function(c,n){return(0,h.jsx)("li",{className:ae===n+1?"selected":"",onClick:function(){!function(c){e("/loctheodanhmuc/".concat(L,"/").concat(I,"/").concat(P,"/").concat(J,"/").concat(c)),O(!R)}(n+1),ie(n+1)},children:n+1},n+1)}))})})]})]})]})}},841:function(e,c,n){n.d(c,{Z:function(){return u}});var t=n(9439),a=n(2791),i=n(1087),s=n(1243),r=n(2643),l=n(6912),o=n(9085),d=(n(5462),n(184)),u=function(e){var c=(0,a.useState)(null),n=(0,t.Z)(c,2),u=n[0],h=n[1];return(0,a.useEffect)((function(){e.voucher&&s.Z.get("".concat("https://now2tech-f987dbd48ed8.herokuapp.com","/voucher/get-voucher-by-name?vname=").concat(e.voucher)).then((function(e){h(e.data)})).catch((function(e){(0,o.Am)(e)}))}),[]),(0,d.jsx)(i.OL,{to:"/chi-tiet-san-pham/".concat(e.id),children:(0,d.jsxs)("div",{className:"product-card",children:[(0,d.jsx)(o.Ix,{}),(0,d.jsx)("div",{className:"product-img",children:(0,d.jsx)("img",{src:e.image[0],alt:"place",height:200})}),(0,d.jsx)("h3",{children:e.name}),(0,d.jsxs)("div",{className:"product-rating",children:[(0,d.jsx)(l.Z,{rating:e.avgRating}),(0,d.jsxs)("span",{className:"num-rating",children:[e.numOfReview," \u0111\xe1nh gi\xe1"]})]}),null!=u?(0,d.jsxs)("div",{className:"product-card-price-div",children:[(0,d.jsxs)("strong",{className:"product-price",children:[(0,r.T)((100-u.percent)*e.price/100)," "]}),(0,d.jsxs)("strong",{className:"product-price-old",children:[(0,r.T)(e.price)," "]})]}):(0,d.jsx)("strong",{className:"product-price",children:(0,r.T)(e.price)})]})})}},2809:function(e,c,n){e.exports=n.p+"static/media/SearchBanner.49a020dbf9d93012510b.png"}}]);
//# sourceMappingURL=990.ae34703f.chunk.js.map