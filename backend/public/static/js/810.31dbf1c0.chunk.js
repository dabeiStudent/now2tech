"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[810],{8810:function(e,n,s){s.r(n),s.d(n,{default:function(){return m}});var t=s(4942),i=s(1413),a=s(9439),l=s(2791),r=s(1243),o=s(1632),c=s(7689),u=s(9806),d=s(9085),h=(s(5462),s(5344)),p=s(184),m=function(){var e=(0,l.useContext)(h.V),n=(0,c.s0)(),s=(0,l.useState)({email:"",passWord:""}),m=(0,a.Z)(s,2),f=m[0],x=m[1];(0,l.useEffect)((function(){window.scrollTo(0,0)}));var v=function(e){e.preventDefault(),x((0,i.Z)((0,i.Z)({},f),{},(0,t.Z)({},e.target.name,e.target.value)))};return(0,p.jsx)("div",{className:"container",children:(0,p.jsx)("div",{className:"form__login",children:(0,p.jsxs)("form",{className:"element__login",onSubmit:function(n){n.preventDefault(),r.Z.post("".concat("https://now2tech-f987dbd48ed8.herokuapp.com","/user/user-login"),f,{withCredentials:!0}).then((function(n){x({email:"",passWord:""}),e.login(),window.location.href="/"})).catch((function(e){"Request failed with status code 404"===e.message?(0,d.Am)("Email/M\u1eadt kh\u1ea9u kh\xf4ng \u0111\xfang"):"Request failed with status code 400"===e.message&&(0,d.Am)("T\xe0i kho\u1ea3n \u0111ang b\u1ecb kh\xf3a")}))},children:[(0,p.jsx)("div",{className:"error_signup",children:(0,p.jsx)(d.Ix,{})}),(0,p.jsx)("div",{className:"label-login",children:(0,p.jsx)("h1",{children:"\u0110\u0103ng nh\u1eadp"})}),(0,p.jsxs)("div",{className:"input",children:[(0,p.jsx)(u.G,{icon:o.FU$}),(0,p.jsx)("input",{name:"email",value:f.email,onChange:v,type:"text",placeholder:"Nh\u1eadp email t\u1ea1i \u0111\xe2y",required:!0})]}),(0,p.jsxs)("div",{className:"input",children:[(0,p.jsx)(u.G,{icon:o.byT}),(0,p.jsx)("input",{name:"passWord",value:f.passWord,onChange:v,type:"password",placeholder:"Nh\u1eadp m\u1eadt kh\u1ea9u t\u1ea1i \u0111\xe2y",required:!0})]}),(0,p.jsx)("div",{className:"input",children:(0,p.jsx)("input",{type:"submit",value:"TI\u1ebeP T\u1ee4C"})}),(0,p.jsxs)("div",{children:[(0,p.jsx)("p",{onClick:function(e){e.preventDefault(),n("/signup")},children:"\u0110\u0103ng k\xfd t\xe0i kho\u1ea3n"}),(0,p.jsx)("p",{onClick:function(e){e.preventDefault(),n("/reset-password")},children:"Qu\xean t\xe0i kho\u1ea3n"})]})]})})})}}}]);
//# sourceMappingURL=810.31dbf1c0.chunk.js.map