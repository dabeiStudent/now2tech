"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[548],{548:function(e,n,t){t.r(n),t.d(n,{default:function(){return p}});var a=t(4165),c=t(5861),s=t(9439),r=t(2791),i=t(7689),o=t(1243),l=t(9806),u=t(1632),d=(t(2809),t(841)),h=t(1717),f=t(4337),m=t(184),p=function(){var e=(0,i.UO)(),n=e.keyword,t=e.page,p=(0,i.s0)(),v=(0,r.useState)(!1),x=(0,s.Z)(v,2),g=x[0],j=(x[1],(0,r.useState)([])),N=(0,s.Z)(j,2),Z=N[0],k=N[1],w=(0,r.useState)(new Date),y=(0,s.Z)(w,2),_=y[0],b=y[1],S=(0,r.useState)([]),R=(0,s.Z)(S,2),C=R[0],D=R[1],G=(0,r.useState)(0),L=(0,s.Z)(G,2),H=L[0],O=L[1],T=(0,r.useState)(0),A=(0,s.Z)(T,2),E=A[0],F=A[1],K=(0,r.useState)(1),M=(0,s.Z)(K,2),U=M[0],q=M[1],B=(0,r.useState)(!1),I=(0,s.Z)(B,2),P=I[0],Y=I[1],z=(0,r.useRef)(0),J=(0,r.useRef)(0);(0,r.useEffect)((function(){var e=function(){var e=(0,c.Z)((0,a.Z)().mark((function e(){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.Z.get("".concat("http://localhost:5000","/product/get-all-product?keyword=").concat(n,"&page=").concat(t)).then((function(e){D(e.data.result),O(e.data.maxLength);var n=Math.ceil(e.data.maxLength/12);F(n)})).catch((function(e){return console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[n,P]);(0,r.useEffect)((function(){var e=function(){var e=(0,c.Z)((0,a.Z)().mark((function e(){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.Z.get("".concat("http://localhost:5000","/voucher/get-all-voucher")).then((function(e){k(e.data)})).catch((function(e){console.log(e)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e(),b(new Date)}),[]);var Q=Z.filter((function(e){return new Date(e.end)>_}));return(0,m.jsx)(r.Fragment,{children:(0,m.jsx)("div",{className:"search-page",children:(0,m.jsx)("div",{className:"search-page-container",children:(0,m.jsxs)("div",{className:"right-container",children:[(0,m.jsxs)("h1",{children:["T\xecm v\u1edbi t\u1eeb kh\xf3a: ",n]}),C?C.length>0?(0,m.jsxs)(r.Fragment,{children:[(0,m.jsxs)("h2",{children:["T\xecm th\u1ea5y: ",H," s\u1ea3n ph\u1ea9m"]}),(0,m.jsx)("div",{className:"search-results",children:C.map((function(e){return(0,m.jsx)("div",{className:"custom-product-card",children:(0,m.jsx)(d.Z,{id:e._id,name:e.name,price:e.sellPrice,avgRating:e.avgRating,numOfReview:e.numOfReview,image:e.pimage[0],voucher:e.voucher},e._id)},e._id)}))})]}):(0,m.jsxs)("div",{className:"product-not-found",children:[(0,m.jsx)("div",{className:"icon-container",children:(0,m.jsx)(l.G,{className:"magnify-glass-icon",icon:u.q9v})}),(0,m.jsx)("p",{children:"Kh\xf4ng c\xf3 s\u1ea3n ph\u1ea9m ph\xf9 h\u1ee3p"})]}):(0,m.jsx)(h.Z,{}),(0,m.jsx)("div",{className:"pages",children:(0,m.jsx)("ul",{className:"pages-bar",children:Array.from({length:E},(function(e,t){return(0,m.jsx)("li",{className:U===t+1?"selected":"",onClick:function(){!function(e){p("/tim-kiem/".concat(n,"/").concat(e)),Y(!P)}(t+1),q(t+1)},children:t+1},t+1)}))})}),(0,m.jsx)("div",{className:"voucher-container",children:(0,m.jsxs)("div",{className:"voucher-container__main",children:[(0,m.jsx)("h2",{children:"CH\u01af\u01a0NG TR\xccNH KHUY\u1ebeN M\xc3I"}),(0,m.jsx)("div",{className:"scroll",ref:z,children:(0,m.jsx)("div",{ref:J,className:"voucher-container__list",children:Q.map((function(e){return(0,m.jsx)(f.Z,{name:e.name,id:e._id,image:e.image},e._id)}))})}),(0,m.jsx)("button",{className:"prev-btn",style:g?{display:"flex"}:{display:"none"},onClick:function(){var e=z.current;e&&(e.scrollLeft-=1200)},children:(0,m.jsx)(l.G,{icon:u.A35})}),(0,m.jsx)("button",{className:"next-btn",style:g?{display:"flex"}:{display:"none"},onClick:function(){var e=z.current;e&&(e.scrollLeft+=1200)},children:(0,m.jsx)(l.G,{icon:u._tD})})]})})]})})})})}},2809:function(e,n,t){e.exports=t.p+"static/media/SearchBanner.49a020dbf9d93012510b.png"}}]);
//# sourceMappingURL=548.44feaada.chunk.js.map