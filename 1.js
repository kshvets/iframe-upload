define("@sentry/browser",["exports"],(function(e){"use strict"
function t(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function n(e,t){return e(t={exports:{}},t.exports),t.exports}const r=Object.prototype.toString
function o(e){switch(r.call(e)){case"[object Error]":case"[object Exception]":case"[object DOMException]":return!0
default:return h(e,Error)}}function s(e,t){return r.call(e)===`[object ${t}]`}function i(e){return s(e,"String")}function a(e){return null===e||"object"!=typeof e&&"function"!=typeof e}function c(e){return s(e,"Object")}function u(e){return"undefined"!=typeof Event&&h(e,Event)}function l(e){return"undefined"!=typeof Element&&h(e,Element)}function d(e){return s(e,"RegExp")}function p(e){return Boolean(e&&e.then&&"function"==typeof e.then)}function _(e){return c(e)&&"nativeEvent"in e&&"preventDefault"in e&&"stopPropagation"in e}function f(e){return"number"==typeof e&&e!=e}function h(e,t){try{return e instanceof t}catch(n){return!1}}function g(e){return e&&e.Math==Math?e:void 0}const m="object"==typeof globalThis&&g(globalThis)||"object"==typeof window&&g(window)||"object"==typeof self&&g(self)||"object"==typeof global&&g(global)||function(){return this}()||{}
function y(e,t,n){const r=n||m,o=r.__SENTRY__=r.__SENTRY__||{}
return o[e]||(o[e]=t())}const E=m
function v(e,t){try{let n=e
const r=5,o=80,s=[]
let i=0,a=0
const c=" > ",u=c.length
let l
for(;n&&i++<r&&(l=S(n,t),!("html"===l||i>1&&a+s.length*u+l.length>=o));)s.push(l),a+=l.length,n=n.parentNode
return s.reverse().join(c)}catch(n){return"<unknown>"}}function S(e,t){const n=e,r=[]
let o,s,a,c,u
if(!n||!n.tagName)return""
r.push(n.tagName.toLowerCase())
const l=t&&t.length?t.filter(e=>n.getAttribute(e)).map(e=>[e,n.getAttribute(e)]):null
if(l&&l.length)l.forEach(e=>{r.push(`[${e[0]}="${e[1]}"]`)})
else if(n.id&&r.push("#"+n.id),o=n.className,o&&i(o))for(s=o.split(/\s+/),u=0;u<s.length;u++)r.push("."+s[u])
const d=["type","name","title","alt"]
for(u=0;u<d.length;u++)a=d[u],c=n.getAttribute(a),c&&r.push(`[${a}="${c}"]`)
return r.join("")}class b extends Error{constructor(e,t="warn"){super(e),this.message=e,this.name=new.target.prototype.constructor.name,Object.setPrototypeOf(this,new.target.prototype),this.logLevel=t}}const T=/^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/
function k(e,t=!1){const{host:n,path:r,pass:o,port:s,projectId:i,protocol:a,publicKey:c}=e
return`${a}://${c}${t&&o?":"+o:""}@${n}${s?":"+s:""}/${r?r+"/":r}${i}`}function x(e){const t=T.exec(e)
if(!t)throw new b("Invalid Sentry Dsn: "+e)
const[n,r,o="",s,i="",a]=t.slice(1)
let c="",u=a
const l=u.split("/")
if(l.length>1&&(c=l.slice(0,-1).join("/"),u=l.pop()),u){const e=u.match(/^\d+/)
e&&(u=e[0])}return w({host:s,pass:o,path:c,projectId:u,port:i,protocol:n,publicKey:r})}function w(e){return{protocol:e.protocol,publicKey:e.publicKey||"",pass:e.pass||"",host:e.host,port:e.port||"",path:e.path||"",projectId:e.projectId}}function D(e){const t="string"==typeof e?x(e):w(e)
return function(e){if("undefined"!=typeof __SENTRY_DEBUG__&&!__SENTRY_DEBUG__)return
const{port:t,projectId:n,protocol:r}=e
if(["protocol","publicKey","host","projectId"].forEach(t=>{if(!e[t])throw new b(`Invalid Sentry Dsn: ${t} missing`)}),!n.match(/^\d+$/))throw new b("Invalid Sentry Dsn: Invalid projectId "+n)
if(!function(e){return"http"===e||"https"===e}(r))throw new b("Invalid Sentry Dsn: Invalid protocol "+r)
if(t&&isNaN(parseInt(t,10)))throw new b("Invalid Sentry Dsn: Invalid port "+t)}(t),t}const N=["debug","info","warn","error","log","assert","trace"]
function R(e){if(!("console"in m))return e()
const t=m.console,n={}
N.forEach(e=>{const r=t[e]&&t[e].__sentry_original__
e in t&&r&&(n[e]=t[e],t[e]=r)})
try{return e()}finally{Object.keys(n).forEach(e=>{t[e]=n[e]})}}function O(){let e=!1
const t={enable:()=>{e=!0},disable:()=>{e=!1}}
return"undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__?N.forEach(n=>{t[n]=(...t)=>{e&&R(()=>{m.console[n](`Sentry Logger [${n}]:`,...t)})}}):N.forEach(e=>{t[e]=()=>{}}),t}let I
function P(e,t=0){return"string"!=typeof e||0===t||e.length<=t?e:e.substr(0,t)+"..."}function C(e,t){let n=e
const r=n.length
if(r<=150)return n
t>r&&(t=r)
let o=Math.max(t-60,0)
o<5&&(o=0)
let s=Math.min(o+140,r)
return s>r-5&&(s=r),s===r&&(o=Math.max(s-140,0)),n=n.slice(o,s),o>0&&(n="'{snip} "+n),s<r&&(n+=" {snip}"),n}function U(e,t){return!!i(e)&&(d(t)?t.test(e):"string"==typeof t&&-1!==e.indexOf(t))}function L(e,t,n){if(!(t in e))return
const r=e[t],o=n(r)
if("function"==typeof o)try{M(o,r)}catch(s){}e[t]=o}function B(e,t,n){Object.defineProperty(e,t,{value:n,writable:!0,configurable:!0})}function M(e,t){const n=t.prototype||{}
e.prototype=t.prototype=n,B(e,"__sentry_original__",t)}function G(e){return e.__sentry_original__}function j(e){return Object.keys(e).map(t=>`${encodeURIComponent(t)}=${encodeURIComponent(e[t])}`).join("&")}function A(e){if(o(e))return{message:e.message,name:e.name,stack:e.stack,...H(e)}
if(u(e)){const t={type:e.type,target:F(e.target),currentTarget:F(e.currentTarget),...H(e)}
return"undefined"!=typeof CustomEvent&&h(e,CustomEvent)&&(t.detail=e.detail),t}return e}function F(e){try{return l(e)?v(e):Object.prototype.toString.call(e)}catch(t){return"<unknown>"}}function H(e){if("object"==typeof e&&null!==e){const t={}
for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])
return t}return{}}function Y(e){return function e(t,n){if(c(t)){const r=n.get(t)
if(void 0!==r)return r
const o={}
n.set(t,o)
for(const s of Object.keys(t))void 0!==t[s]&&(o[s]=e(t[s],n))
return o}if(Array.isArray(t)){const r=n.get(t)
if(void 0!==r)return r
const o=[]
return n.set(t,o),t.forEach(t=>{o.push(e(t,n))}),o}return t}(e,new Map)}function W(e){let t=void 0,n=e[0],r=1
for(;r<e.length;){const o=e[r],s=e[r+1]
if(r+=2,("optionalAccess"===o||"optionalCall"===o)&&null==n)return
"access"===o||"optionalAccess"===o?(t=n,n=s(n)):"call"!==o&&"optionalCall"!==o||(n=s((...e)=>n.call(t,...e)),t=void 0)}return n}I="undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__?y("logger",O):O()
function $(...e){const t=e.sort((e,t)=>e[0]-t[0]).map(e=>e[1])
return(e,n=0)=>{const r=[]
for(const o of e.split("\n").slice(n)){const e=o.replace(/\(error: (.*)\)/,"$1")
for(const n of t){const t=n(e)
if(t){r.push(t)
break}}}return q(r)}}function q(e){if(!e.length)return[]
let t=e
const n=t[0].function||"",r=t[t.length-1].function||""
return-1===n.indexOf("captureMessage")&&-1===n.indexOf("captureException")||(t=t.slice(1)),-1!==r.indexOf("sentryWrapped")&&(t=t.slice(0,-1)),t.slice(0,50).map(e=>({...e,filename:e.filename||t[0].filename,function:e.function||"?"})).reverse()}function z(e){try{return e&&"function"==typeof e&&e.name||"<anonymous>"}catch(t){return"<anonymous>"}}function X(e){const t=/^\s*[-]{4,}$/,n=/at (?:async )?(?:(.+?)\s+\()?(?:(.+):(\d+):(\d+)?|([^)]+))\)?/
return r=>{if(r.match(t))return{filename:r}
const o=r.match(n)
if(!o)return
let s,i,a,c,u
if(o[1]){a=o[1]
let e=a.lastIndexOf(".")
if("."===a[e-1]&&e--,e>0){s=a.substr(0,e),i=a.substr(e+1)
const t=s.indexOf(".Module")
t>0&&(a=a.substr(t+1),s=s.substr(0,t))}c=void 0}i&&(c=s,u=i),"<anonymous>"===i&&(u=void 0,a=void 0),void 0===a&&(u=u||"<anonymous>",a=c?`${c}.${u}`:u)
const l=W([o,"access",e=>e[2],"optionalAccess",e=>e.startsWith,"call",e=>e("file://")])?o[2].substr(7):o[2],d=!("native"===o[5]||l&&!l.startsWith("/")&&!l.startsWith(".")&&1!==l.indexOf(":\\"))&&void 0!==l&&!l.includes("node_modules/")
return{filename:l,module:W([e,"optionalCall",e=>e(l)]),function:a,lineno:parseInt(o[3],10)||void 0,colno:parseInt(o[4],10)||void 0,in_app:d}}}function K(){if(!("fetch"in E))return!1
try{return new Headers,new Request("http://www.example.com"),new Response,!0}catch(e){return!1}}function V(e){return e&&/^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(e.toString())}function J(){if(!K())return!1
if(V(E.fetch))return!0
let e=!1
const t=E.document
if(t&&"function"==typeof t.createElement)try{const n=t.createElement("iframe")
n.hidden=!0,t.head.appendChild(n),n.contentWindow&&n.contentWindow.fetch&&(e=V(n.contentWindow.fetch)),t.head.removeChild(n)}catch(n){("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&I.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",n)}return e}function Z(){const e=E.chrome,t=e&&e.app&&e.app.runtime,n="history"in E&&!!E.history.pushState&&!!E.history.replaceState
return!t&&n}const Q={},ee={}
function te(e){if(!ee[e])switch(ee[e]=!0,e){case"console":(function(){if(!("console"in E))return
N.forEach((function(e){e in E.console&&L(E.console,e,(function(t){return function(...n){ne("console",{args:n,level:e}),t&&t.apply(E.console,n)}}))}))})()
break
case"dom":(function(){if(!("document"in E))return
const e=ne.bind(null,"dom"),t=ce(e,!0)
E.document.addEventListener("click",t,!1),E.document.addEventListener("keypress",t,!1),["EventTarget","Node"].forEach(t=>{const n=E[t]&&E[t].prototype
n&&n.hasOwnProperty&&n.hasOwnProperty("addEventListener")&&(L(n,"addEventListener",(function(t){return function(n,r,o){if("click"===n||"keypress"==n)try{const r=this,s=r.__sentry_instrumentation_handlers__=r.__sentry_instrumentation_handlers__||{},i=s[n]=s[n]||{refCount:0}
if(!i.handler){const r=ce(e)
i.handler=r,t.call(this,n,r,o)}i.refCount+=1}catch(s){}return t.call(this,n,r,o)}})),L(n,"removeEventListener",(function(e){return function(t,n,r){if("click"===t||"keypress"==t)try{const n=this,o=n.__sentry_instrumentation_handlers__||{},s=o[t]
s&&(s.refCount-=1,s.refCount<=0&&(e.call(this,t,s.handler,r),s.handler=void 0,delete o[t]),0===Object.keys(o).length&&delete n.__sentry_instrumentation_handlers__)}catch(o){}return e.call(this,t,n,r)}})))})})()
break
case"xhr":(function(){if(!("XMLHttpRequest"in E))return
const e=XMLHttpRequest.prototype
L(e,"open",(function(e){return function(...t){const n=this,r=t[1],o=n.__sentry_xhr__={method:i(t[0])?t[0].toUpperCase():t[0],url:t[1]}
i(r)&&"POST"===o.method&&r.match(/sentry_key/)&&(n.__sentry_own_request__=!0)
const s=function(){if(4===n.readyState){try{o.status_code=n.status}catch(e){}ne("xhr",{args:t,endTimestamp:Date.now(),startTimestamp:Date.now(),xhr:n})}}
return"onreadystatechange"in n&&"function"==typeof n.onreadystatechange?L(n,"onreadystatechange",(function(e){return function(...t){return s(),e.apply(n,t)}})):n.addEventListener("readystatechange",s),e.apply(n,t)}})),L(e,"send",(function(e){return function(...t){return this.__sentry_xhr__&&void 0!==t[0]&&(this.__sentry_xhr__.body=t[0]),ne("xhr",{args:t,startTimestamp:Date.now(),xhr:this}),e.apply(this,t)}}))})()
break
case"fetch":(function(){if(!J())return
L(E,"fetch",(function(e){return function(...t){const n={args:t,fetchData:{method:re(t),url:oe(t)},startTimestamp:Date.now()}
return ne("fetch",{...n}),e.apply(E,t).then(e=>(ne("fetch",{...n,endTimestamp:Date.now(),response:e}),e),e=>{throw ne("fetch",{...n,endTimestamp:Date.now(),error:e}),e})}}))})()
break
case"history":(function(){if(!Z())return
const e=E.onpopstate
function t(e){return function(...t){const n=t.length>2?t[2]:void 0
if(n){const e=se,t=String(n)
se=t,ne("history",{from:e,to:t})}return e.apply(this,t)}}E.onpopstate=function(...t){const n=E.location.href,r=se
if(se=n,ne("history",{from:r,to:n}),e)try{return e.apply(this,t)}catch(o){}},L(E.history,"pushState",t),L(E.history,"replaceState",t)})()
break
case"error":ue=E.onerror,E.onerror=function(e,t,n,r,o){return ne("error",{column:r,error:o,line:n,msg:e,url:t}),!!ue&&ue.apply(this,arguments)}
break
case"unhandledrejection":le=E.onunhandledrejection,E.onunhandledrejection=function(e){return ne("unhandledrejection",e),!le||le.apply(this,arguments)}
break
default:return void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&I.warn("unknown instrumentation type:",e))}}function ne(e,t){if(e&&Q[e])for(const r of Q[e]||[])try{r(t)}catch(n){("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&I.error(`Error while triggering instrumentation handler.\nType: ${e}\nName: ${z(r)}\nError:`,n)}}function re(e=[]){return"Request"in E&&h(e[0],Request)&&e[0].method?String(e[0].method).toUpperCase():e[1]&&e[1].method?String(e[1].method).toUpperCase():"GET"}function oe(e=[]){return"string"==typeof e[0]?e[0]:"Request"in E&&h(e[0],Request)?e[0].url:String(e[0])}let se
let ie,ae
function ce(e,t=!1){return n=>{if(!n||ae===n)return
if(function(e){if("keypress"!==e.type)return!1
try{const t=e.target
if(!t||!t.tagName)return!0
if("INPUT"===t.tagName||"TEXTAREA"===t.tagName||t.isContentEditable)return!1}catch(t){}return!0}(n))return
const r="keypress"===n.type?"input":n.type;(void 0===ie||function(e,t){if(!e)return!0
if(e.type!==t.type)return!0
try{if(e.target!==t.target)return!0}catch(n){}return!1}(ae,n))&&(e({event:n,name:r,global:t}),ae=n),clearTimeout(ie),ie=E.setTimeout(()=>{ie=void 0},1e3)}}let ue=null
let le=null
function de(){const e="function"==typeof WeakSet,t=e?new WeakSet:[]
return[function(n){if(e)return!!t.has(n)||(t.add(n),!1)
for(let e=0;e<t.length;e++){if(t[e]===n)return!0}return t.push(n),!1},function(n){if(e)t.delete(n)
else for(let e=0;e<t.length;e++)if(t[e]===n){t.splice(e,1)
break}}]}function pe(){const e=m,t=e.crypto||e.msCrypto
if(t&&t.randomUUID)return t.randomUUID().replace(/-/g,"")
const n=t&&t.getRandomValues?()=>t.getRandomValues(new Uint8Array(1))[0]:()=>16*Math.random()
return([1e7]+1e3+4e3+8e3+1e11).replace(/[018]/g,e=>(e^(15&n())>>e/4).toString(16))}function _e(e){return e.exception&&e.exception.values?e.exception.values[0]:void 0}function fe(e){const{message:t,event_id:n}=e
if(t)return t
const r=_e(e)
return r?r.type&&r.value?`${r.type}: ${r.value}`:r.type||r.value||n||"<unknown>":n||"<unknown>"}const he=/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/
function ge(e){if(e&&e.__sentry_captured__)return!0
try{B(e,"__sentry_captured__",!0)}catch(t){}return!1}function me(e){return Array.isArray(e)?e:[e]}function ye(){return"undefined"!=typeof __SENTRY_BROWSER_BUNDLE__&&!!__SENTRY_BROWSER_BUNDLE__}function Ee(){return!ye()&&"[object process]"===Object.prototype.toString.call("undefined"!=typeof process?process:0)}function ve(e,t){return e.require(t)}function Se(e,t=1/0,n=1/0){try{return be("",e,t,n)}catch(r){return{ERROR:`**non-serializable** (${r})`}}}function be(e,t,n=1/0,r=1/0,o=de()){const[s,i]=o
if(null===t||["number","boolean","string"].includes(typeof t)&&!f(t))return t
const a=function(e,t){try{return"domain"===e&&t&&"object"==typeof t&&t._events?"[Domain]":"domainEmitter"===e?"[DomainEmitter]":"undefined"!=typeof global&&t===global?"[Global]":"undefined"!=typeof window&&t===window?"[Window]":"undefined"!=typeof document&&t===document?"[Document]":_(t)?"[SyntheticEvent]":"number"==typeof t&&t!=t?"[NaN]":void 0===t?"[undefined]":"function"==typeof t?`[Function: ${z(t)}]`:"symbol"==typeof t?`[${String(t)}]`:"bigint"==typeof t?`[BigInt: ${String(t)}]`:`[object ${Object.getPrototypeOf(t).constructor.name}]`}catch(n){return`**non-serializable** (${n})`}}(e,t)
if(!a.startsWith("[object "))return a
if(t.__sentry_skip_normalization__)return t
if(0===n)return a.replace("object ","")
if(s(t))return"[Circular ~]"
const c=t
if(c&&"function"==typeof c.toJSON)try{return be("",c.toJSON(),n-1,r,o)}catch(p){}const u=Array.isArray(t)?[]:{}
let l=0
const d=A(t)
for(const _ in d){if(!Object.prototype.hasOwnProperty.call(d,_))continue
if(l>=r){u[_]="[MaxProperties ~]"
break}const e=d[_]
u[_]=be(_,e,n-1,r,o),l+=1}return i(t),u}function Te(e,t){let n=0
for(let r=e.length-1;r>=0;r--){const t=e[r]
"."===t?e.splice(r,1):".."===t?(e.splice(r,1),n++):n&&(e.splice(r,1),n--)}if(t)for(;n--;n)e.unshift("..")
return e}const ke=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^/]+?|)(\.[^./]*|))(?:[/]*)$/
function xe(e){const t=ke.exec(e)
return t?t.slice(1):[]}function we(...e){let t="",n=!1
for(let r=e.length-1;r>=-1&&!n;r--){const o=r>=0?e[r]:"/"
o&&(t=`${o}/${t}`,n="/"===o.charAt(0))}return t=Te(t.split("/").filter(e=>!!e),!n).join("/"),(n?"/":"")+t||"."}function De(e){let t=0
for(;t<e.length&&""===e[t];t++);let n=e.length-1
for(;n>=0&&""===e[n];n--);return t>n?[]:e.slice(t,n-t+1)}function Ne(e){const t=Re(e),n="/"===e.substr(-1)
let r=Te(e.split("/").filter(e=>!!e),!t).join("/")
return r||t||(r="."),r&&n&&(r+="/"),(t?"/":"")+r}function Re(e){return"/"===e.charAt(0)}var Oe
function Ie(e){return new Ce(t=>{t(e)})}function Pe(e){return new Ce((t,n)=>{n(e)})}(function(e){e[e.PENDING=0]="PENDING"
e[e.RESOLVED=1]="RESOLVED"
e[e.REJECTED=2]="REJECTED"})(Oe||(Oe={}))
class Ce{__init(){this._state=Oe.PENDING}__init2(){this._handlers=[]}constructor(e){Ce.prototype.__init.call(this),Ce.prototype.__init2.call(this),Ce.prototype.__init3.call(this),Ce.prototype.__init4.call(this),Ce.prototype.__init5.call(this),Ce.prototype.__init6.call(this)
try{e(this._resolve,this._reject)}catch(t){this._reject(t)}}then(e,t){return new Ce((n,r)=>{this._handlers.push([!1,t=>{if(e)try{n(e(t))}catch(o){r(o)}else n(t)},e=>{if(t)try{n(t(e))}catch(o){r(o)}else r(e)}]),this._executeHandlers()})}catch(e){return this.then(e=>e,e)}finally(e){return new Ce((t,n)=>{let r,o
return this.then(t=>{o=!1,r=t,e&&e()},t=>{o=!0,r=t,e&&e()}).then(()=>{o?n(r):t(r)})})}__init3(){this._resolve=e=>{this._setResult(Oe.RESOLVED,e)}}__init4(){this._reject=e=>{this._setResult(Oe.REJECTED,e)}}__init5(){this._setResult=(e,t)=>{this._state===Oe.PENDING&&(p(t)?t.then(this._resolve,this._reject):(this._state=e,this._value=t,this._executeHandlers()))}}__init6(){this._executeHandlers=()=>{if(this._state===Oe.PENDING)return
const e=this._handlers.slice()
this._handlers=[],e.forEach(e=>{e[0]||(this._state===Oe.RESOLVED&&e[1](this._value),this._state===Oe.REJECTED&&e[2](this._value),e[0]=!0)})}}}function Ue(e){const t=[]
function n(e){return t.splice(t.indexOf(e),1)[0]}return{$:t,add:function(r){if(!(void 0===e||t.length<e))return Pe(new b("Not adding Promise because buffer limit was reached."))
const o=r()
return-1===t.indexOf(o)&&t.push(o),o.then(()=>n(o)).then(null,()=>n(o).then(null,()=>{})),o},drain:function(e){return new Ce((n,r)=>{let o=t.length
if(!o)return n(!0)
const s=setTimeout(()=>{e&&e>0&&n(!1)},e)
t.forEach(e=>{Ie(e).then(()=>{--o||(clearTimeout(s),n(!0))},r)})})}}}function Le(e){return e.split(/[\?#]/,1)[0]}const Be={ip:!1,request:!0,transaction:!0,user:!0},Me=["cookies","data","headers","method","query_string","url"],Ge=["id","username","email"]
function je(e,t={}){const n=e.method&&e.method.toUpperCase()
let r="",o="url"
t.customRoute||e.route?(r=t.customRoute||`${e.baseUrl||""}${e.route&&e.route.path}`,o="route"):(e.originalUrl||e.url)&&(r=Le(e.originalUrl||e.url||""))
let s=""
return t.method&&n&&(s+=n),t.method&&t.path&&(s+=" "),t.path&&r&&(s+=r),[s,o]}function Ae(e,t){const{include:n=Me,deps:r}=t||{},o={},s=e.headers||{},a=e.method,c=e.hostname||e.host||s.host||"<no host>",u=`${"https"===e.protocol||e.socket&&e.socket.encrypted?"https":"http"}://${c}${e.originalUrl||e.url||""}`
return n.forEach(t=>{switch(t){case"headers":o.headers=s
break
case"method":o.method=a
break
case"url":o.url=u
break
case"cookies":o.cookies=e.cookies||s.cookie&&r&&r.cookie&&r.cookie.parse(s.cookie)||{}
break
case"query_string":o.query_string=Fe(e,r)
break
case"data":if("GET"===a||"HEAD"===a)break
void 0!==e.body&&(o.data=i(e.body)?e.body:JSON.stringify(Se(e.body)))
break
default:({}).hasOwnProperty.call(e,t)&&(o[t]=e[t])}}),o}function Fe(e,t){let n=e.originalUrl||e.url||""
if(n)return n.startsWith("/")&&(n="http://dogs.are.great"+n),e.query||void 0!==typeof URL&&new URL(n).search.replace("?","")||t&&t.url&&t.url.parse(n).query||void 0}const He=["fatal","error","warning","log","info","debug"]
function Ye(e){return"warn"===e?"warning":He.includes(e)?e:"log"}const We={nowSeconds:()=>Date.now()/1e3}
const $e=Ee()?function(){try{return ve(module,"perf_hooks").performance}catch(e){return}}():function(){const{performance:e}=E
if(!e||!e.now)return
return{now:()=>e.now(),timeOrigin:Date.now()-e.now()}}(),qe=void 0===$e?We:{nowSeconds:()=>($e.timeOrigin+$e.now())/1e3},ze=We.nowSeconds.bind(We),Xe=qe.nowSeconds.bind(qe),Ke=Xe,Ve=void 0!==$e
let Je
const Ze=(()=>{const{performance:e}=E
if(!e||!e.now)return void(Je="none")
const t=e.now(),n=Date.now(),r=e.timeOrigin?Math.abs(e.timeOrigin+t-n):36e5,o=r<36e5,s=e.timing&&e.timing.navigationStart,i="number"==typeof s?Math.abs(s+t-n):36e5
return o||i<36e5?r<=i?(Je="timeOrigin",e.timeOrigin):(Je="navigationStart",s):(Je="dateNow",n)})(),Qe=new RegExp("^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$")
function et(e,t=[]){return[e,t]}function tt(e,t){const[n,r]=e
return[n,[...r,t]]}function nt(e,t){e[1].forEach(e=>{const n=e[0].type
t(e,n)})}function rt(e,t){return(t||new TextEncoder).encode(e)}function ot(e,t){const[n,r]=e
let o=JSON.stringify(n)
function s(e){"string"==typeof o?o="string"==typeof e?o+e:[rt(o,t),e]:o.push("string"==typeof e?rt(e,t):e)}for(const a of r){const[e,t]=a
if(s(`\n${JSON.stringify(e)}\n`),"string"==typeof t||t instanceof Uint8Array)s(t)
else{let e
try{e=JSON.stringify(t)}catch(i){e=JSON.stringify(Se(t))}s(e)}}return"string"==typeof o?o:function(e){const t=e.reduce((e,t)=>e+t.length,0),n=new Uint8Array(t)
let r=0
for(const o of e)n.set(o,r),r+=o.length
return n}(o)}function st(e,t){const n="string"==typeof e.data?rt(e.data,t):e.data
return[Y({type:"attachment",length:n.length,filename:e.filename,content_type:e.contentType,attachment_type:e.attachmentType}),n]}const it={session:"session",sessions:"session",attachment:"attachment",transaction:"transaction",event:"error",client_report:"internal",user_report:"default"}
function at(e){return it[e]}function ct(e,t=Date.now()){const n=parseInt(""+e,10)
if(!isNaN(n))return 1e3*n
const r=Date.parse(""+e)
return isNaN(r)?6e4:r-t}function ut(e,t){return e[t]||e.all||0}function lt(e,t,n=Date.now()){return ut(e,t)>n}function dt(e,{statusCode:t,headers:n},r=Date.now()){const o={...e},s=n&&n["x-sentry-rate-limits"],i=n&&n["retry-after"]
if(s)for(const a of s.trim().split(",")){const[e,t]=a.split(":",2),n=parseInt(e,10),s=1e3*(isNaN(n)?60:n)
if(t)for(const i of t.split(";"))o[i]=r+s
else o.all=r+s}else i?o.all=r+ct(i,r):429===t&&(o.all=r+6e4)
return o}const pt=/^sentry-/
function _t(e){return e.split(",").map(e=>e.split("=").map(e=>decodeURIComponent(e.trim()))).reduce((e,[t,n])=>(e[t]=n,e),{})}var ft=Object.freeze({WINDOW:E,getDomElement:function(e){return E.document&&E.document.querySelector?E.document.querySelector(e):null},getLocationHref:function(){try{return E.document.location.href}catch(e){return""}},htmlTreeAsString:v,dsnFromString:x,dsnToString:k,makeDsn:D,SentryError:b,GLOBAL_OBJ:m,getGlobalObject:function(){return m},getGlobalSingleton:y,addInstrumentationHandler:function(e,t){Q[e]=Q[e]||[],Q[e].push(t),te(e)},isDOMError:function(e){return s(e,"DOMError")},isDOMException:function(e){return s(e,"DOMException")},isElement:l,isError:o,isErrorEvent:function(e){return s(e,"ErrorEvent")},isEvent:u,isInstanceOf:h,isNaN:f,isPlainObject:c,isPrimitive:a,isRegExp:d,isString:i,isSyntheticEvent:_,isThenable:p,CONSOLE_LEVELS:N,consoleSandbox:R,get logger(){return I},memoBuilder:de,addContextToFrame:function(e,t,n=5){const r=t.lineno||0,o=e.length,s=Math.max(Math.min(o,r-1),0)
t.pre_context=e.slice(Math.max(0,s-n),s).map(e=>C(e,0)),t.context_line=C(e[Math.min(o-1,s)],t.colno||0),t.post_context=e.slice(Math.min(s+1,o),s+1+n).map(e=>C(e,0))},addExceptionMechanism:function(e,t){const n=_e(e)
if(!n)return
const r=n.mechanism
if(n.mechanism={type:"generic",handled:!0,...r,...t},t&&"data"in t){const e={...r&&r.data,...t.data}
n.mechanism.data=e}},addExceptionTypeValue:function(e,t,n){const r=e.exception=e.exception||{},o=r.values=r.values||[],s=o[0]=o[0]||{}
s.value||(s.value=t||""),s.type||(s.type=n||"Error")},arrayify:me,checkOrSetAlreadyCaught:ge,getEventDescription:fe,parseSemver:function(e){const t=e.match(he)||[],n=parseInt(t[1],10),r=parseInt(t[2],10),o=parseInt(t[3],10)
return{buildmetadata:t[5],major:isNaN(n)?void 0:n,minor:isNaN(r)?void 0:r,patch:isNaN(o)?void 0:o,prerelease:t[4]}},uuid4:pe,dynamicRequire:ve,isNodeEnv:Ee,loadModule:function(e){let t
try{t=ve(module,e)}catch(n){}try{const{cwd:n}=ve(module,"process")
t=ve(module,`${n()}/node_modules/${e}`)}catch(n){}return t},normalize:Se,normalizeToSize:function e(t,n=3,r=102400){const o=Se(t,n)
return s=o,function(e){return~-encodeURI(e).split(/%..|./).length}(JSON.stringify(s))>r?e(t,n-1,r):o
var s},walk:be,addNonEnumerableProperty:B,convertToPlainObject:A,dropUndefinedKeys:Y,extractExceptionKeysForMessage:function(e,t=40){const n=Object.keys(A(e))
if(n.sort(),!n.length)return"[object has no keys]"
if(n[0].length>=t)return P(n[0],t)
for(let r=n.length;r>0;r--){const e=n.slice(0,r).join(", ")
if(!(e.length>t))return r===n.length?e:P(e,t)}return""},fill:L,getOriginalFunction:G,markFunctionWrapped:M,objectify:function(e){let t
switch(!0){case null==e:t=new String(e)
break
case"symbol"==typeof e||"bigint"==typeof e:t=Object(e)
break
case a(e):t=new e.constructor(e)
break
default:t=e}return t},urlEncode:j,basename:function(e,t){let n=xe(e)[2]
return t&&n.substr(-1*t.length)===t&&(n=n.substr(0,n.length-t.length)),n},dirname:function(e){const t=xe(e),n=t[0]
let r=t[1]
return n||r?(r&&(r=r.substr(0,r.length-1)),n+r):"."},isAbsolute:Re,join:function(...e){return Ne(e.join("/"))},normalizePath:Ne,relative:function(e,t){e=we(e).substr(1),t=we(t).substr(1)
const n=De(e.split("/")),r=De(t.split("/")),o=Math.min(n.length,r.length)
let s=o
for(let a=0;a<o;a++)if(n[a]!==r[a]){s=a
break}let i=[]
for(let a=s;a<n.length;a++)i.push("..")
return i=i.concat(r.slice(s)),i.join("/")},resolve:we,makePromiseBuffer:Ue,addRequestDataToEvent:function(e,t,n){const r={...Be,...W([n,"optionalAccess",e=>e.include])}
if(r.request){const o=Array.isArray(r.request)?Ae(t,{include:r.request,deps:W([n,"optionalAccess",e=>e.deps])}):Ae(t,{deps:W([n,"optionalAccess",e=>e.deps])})
e.request={...e.request,...o}}if(r.user){const n=t.user&&c(t.user)?function(e,t){const n={}
return(Array.isArray(t)?t:Ge).forEach(t=>{e&&t in e&&(n[t]=e[t])}),n}(t.user,r.user):{}
Object.keys(n).length&&(e.user={...e.user,...n})}if(r.ip){const n=t.ip||t.socket&&t.socket.remoteAddress
n&&(e.user={...e.user,ip_address:n})}return r.transaction&&!e.transaction&&(e.transaction=function(e,t){switch(t){case"path":return je(e,{path:!0})[0]
case"handler":return e.route&&e.route.stack&&e.route.stack[0]&&e.route.stack[0].name||"<anonymous>"
case"methodPath":default:return je(e,{path:!0,method:!0})[0]}}(t,r.transaction)),e},addRequestDataToTransaction:function(e,t,n){e&&(e.metadata.source&&"url"!==e.metadata.source||e.setName(...je(t,{path:!0,method:!0})),e.setData("url",t.originalUrl||t.url),t.baseUrl&&e.setData("baseUrl",t.baseUrl),e.setData("query",Fe(t,n)))},extractPathForTransaction:je,extractRequestData:Ae,severityFromString:function(e){return Ye(e)},severityLevelFromString:Ye,validSeverityLevels:He,createStackParser:$,getFunctionName:z,nodeStackLineParser:function(e){return[90,X(e)]},stackParserFromStackParserOptions:function(e){return Array.isArray(e)?$(...e):e},stripSentryFramesAndReverse:q,escapeStringForRegex:function(e){return e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d")},isMatchingPattern:U,safeJoin:function(e,t){if(!Array.isArray(e))return""
const n=[]
for(let o=0;o<e.length;o++){const t=e[o]
try{n.push(String(t))}catch(r){n.push("[value cannot be serialized]")}}return n.join(t)},snipLine:C,truncate:P,isNativeFetch:V,supportsDOMError:function(){try{return new DOMError(""),!0}catch(e){return!1}},supportsDOMException:function(){try{return new DOMException(""),!0}catch(e){return!1}},supportsErrorEvent:function(){try{return new ErrorEvent(""),!0}catch(e){return!1}},supportsFetch:K,supportsHistory:Z,supportsNativeFetch:J,supportsReferrerPolicy:function(){if(!K())return!1
try{return new Request("_",{referrerPolicy:"origin"}),!0}catch(e){return!1}},supportsReportingObserver:function(){return"ReportingObserver"in E},SyncPromise:Ce,rejectedSyncPromise:Pe,resolvedSyncPromise:Ie,get _browserPerformanceTimeOriginMode(){return Je},browserPerformanceTimeOrigin:Ze,dateTimestampInSeconds:ze,timestampInSeconds:Xe,timestampWithMs:Ke,usingPerformanceAPI:Ve,TRACEPARENT_REGEXP:Qe,extractTraceparentData:function(e){const t=e.match(Qe)
if(!e||!t)return
let n
return"1"===t[3]?n=!0:"0"===t[3]&&(n=!1),{traceId:t[1],parentSampled:n,parentSpanId:t[2]}},isBrowserBundle:ye,addItemToEnvelope:tt,createAttachmentEnvelopeItem:st,createEnvelope:et,envelopeItemTypeToDataCategory:at,forEachEnvelopeItem:nt,serializeEnvelope:ot,createClientReportEnvelope:function(e,t,n){return et(t?{dsn:t}:{},[[{type:"client_report"},{timestamp:n||ze(),discarded_events:e}]])},DEFAULT_RETRY_AFTER:6e4,disabledUntil:ut,isRateLimited:lt,parseRetryAfterHeader:ct,updateRateLimits:dt,BAGGAGE_HEADER_NAME:"baggage",MAX_BAGGAGE_STRING_LENGTH:8192,SENTRY_BAGGAGE_KEY_PREFIX:"sentry-",SENTRY_BAGGAGE_KEY_PREFIX_REGEX:pt,baggageHeaderToDynamicSamplingContext:function(e){if(!i(e)&&!Array.isArray(e))return
let t={}
if(Array.isArray(e))t=e.reduce((e,t)=>({...e,..._t(t)}),{})
else{if(!e)return
t=_t(e)}const n=Object.entries(t).reduce((e,[t,n])=>{if(t.match(pt)){e[t.slice("sentry-".length)]=n}return e},{})
return Object.keys(n).length>0?n:void 0},dynamicSamplingContextToSentryBaggageHeader:function(e){return function(e){if(0===Object.keys(e).length)return
return Object.entries(e).reduce((e,[t,n],r)=>{const o=`${encodeURIComponent(t)}=${encodeURIComponent(n)}`,s=0===r?o:`${e},${o}`
return s.length>8192?(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&I.warn(`Not adding key: ${t} with val: ${n} to baggage header due to exceeding baggage size limits.`),e):s},"")}(Object.entries(e).reduce((e,[t,n])=>(n&&(e["sentry-"+t]=n),e),{}))},getNumberOfUrlSegments:function(e){return e.split(/\\?\//).filter(e=>e.length>0&&","!==e).length},parseUrl:function(e){if(!e)return{}
const t=e.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/)
if(!t)return{}
const n=t[6]||"",r=t[8]||""
return{host:t[4],path:t[5],protocol:t[2],relative:t[5]+n+r}},stripUrlQueryAndFragment:Le})
function ht(e){const t=Xe(),n={sid:pe(),init:!0,timestamp:t,started:t,duration:0,status:"ok",errors:0,ignoreDuration:!1,toJSON:()=>function(e){return Y({sid:""+e.sid,init:e.init,started:new Date(1e3*e.started).toISOString(),timestamp:new Date(1e3*e.timestamp).toISOString(),status:e.status,errors:e.errors,did:"number"==typeof e.did||"string"==typeof e.did?""+e.did:void 0,duration:e.duration,attrs:{release:e.release,environment:e.environment,ip_address:e.ipAddress,user_agent:e.userAgent}})}(n)}
return e&&gt(n,e),n}function gt(e,t={}){if(t.user&&(!e.ipAddress&&t.user.ip_address&&(e.ipAddress=t.user.ip_address),e.did||t.did||(e.did=t.user.id||t.user.email||t.user.username)),e.timestamp=t.timestamp||Xe(),t.ignoreDuration&&(e.ignoreDuration=t.ignoreDuration),t.sid&&(e.sid=32===t.sid.length?t.sid:pe()),void 0!==t.init&&(e.init=t.init),!e.did&&t.did&&(e.did=""+t.did),"number"==typeof t.started&&(e.started=t.started),e.ignoreDuration)e.duration=void 0
else if("number"==typeof t.duration)e.duration=t.duration
else{const t=e.timestamp-e.started
e.duration=t>=0?t:0}t.release&&(e.release=t.release),t.environment&&(e.environment=t.environment),!e.ipAddress&&t.ipAddress&&(e.ipAddress=t.ipAddress),!e.userAgent&&t.userAgent&&(e.userAgent=t.userAgent),"number"==typeof t.errors&&(e.errors=t.errors),t.status&&(e.status=t.status)}function mt(e,t){let n={}
t?n={status:t}:"ok"===e.status&&(n={status:"exited"}),gt(e,n)}class yt{constructor(){this._notifyingListeners=!1,this._scopeListeners=[],this._eventProcessors=[],this._breadcrumbs=[],this._attachments=[],this._user={},this._tags={},this._extra={},this._contexts={},this._sdkProcessingMetadata={}}static clone(e){const t=new yt
return e&&(t._breadcrumbs=[...e._breadcrumbs],t._tags={...e._tags},t._extra={...e._extra},t._contexts={...e._contexts},t._user=e._user,t._level=e._level,t._span=e._span,t._session=e._session,t._transactionName=e._transactionName,t._fingerprint=e._fingerprint,t._eventProcessors=[...e._eventProcessors],t._requestSession=e._requestSession,t._attachments=[...e._attachments]),t}addScopeListener(e){this._scopeListeners.push(e)}addEventProcessor(e){return this._eventProcessors.push(e),this}setUser(e){return this._user=e||{},this._session&&gt(this._session,{user:e}),this._notifyScopeListeners(),this}getUser(){return this._user}getRequestSession(){return this._requestSession}setRequestSession(e){return this._requestSession=e,this}setTags(e){return this._tags={...this._tags,...e},this._notifyScopeListeners(),this}setTag(e,t){return this._tags={...this._tags,[e]:t},this._notifyScopeListeners(),this}setExtras(e){return this._extra={...this._extra,...e},this._notifyScopeListeners(),this}setExtra(e,t){return this._extra={...this._extra,[e]:t},this._notifyScopeListeners(),this}setFingerprint(e){return this._fingerprint=e,this._notifyScopeListeners(),this}setLevel(e){return this._level=e,this._notifyScopeListeners(),this}setTransactionName(e){return this._transactionName=e,this._notifyScopeListeners(),this}setContext(e,t){return null===t?delete this._contexts[e]:this._contexts={...this._contexts,[e]:t},this._notifyScopeListeners(),this}setSpan(e){return this._span=e,this._notifyScopeListeners(),this}getSpan(){return this._span}getTransaction(){const e=this.getSpan()
return e&&e.transaction}setSession(e){return e?this._session=e:delete this._session,this._notifyScopeListeners(),this}getSession(){return this._session}update(e){if(!e)return this
if("function"==typeof e){const t=e(this)
return t instanceof yt?t:this}return e instanceof yt?(this._tags={...this._tags,...e._tags},this._extra={...this._extra,...e._extra},this._contexts={...this._contexts,...e._contexts},e._user&&Object.keys(e._user).length&&(this._user=e._user),e._level&&(this._level=e._level),e._fingerprint&&(this._fingerprint=e._fingerprint),e._requestSession&&(this._requestSession=e._requestSession)):c(e)&&(e=e,this._tags={...this._tags,...e.tags},this._extra={...this._extra,...e.extra},this._contexts={...this._contexts,...e.contexts},e.user&&(this._user=e.user),e.level&&(this._level=e.level),e.fingerprint&&(this._fingerprint=e.fingerprint),e.requestSession&&(this._requestSession=e.requestSession)),this}clear(){return this._breadcrumbs=[],this._tags={},this._extra={},this._user={},this._contexts={},this._level=void 0,this._transactionName=void 0,this._fingerprint=void 0,this._requestSession=void 0,this._span=void 0,this._session=void 0,this._notifyScopeListeners(),this._attachments=[],this}addBreadcrumb(e,t){const n="number"==typeof t?t:100
if(n<=0)return this
const r={timestamp:ze(),...e}
return this._breadcrumbs=[...this._breadcrumbs,r].slice(-n),this._notifyScopeListeners(),this}clearBreadcrumbs(){return this._breadcrumbs=[],this._notifyScopeListeners(),this}addAttachment(e){return this._attachments.push(e),this}getAttachments(){return this._attachments}clearAttachments(){return this._attachments=[],this}applyToEvent(e,t={}){if(this._extra&&Object.keys(this._extra).length&&(e.extra={...this._extra,...e.extra}),this._tags&&Object.keys(this._tags).length&&(e.tags={...this._tags,...e.tags}),this._user&&Object.keys(this._user).length&&(e.user={...this._user,...e.user}),this._contexts&&Object.keys(this._contexts).length&&(e.contexts={...this._contexts,...e.contexts}),this._level&&(e.level=this._level),this._transactionName&&(e.transaction=this._transactionName),this._span){e.contexts={trace:this._span.getTraceContext(),...e.contexts}
const t=this._span.transaction&&this._span.transaction.name
t&&(e.tags={transaction:t,...e.tags})}return this._applyFingerprint(e),e.breadcrumbs=[...e.breadcrumbs||[],...this._breadcrumbs],e.breadcrumbs=e.breadcrumbs.length>0?e.breadcrumbs:void 0,e.sdkProcessingMetadata={...e.sdkProcessingMetadata,...this._sdkProcessingMetadata},this._notifyEventProcessors([...Et(),...this._eventProcessors],e,t)}setSDKProcessingMetadata(e){return this._sdkProcessingMetadata={...this._sdkProcessingMetadata,...e},this}_notifyEventProcessors(e,t,n,r=0){return new Ce((o,s)=>{const i=e[r]
if(null===t||"function"!=typeof i)o(t)
else{const a=i({...t},n);("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&i.id&&null===a&&I.log(`Event processor "${i.id}" dropped event`),p(a)?a.then(t=>this._notifyEventProcessors(e,t,n,r+1).then(o)).then(null,s):this._notifyEventProcessors(e,a,n,r+1).then(o).then(null,s)}})}_notifyScopeListeners(){this._notifyingListeners||(this._notifyingListeners=!0,this._scopeListeners.forEach(e=>{e(this)}),this._notifyingListeners=!1)}_applyFingerprint(e){e.fingerprint=e.fingerprint?me(e.fingerprint):[],this._fingerprint&&(e.fingerprint=e.fingerprint.concat(this._fingerprint)),e.fingerprint&&!e.fingerprint.length&&delete e.fingerprint}}function Et(){return y("globalEventProcessors",()=>[])}function vt(e){Et().push(e)}const St=100
class bt{__init(){this._stack=[{}]}constructor(e,t=new yt,n=4){this._version=n,bt.prototype.__init.call(this),this.getStackTop().scope=t,e&&this.bindClient(e)}isOlderThan(e){return this._version<e}bindClient(e){this.getStackTop().client=e,e&&e.setupIntegrations&&e.setupIntegrations()}pushScope(){const e=yt.clone(this.getScope())
return this.getStack().push({client:this.getClient(),scope:e}),e}popScope(){return!(this.getStack().length<=1)&&!!this.getStack().pop()}withScope(e){const t=this.pushScope()
try{e(t)}finally{this.popScope()}}getClient(){return this.getStackTop().client}getScope(){return this.getStackTop().scope}getStack(){return this._stack}getStackTop(){return this._stack[this._stack.length-1]}captureException(e,t){const n=this._lastEventId=t&&t.event_id?t.event_id:pe(),r=new Error("Sentry syntheticException")
return this._withClient((o,s)=>{o.captureException(e,{originalException:e,syntheticException:r,...t,event_id:n},s)}),n}captureMessage(e,t,n){const r=this._lastEventId=n&&n.event_id?n.event_id:pe(),o=new Error(e)
return this._withClient((s,i)=>{s.captureMessage(e,t,{originalException:e,syntheticException:o,...n,event_id:r},i)}),r}captureEvent(e,t){const n=t&&t.event_id?t.event_id:pe()
return"transaction"!==e.type&&(this._lastEventId=n),this._withClient((r,o)=>{r.captureEvent(e,{...t,event_id:n},o)}),n}lastEventId(){return this._lastEventId}addBreadcrumb(e,t){const{scope:n,client:r}=this.getStackTop()
if(!n||!r)return
const{beforeBreadcrumb:o=null,maxBreadcrumbs:s=St}=r.getOptions&&r.getOptions()||{}
if(s<=0)return
const i={timestamp:ze(),...e},a=o?R(()=>o(i,t)):i
null!==a&&n.addBreadcrumb(a,s)}setUser(e){const t=this.getScope()
t&&t.setUser(e)}setTags(e){const t=this.getScope()
t&&t.setTags(e)}setExtras(e){const t=this.getScope()
t&&t.setExtras(e)}setTag(e,t){const n=this.getScope()
n&&n.setTag(e,t)}setExtra(e,t){const n=this.getScope()
n&&n.setExtra(e,t)}setContext(e,t){const n=this.getScope()
n&&n.setContext(e,t)}configureScope(e){const{scope:t,client:n}=this.getStackTop()
t&&n&&e(t)}run(e){const t=kt(this)
try{e(this)}finally{kt(t)}}getIntegration(e){const t=this.getClient()
if(!t)return null
try{return t.getIntegration(e)}catch(n){return("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&I.warn(`Cannot retrieve integration ${e.id} from the current Hub`),null}}startTransaction(e,t){return this._callExtensionMethod("startTransaction",e,t)}traceHeaders(){return this._callExtensionMethod("traceHeaders")}captureSession(e=!1){if(e)return this.endSession()
this._sendSessionUpdate()}endSession(){const e=this.getStackTop(),t=e&&e.scope,n=t&&t.getSession()
n&&mt(n),this._sendSessionUpdate(),t&&t.setSession()}startSession(e){const{scope:t,client:n}=this.getStackTop(),{release:r,environment:o}=n&&n.getOptions()||{},{userAgent:s}=m.navigator||{},i=ht({release:r,environment:o,...t&&{user:t.getUser()},...s&&{userAgent:s},...e})
if(t){const e=t.getSession&&t.getSession()
e&&"ok"===e.status&&gt(e,{status:"exited"}),this.endSession(),t.setSession(i)}return i}shouldSendDefaultPii(){const e=this.getClient(),t=e&&e.getOptions()
return Boolean(t&&t.sendDefaultPii)}_sendSessionUpdate(){const{scope:e,client:t}=this.getStackTop()
if(!e)return
const n=e.getSession()
n&&t&&t.captureSession&&t.captureSession(n)}_withClient(e){const{scope:t,client:n}=this.getStackTop()
n&&e(n,t)}_callExtensionMethod(e,...t){const n=Tt().__SENTRY__
if(n&&n.extensions&&"function"==typeof n.extensions[e])return n.extensions[e].apply(this,t);("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&I.warn(`Extension method ${e} couldn't be found, doing nothing.`)}}function Tt(){return m.__SENTRY__=m.__SENTRY__||{extensions:{},hub:void 0},m}function kt(e){const t=Tt(),n=Dt(t)
return Nt(t,e),n}function xt(){const e=Tt()
return wt(e)&&!Dt(e).isOlderThan(4)||Nt(e,new bt),Ee()?function(e){try{const t=Tt().__SENTRY__,n=t&&t.extensions&&t.extensions.domain&&t.extensions.domain.active
if(!n)return Dt(e)
if(!wt(n)||Dt(n).isOlderThan(4)){const t=Dt(e).getStackTop()
Nt(n,new bt(t.client,yt.clone(t.scope)))}return Dt(n)}catch(t){return Dt(e)}}(e):Dt(e)}function wt(e){return!!(e&&e.__SENTRY__&&e.__SENTRY__.hub)}function Dt(e){return y("hub",()=>new bt,e)}function Nt(e,t){if(!e)return!1
return(e.__SENTRY__=e.__SENTRY__||{}).hub=t,!0}class Rt{__init(){this.flushTimeout=60}__init2(){this._pendingAggregates={}}__init3(){this._isEnabled=!0}constructor(e,t){Rt.prototype.__init.call(this),Rt.prototype.__init2.call(this),Rt.prototype.__init3.call(this),this._client=e,this._intervalId=setInterval(()=>this.flush(),1e3*this.flushTimeout),this._sessionAttrs=t}flush(){const e=this.getSessionAggregates()
0!==e.aggregates.length&&(this._pendingAggregates={},this._client.sendSession(e))}getSessionAggregates(){const e=Object.keys(this._pendingAggregates).map(e=>this._pendingAggregates[parseInt(e)])
return Y({attrs:this._sessionAttrs,aggregates:e})}close(){clearInterval(this._intervalId),this._isEnabled=!1,this.flush()}incrementSessionStatusCount(){if(!this._isEnabled)return
const e=xt().getScope(),t=e&&e.getRequestSession()
t&&t.status&&(this._incrementSessionStatusCount(t.status,new Date),e&&e.setRequestSession(void 0))}_incrementSessionStatusCount(e,t){const n=new Date(t).setSeconds(0,0)
this._pendingAggregates[n]=this._pendingAggregates[n]||{}
const r=this._pendingAggregates[n]
switch(r.started||(r.started=new Date(n).toISOString()),e){case"errored":return r.errored=(r.errored||0)+1,r.errored
case"ok":return r.exited=(r.exited||0)+1,r.exited
default:return r.crashed=(r.crashed||0)+1,r.crashed}}}function Ot(e){const t=e.protocol?e.protocol+":":"",n=e.port?":"+e.port:""
return`${t}//${e.host}${n}${e.path?"/"+e.path:""}/api/`}function It(e,t={}){const n="string"==typeof t?t:t.tunnel,r="string"!=typeof t&&t._metadata?t._metadata.sdk:void 0
return n||`${function(e){return`${Ot(e)}${e.projectId}/envelope/`}(e)}?${function(e,t){return j({sentry_key:e.publicKey,sentry_version:"7",...t&&{sentry_client:`${t.name}/${t.version}`}})}(e,r)}`}function Pt(e){if(!e||!e.sdk)return
const{name:t,version:n}=e.sdk
return{name:t,version:n}}function Ct(e,t,n,r){const o=Pt(n),s=e.type||"event";(function(e,t){t&&(e.sdk=e.sdk||{},e.sdk.name=e.sdk.name||t.name,e.sdk.version=e.sdk.version||t.version,e.sdk.integrations=[...e.sdk.integrations||[],...t.integrations||[]],e.sdk.packages=[...e.sdk.packages||[],...t.packages||[]])})(e,n&&n.sdk)
const i=function(e,t,n,r){const o=e.sdkProcessingMetadata&&e.sdkProcessingMetadata.dynamicSamplingContext
return{event_id:e.event_id,sent_at:(new Date).toISOString(),...t&&{sdk:t},...!!n&&{dsn:k(r)},..."transaction"===e.type&&o&&{trace:Y({...o})}}}(e,o,r,t)
delete e.sdkProcessingMetadata
return et(i,[[{type:s},e]])}const Ut=[]
const Lt="Not capturing exception because it's already been captured."
class Bt{__init(){this._integrations={}}__init2(){this._integrationsInitialized=!1}__init3(){this._numProcessing=0}__init4(){this._outcomes={}}constructor(e){if(Bt.prototype.__init.call(this),Bt.prototype.__init2.call(this),Bt.prototype.__init3.call(this),Bt.prototype.__init4.call(this),this._options=e,e.dsn){this._dsn=D(e.dsn)
const t=It(this._dsn,e)
this._transport=e.transport({recordDroppedEvent:this.recordDroppedEvent.bind(this),...e.transportOptions,url:t})}else("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&I.warn("No DSN provided, client will not do anything.")}captureException(e,t,n){if(ge(e))return void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&I.log(Lt))
let r=t&&t.event_id
return this._process(this.eventFromException(e,t).then(e=>this._captureEvent(e,t,n)).then(e=>{r=e})),r}captureMessage(e,t,n,r){let o=n&&n.event_id
const s=a(e)?this.eventFromMessage(String(e),t,n):this.eventFromException(e,n)
return this._process(s.then(e=>this._captureEvent(e,n,r)).then(e=>{o=e})),o}captureEvent(e,t,n){if(t&&t.originalException&&ge(t.originalException))return void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&I.log(Lt))
let r=t&&t.event_id
return this._process(this._captureEvent(e,t,n).then(e=>{r=e})),r}captureSession(e){this._isEnabled()?"string"!=typeof e.release?("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&I.warn("Discarded session because of missing or non-string release"):(this.sendSession(e),gt(e,{init:!1})):("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&I.warn("SDK not enabled, will not capture session.")}getDsn(){return this._dsn}getOptions(){return this._options}getTransport(){return this._transport}flush(e){const t=this._transport
return t?this._isClientDoneProcessing(e).then(n=>t.flush(e).then(e=>n&&e)):Ie(!0)}close(e){return this.flush(e).then(e=>(this.getOptions().enabled=!1,e))}setupIntegrations(){this._isEnabled()&&!this._integrationsInitialized&&(this._integrations=function(e){const t={}
return e.forEach(e=>{t[e.name]=e,-1===Ut.indexOf(e.name)&&(e.setupOnce(vt,xt),Ut.push(e.name),("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&I.log("Integration installed: "+e.name))}),t}(this._options.integrations),this._integrationsInitialized=!0)}getIntegrationById(e){return this._integrations[e]}getIntegration(e){try{return this._integrations[e.id]||null}catch(t){return("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&I.warn(`Cannot retrieve integration ${e.id} from the current Client`),null}}sendEvent(e,t={}){if(this._dsn){let n=Ct(e,this._dsn,this._options._metadata,this._options.tunnel)
for(const e of t.attachments||[])n=tt(n,st(e,this._options.transportOptions&&this._options.transportOptions.textEncoder))
this._sendEnvelope(n)}}sendSession(e){if(this._dsn){const t=function(e,t,n,r){const o=Pt(n)
return et({sent_at:(new Date).toISOString(),...o&&{sdk:o},...!!r&&{dsn:k(t)}},["aggregates"in e?[{type:"sessions"},e]:[{type:"session"},e]])}(e,this._dsn,this._options._metadata,this._options.tunnel)
this._sendEnvelope(t)}}recordDroppedEvent(e,t){if(this._options.sendClientReports){const n=`${e}:${t}`;("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&I.log(`Adding outcome: "${n}"`),this._outcomes[n]=this._outcomes[n]+1||1}}_updateSessionFromEvent(e,t){let n=!1,r=!1
const o=t.exception&&t.exception.values
if(o){r=!0
for(const e of o){const t=e.mechanism
if(t&&!1===t.handled){n=!0
break}}}const s="ok"===e.status;(s&&0===e.errors||s&&n)&&(gt(e,{...n&&{status:"crashed"},errors:e.errors||Number(r||n)}),this.captureSession(e))}_isClientDoneProcessing(e){return new Ce(t=>{let n=0
const r=setInterval(()=>{0==this._numProcessing?(clearInterval(r),t(!0)):(n+=1,e&&n>=e&&(clearInterval(r),t(!1)))},1)})}_isEnabled(){return!1!==this.getOptions().enabled&&void 0!==this._dsn}_prepareEvent(e,t,n){const{normalizeDepth:r=3,normalizeMaxBreadth:o=1e3}=this.getOptions(),s={...e,event_id:e.event_id||t.event_id||pe(),timestamp:e.timestamp||ze()}
this._applyClientOptions(s),this._applyIntegrationsMetadata(s)
let i=n
t.captureContext&&(i=yt.clone(i).update(t.captureContext))
let a=Ie(s)
if(i){const e=[...t.attachments||[],...i.getAttachments()]
e.length&&(t.attachments=e),a=i.applyToEvent(s,t)}return a.then(e=>"number"==typeof r&&r>0?this._normalizeEvent(e,r,o):e)}_normalizeEvent(e,t,n){if(!e)return null
const r={...e,...e.breadcrumbs&&{breadcrumbs:e.breadcrumbs.map(e=>({...e,...e.data&&{data:Se(e.data,t,n)}}))},...e.user&&{user:Se(e.user,t,n)},...e.contexts&&{contexts:Se(e.contexts,t,n)},...e.extra&&{extra:Se(e.extra,t,n)}}
return e.contexts&&e.contexts.trace&&r.contexts&&(r.contexts.trace=e.contexts.trace,e.contexts.trace.data&&(r.contexts.trace.data=Se(e.contexts.trace.data,t,n))),e.spans&&(r.spans=e.spans.map(e=>(e.data&&(e.data=Se(e.data,t,n)),e))),r}_applyClientOptions(e){const t=this.getOptions(),{environment:n,release:r,dist:o,maxValueLength:s=250}=t
"environment"in e||(e.environment="environment"in t?n:"production"),void 0===e.release&&void 0!==r&&(e.release=r),void 0===e.dist&&void 0!==o&&(e.dist=o),e.message&&(e.message=P(e.message,s))
const i=e.exception&&e.exception.values&&e.exception.values[0]
i&&i.value&&(i.value=P(i.value,s))
const a=e.request
a&&a.url&&(a.url=P(a.url,s))}_applyIntegrationsMetadata(e){const t=Object.keys(this._integrations)
t.length>0&&(e.sdk=e.sdk||{},e.sdk.integrations=[...e.sdk.integrations||[],...t])}_captureEvent(e,t={},n){return this._processEvent(e,t,n).then(e=>e.event_id,e=>{if("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__){const t=e
"log"===t.logLevel?I.log(t.message):I.warn(t)}})}_processEvent(e,t,n){const{beforeSend:r,sampleRate:o}=this.getOptions()
if(!this._isEnabled())return Pe(new b("SDK not enabled, will not capture event.","log"))
const s="transaction"===e.type
return!s&&"number"==typeof o&&Math.random()>o?(this.recordDroppedEvent("sample_rate","error"),Pe(new b(`Discarding event because it's not included in the random sample (sampling rate = ${o})`,"log"))):this._prepareEvent(e,t,n).then(n=>{if(null===n)throw this.recordDroppedEvent("event_processor",e.type||"error"),new b("An event processor returned null, will not send event.","log")
if(t.data&&!0===t.data.__sentry__||s||!r)return n
return function(e){const t="`beforeSend` method has to return `null` or a valid event."
if(p(e))return e.then(e=>{if(!c(e)&&null!==e)throw new b(t)
return e},e=>{throw new b("beforeSend rejected with "+e)})
if(!c(e)&&null!==e)throw new b(t)
return e}(r(n,t))}).then(r=>{if(null===r)throw this.recordDroppedEvent("before_send",e.type||"error"),new b("`beforeSend` returned `null`, will not send event.","log")
const o=n&&n.getSession()
!s&&o&&this._updateSessionFromEvent(o,r)
const i=r.transaction_info
if(s&&i&&r.transaction!==e.transaction){const e="custom"
r.transaction_info={...i,source:e,changes:[...i.changes,{source:e,timestamp:r.timestamp,propagations:i.propagations}]}}return this.sendEvent(r,t),r}).then(null,e=>{if(e instanceof b)throw e
throw this.captureException(e,{data:{__sentry__:!0},originalException:e}),new b("Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: "+e)})}_process(e){this._numProcessing+=1,e.then(e=>(this._numProcessing-=1,e),e=>(this._numProcessing-=1,e))}_sendEnvelope(e){this._transport&&this._dsn?this._transport.send(e).then(null,e=>{("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&I.error("Error while sending event:",e)}):("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&I.error("Transport disabled")}_clearOutcomes(){const e=this._outcomes
return this._outcomes={},Object.keys(e).map(t=>{const[n,r]=t.split(":")
return{reason:n,category:r,quantity:e[t]}})}}let Mt
class Gt{constructor(){Gt.prototype.__init.call(this)}static __initStatic(){this.id="FunctionToString"}__init(){this.name=Gt.id}setupOnce(){Mt=Function.prototype.toString,Function.prototype.toString=function(...e){const t=G(this)||this
return Mt.apply(t,e)}}}Gt.__initStatic()
const jt=[/^Script error\.?$/,/^Javascript error: Script error\.? on line 0$/]
class At{static __initStatic(){this.id="InboundFilters"}__init(){this.name=At.id}constructor(e={}){this._options=e,At.prototype.__init.call(this)}setupOnce(e,t){const n=e=>{const n=t()
if(n){const t=n.getIntegration(At)
if(t){const r=n.getClient(),o=r?r.getOptions():{}
return function(e,t){if(t.ignoreInternal&&function(e){try{return"SentryError"===e.exception.values[0].type}catch(t){}return!1}(e))return("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&I.warn("Event dropped due to being internal Sentry Error.\nEvent: "+fe(e)),!0
if(function(e,t){if(!t||!t.length)return!1
return function(e){if(e.message)return[e.message]
if(e.exception)try{const{type:t="",value:n=""}=e.exception.values&&e.exception.values[0]||{}
return[""+n,`${t}: ${n}`]}catch(t){return("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&I.error("Cannot extract message for event "+fe(e)),[]}return[]}(e).some(e=>t.some(t=>U(e,t)))}(e,t.ignoreErrors))return("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&I.warn("Event dropped due to being matched by `ignoreErrors` option.\nEvent: "+fe(e)),!0
if(function(e,t){if(!t||!t.length)return!1
const n=Ft(e)
return!!n&&t.some(e=>U(n,e))}(e,t.denyUrls))return("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&I.warn(`Event dropped due to being matched by \`denyUrls\` option.\nEvent: ${fe(e)}.\nUrl: ${Ft(e)}`),!0
if(!function(e,t){if(!t||!t.length)return!0
const n=Ft(e)
return!n||t.some(e=>U(n,e))}(e,t.allowUrls))return("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&I.warn(`Event dropped due to not being matched by \`allowUrls\` option.\nEvent: ${fe(e)}.\nUrl: ${Ft(e)}`),!0
return!1}(e,function(e={},t={}){return{allowUrls:[...e.allowUrls||[],...t.allowUrls||[]],denyUrls:[...e.denyUrls||[],...t.denyUrls||[]],ignoreErrors:[...e.ignoreErrors||[],...t.ignoreErrors||[],...jt],ignoreInternal:void 0===e.ignoreInternal||e.ignoreInternal}}(t._options,o))?null:e}}return e}
n.id=this.name,e(n)}}function Ft(e){try{let n
try{n=e.exception.values[0].stacktrace.frames}catch(t){}return n?function(e=[]){for(let t=e.length-1;t>=0;t--){const n=e[t]
if(n&&"<anonymous>"!==n.filename&&"[native code]"!==n.filename)return n.filename||null}return null}(n):null}catch(n){return("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&I.error("Cannot extract url for event "+fe(e)),null}}At.__initStatic()
var Ht=Object.freeze({FunctionToString:Gt,InboundFilters:At}),Yt=Object.freeze({Integrations:Ht,addBreadcrumb:function(e){xt().addBreadcrumb(e)},captureEvent:function(e,t){return xt().captureEvent(e,t)},captureException:function(e,t){return xt().captureException(e,{captureContext:t})},captureMessage:function(e,t){const n="string"==typeof t?t:void 0,r="string"!=typeof t?{captureContext:t}:void 0
return xt().captureMessage(e,n,r)},configureScope:function(e){xt().configureScope(e)},setContext:function(e,t){xt().setContext(e,t)},setExtra:function(e,t){xt().setExtra(e,t)},setExtras:function(e){xt().setExtras(e)},setTag:function(e,t){xt().setTag(e,t)},setTags:function(e){xt().setTags(e)},setUser:function(e){xt().setUser(e)},startTransaction:function(e,t){return xt().startTransaction({...e},t)},withScope:function(e){xt().withScope(e)},Hub:bt,getCurrentHub:xt,getHubFromCarrier:Dt,getMainCarrier:Tt,makeMain:kt,setHubOnCarrier:Nt,closeSession:mt,makeSession:ht,updateSession:gt,SessionFlusher:Rt,Scope:yt,addGlobalEventProcessor:vt,getEnvelopeEndpointWithUrlEncodedAuth:It,getReportDialogEndpoint:function(e,t){const n=D(e),r=Ot(n)+"embed/error-page/"
let o="dsn="+k(n)
for(const s in t)if("dsn"!==s)if("user"===s){const e=t.user
if(!e)continue
e.name&&(o+="&name="+encodeURIComponent(e.name)),e.email&&(o+="&email="+encodeURIComponent(e.email))}else o+=`&${encodeURIComponent(s)}=${encodeURIComponent(t[s])}`
return`${r}?${o}`},BaseClient:Bt,initAndBind:function(e,t){!0===t.debug&&("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__?I.enable():console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle."))
const n=xt(),r=n.getScope()
r&&r.update(t.initialScope)
const o=new e(t)
n.bindClient(o)},createTransport:function(e,t,n=Ue(e.bufferSize||30)){let r={}
return{send:function(o){const s=[]
if(nt(o,(t,n)=>{const o=at(n)
lt(r,o)?e.recordDroppedEvent("ratelimit_backoff",o):s.push(t)}),0===s.length)return Ie()
const i=et(o[0],s),a=t=>{nt(i,(n,r)=>{e.recordDroppedEvent(t,at(r))})}
return n.add(()=>t({body:ot(i,e.textEncoder)}).then(e=>{void 0!==e.statusCode&&(e.statusCode<200||e.statusCode>=300)&&("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&I.warn(`Sentry responded with status code ${e.statusCode} to sent event.`),r=dt(r,e)},e=>{("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&I.error("Failed while sending event:",e),a("network_error")})).then(e=>e,e=>{if(e instanceof b)return("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&I.error("Skipped sending event because buffer is full."),a("queue_overflow"),Ie()
throw e})},flush:e=>n.drain(e)}},SDK_VERSION:"7.16.0",getIntegrationsToSetup:function(e){const t=e.defaultIntegrations||[],n=e.integrations
let r
t.forEach(e=>{e.isDefaultInstance=!0}),r=Array.isArray(n)?[...t,...n]:"function"==typeof n?me(n(t)):t
const o=function(e){const t={}
return e.forEach(e=>{const{name:n}=e,r=t[n]
r&&!r.isDefaultInstance&&e.isDefaultInstance||(t[n]=e)}),Object.values(t)}(r),s=o.findIndex(e=>"Debug"===e.name)
if(-1!==s){const[e]=o.splice(s,1)
o.push(e)}return o},FunctionToString:Gt,InboundFilters:At}),Wt=n((function(e,t){function n(e,t){const n=s(e,t),r={type:t&&t.name,value:a(t)}
return n.length&&(r.stacktrace={frames:n}),void 0===r.type&&""===r.value&&(r.value="Unrecoverable error caught"),r}function r(e,t,n,r){const o=Yt.getCurrentHub().getClient(),i=o&&o.getOptions().normalizeDepth,a={exception:{values:[{type:ft.isEvent(t)?t.constructor.name:r?"UnhandledRejection":"Error",value:`Non-Error ${r?"promise rejection":"exception"} captured with keys: ${ft.extractExceptionKeysForMessage(t)}`}]},extra:{__serialized__:ft.normalizeToSize(t,i)}}
if(n){const t=s(e,n)
t.length&&(a.exception.values[0].stacktrace={frames:t})}return a}function o(e,t){return{exception:{values:[n(e,t)]}}}function s(e,t){const n=t.stacktrace||t.stack||"",r=function(e){if(e){if("number"==typeof e.framesToPop)return e.framesToPop
if(i.test(e.message))return 1}return 0}(t)
try{return e(n,r)}catch(o){}return[]}Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})
const i=/Minified React error #\d+;/i
function a(e){const t=e&&e.message
return t?t.error&&"string"==typeof t.error.message?t.error.message:t:"No error message"}function c(e,t,n,s,i){let a
if(ft.isErrorEvent(t)&&t.error){return o(e,t.error)}if(ft.isDOMError(t)||ft.isDOMException(t)){const r=t
if("stack"in t)a=o(e,t)
else{const t=r.name||(ft.isDOMError(r)?"DOMError":"DOMException"),o=r.message?`${t}: ${r.message}`:t
a=u(e,o,n,s),ft.addExceptionTypeValue(a,o)}return"code"in r&&(a.tags={...a.tags,"DOMException.code":""+r.code}),a}if(ft.isError(t))return o(e,t)
if(ft.isPlainObject(t)||ft.isEvent(t)){return a=r(e,t,n,i),ft.addExceptionMechanism(a,{synthetic:!0}),a}return a=u(e,t,n,s),ft.addExceptionTypeValue(a,""+t,void 0),ft.addExceptionMechanism(a,{synthetic:!0}),a}function u(e,t,n,r){const o={message:t}
if(r&&n){const r=s(e,n)
r.length&&(o.exception={values:[{value:t,stacktrace:{frames:r}}]})}return o}t.eventFromError=o,t.eventFromException=function(e,t,n,r){const o=c(e,t,n&&n.syntheticException||void 0,r)
return ft.addExceptionMechanism(o),o.level="error",n&&n.event_id&&(o.event_id=n.event_id),ft.resolvedSyncPromise(o)},t.eventFromMessage=function(e,t,n="info",r,o){const s=u(e,t,r&&r.syntheticException||void 0,o)
return s.level=n,r&&r.event_id&&(s.event_id=r.event_id),ft.resolvedSyncPromise(s)},t.eventFromPlainObject=r,t.eventFromString=u,t.eventFromUnknownInput=c,t.exceptionFromError=n,t.parseStackFrames=s}))
t(Wt)
Wt.eventFromError,Wt.eventFromException,Wt.eventFromMessage,Wt.eventFromPlainObject,Wt.eventFromString,Wt.eventFromUnknownInput,Wt.exceptionFromError,Wt.parseStackFrames
var $t=n((function(e,t){Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})
class n{static __initStatic(){this.id="Breadcrumbs"}__init(){this.name=n.id}constructor(e){n.prototype.__init.call(this),this.options={console:!0,dom:!0,fetch:!0,history:!0,sentry:!0,xhr:!0,...e}}setupOnce(){var e
this.options.console&&ft.addInstrumentationHandler("console",r),this.options.dom&&ft.addInstrumentationHandler("dom",(e=this.options.dom,function(t){let n,r="object"==typeof e?e.serializeAttribute:void 0
"string"==typeof r&&(r=[r])
try{n=t.event.target?ft.htmlTreeAsString(t.event.target,r):ft.htmlTreeAsString(t.event,r)}catch(o){n="<unknown>"}0!==n.length&&Yt.getCurrentHub().addBreadcrumb({category:"ui."+t.name,message:n},{event:t.event,name:t.name,global:t.global})})),this.options.xhr&&ft.addInstrumentationHandler("xhr",o),this.options.fetch&&ft.addInstrumentationHandler("fetch",s),this.options.history&&ft.addInstrumentationHandler("history",i)}}function r(e){const t={category:"console",data:{arguments:e.args,logger:"console"},level:ft.severityLevelFromString(e.level),message:ft.safeJoin(e.args," ")}
if("assert"===e.level){if(!1!==e.args[0])return
t.message="Assertion failed: "+(ft.safeJoin(e.args.slice(1)," ")||"console.assert"),t.data.arguments=e.args.slice(1)}Yt.getCurrentHub().addBreadcrumb(t,{input:e.args,level:e.level})}function o(e){if(e.endTimestamp){if(e.xhr.__sentry_own_request__)return
const{method:t,url:n,status_code:r,body:o}=e.xhr.__sentry_xhr__||{}
Yt.getCurrentHub().addBreadcrumb({category:"xhr",data:{method:t,url:n,status_code:r},type:"http"},{xhr:e.xhr,input:o})}else;}function s(e){e.endTimestamp&&(e.fetchData.url.match(/sentry_key/)&&"POST"===e.fetchData.method||(e.error?Yt.getCurrentHub().addBreadcrumb({category:"fetch",data:e.fetchData,level:"error",type:"http"},{data:e.error,input:e.args}):Yt.getCurrentHub().addBreadcrumb({category:"fetch",data:{...e.fetchData,status_code:e.response.status},type:"http"},{input:e.args,response:e.response})))}function i(e){let t=e.from,n=e.to
const r=ft.parseUrl(ft.WINDOW.location.href)
let o=ft.parseUrl(t)
const s=ft.parseUrl(n)
o.path||(o=r),r.protocol===s.protocol&&r.host===s.host&&(n=s.relative),r.protocol===o.protocol&&r.host===o.host&&(t=o.relative),Yt.getCurrentHub().addBreadcrumb({category:"navigation",data:{from:t,to:n}})}n.__initStatic(),t.BREADCRUMB_INTEGRATION_ID="Breadcrumbs",t.Breadcrumbs=n}))
t($t)
$t.BREADCRUMB_INTEGRATION_ID,$t.Breadcrumbs
var qt=n((function(e,t){Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})
class n extends Yt.BaseClient{constructor(e){e._metadata=e._metadata||{},e._metadata.sdk=e._metadata.sdk||{name:"sentry.javascript.browser",packages:[{name:"npm:@sentry/browser",version:Yt.SDK_VERSION}],version:Yt.SDK_VERSION},super(e),e.sendClientReports&&ft.WINDOW.document&&ft.WINDOW.document.addEventListener("visibilitychange",()=>{"hidden"===ft.WINDOW.document.visibilityState&&this._flushOutcomes()})}eventFromException(e,t){return Wt.eventFromException(this._options.stackParser,e,t,this._options.attachStacktrace)}eventFromMessage(e,t="info",n){return Wt.eventFromMessage(this._options.stackParser,e,t,n,this._options.attachStacktrace)}sendEvent(e,t){const n=this.getIntegrationById($t.BREADCRUMB_INTEGRATION_ID)
n&&n.options&&n.options.sentry&&Yt.getCurrentHub().addBreadcrumb({category:"sentry."+("transaction"===e.type?"transaction":"event"),event_id:e.event_id,level:e.level,message:ft.getEventDescription(e)},{event:e}),super.sendEvent(e,t)}_prepareEvent(e,t,n){return e.platform=e.platform||"javascript",super._prepareEvent(e,t,n)}_flushOutcomes(){const e=this._clearOutcomes()
if(0===e.length)return void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&ft.logger.log("No outcomes to send"))
if(!this._dsn)return void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&ft.logger.log("No dsn provided, will not send outcomes"));("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&ft.logger.log("Sending outcomes:",e)
const t=Yt.getEnvelopeEndpointWithUrlEncodedAuth(this._dsn,this._options),n=ft.createClientReportEnvelope(e,this._options.tunnel&&ft.dsnToString(this._dsn))
try{const e="[object Navigator]"===Object.prototype.toString.call(ft.WINDOW&&ft.WINDOW.navigator)
if(e&&"function"==typeof ft.WINDOW.navigator.sendBeacon&&!this._options.transportOptions){ft.WINDOW.navigator.sendBeacon.bind(ft.WINDOW.navigator)(t,ft.serializeEnvelope(n))}else this._sendEnvelope(n)}catch(r){("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&ft.logger.error(r)}}}t.BrowserClient=n}))
t(qt)
qt.BrowserClient
var zt=n((function(e,t){let n
Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}}),t.getNativeFetchImplementation=function(){if(n)return n
if(ft.isNativeFetch(ft.WINDOW.fetch))return n=ft.WINDOW.fetch.bind(ft.WINDOW)
const e=ft.WINDOW.document
let t=ft.WINDOW.fetch
if(e&&"function"==typeof e.createElement)try{const n=e.createElement("iframe")
n.hidden=!0,e.head.appendChild(n)
const r=n.contentWindow
r&&r.fetch&&(t=r.fetch),e.head.removeChild(n)}catch(r){("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&ft.logger.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",r)}return n=t.bind(ft.WINDOW)}}))
t(zt)
zt.getNativeFetchImplementation
var Xt=n((function(e,t){Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}}),t.makeFetchTransport=function(e,t=zt.getNativeFetchImplementation()){return Yt.createTransport(e,(function(n){const r={body:n.body,method:"POST",referrerPolicy:"origin",headers:e.headers,keepalive:n.body.length<=65536,...e.fetchOptions}
return t(e.url,r).then(e=>({statusCode:e.status,headers:{"x-sentry-rate-limits":e.headers.get("X-Sentry-Rate-Limits"),"retry-after":e.headers.get("Retry-After")}}))}))}}))
t(Xt)
Xt.makeFetchTransport
var Kt=n((function(e,t){Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})
t.makeXHRTransport=function(e){return Yt.createTransport(e,(function(t){return new ft.SyncPromise((n,r)=>{const o=new XMLHttpRequest
o.onerror=r,o.onreadystatechange=()=>{4===o.readyState&&n({statusCode:o.status,headers:{"x-sentry-rate-limits":o.getResponseHeader("X-Sentry-Rate-Limits"),"retry-after":o.getResponseHeader("Retry-After")}})},o.open("POST",e.url)
for(const t in e.headers)Object.prototype.hasOwnProperty.call(e.headers,t)&&o.setRequestHeader(t,e.headers[t])
o.send(t.body)})}))}}))
t(Kt)
Kt.makeXHRTransport
var Vt=n((function(e,t){Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}}),t.makeFetchTransport=Xt.makeFetchTransport,t.makeXHRTransport=Kt.makeXHRTransport}))
t(Vt)
Vt.makeFetchTransport,Vt.makeXHRTransport
var Jt=n((function(e,t){Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})
function n(e,t,n,r){const o={filename:e,function:t,in_app:!0}
return void 0!==n&&(o.lineno=n),void 0!==r&&(o.colno=r),o}const r=/^\s*at (?:(.*\).*?|.*?) ?\((?:address at )?)?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/)?.*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,o=/\((\S*)(?::(\d+))(?::(\d+))\)/,s=[30,e=>{const t=r.exec(e)
if(t){if(t[2]&&0===t[2].indexOf("eval")){const e=o.exec(t[2])
e&&(t[2]=e[1],t[3]=e[2],t[4]=e[3])}const[e,r]=m(t[1]||"?",t[2])
return n(r,e,t[3]?+t[3]:void 0,t[4]?+t[4]:void 0)}}],i=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|safari-extension|safari-web-extension|capacitor)?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,a=/(\S+) line (\d+)(?: > eval line \d+)* > eval/i,c=[50,e=>{const t=i.exec(e)
if(t){if(t[3]&&t[3].indexOf(" > eval")>-1){const e=a.exec(t[3])
e&&(t[1]=t[1]||"eval",t[3]=e[1],t[4]=e[2],t[5]="")}let e=t[3],r=t[1]||"?"
return[r,e]=m(r,e),n(e,r,t[4]?+t[4]:void 0,t[5]?+t[5]:void 0)}}],u=/^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,l=[40,e=>{const t=u.exec(e)
return t?n(t[2],t[1]||"?",+t[3],t[4]?+t[4]:void 0):void 0}],d=/ line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i,p=[10,e=>{const t=d.exec(e)
return t?n(t[2],t[3]||"?",+t[1]):void 0}],_=/ line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\(.*\))? in (.*):\s*$/i,f=[20,e=>{const t=_.exec(e)
return t?n(t[5],t[3]||t[4]||"?",+t[1],+t[2]):void 0}],h=[s,c,l],g=ft.createStackParser(...h),m=(e,t)=>{const n=-1!==e.indexOf("safari-extension"),r=-1!==e.indexOf("safari-web-extension")
return n||r?[-1!==e.indexOf("@")?e.split("@")[0]:"?",n?"safari-extension:"+t:"safari-web-extension:"+t]:[e,t]}
t.chromeStackLineParser=s,t.defaultStackLineParsers=h,t.defaultStackParser=g,t.geckoStackLineParser=c,t.opera10StackLineParser=p,t.opera11StackLineParser=f,t.winjsStackLineParser=l}))
t(Jt)
Jt.chromeStackLineParser,Jt.defaultStackLineParsers,Jt.defaultStackParser,Jt.geckoStackLineParser,Jt.opera10StackLineParser,Jt.opera11StackLineParser,Jt.winjsStackLineParser
var Zt=n((function(e,t){Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})
let n=0
function r(){n+=1,setTimeout(()=>{n-=1})}t.ignoreNextOnError=r,t.shouldIgnoreOnError=function(){return n>0},t.wrap=function e(t,n={},o){if("function"!=typeof t)return t
try{const e=t.__sentry_wrapped__
if(e)return e
if(ft.getOriginalFunction(t))return t}catch(i){return t}const s=function(){const s=Array.prototype.slice.call(arguments)
try{o&&"function"==typeof o&&o.apply(this,arguments)
const r=s.map(t=>e(t,n))
return t.apply(this,r)}catch(i){throw r(),Yt.withScope(e=>{e.addEventProcessor(e=>(n.mechanism&&(ft.addExceptionTypeValue(e,void 0,void 0),ft.addExceptionMechanism(e,n.mechanism)),e.extra={...e.extra,arguments:s},e)),Yt.captureException(i)}),i}}
try{for(const e in t)Object.prototype.hasOwnProperty.call(t,e)&&(s[e]=t[e])}catch(a){}ft.markFunctionWrapped(s,t),ft.addNonEnumerableProperty(t,"__sentry_wrapped__",s)
try{Object.getOwnPropertyDescriptor(s,"name").configurable&&Object.defineProperty(s,"name",{get:()=>t.name})}catch(a){}return s}}))
t(Zt)
Zt.ignoreNextOnError,Zt.shouldIgnoreOnError,Zt.wrap
var Qt=n((function(e,t){Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})
class n{static __initStatic(){this.id="GlobalHandlers"}__init(){this.name=n.id}__init2(){this._installFunc={onerror:r,onunhandledrejection:o}}constructor(e){n.prototype.__init.call(this),n.prototype.__init2.call(this),this._options={onerror:!0,onunhandledrejection:!0,...e}}setupOnce(){Error.stackTraceLimit=50
const e=this._options
for(const n in e){const r=this._installFunc[n]
r&&e[n]&&(t=n,("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&ft.logger.log("Global Handler attached: "+t),r(),this._installFunc[n]=void 0)}var t}}function r(){ft.addInstrumentationHandler("error",e=>{const[t,r,o]=a()
if(!t.getIntegration(n))return
const{msg:c,url:u,line:l,column:d,error:p}=e
if(Zt.shouldIgnoreOnError()||p&&p.__sentry_own_request__)return
const _=void 0===p&&ft.isString(c)?function(e,t,n,r){let o=ft.isErrorEvent(e)?e.message:e,i="Error"
const a=o.match(/^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i)
a&&(i=a[1],o=a[2])
return s({exception:{values:[{type:i,value:o}]}},t,n,r)}(c,u,l,d):s(Wt.eventFromUnknownInput(r,p||c,void 0,o,!1),u,l,d)
_.level="error",i(t,p,_,"onerror")})}function o(){ft.addInstrumentationHandler("unhandledrejection",e=>{const[t,r,o]=a()
if(!t.getIntegration(n))return
let s=e
try{"reason"in e?s=e.reason:"detail"in e&&"reason"in e.detail&&(s=e.detail.reason)}catch(u){}if(Zt.shouldIgnoreOnError()||s&&s.__sentry_own_request__)return!0
const c=ft.isPrimitive(s)?{exception:{values:[{type:"UnhandledRejection",value:"Non-Error promise rejection captured with value: "+String(s)}]}}:Wt.eventFromUnknownInput(r,s,void 0,o,!0)
c.level="error",i(t,s,c,"onunhandledrejection")})}function s(e,t,n,r){const o=e.exception=e.exception||{},s=o.values=o.values||[],i=s[0]=s[0]||{},a=i.stacktrace=i.stacktrace||{},c=a.frames=a.frames||[],u=isNaN(parseInt(r,10))?void 0:r,l=isNaN(parseInt(n,10))?void 0:n,d=ft.isString(t)&&t.length>0?t:ft.getLocationHref()
return 0===c.length&&c.push({colno:u,filename:d,function:"?",in_app:!0,lineno:l}),e}function i(e,t,n,r){ft.addExceptionMechanism(n,{handled:!1,type:r}),e.captureEvent(n,{originalException:t})}function a(){const e=Yt.getCurrentHub(),t=e.getClient(),n=t&&t.getOptions()||{stackParser:()=>[],attachStacktrace:!1}
return[e,n.stackParser,n.attachStacktrace]}n.__initStatic(),t.GlobalHandlers=n}))
t(Qt)
Qt.GlobalHandlers
var en=n((function(e,t){Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})
const n=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"]
class r{static __initStatic(){this.id="TryCatch"}__init(){this.name=r.id}constructor(e){r.prototype.__init.call(this),this._options={XMLHttpRequest:!0,eventTarget:!0,requestAnimationFrame:!0,setInterval:!0,setTimeout:!0,...e}}setupOnce(){this._options.setTimeout&&ft.fill(ft.WINDOW,"setTimeout",o),this._options.setInterval&&ft.fill(ft.WINDOW,"setInterval",o),this._options.requestAnimationFrame&&ft.fill(ft.WINDOW,"requestAnimationFrame",s),this._options.XMLHttpRequest&&"XMLHttpRequest"in ft.WINDOW&&ft.fill(XMLHttpRequest.prototype,"send",i)
const e=this._options.eventTarget
if(e){(Array.isArray(e)?e:n).forEach(a)}}}function o(e){return function(...t){const n=t[0]
return t[0]=Zt.wrap(n,{mechanism:{data:{function:ft.getFunctionName(e)},handled:!0,type:"instrument"}}),e.apply(this,t)}}function s(e){return function(t){return e.apply(this,[Zt.wrap(t,{mechanism:{data:{function:"requestAnimationFrame",handler:ft.getFunctionName(e)},handled:!0,type:"instrument"}})])}}function i(e){return function(...t){const n=this
return["onload","onerror","onprogress","onreadystatechange"].forEach(e=>{e in n&&"function"==typeof n[e]&&ft.fill(n,e,(function(t){const n={mechanism:{data:{function:e,handler:ft.getFunctionName(t)},handled:!0,type:"instrument"}},r=ft.getOriginalFunction(t)
return r&&(n.mechanism.data.handler=ft.getFunctionName(r)),Zt.wrap(t,n)}))}),e.apply(this,t)}}function a(e){const t=ft.WINDOW,n=t[e]&&t[e].prototype
n&&n.hasOwnProperty&&n.hasOwnProperty("addEventListener")&&(ft.fill(n,"addEventListener",(function(t){return function(n,r,o){try{"function"==typeof r.handleEvent&&(r.handleEvent=Zt.wrap(r.handleEvent,{mechanism:{data:{function:"handleEvent",handler:ft.getFunctionName(r),target:e},handled:!0,type:"instrument"}}))}catch(s){}return t.apply(this,[n,Zt.wrap(r,{mechanism:{data:{function:"addEventListener",handler:ft.getFunctionName(r),target:e},handled:!0,type:"instrument"}}),o])}})),ft.fill(n,"removeEventListener",(function(e){return function(t,n,r){const o=n
try{const n=o&&o.__sentry_wrapped__
n&&e.call(this,t,n,r)}catch(s){}return e.call(this,t,o,r)}})))}r.__initStatic(),t.TryCatch=r}))
t(en)
en.TryCatch
var tn=n((function(e,t){Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})
class n{static __initStatic(){this.id="LinkedErrors"}__init(){this.name=n.id}constructor(e={}){n.prototype.__init.call(this),this._key=e.key||"cause",this._limit=e.limit||5}setupOnce(){const e=Yt.getCurrentHub().getClient()
e&&Yt.addGlobalEventProcessor((t,o)=>{const s=Yt.getCurrentHub().getIntegration(n)
return s?r(e.getOptions().stackParser,s._key,s._limit,t,o):t})}}function r(e,t,n,r,s){if(!(r.exception&&r.exception.values&&s&&ft.isInstanceOf(s.originalException,Error)))return r
const i=o(e,n,s.originalException,t)
return r.exception.values=[...i,...r.exception.values],r}function o(e,t,n,r,s=[]){if(!ft.isInstanceOf(n[r],Error)||s.length+1>=t)return s
const i=Wt.exceptionFromError(e,n[r])
return o(e,t,n[r],r,[i,...s])}n.__initStatic(),t.LinkedErrors=n,t._handler=r,t._walkErrorTree=o}))
t(tn)
tn.LinkedErrors,tn._handler,tn._walkErrorTree
var nn=n((function(e,t){Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})
class n{constructor(){n.prototype.__init.call(this)}static __initStatic(){this.id="HttpContext"}__init(){this.name=n.id}setupOnce(){Yt.addGlobalEventProcessor(e=>{if(Yt.getCurrentHub().getIntegration(n)){if(!ft.WINDOW.navigator&&!ft.WINDOW.location&&!ft.WINDOW.document)return e
const t=e.request&&e.request.url||ft.WINDOW.location&&ft.WINDOW.location.href,{referrer:n}=ft.WINDOW.document||{},{userAgent:r}=ft.WINDOW.navigator||{},o={...t&&{url:t},headers:{...e.request&&e.request.headers,...n&&{Referer:n},...r&&{"User-Agent":r}}}
return{...e,request:o}}return e})}}n.__initStatic(),t.HttpContext=n}))
t(nn)
nn.HttpContext
var rn=n((function(e,t){Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})
class n{constructor(){n.prototype.__init.call(this)}static __initStatic(){this.id="Dedupe"}__init(){this.name=n.id}setupOnce(e,t){const i=e=>{const i=t().getIntegration(n)
if(i){try{if(function(e,t){if(!t)return!1
if(function(e,t){const n=e.message,s=t.message
if(!n&&!s)return!1
if(n&&!s||!n&&s)return!1
if(n!==s)return!1
if(!o(e,t))return!1
if(!r(e,t))return!1
return!0}(e,t))return!0
if(function(e,t){const n=s(t),i=s(e)
if(!n||!i)return!1
if(n.type!==i.type||n.value!==i.value)return!1
if(!o(e,t))return!1
if(!r(e,t))return!1
return!0}(e,t))return!0
return!1}(e,i._previousEvent))return("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&ft.logger.warn("Event dropped due to being a duplicate of previously captured event."),null}catch(a){return i._previousEvent=e}return i._previousEvent=e}return e}
i.id=this.name,e(i)}}function r(e,t){let n=i(e),r=i(t)
if(!n&&!r)return!0
if(n&&!r||!n&&r)return!1
if(n=n,r=r,r.length!==n.length)return!1
for(let o=0;o<r.length;o++){const e=r[o],t=n[o]
if(e.filename!==t.filename||e.lineno!==t.lineno||e.colno!==t.colno||e.function!==t.function)return!1}return!0}function o(e,t){let n=e.fingerprint,r=t.fingerprint
if(!n&&!r)return!0
if(n&&!r||!n&&r)return!1
n=n,r=r
try{return!(n.join("")!==r.join(""))}catch(o){return!1}}function s(e){return e.exception&&e.exception.values&&e.exception.values[0]}function i(e){const t=e.exception
if(t)try{return t.values[0].stacktrace.frames}catch(n){return}}n.__initStatic(),t.Dedupe=n}))
t(rn)
rn.Dedupe
var on=n((function(e,t){Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}}),t.GlobalHandlers=Qt.GlobalHandlers,t.TryCatch=en.TryCatch,t.Breadcrumbs=$t.Breadcrumbs,t.LinkedErrors=tn.LinkedErrors,t.HttpContext=nn.HttpContext,t.Dedupe=rn.Dedupe}))
t(on)
on.GlobalHandlers,on.TryCatch,on.Breadcrumbs,on.LinkedErrors,on.HttpContext,on.Dedupe
var sn=n((function(e,t){Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})
const n=[new Yt.Integrations.InboundFilters,new Yt.Integrations.FunctionToString,new en.TryCatch,new $t.Breadcrumbs,new Qt.GlobalHandlers,new tn.LinkedErrors,new rn.Dedupe,new nn.HttpContext]
function r(e){e.startSession({ignoreDuration:!0}),e.captureSession()}t.close=function(e){const t=Yt.getCurrentHub().getClient()
return t?t.close(e):(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&ft.logger.warn("Cannot flush events and disable SDK. No client defined."),ft.resolvedSyncPromise(!1))},t.defaultIntegrations=n,t.flush=function(e){const t=Yt.getCurrentHub().getClient()
return t?t.flush(e):(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&ft.logger.warn("Cannot flush events. No client defined."),ft.resolvedSyncPromise(!1))},t.forceLoad=function(){},t.init=function(e={}){void 0===e.defaultIntegrations&&(e.defaultIntegrations=n),void 0===e.release&&ft.WINDOW.SENTRY_RELEASE&&ft.WINDOW.SENTRY_RELEASE.id&&(e.release=ft.WINDOW.SENTRY_RELEASE.id),void 0===e.autoSessionTracking&&(e.autoSessionTracking=!0),void 0===e.sendClientReports&&(e.sendClientReports=!0)
const t={...e,stackParser:ft.stackParserFromStackParserOptions(e.stackParser||Jt.defaultStackParser),integrations:Yt.getIntegrationsToSetup(e),transport:e.transport||(ft.supportsFetch()?Xt.makeFetchTransport:Kt.makeXHRTransport)}
Yt.initAndBind(qt.BrowserClient,t),e.autoSessionTracking&&function(){if(void 0===ft.WINDOW.document)return void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&ft.logger.warn("Session tracking in non-browser environment with @sentry/browser is not supported."))
const e=Yt.getCurrentHub()
if(!e.captureSession)return
r(e),ft.addInstrumentationHandler("history",({from:e,to:t})=>{void 0!==e&&e!==t&&r(Yt.getCurrentHub())})}()},t.lastEventId=function(){return Yt.getCurrentHub().lastEventId()},t.onLoad=function(e){e()},t.showReportDialog=function(e={},t=Yt.getCurrentHub()){if(!ft.WINDOW.document)return void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&ft.logger.error("Global document not defined in showReportDialog call"))
const{client:n,scope:r}=t.getStackTop(),o=e.dsn||n&&n.getDsn()
if(!o)return void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&ft.logger.error("DSN not configured for showReportDialog call"))
r&&(e.user={...r.getUser(),...e.user}),e.eventId||(e.eventId=t.lastEventId())
const s=ft.WINDOW.document.createElement("script")
s.async=!0,s.src=Yt.getReportDialogEndpoint(o,e),e.onLoad&&(s.onload=e.onLoad)
const i=ft.WINDOW.document.head||ft.WINDOW.document.body
i?i.appendChild(s):("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&ft.logger.error("Not injecting report dialog. No injection point found in HTML")},t.wrap=function(e){return Zt.wrap(e)()}}))
t(sn)
sn.close,sn.defaultIntegrations,sn.flush,sn.forceLoad,sn.init,sn.lastEventId,sn.onLoad,sn.showReportDialog,sn.wrap
var an=n((function(e,t){Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}}),t.FunctionToString=Yt.FunctionToString,t.Hub=Yt.Hub,t.InboundFilters=Yt.InboundFilters,t.SDK_VERSION=Yt.SDK_VERSION,t.Scope=Yt.Scope,t.addBreadcrumb=Yt.addBreadcrumb,t.addGlobalEventProcessor=Yt.addGlobalEventProcessor,t.captureEvent=Yt.captureEvent,t.captureException=Yt.captureException,t.captureMessage=Yt.captureMessage,t.configureScope=Yt.configureScope,t.createTransport=Yt.createTransport,t.getCurrentHub=Yt.getCurrentHub,t.getHubFromCarrier=Yt.getHubFromCarrier,t.makeMain=Yt.makeMain,t.setContext=Yt.setContext,t.setExtra=Yt.setExtra,t.setExtras=Yt.setExtras,t.setTag=Yt.setTag,t.setTags=Yt.setTags,t.setUser=Yt.setUser,t.startTransaction=Yt.startTransaction,t.withScope=Yt.withScope,t.BrowserClient=qt.BrowserClient,t.chromeStackLineParser=Jt.chromeStackLineParser,t.defaultStackLineParsers=Jt.defaultStackLineParsers,t.defaultStackParser=Jt.defaultStackParser,t.geckoStackLineParser=Jt.geckoStackLineParser,t.opera10StackLineParser=Jt.opera10StackLineParser
t.opera11StackLineParser=Jt.opera11StackLineParser,t.winjsStackLineParser=Jt.winjsStackLineParser,t.close=sn.close,t.defaultIntegrations=sn.defaultIntegrations,t.flush=sn.flush,t.forceLoad=sn.forceLoad,t.init=sn.init,t.lastEventId=sn.lastEventId,t.onLoad=sn.onLoad,t.showReportDialog=sn.showReportDialog,t.wrap=sn.wrap}))
t(an)
an.FunctionToString,an.Hub,an.InboundFilters,an.SDK_VERSION,an.Scope,an.addBreadcrumb,an.addGlobalEventProcessor,an.captureEvent,an.captureException,an.captureMessage,an.configureScope,an.createTransport,an.getCurrentHub,an.getHubFromCarrier,an.makeMain,an.setContext,an.setExtra,an.setExtras,an.setTag,an.setTags,an.setUser,an.startTransaction,an.withScope,an.BrowserClient,an.chromeStackLineParser,an.defaultStackLineParsers,an.defaultStackParser,an.geckoStackLineParser,an.opera10StackLineParser,an.opera11StackLineParser,an.winjsStackLineParser,an.close,an.defaultIntegrations,an.flush,an.forceLoad,an.init,an.lastEventId,an.onLoad,an.showReportDialog,an.wrap
var cn=n((function(e,t){Object.defineProperties(t,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})
let n={}
ft.WINDOW.Sentry&&ft.WINDOW.Sentry.Integrations&&(n=ft.WINDOW.Sentry.Integrations)
const r={...n,...Yt.Integrations,...on}
t.FunctionToString=Yt.FunctionToString,t.Hub=Yt.Hub,t.InboundFilters=Yt.InboundFilters,t.SDK_VERSION=Yt.SDK_VERSION,t.Scope=Yt.Scope,t.addBreadcrumb=Yt.addBreadcrumb,t.addGlobalEventProcessor=Yt.addGlobalEventProcessor,t.captureEvent=Yt.captureEvent,t.captureException=Yt.captureException,t.captureMessage=Yt.captureMessage,t.configureScope=Yt.configureScope,t.createTransport=Yt.createTransport,t.getCurrentHub=Yt.getCurrentHub,t.getHubFromCarrier=Yt.getHubFromCarrier,t.makeMain=Yt.makeMain,t.setContext=Yt.setContext,t.setExtra=Yt.setExtra,t.setExtras=Yt.setExtras,t.setTag=Yt.setTag,t.setTags=Yt.setTags,t.setUser=Yt.setUser,t.startTransaction=Yt.startTransaction,t.withScope=Yt.withScope,t.BrowserClient=qt.BrowserClient,t.makeFetchTransport=Xt.makeFetchTransport,t.makeXHRTransport=Kt.makeXHRTransport,t.chromeStackLineParser=Jt.chromeStackLineParser,t.defaultStackLineParsers=Jt.defaultStackLineParsers,t.defaultStackParser=Jt.defaultStackParser,t.geckoStackLineParser=Jt.geckoStackLineParser
t.opera10StackLineParser=Jt.opera10StackLineParser,t.opera11StackLineParser=Jt.opera11StackLineParser,t.winjsStackLineParser=Jt.winjsStackLineParser,t.close=sn.close,t.defaultIntegrations=sn.defaultIntegrations,t.flush=sn.flush,t.forceLoad=sn.forceLoad,t.init=sn.init,t.lastEventId=sn.lastEventId,t.onLoad=sn.onLoad,t.showReportDialog=sn.showReportDialog,t.wrap=sn.wrap,t.GlobalHandlers=Qt.GlobalHandlers,t.TryCatch=en.TryCatch,t.Breadcrumbs=$t.Breadcrumbs,t.LinkedErrors=tn.LinkedErrors,t.HttpContext=nn.HttpContext,t.Dedupe=rn.Dedupe,t.Integrations=r})),un=t(cn),ln=cn.FunctionToString,dn=cn.Hub,pn=cn.InboundFilters,_n=cn.SDK_VERSION,fn=cn.Scope,hn=cn.addBreadcrumb,gn=cn.addGlobalEventProcessor,mn=cn.captureEvent,yn=cn.captureException,En=cn.captureMessage,vn=cn.configureScope,Sn=cn.createTransport,bn=cn.getCurrentHub,Tn=cn.getHubFromCarrier,kn=cn.makeMain,xn=cn.setContext,wn=cn.setExtra,Dn=cn.setExtras,Nn=cn.setTag,Rn=cn.setTags,On=cn.setUser,In=cn.startTransaction,Pn=cn.withScope,Cn=cn.BrowserClient,Un=cn.makeFetchTransport,Ln=cn.makeXHRTransport,Bn=cn.chromeStackLineParser,Mn=cn.defaultStackLineParsers,Gn=cn.defaultStackParser,jn=cn.geckoStackLineParser,An=cn.opera10StackLineParser,Fn=cn.opera11StackLineParser,Hn=cn.winjsStackLineParser,Yn=cn.close,Wn=cn.defaultIntegrations,$n=cn.flush,qn=cn.forceLoad,zn=cn.init,Xn=cn.lastEventId,Kn=cn.onLoad,Vn=cn.showReportDialog,Jn=cn.wrap,Zn=cn.GlobalHandlers,Qn=cn.TryCatch,er=cn.Breadcrumbs,tr=cn.LinkedErrors,nr=cn.HttpContext,rr=cn.Dedupe,or=cn.Integrations
e.default=un,e.FunctionToString=ln,e.Hub=dn,e.InboundFilters=pn,e.SDK_VERSION=_n,e.Scope=fn,e.addBreadcrumb=hn,e.addGlobalEventProcessor=gn,e.captureEvent=mn,e.captureException=yn,e.captureMessage=En,e.configureScope=vn,e.createTransport=Sn,e.getCurrentHub=bn,e.getHubFromCarrier=Tn,e.makeMain=kn,e.setContext=xn,e.setExtra=wn,e.setExtras=Dn,e.setTag=Nn,e.setTags=Rn,e.setUser=On,e.startTransaction=In,e.withScope=Pn,e.BrowserClient=Cn,e.makeFetchTransport=Un,e.makeXHRTransport=Ln,e.chromeStackLineParser=Bn,e.defaultStackLineParsers=Mn,e.defaultStackParser=Gn
e.geckoStackLineParser=jn,e.opera10StackLineParser=An,e.opera11StackLineParser=Fn,e.winjsStackLineParser=Hn,e.close=Yn,e.defaultIntegrations=Wn,e.flush=$n,e.forceLoad=qn,e.init=zn,e.lastEventId=Xn,e.onLoad=Kn,e.showReportDialog=Vn,e.wrap=Jn,e.GlobalHandlers=Zn,e.TryCatch=Qn,e.Breadcrumbs=er,e.LinkedErrors=tr,e.HttpContext=nr,e.Dedupe=rr,e.Integrations=or,Object.defineProperty(e,"__esModule",{value:!0})}))
