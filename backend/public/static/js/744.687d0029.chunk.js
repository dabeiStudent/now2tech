"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[744],{1744:function(e,s,n){n.r(s),n.d(s,{default:function(){return h}});var a=n(4942),i=n(1413),t=n(9439),r=n(2791),l=n(7689),u=n(1632),c=n(9806),d=n(9085),m=(n(5462),n(1243)),o=n(184),h=function(){var e=(0,l.s0)(),s=/^(09|08|03|07|05)[0-9]{8}$/gim,n=(0,r.useState)({firstName:"",lastName:"",phoneNumber:"",userName:"",email:"",passWord:""}),h=(0,t.Z)(n,2),p=h[0],x=h[1];(0,r.useEffect)((function(){window.scrollTo(0,0)}));var N=function(e){e.preventDefault(),x((0,i.Z)((0,i.Z)({},p),{},(0,a.Z)({},e.target.name,e.target.value)))};return(0,o.jsx)("div",{className:"container",children:(0,o.jsx)("div",{className:"form__signup",children:(0,o.jsxs)("form",{className:"element__signup",onSubmit:function(n){n.preventDefault(),0==s.test(p.phoneNumber)?(0,d.Am)("S\u1ed1 \u0111i\u1ec7n tho\u1ea1i kh\xf4ng h\u1ee3p l\u1ec7"):m.Z.post("".concat("https://now2tech-f987dbd48ed8.herokuapp.com","/user/user-register"),p,{withCredentials:!0}).then((function(s){(0,d.Am)("".concat(s.data.msg)),x({firstName:"",lastName:"",phoneNumber:"",userName:"",email:"",passWord:""}),e("/login")})).catch((function(e){"Request failed with status code 400"===e.message?(0,d.Am)("Username kh\xf4ng h\u1ee3p l\u1ec7"):"Request failed with status code 403"===e.message&&(0,d.Am)("Email \u0111\xe3 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng")}))},children:[(0,o.jsx)("div",{className:"error_signup"}),(0,o.jsx)("div",{children:(0,o.jsx)("h1",{children:"\u0110\u0103ng k\xfd t\xe0i kho\u1ea3n"})}),(0,o.jsxs)("div",{className:"signup-page__form",children:[(0,o.jsxs)("div",{className:"left-form",children:[(0,o.jsxs)("div",{className:"input",children:[(0,o.jsx)(c.G,{icon:u.IkF}),(0,o.jsx)("input",{name:"firstName",value:p.firstName,onChange:N,type:"text",placeholder:"Nh\u1eadp t\xean t\u1ea1i \u0111\xe2y",required:!0})]}),(0,o.jsxs)("div",{className:"input",children:[(0,o.jsx)(c.G,{icon:u.BOF}),(0,o.jsx)("input",{name:"lastName",value:p.lastName,onChange:N,type:"text",placeholder:"Nh\u1eadp h\u1ecd t\u1ea1i \u0111\xe2y",required:!0})]}),(0,o.jsxs)("div",{className:"input",children:[(0,o.jsx)(c.G,{icon:u.j1w}),(0,o.jsx)("input",{name:"phoneNumber",value:p.phoneNumber,onChange:N,type:"text",placeholder:"S\u1ed1 \u0111i\u1ec7n tho\u1ea1i",required:!0})]})]}),(0,o.jsxs)("div",{className:"right-form",children:[(0,o.jsxs)("div",{className:"input",children:[(0,o.jsx)(c.G,{icon:u.ILF}),(0,o.jsx)("input",{name:"userName",value:p.userName,onChange:N,type:"text",placeholder:"Username",required:!0})]}),(0,o.jsxs)("div",{className:"input",children:[(0,o.jsx)(c.G,{icon:u.FU$}),(0,o.jsx)("input",{name:"email",value:p.email,onChange:N,type:"email",placeholder:"Email",required:!0})]}),(0,o.jsxs)("div",{className:"input",children:[(0,o.jsx)(c.G,{icon:u.byT}),(0,o.jsx)("input",{name:"passWord",value:p.passWord,onChange:N,type:"password",placeholder:"M\u1eadt kh\u1ea9u",required:!0})]})]})]}),(0,o.jsx)("div",{className:"input",children:(0,o.jsx)("input",{type:"submit",value:"TI\u1ebeP T\u1ee4C"})}),(0,o.jsx)("div",{children:(0,o.jsx)("p",{onClick:function(s){s.preventDefault(),e("/login")},children:"\u0110\u0103ng nh\u1eadp"})})]})})})}}}]);
//# sourceMappingURL=744.687d0029.chunk.js.map