(this["webpackJsonpaspect-ratio-calc"]=this["webpackJsonpaspect-ratio-calc"]||[]).push([[0],[,,,,,,,,,,function(e,t,a){e.exports=a.p+"static/media/add.0e3e08bc.svg"},function(e,t,a){e.exports=a.p+"static/media/copy.72dd793a.svg"},function(e,t,a){e.exports=a.p+"static/media/remove.a24d83e3.svg"},function(e,t,a){e.exports=a.p+"static/media/rotate.c91fa003.svg"},,,,function(e,t,a){e.exports=a(26)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(9),o=a.n(r),i=(a(22),a(6)),l=a(15),s=a(1),m=a(3),u=function(e){var t=document.createElement("textarea");if(t){t.contentEditable="true",t.readOnly=!1,t.value=e,document.body.appendChild(t);var a=document.createRange();a.selectNodeContents(t);var n=window.getSelection();n&&(n.removeAllRanges(),n.addRange(a),t.select(),t.setSelectionRange(0,t.value.length),document.execCommand("copy"),t.blur(),document.body.removeChild(t))}},d=a(5),p=a(14),h=a(16),v=a(7),g={"3:2":13.5,"4:3":12,"5:3":15,"5:4":11.25,"16:10":14.4,"17:10":15.3},f=function e(t){if(t<=0)throw new RangeError("`ratio` should be a positive number.");if(1===t)return"1:1";if(t<1)return e(1/t).split(":").reverse().join(":");for(var a=9*t,n=0,c=Object.keys(g);n<c.length;n++){var r=c[n];if(Math.abs(g[r]-a)<=.0078125)return r}return"".concat(Math.round(10*a)/10,":9")},E=f,F=function e(t,a){var n=this;Object(v.a)(this,e),this.map=void 0,this.pixelCount=void 0,this.ratio=void 0,this.toMap=function(){if(n.map)return n.map;var e=n.pixelCount,t=n.ratio,a=new Map;return a.set("Screen","".concat(e.width," x ").concat(e.height)),a.set("AspectRatio","".concat(t.toFixed(2),":1 (").concat(E(t),")")),a.set("PixelCount","".concat(e.total)),n.map=a,a},this.toYaml=function(){var e=n.toMap();return Array.from(e.keys()).map((function(t){return"".concat(t,": ").concat(e.get(t))})).join("\n")};var c=Math.floor(t),r=Math.floor(a);this.pixelCount={width:c,height:r,total:c*r},this.ratio=c/r,this.map=null},b=function(e){Object(h.a)(a,e);var t=Object(p.a)(a);function a(e,n,c){var r;return Object(v.a)(this,a),(r=t.call(this,e,n)).diagonal=void 0,r.dpi=void 0,r.dotPitch=void 0,r.size=void 0,r.toMap=function(){if(r.map)return r.map;var e=Object(d.a)(r),t=e.pixelCount,a=e.diagonal,n=e.ratio,c=e.dpi,o=e.dotPitch,i=e.size,l=new Map;return l.set("Screen","".concat(t.width," x ").concat(t.height)),l.set("Diagonal","".concat(a,'"')),l.set("AspectRatio","".concat(n.toFixed(2),":1 (").concat(E(n),")")),l.set("DPI","".concat(c.toFixed(2))),l.set("DotPitch","".concat(o.toFixed(4))),l.set("Size","".concat(i.width.toFixed(2)," cm x ").concat(i.height.toFixed(2)," cm")),l.set("PixelCount","".concat(t.total)),r.map=l,l},r.diagonal=c,r.dpi=Math.sqrt(Math.pow(r.pixelCount.width,2)+Math.pow(r.pixelCount.height,2))/c,r.dotPitch=25.4/r.dpi,r.size={width:r.pixelCount.width*r.dotPitch/10,height:r.pixelCount.height*r.dotPitch/10},r}return a}(F),S=function(e,t,a){var n="number"===typeof e?Math.floor(e):parseInt(e,10),c="number"===typeof t?Math.floor(t):parseInt(t,10);if([n,c].some(isNaN))return null;if([n,c].some((function(e){return e<=0})))return null;if(![n,c].every(Number.isSafeInteger))return null;var r=null;if("number"===typeof a)isFinite(a)&&a>0&&(r=a);else if("string"===typeof a){var o=parseFloat(a);isFinite(o)&&o>0&&(r=o)}return null===r?new F(n,c):new b(n,c,r)},N=(a(23),10),x=20*Math.PI/180,y=function(e,t){var a=5*t/6;return{x1:N,y1:a,x2:e-N,y2:a}};var w=function(e){var t=e.width,a=e.height,n=y(t,a),r=function(e){var t=e.x1,a=e.y1,n=e.x2;return{x1:a,y1:t,x2:e.y2,y2:n}}(y(a,t)),o=function(e,t){return{x1:N,y1:t-N,x2:e-N,y2:N}}(t,a),i=function(e,t){var a=5*t/6,n=10*Math.sin(x),c=10*Math.cos(x);return[[N,a,N+c,a-n,N+c,a+n,N,a].join(" "),[e-N,a,e-(N+c),a+n,e-(N+c),a-n,e-N,a].join(" ")]}(t,a),l=function(e,t){var a=5*e/6,n=10*Math.sin(x),c=10*Math.cos(x);return[[a,N,a+n,N+c,a-n,N+c,a,N].join(" "),[a,t-N,a-n,t-(N+c),a+n,t-(N+c),a,t-N].join(" ")]}(t,a),s=function(e,t){var a=Math.acos((e-2*N)/Math.sqrt(Math.pow(e-2*N,2)+Math.pow(t-2*N,2))),n=10*Math.cos(a+x),c=10*Math.sin(a+x),r=10*Math.cos(a-x),o=10*Math.sin(a-x);return[[N,t-N,N+n,t-N-c,N+r,t-N-o,N,t-N].join(" "),[e-N,N,e-N-n,N+c,e-N-r,N+o,e-N,N].join(" ")]}(t,a);return c.a.createElement("svg",{viewBox:"0 0 ".concat(e.width," ").concat(e.height),width:"100%"},c.a.createElement("line",Object.assign({},n,{className:"ScreenFormBg-svg-stroke"})),c.a.createElement("line",Object.assign({},r,{className:"ScreenFormBg-svg-stroke"})),c.a.createElement("line",Object.assign({},o,{className:"ScreenFormBg-svg-stroke"})),c.a.createElement("polygon",{points:i[0],className:"ScreenFormBg-svg-fill"}),c.a.createElement("polygon",{points:i[1],className:"ScreenFormBg-svg-fill"}),c.a.createElement("polygon",{points:l[0],className:"ScreenFormBg-svg-fill"}),c.a.createElement("polygon",{points:l[1],className:"ScreenFormBg-svg-fill"}),c.a.createElement("polygon",{points:s[0],className:"ScreenFormBg-svg-fill"}),c.a.createElement("polygon",{points:s[1],className:"ScreenFormBg-svg-fill"}))},j=a(10),O=a.n(j),M=a(11),C=a.n(M),k=a(12),B=a.n(k),A=a(13),R=a.n(A),I={add:O.a,copy:C.a,remove:B.a,rotate:R.a},P=(a(24),S(1920,1080,24).ratio),D=function(e){return e<9/22?3240/22:e<1?360*e:360},z=function(e){return e>22/9?3240/22:e<=1?360:360/e};var W=function(e){var t=Object(n.useRef)(null),a=Object(n.useRef)(null),r=Object(n.useRef)(null),o=e.width,i=e.height,l=e.diagonal,m=S(o,i,l),d=null,p=null,h=null,v=null,g=null;m instanceof b?(d=m.ratio,p=m.dpi,h=m.dotPitch,v=m.size,g=m.pixelCount.total):m instanceof F&&(d=m.ratio,g=m.pixelCount.total);var E=d||P,N=function(e){return e<9/22?{width:"".concat(900/22,"%")}:e<1?{width:"".concat(100*e,"%")}:{width:"100%"}}(E),x=function(e){return e>22/9?{paddingBottom:"".concat(900/22,"%")}:e<9/22?{paddingBottom:"".concat(2200/9,"%")}:{paddingBottom:"".concat(100/e,"%")}}(E),y=function(t){return function(a){e.onChange(e.id,Object(s.a)({},t,a.target.value))}},j=function(){var n,c,o,i=""===(null===(n=t.current)||void 0===n?void 0:n.value),l=""===(null===(c=a.current)||void 0===c?void 0:c.value),s=""===(null===(o=r.current)||void 0===o?void 0:o.value);i&&l&&s&&e.onRemove(e.id)};return Object(n.useEffect)((function(){var e;null===(e=t.current)||void 0===e||e.focus()}),[]),c.a.createElement("div",{"data-testid":"ScreenForm",style:N},c.a.createElement("div",{className:"ScreenForm-function"},c.a.createElement("button",{className:"ScreenForm-function-button",type:"button",onClick:function(){e.onChange(e.id,{width:e.height,height:e.width})}},c.a.createElement("img",{src:I.rotate,alt:"Rotate"})),c.a.createElement("button",{className:"ScreenForm-function-button",type:"button",onClick:function(){var t=e.width,a=e.height,n=e.diagonal,c=S(t,a,n);null!==c&&u("".concat(c.toYaml(),"\n"))}},c.a.createElement("img",{src:I.copy,alt:"Copy"})),c.a.createElement("button",{className:"ScreenForm-function-button-negative",type:"button",onClick:function(){e.onRemove(e.id)}},c.a.createElement("img",{src:I.remove,alt:"Remove"}))),c.a.createElement("div",{className:"ScreenForm-screen"},c.a.createElement("div",{className:"ScreenForm-ratio",style:x}),c.a.createElement("div",{className:"ScreenForm-content"},c.a.createElement("div",{className:"ScreenForm-bg"},c.a.createElement(w,{width:D(E),height:z(E)})),c.a.createElement("div",{className:"ScreenForm-grid"},c.a.createElement("ul",{className:"ScreenForm-grid-item ScreenForm-width"},c.a.createElement("li",null,c.a.createElement("input",{ref:t,className:"ScreenForm-input",type:"text",value:e.width,inputMode:"numeric",title:"Width",onChange:y("width"),onBlur:j}),"\xa0px"),c.a.createElement("li",null,v?"".concat(v.width.toFixed(2),"cm"):"-")),c.a.createElement("ul",{className:"ScreenForm-grid-item ScreenForm-height"},c.a.createElement("li",null,c.a.createElement("input",{ref:a,className:"ScreenForm-input",type:"text",value:e.height,inputMode:"numeric",title:"Height",onChange:y("height"),onBlur:j}),"\xa0px"),c.a.createElement("li",null,v?"".concat(v.height.toFixed(2),"cm"):"-")),c.a.createElement("ul",{className:"ScreenForm-grid-item ScreenForm-diagonal"},c.a.createElement("li",null,c.a.createElement("input",{ref:r,className:"ScreenForm-input",type:"text",value:e.diagonal,inputMode:"decimal",title:"Diagonal",onChange:y("diagonal"),onBlur:j}),"\xa0in"))),c.a.createElement("div",{className:"ScreenForm-misc"},c.a.createElement("ul",{className:"ScreenForm-misc-info"},c.a.createElement("li",{className:"ScreenForm-misc-pairs"},c.a.createElement("span",{className:"ScreenForm-misc-pair"},c.a.createElement("span",{className:"ScreenForm-misc-key"},"Aspect\xa0ratio\xa0"),c.a.createElement("span",{className:"ScreenForm-misc-value"},d?"".concat(d.toFixed(2),":1 (").concat(f(d),")"):"-"))),c.a.createElement("li",{className:"ScreenForm-misc-pairs"},c.a.createElement("span",{className:"ScreenForm-misc-pair"},c.a.createElement("span",{className:"ScreenForm-misc-key"},"DPI\xa0"),c.a.createElement("span",{className:"ScreenForm-misc-value"},p?p.toFixed(2):"-"))," ",c.a.createElement("span",{className:"ScreenForm-misc-pair"},c.a.createElement("span",{className:"ScreenForm-misc-key"},"Dot\xa0pitch\xa0"),c.a.createElement("span",{className:"ScreenForm-misc-value"},h?"".concat(h.toFixed(4),"mm"):"-"))),c.a.createElement("li",{className:"ScreenForm-misc-pairs"},c.a.createElement("span",{className:"ScreenForm-misc-pair"},c.a.createElement("span",{className:"ScreenForm-misc-key"},"Pixel\xa0count\xa0"),c.a.createElement("span",{className:"ScreenForm-misc-value"},g?g.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g,","):"-"))))))))},q=(a(25),function(e){return e.reduce((function(e,t){var a=t.width,n=t.height,c=t.diagonal,r=S(a,n,c);return null!==r&&e.push(r),e}),[]).map((function(e){return function(e){var t=e.toMap();return"- "+Array.from(t.keys()).map((function(e){return"".concat(e,": ").concat(t.get(e))})).join("\n  ")}(e)})).join("\n\n")+"\n"});var J=function(){var e=Object(n.useState)({}),t=Object(i.a)(e,2),a=t[0],r=t[1],o=Object(n.useState)([]),d=Object(i.a)(o,2),p=d[0],h=d[1],v=Object(n.useState)(0),g=Object(i.a)(v,2),f=g[0],E=g[1],F=function(e,t){var n=Object(m.a)({},a[e],{},t),c=Object(m.a)({},a,Object(s.a)({},e,n));r(c)},b=function(e){var t=Object(m.a)({},a);delete t[e],r(t);var n=p.filter((function(t){return t!==e}));h(n)},S=p.map((function(e){return c.a.createElement(W,Object.assign({},a[e],{key:e,onChange:F,onRemove:b}))}));return c.a.createElement("div",{className:"App","data-testid":"App"},c.a.createElement("header",{className:"App-header"},c.a.createElement("h1",{className:"App-header-title"},"Aspect Ratio Calculator"),c.a.createElement("div",{className:"App-header-button-container"},c.a.createElement("button",{className:"App-header-button",type:"button",onClick:function(){u(q(p.map((function(e){return a[e]}))))}},c.a.createElement("img",{src:I.copy,alt:"Copy all"})))),c.a.createElement("main",{className:"App-main"},S,c.a.createElement("div",{className:"App-main-add"},c.a.createElement("div",{className:"App-main-add-ratio"}),c.a.createElement("button",{className:"App-main-add-button",type:"button",onClick:function(){!function(e){var t=e.screenData,a=e.setScreenData,n=e.screenIdOrder,c=e.setScreenIdOrder,r=e.nextId,o=r;(0,e.setNextId)(r+1);var i={id:o,width:"",height:"",diagonal:""};a(Object(m.a)({},t,Object(s.a)({},o,i))),c([].concat(Object(l.a)(n),[o]))}({screenData:a,setScreenData:r,screenIdOrder:p,setScreenIdOrder:h,nextId:f,setNextId:E})}},c.a.createElement("img",{src:I.add,alt:"Add"})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(J,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[17,1,2]]]);
//# sourceMappingURL=main.d72fb035.chunk.js.map