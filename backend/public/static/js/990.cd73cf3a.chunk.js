"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[990],{3990:function(e,c,n){n.r(c),n.d(c,{default:function(){return m}});var t=n(9439),a=n(2791),i=n(7689),s=n(841),l=n(1717),r=(n(2809),n(1632)),o=n(9806),h=n(9085),u=(n(5462),n(1243)),d=n(184),m=function(){var e=(0,i.s0)(),c=(0,i.UO)(),n=c.category,m=c.brand,p=c.minp,x=c.maxp,f=c.page,g=(0,a.useState)([]),j=(0,t.Z)(g,2),v=j[0],N=j[1],b=(0,a.useState)([]),Z=(0,t.Z)(b,2),k=Z[0],y=Z[1],S=(0,a.useState)([]),C=(0,t.Z)(S,2),T=C[0],A=C[1],_=(0,a.useState)(!1),R=(0,t.Z)(_,2),w=R[0],O=R[1],F=(0,a.useState)(null),E=(0,t.Z)(F,2),L=E[0],B=E[1],D=(0,a.useState)(null),G=(0,t.Z)(D,2),I=G[0],q=G[1],K=(0,a.useState)(null),M=(0,t.Z)(K,2),P=M[0],U=M[1],z=(0,a.useState)(null),H=(0,t.Z)(z,2),J=H[0],Q=H[1],V=(0,a.useState)(null),W=(0,t.Z)(V,2),X=(W[0],W[1]),Y=(0,a.useState)(0),$=(0,t.Z)(Y,2),ee=$[0],ce=$[1],ne=(0,a.useState)(1),te=(0,t.Z)(ne,2),ae=te[0],ie=te[1];(0,a.useEffect)((function(){u.Z.get("".concat("http://localhost:5000","/product/get-all-product/?category=").concat(n,"&brand=").concat(m,"&min=").concat(p,"&max=").concat(x,"&page=").concat(f)).then((function(e){N(e.data.result),X(e.data.maxLength);var c=Math.ceil(e.data.maxLength/12);ce(c),u.Z.get("".concat("http://localhost:5000","/brand/get-brand-cate/").concat(n)).then((function(e){y(e.data),B(n),q(m),Q(x),U(p)})).catch((function(e){(0,h.Am)(e)}))})).catch((function(e){alert(e)}))}),[w]),(0,a.useEffect)((function(){u.Z.get("".concat("http://localhost:5000","/category/get-category")).then((function(e){A(e.data)})).catch((function(e){alert("C\xf3 l\u1ed7i khi hi\u1ec3n th\u1ecb")}))}),[]);var se=function(c){q(c),e("/loctheodanhmuc/".concat(L,"/").concat(c,"/0/0/1")),U(null),Q(null),ie(1),O(!w)},le=function(c,n){U(c),Q(n),ie(1),e("/loctheodanhmuc/".concat(L,"/").concat(I,"/").concat(c,"/").concat(n,"/1")),O(!w)};return(0,d.jsxs)("div",{className:"search-page",children:[(0,d.jsx)(h.Ix,{}),(0,d.jsxs)("div",{className:"search-page-container",children:[(0,d.jsxs)("div",{className:"left-container",children:[(0,d.jsx)("h2",{children:"B\u1ed9 l\u1ecdc s\u1ea3n ph\u1ea9m"}),(0,d.jsxs)("div",{className:"search-by-category",children:[(0,d.jsx)("p",{className:"filter-title",children:"Danh m\u1ee5c"}),(0,d.jsx)("ul",{children:T.map((function(c){return(0,d.jsx)("li",{onClick:function(){return n=c.name,B(n),q(null),U(null),Q(null),ie(1),e("/loctheodanhmuc/".concat(n,"/All/0/0/1")),void O(!w);var n},className:L===c.name?"selected":"",value:c._id,children:c.name},c._id)}))})]}),(0,d.jsxs)("div",{className:"search-by-category",children:[(0,d.jsx)("p",{className:"filter-title",children:"Th\u01b0\u01a1ng hi\u1ec7u"}),(0,d.jsxs)("ul",{children:[(0,d.jsx)("li",{onClick:function(){return se("All")},className:"All"===I?"selected":"",value:"All",children:"T\u1ea5t c\u1ea3"}),k.map((function(e){return(0,d.jsx)("li",{onClick:function(){return se(e.name)},className:I===e.name?"selected":"",value:e._id,children:e.name},e._id)}))]})]}),(0,d.jsxs)("div",{className:"search-by-category",children:[(0,d.jsx)("p",{className:"filter-title",children:"Gi\xe1 b\xe1n"}),(0,d.jsxs)("ul",{children:[(0,d.jsxs)("li",{children:[(0,d.jsx)("input",{type:"checkbox",id:"price-all",checked:0==P&&0==J,onChange:function(){return le(0,0)}}),(0,d.jsx)("label",{htmlFor:"price-all",children:"T\u1ea5t c\u1ea3"})]}),(0,d.jsxs)("li",{children:[(0,d.jsx)("input",{type:"checkbox",id:"price-under-10m",checked:0==P&&1e7==J,onChange:function(){return le(0,1e7)}}),(0,d.jsx)("label",{htmlFor:"price-under-10m",children:"D\u01b0\u1edbi 10 tri\u1ec7u"})]}),(0,d.jsxs)("li",{children:[(0,d.jsx)("input",{type:"checkbox",id:"price-10m-to-15m",checked:1e7==P&&15e6==J,onChange:function(){return le(1e7,15e6)}}),(0,d.jsx)("label",{htmlFor:"price-10m-to-15m",children:"T\u1eeb 10 t\u1edbi 15 tri\u1ec7u"})]}),(0,d.jsxs)("li",{children:[(0,d.jsx)("input",{type:"checkbox",id:"price-over-15m",checked:15e6==P&&1e16==J,onChange:function(){return le(15e6,1e16)}}),(0,d.jsx)("label",{htmlFor:"price-over-15m",children:"Tr\xean 15 tri\u1ec7u"})]})]})]})]}),(0,d.jsxs)("div",{className:"right-container",children:[(0,d.jsxs)("h1",{children:[n," - ","All"===m?"T\u1ea5t c\u1ea3":m]}),v?v.length>0?(0,d.jsx)("div",{className:"search-results",children:v.map((function(e){return(0,d.jsx)("div",{className:"custom-product-card",children:(0,d.jsx)(s.Z,{id:e._id,name:e.name,price:e.sellPrice,avgRating:e.avgRating,numOfReview:e.numOfReview,image:e.pimage[0],voucher:e.voucher},e._id)},e._id)}))}):(0,d.jsxs)("div",{className:"product-not-found",children:[(0,d.jsx)("div",{className:"icon-container",children:(0,d.jsx)(o.G,{className:"magnify-glass-icon",icon:r.q9v})}),(0,d.jsx)("p",{children:"Kh\xf4ng c\xf3 s\u1ea3n ph\u1ea9m ph\xf9 h\u1ee3p"})]}):(0,d.jsx)(l.Z,{}),(0,d.jsx)("div",{className:"pages",children:(0,d.jsx)("ul",{className:"pages-bar",children:Array.from({length:ee},(function(c,n){return(0,d.jsx)("li",{className:ae===n+1?"selected":"",onClick:function(){!function(c){e("/loctheodanhmuc/".concat(L,"/").concat(I,"/").concat(P,"/").concat(J,"/").concat(c)),O(!w)}(n+1),ie(n+1)},children:n+1},n+1)}))})})]})]})]})}},841:function(e,c,n){n.d(c,{Z:function(){return u}});var t=n(9439),a=n(2791),i=n(1087),s=n(1243),l=n(2643),r=n(6912),o=n(9085),h=(n(5462),n(184)),u=function(e){var c=(0,a.useState)(null),n=(0,t.Z)(c,2),u=n[0],d=n[1];return(0,a.useEffect)((function(){e.voucher&&s.Z.get("".concat("http://localhost:5000","/voucher/get-voucher-by-name?vname=").concat(e.voucher)).then((function(e){d(e.data)})).catch((function(e){(0,o.Am)(e)}))}),[]),(0,h.jsx)(i.OL,{to:"/chi-tiet-san-pham/".concat(e.id),children:(0,h.jsxs)("div",{className:"product-card",children:[(0,h.jsx)(o.Ix,{}),(0,h.jsx)("div",{className:"product-img",children:(0,h.jsx)("img",{src:"".concat("http://localhost:5000","/images/").concat(e.image),alt:"place",height:200})}),(0,h.jsx)("h3",{children:e.name}),(0,h.jsxs)("div",{className:"product-rating",children:[(0,h.jsx)(r.Z,{rating:e.avgRating}),(0,h.jsxs)("span",{className:"num-rating",children:[e.numOfReview," \u0111\xe1nh gi\xe1"]})]}),null!=u?(0,h.jsxs)("div",{className:"product-card-price-div",children:[(0,h.jsxs)("strong",{className:"product-price",children:[(0,l.T)((100-u.percent)*e.price/100)," "]}),(0,h.jsxs)("strong",{className:"product-price-old",children:[(0,l.T)(e.price)," "]})]}):(0,h.jsx)("strong",{className:"product-price",children:(0,l.T)(e.price)})]})})}},2809:function(e,c,n){e.exports=n.p+"static/media/SearchBanner.49a020dbf9d93012510b.png"}}]);
//# sourceMappingURL=990.cd73cf3a.chunk.js.map