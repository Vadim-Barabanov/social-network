(this["webpackJsonpstudy-project"]=this["webpackJsonpstudy-project"]||[]).push([[3],{293:function(e,s,a){e.exports={wrapper:"Dialogs_wrapper__34EvC",dialogItems:"Dialogs_dialogItems__1H3Pn",item:"Dialogs_item__KtUlt",item__img:"Dialogs_item__img__3VvFL",item__name:"Dialogs_item__name__1MoZ3",messageItems:"Dialogs_messageItems__3GVEs",message:"Dialogs_message__31TJZ",message__mymsg:"Dialogs_message__mymsg__2r5Ln",message__item:"Dialogs_message__item__25T5V",message__name:"Dialogs_message__name__1Tl26",input__box:"Dialogs_input__box__xJMdK",input__text:"Dialogs_input__text__3deg6",input__btn:"Dialogs_input__btn__1vxef",active:"Dialogs_active__1drEC",inputForm:"Dialogs_inputForm__ZyFhp"}},295:function(e,s,a){"use strict";a.r(s);var t=a(0),i=a(1),n=a.n(i),m=a(293),_=a.n(m),c=a(13),r=function e(s){var a="/dialogs/"+s.id;return Object(t.jsx)("div",{className:e.item,children:Object(t.jsxs)(c.b,{to:a,className:_.a.item,activeClassName:_.a.active,children:[Object(t.jsx)("img",{alt:"user",className:_.a.item__img,src:"#"}),Object(t.jsx)("span",{className:_.a.item__name,children:s.name})]})})},o=function(e){return e.isMine?Object(t.jsx)("div",{className:_.a.message__mymsg+" "+_.a.message,children:Object(t.jsx)("span",{className:_.a.message__item,children:e.text})}):Object(t.jsxs)("div",{className:_.a.message+" "+_.a.message__item,children:[Object(t.jsx)("span",{className:_.a.message__name,children:e.from}),Object(t.jsx)("span",{children:e.text})]})},l=a(129),g=a(130),j=a(70),u=a(36),d=Object(u.a)(3e3),b=Object(j.a)("textarea"),p=Object(g.a)({form:"messages"})((function(e){return Object(t.jsxs)("form",{className:_.a.inputForm,onSubmit:e.handleSubmit,children:[Object(t.jsx)("div",{children:Object(t.jsx)(l.a,{component:b,name:"messageText",validate:[u.b,d]})}),Object(t.jsx)("div",{children:Object(t.jsx)("button",{children:"Send"})})]})})),x=function(e){var s=e.dialogsPage.dialogs.map((function(e){return Object(t.jsx)(r,{name:e.name,id:e.id},e.id)})),a=e.dialogsPage.messages.map((function(e){return Object(t.jsx)(o,{from:e.from,isMine:e.isMine,text:e.text},e.id)}));return Object(t.jsxs)("div",{className:_.a.wrapper,children:[Object(t.jsx)("div",{className:_.a.dialogItems,children:s}),Object(t.jsx)("div",{className:_.a.messageItems,children:a}),Object(t.jsx)(p,{onSubmit:function(s){e.addMessage(s.messageText)}})]})},O=a(108),h=a(12),f=a(9),v=a(5),D=a(28),N=a(29),y=a(31),M=a(30),I=a(11),w=function(e){return{isAuth:e.auth.isAuth}};s.default=Object(f.d)(Object(h.b)((function(e){return{dialogsPage:e.dialogsPage,isAuth:e.auth.isAuth}}),{addMessage:O.a}),(function(e){var s=function(s){Object(y.a)(i,s);var a=Object(M.a)(i);function i(){return Object(D.a)(this,i),a.apply(this,arguments)}return Object(N.a)(i,[{key:"render",value:function(){return this.props.isAuth?Object(t.jsx)(e,Object(v.a)({},this.props)):Object(t.jsx)(I.a,{to:"/login"})}}]),i}(n.a.Component);return Object(h.b)(w)(s)}))(x)}}]);
//# sourceMappingURL=3.78962ee1.chunk.js.map