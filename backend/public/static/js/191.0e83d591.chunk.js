"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[191],{6191:function(e,n,t){t.r(n),t.d(n,{default:function(){return m}});var s=t(4942),i=t(1413),a=t(9439),l=t(2791),c=t(1243),r=t(1632),u=t(7689),o=t(9806),d=t(9085),h=(t(5462),t(184)),m=function(){var e=(0,u.s0)(),n=(0,l.useState)({email:""}),t=(0,a.Z)(n,2),m=t[0],f=t[1];(0,l.useEffect)((function(){window.scrollTo(0,0)}));return(0,h.jsx)("div",{className:"container",children:(0,h.jsx)("div",{className:"form__rspw",children:(0,h.jsxs)("form",{className:"element__rspw",onSubmit:function(e){e.preventDefault(),c.Z.post("".concat("https://now2tech-f987dbd48ed8.herokuapp.com/","/user/reset-password/send-request"),m,{withCredentials:!0}).then((function(e){console.log(m),(0,d.Am)(e.data.msg),f({email:""})})).catch((function(e){"Request failed with status code 429"===e.message?(0,d.Am)("Vui l\xf2ng ch\u1edd 60 gi\xe2y \u0111\u1ec3 th\u1ef1c hi\u1ec7n l\u1ea1i"):"Request failed with status code 404"===e.message&&(0,d.Am)("Email kh\xf4ng \u0111\xfang")}))},children:[(0,h.jsx)("div",{className:"notification",children:(0,h.jsx)(d.Ix,{})}),(0,h.jsx)("div",{children:(0,h.jsx)("h1",{children:"L\u1ea5y l\u1ea1i m\u1eadt kh\u1ea9u"})}),(0,h.jsxs)("div",{className:"input",children:[(0,h.jsx)(o.G,{icon:r.FU$}),(0,h.jsx)("input",{name:"email",value:m.email,onChange:function(e){e.preventDefault(),f((0,i.Z)((0,i.Z)({},m),{},(0,s.Z)({},e.target.name,e.target.value)))},type:"email",placeholder:"Nh\u1eadp email t\u1ea1i \u0111\xe2y",required:!0})]}),(0,h.jsx)("div",{className:"input",children:(0,h.jsx)("input",{type:"submit",value:"TI\u1ebeP T\u1ee4C"})}),(0,h.jsx)("div",{className:"extra__rspw",children:(0,h.jsx)("p",{onClick:function(n){n.preventDefault(),e("/login")},children:"\u0110\u0103ng nh\u1eadp"})})]})})})}}}]);
//# sourceMappingURL=191.0e83d591.chunk.js.map