"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[727],{1838:function(e,c,n){n.r(c),n.d(c,{default:function(){return m}});var t=n(9439),a=n(2791),l=n(7689),i=n(841),s=n(1717),r=(n.p,n(1632)),o=n(9806),u=n(9085),h=(n(5462),n(8608),n(4294),n(1243)),d=n(184),m=function(){var e=(0,l.s0)(),c=(0,l.UO)(),n=c.category,m=c.brand,p=c.minp,x=c.maxp,f=c.page,j=(0,a.useState)([]),g=(0,t.Z)(j,2),v=g[0],b=g[1],N=(0,a.useState)([]),k=(0,t.Z)(N,2),y=k[0],Z=k[1],C=(0,a.useState)([]),S=(0,t.Z)(C,2),w=S[0],A=S[1],_=(0,a.useState)(!1),T=(0,t.Z)(_,2),F=T[0],R=T[1],O=(0,a.useState)(null),D=(0,t.Z)(O,2),E=D[0],G=D[1],L=(0,a.useState)(null),q=(0,t.Z)(L,2),B=q[0],I=q[1],K=(0,a.useState)(null),M=(0,t.Z)(K,2),P=M[0],U=M[1],z=(0,a.useState)(null),H=(0,t.Z)(z,2),J=H[0],Q=H[1],V=(0,a.useState)(null),W=(0,t.Z)(V,2),X=(W[0],W[1]),Y=(0,a.useState)(0),$=(0,t.Z)(Y,2),ee=$[0],ce=$[1],ne=(0,a.useState)(1),te=(0,t.Z)(ne,2),ae=te[0],le=te[1];(0,a.useEffect)((function(){h.Z.get("".concat("https://now2tech-f987dbd48ed8.herokuapp.com","/product/get-all-product/?category=").concat(n,"&brand=").concat(m,"&min=").concat(p,"&max=").concat(x,"&page=").concat(f)).then((function(e){b(e.data.result),X(e.data.maxLength);var c=Math.ceil(e.data.maxLength/12);ce(c),h.Z.get("".concat("https://now2tech-f987dbd48ed8.herokuapp.com","/brand/get-brand-cate/").concat(n)).then((function(e){Z(e.data),G(n),I(m),Q(x),U(p)})).catch((function(e){(0,u.Am)(e)}))})).catch((function(e){alert(e)}))}),[F]),(0,a.useEffect)((function(){h.Z.get("".concat("https://now2tech-f987dbd48ed8.herokuapp.com","/category/get-category")).then((function(e){A(e.data)})).catch((function(e){alert("C\xf3 l\u1ed7i khi hi\u1ec3n th\u1ecb")}))}),[]);var ie=function(c){I(c),e("/loctheodanhmuc/".concat(E,"/").concat(c,"/0/0/1")),U(null),Q(null),le(1),R(!F)},se=function(c,n){U(c),Q(n),le(1),e("/loctheodanhmuc/".concat(E,"/").concat(B,"/").concat(c,"/").concat(n,"/1")),R(!F)};return(0,d.jsxs)("div",{className:"search-page",children:[(0,d.jsx)(u.Ix,{}),(0,d.jsxs)("div",{className:"search-page-container",children:[(0,d.jsxs)("div",{className:"left-container",children:[(0,d.jsx)("h2",{children:"B\u1ed9 l\u1ecdc s\u1ea3n ph\u1ea9m"}),(0,d.jsxs)("div",{className:"search-by-category",children:[(0,d.jsx)("p",{className:"filter-title",children:"Danh m\u1ee5c"}),(0,d.jsx)("ul",{children:w.map((function(c){return(0,d.jsx)("li",{onClick:function(){return n=c.name,G(n),I(null),U(null),Q(null),le(1),e("/loctheodanhmuc/".concat(n,"/All/0/0/1")),void R(!F);var n},className:E===c.name?"selected":"",value:c._id,children:c.name},c._id)}))})]}),(0,d.jsxs)("div",{className:"search-by-category",children:[(0,d.jsx)("p",{className:"filter-title",children:"Th\u01b0\u01a1ng hi\u1ec7u"}),(0,d.jsxs)("ul",{children:[(0,d.jsx)("li",{onClick:function(){return ie("All")},className:"All"===B?"selected":"",value:"All",children:"T\u1ea5t c\u1ea3"}),y.map((function(e){return(0,d.jsx)("li",{onClick:function(){return ie(e.name)},className:B===e.name?"selected":"",value:e._id,children:e.name},e._id)}))]})]}),(0,d.jsxs)("div",{className:"search-by-category",children:[(0,d.jsx)("p",{className:"filter-title",children:"Gi\xe1 b\xe1n"}),(0,d.jsxs)("ul",{children:[(0,d.jsxs)("li",{children:[(0,d.jsx)("input",{type:"checkbox",id:"price-all",checked:0==P&&0==J,onChange:function(){return se(0,0)}}),(0,d.jsx)("label",{htmlFor:"price-all",children:"T\u1ea5t c\u1ea3"})]}),(0,d.jsxs)("li",{children:[(0,d.jsx)("input",{type:"checkbox",id:"price-under-10m",checked:0==P&&1e7==J,onChange:function(){return se(0,1e7)}}),(0,d.jsx)("label",{htmlFor:"price-under-10m",children:"D\u01b0\u1edbi 10 tri\u1ec7u"})]}),(0,d.jsxs)("li",{children:[(0,d.jsx)("input",{type:"checkbox",id:"price-10m-to-15m",checked:1e7==P&&15e6==J,onChange:function(){return se(1e7,15e6)}}),(0,d.jsx)("label",{htmlFor:"price-10m-to-15m",children:"T\u1eeb 10 t\u1edbi 15 tri\u1ec7u"})]}),(0,d.jsxs)("li",{children:[(0,d.jsx)("input",{type:"checkbox",id:"price-over-15m",checked:15e6==P&&1e16==J,onChange:function(){return se(15e6,1e16)}}),(0,d.jsx)("label",{htmlFor:"price-over-15m",children:"Tr\xean 15 tri\u1ec7u"})]})]})]})]}),(0,d.jsxs)("div",{className:"right-container",children:[(0,d.jsxs)("h1",{children:[n," - ","All"===m?"T\u1ea5t c\u1ea3":m]}),v?v.length>0?(0,d.jsx)("div",{className:"search-results",children:v.map((function(e){return(0,d.jsx)("div",{className:"custom-product-card",children:(0,d.jsx)(i.Z,{id:e._id,name:e.name,price:e.sellPrice,avgRating:e.avgRating,numOfReview:e.numOfReview,image:e.pimage[0],voucher:e.voucher},e._id)},e._id)}))}):(0,d.jsxs)("div",{className:"product-not-found",children:[(0,d.jsx)("div",{className:"icon-container",children:(0,d.jsx)(o.G,{className:"magnify-glass-icon",icon:r.q9v})}),(0,d.jsx)("p",{children:"Kh\xf4ng c\xf3 s\u1ea3n ph\u1ea9m ph\xf9 h\u1ee3p"})]}):(0,d.jsx)(s.Z,{}),(0,d.jsx)("div",{className:"pages",children:(0,d.jsx)("ul",{className:"pages-bar",children:Array.from({length:ee},(function(c,n){return(0,d.jsx)("li",{className:ae===n+1?"selected":"",onClick:function(){!function(c){e("/loctheodanhmuc/".concat(E,"/").concat(B,"/").concat(P,"/").concat(J,"/").concat(c)),R(!F)}(n+1),le(n+1)},children:n+1},n+1)}))})})]})]})]})}},8608:function(){},4294:function(){}}]);
//# sourceMappingURL=727.39e01efa.chunk.js.map