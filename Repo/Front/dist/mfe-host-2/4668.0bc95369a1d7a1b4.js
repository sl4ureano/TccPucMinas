(self.webpackChunkmfe_host_2=self.webpackChunkmfe_host_2||[]).push([[4668],{7048:(Ce,V,_)=>{_.r(V),_.d(V,{FetchBackend:()=>$,HTTP_INTERCEPTORS:()=>te,HttpBackend:()=>v,HttpClient:()=>pe,HttpClientJsonpModule:()=>ut,HttpClientModule:()=>ht,HttpClientXsrfModule:()=>dt,HttpContext:()=>de,HttpContextToken:()=>Xe,HttpErrorResponse:()=>I,HttpEventType:()=>b,HttpFeatureKind:()=>O,HttpHandler:()=>R,HttpHeaderResponse:()=>z,HttpHeaders:()=>m,HttpParams:()=>M,HttpRequest:()=>U,HttpResponse:()=>N,HttpResponseBase:()=>K,HttpStatusCode:()=>x,HttpUrlEncodingCodec:()=>A,HttpXhrBackend:()=>oe,HttpXsrfTokenExtractor:()=>S,JsonpClientBackend:()=>se,JsonpInterceptor:()=>st,provideHttpClient:()=>Ne,withFetch:()=>lt,withInterceptors:()=>at,withInterceptorsFromDi:()=>Oe,withJsonpSupport:()=>Ae,withNoXsrfProtection:()=>ke,withRequestsMadeViaParent:()=>ct,withXsrfConfiguration:()=>ie,\u0275HTTP_ROOT_INTERCEPTOR_FNS:()=>ne,\u0275HttpInterceptingHandler:()=>G,\u0275HttpInterceptorHandler:()=>G,\u0275PRIMARY_HTTP_BACKEND:()=>re,\u0275withHttpTransferCache:()=>Tt});var C=_(1528),a=_(5468),P=_(8756),E=_(6344),k=_(4808);class R{}class v{}class m{constructor(n){this.normalizedNames=new Map,this.lazyUpdate=null,n?"string"==typeof n?this.lazyInit=()=>{this.headers=new Map,n.split("\n").forEach(t=>{const r=t.indexOf(":");if(r>0){const s=t.slice(0,r),o=s.toLowerCase(),i=t.slice(r+1).trim();this.maybeSetNormalizedName(s,o),this.headers.has(o)?this.headers.get(o).push(i):this.headers.set(o,[i])}})}:typeof Headers<"u"&&n instanceof Headers?(this.headers=new Map,n.forEach((t,r)=>{this.setHeaderEntries(r,t)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(n).forEach(([t,r])=>{this.setHeaderEntries(t,r)})}:this.headers=new Map}has(n){return this.init(),this.headers.has(n.toLowerCase())}get(n){this.init();const t=this.headers.get(n.toLowerCase());return t&&t.length>0?t[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(n){return this.init(),this.headers.get(n.toLowerCase())||null}append(n,t){return this.clone({name:n,value:t,op:"a"})}set(n,t){return this.clone({name:n,value:t,op:"s"})}delete(n,t){return this.clone({name:n,value:t,op:"d"})}maybeSetNormalizedName(n,t){this.normalizedNames.has(t)||this.normalizedNames.set(t,n)}init(){this.lazyInit&&(this.lazyInit instanceof m?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(n=>this.applyUpdate(n)),this.lazyUpdate=null))}copyFrom(n){n.init(),Array.from(n.headers.keys()).forEach(t=>{this.headers.set(t,n.headers.get(t)),this.normalizedNames.set(t,n.normalizedNames.get(t))})}clone(n){const t=new m;return t.lazyInit=this.lazyInit&&this.lazyInit instanceof m?this.lazyInit:this,t.lazyUpdate=(this.lazyUpdate||[]).concat([n]),t}applyUpdate(n){const t=n.name.toLowerCase();switch(n.op){case"a":case"s":let r=n.value;if("string"==typeof r&&(r=[r]),0===r.length)return;this.maybeSetNormalizedName(n.name,t);const s=("a"===n.op?this.headers.get(t):void 0)||[];s.push(...r),this.headers.set(t,s);break;case"d":const o=n.value;if(o){let i=this.headers.get(t);if(!i)return;i=i.filter(l=>-1===o.indexOf(l)),0===i.length?(this.headers.delete(t),this.normalizedNames.delete(t)):this.headers.set(t,i)}else this.headers.delete(t),this.normalizedNames.delete(t)}}setHeaderEntries(n,t){const r=(Array.isArray(t)?t:[t]).map(o=>o.toString()),s=n.toLowerCase();this.headers.set(s,r),this.maybeSetNormalizedName(n,s)}forEach(n){this.init(),Array.from(this.normalizedNames.keys()).forEach(t=>n(this.normalizedNames.get(t),this.headers.get(t)))}}class A{encodeKey(n){return le(n)}encodeValue(n){return le(n)}decodeKey(n){return decodeURIComponent(n)}decodeValue(n){return decodeURIComponent(n)}}const Q=/%(\d[a-f0-9])/gi,ze={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function le(e){return encodeURIComponent(e).replace(Q,(n,t)=>ze[t]??n)}function W(e){return`${e}`}class M{constructor(n={}){if(this.updates=null,this.cloneFrom=null,this.encoder=n.encoder||new A,n.fromString){if(n.fromObject)throw new Error("Cannot specify both fromString and fromObject.");this.map=function D(e,n){const t=new Map;return e.length>0&&e.replace(/^\?/,"").split("&").forEach(s=>{const o=s.indexOf("="),[i,l]=-1==o?[n.decodeKey(s),""]:[n.decodeKey(s.slice(0,o)),n.decodeValue(s.slice(o+1))],c=t.get(i)||[];c.push(l),t.set(i,c)}),t}(n.fromString,this.encoder)}else n.fromObject?(this.map=new Map,Object.keys(n.fromObject).forEach(t=>{const r=n.fromObject[t],s=Array.isArray(r)?r.map(W):[W(r)];this.map.set(t,s)})):this.map=null}has(n){return this.init(),this.map.has(n)}get(n){this.init();const t=this.map.get(n);return t?t[0]:null}getAll(n){return this.init(),this.map.get(n)||null}keys(){return this.init(),Array.from(this.map.keys())}append(n,t){return this.clone({param:n,value:t,op:"a"})}appendAll(n){const t=[];return Object.keys(n).forEach(r=>{const s=n[r];Array.isArray(s)?s.forEach(o=>{t.push({param:r,value:o,op:"a"})}):t.push({param:r,value:s,op:"a"})}),this.clone(t)}set(n,t){return this.clone({param:n,value:t,op:"s"})}delete(n,t){return this.clone({param:n,value:t,op:"d"})}toString(){return this.init(),this.keys().map(n=>{const t=this.encoder.encodeKey(n);return this.map.get(n).map(r=>t+"="+this.encoder.encodeValue(r)).join("&")}).filter(n=>""!==n).join("&")}clone(n){const t=new M({encoder:this.encoder});return t.cloneFrom=this.cloneFrom||this,t.updates=(this.updates||[]).concat(n),t}init(){null===this.map&&(this.map=new Map),null!==this.cloneFrom&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(n=>this.map.set(n,this.cloneFrom.map.get(n))),this.updates.forEach(n=>{switch(n.op){case"a":case"s":const t=("a"===n.op?this.map.get(n.param):void 0)||[];t.push(W(n.value)),this.map.set(n.param,t);break;case"d":if(void 0===n.value){this.map.delete(n.param);break}{let r=this.map.get(n.param)||[];const s=r.indexOf(W(n.value));-1!==s&&r.splice(s,1),r.length>0?this.map.set(n.param,r):this.map.delete(n.param)}}}),this.cloneFrom=this.updates=null)}}class Xe{constructor(n){this.defaultValue=n}}class de{constructor(){this.map=new Map}set(n,t){return this.map.set(n,t),this}get(n){return this.map.has(n)||this.map.set(n,n.defaultValue()),this.map.get(n)}delete(n){return this.map.delete(n),this}has(n){return this.map.has(n)}keys(){return this.map.keys()}}function he(e){return typeof ArrayBuffer<"u"&&e instanceof ArrayBuffer}function ue(e){return typeof Blob<"u"&&e instanceof Blob}function fe(e){return typeof FormData<"u"&&e instanceof FormData}class U{constructor(n,t,r,s){let o;if(this.url=t,this.body=null,this.reportProgress=!1,this.withCredentials=!1,this.responseType="json",this.method=n.toUpperCase(),function Je(e){switch(e){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}(this.method)||s?(this.body=void 0!==r?r:null,o=s):o=r,o&&(this.reportProgress=!!o.reportProgress,this.withCredentials=!!o.withCredentials,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),this.transferCache=o.transferCache),this.headers??=new m,this.context??=new de,this.params){const i=this.params.toString();if(0===i.length)this.urlWithParams=t;else{const l=t.indexOf("?");this.urlWithParams=t+(-1===l?"?":l<t.length-1?"&":"")+i}}else this.params=new M,this.urlWithParams=t}serializeBody(){return null===this.body?null:he(this.body)||ue(this.body)||fe(this.body)||function Ve(e){return typeof URLSearchParams<"u"&&e instanceof URLSearchParams}(this.body)||"string"==typeof this.body?this.body:this.body instanceof M?this.body.toString():"object"==typeof this.body||"boolean"==typeof this.body||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return null===this.body||fe(this.body)?null:ue(this.body)?this.body.type||null:he(this.body)?null:"string"==typeof this.body?"text/plain":this.body instanceof M?"application/x-www-form-urlencoded;charset=UTF-8":"object"==typeof this.body||"number"==typeof this.body||"boolean"==typeof this.body?"application/json":null}clone(n={}){const t=n.method||this.method,r=n.url||this.url,s=n.responseType||this.responseType,o=void 0!==n.body?n.body:this.body,i=void 0!==n.withCredentials?n.withCredentials:this.withCredentials,l=void 0!==n.reportProgress?n.reportProgress:this.reportProgress;let c=n.headers||this.headers,d=n.params||this.params;const u=n.context??this.context;return void 0!==n.setHeaders&&(c=Object.keys(n.setHeaders).reduce((p,y)=>p.set(y,n.setHeaders[y]),c)),n.setParams&&(d=Object.keys(n.setParams).reduce((p,y)=>p.set(y,n.setParams[y]),d)),new U(t,r,o,{params:d,headers:c,context:u,reportProgress:l,responseType:s,withCredentials:i})}}var b=function(e){return e[e.Sent=0]="Sent",e[e.UploadProgress=1]="UploadProgress",e[e.ResponseHeader=2]="ResponseHeader",e[e.DownloadProgress=3]="DownloadProgress",e[e.Response=4]="Response",e[e.User=5]="User",e}(b||{});class K{constructor(n,t=x.Ok,r="OK"){this.headers=n.headers||new m,this.status=void 0!==n.status?n.status:t,this.statusText=n.statusText||r,this.url=n.url||null,this.ok=this.status>=200&&this.status<300}}class z extends K{constructor(n={}){super(n),this.type=b.ResponseHeader}clone(n={}){return new z({headers:n.headers||this.headers,status:void 0!==n.status?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0})}}class N extends K{constructor(n={}){super(n),this.type=b.Response,this.body=void 0!==n.body?n.body:null}clone(n={}){return new N({body:void 0!==n.body?n.body:this.body,headers:n.headers||this.headers,status:void 0!==n.status?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0})}}class I extends K{constructor(n){super(n,0,"Unknown Error"),this.name="HttpErrorResponse",this.ok=!1,this.message=this.status>=200&&this.status<300?`Http failure during parsing for ${n.url||"(unknown url)"}`:`Http failure response for ${n.url||"(unknown url)"}: ${n.status} ${n.statusText}`,this.error=n.error||null}}var x=function(e){return e[e.Continue=100]="Continue",e[e.SwitchingProtocols=101]="SwitchingProtocols",e[e.Processing=102]="Processing",e[e.EarlyHints=103]="EarlyHints",e[e.Ok=200]="Ok",e[e.Created=201]="Created",e[e.Accepted=202]="Accepted",e[e.NonAuthoritativeInformation=203]="NonAuthoritativeInformation",e[e.NoContent=204]="NoContent",e[e.ResetContent=205]="ResetContent",e[e.PartialContent=206]="PartialContent",e[e.MultiStatus=207]="MultiStatus",e[e.AlreadyReported=208]="AlreadyReported",e[e.ImUsed=226]="ImUsed",e[e.MultipleChoices=300]="MultipleChoices",e[e.MovedPermanently=301]="MovedPermanently",e[e.Found=302]="Found",e[e.SeeOther=303]="SeeOther",e[e.NotModified=304]="NotModified",e[e.UseProxy=305]="UseProxy",e[e.Unused=306]="Unused",e[e.TemporaryRedirect=307]="TemporaryRedirect",e[e.PermanentRedirect=308]="PermanentRedirect",e[e.BadRequest=400]="BadRequest",e[e.Unauthorized=401]="Unauthorized",e[e.PaymentRequired=402]="PaymentRequired",e[e.Forbidden=403]="Forbidden",e[e.NotFound=404]="NotFound",e[e.MethodNotAllowed=405]="MethodNotAllowed",e[e.NotAcceptable=406]="NotAcceptable",e[e.ProxyAuthenticationRequired=407]="ProxyAuthenticationRequired",e[e.RequestTimeout=408]="RequestTimeout",e[e.Conflict=409]="Conflict",e[e.Gone=410]="Gone",e[e.LengthRequired=411]="LengthRequired",e[e.PreconditionFailed=412]="PreconditionFailed",e[e.PayloadTooLarge=413]="PayloadTooLarge",e[e.UriTooLong=414]="UriTooLong",e[e.UnsupportedMediaType=415]="UnsupportedMediaType",e[e.RangeNotSatisfiable=416]="RangeNotSatisfiable",e[e.ExpectationFailed=417]="ExpectationFailed",e[e.ImATeapot=418]="ImATeapot",e[e.MisdirectedRequest=421]="MisdirectedRequest",e[e.UnprocessableEntity=422]="UnprocessableEntity",e[e.Locked=423]="Locked",e[e.FailedDependency=424]="FailedDependency",e[e.TooEarly=425]="TooEarly",e[e.UpgradeRequired=426]="UpgradeRequired",e[e.PreconditionRequired=428]="PreconditionRequired",e[e.TooManyRequests=429]="TooManyRequests",e[e.RequestHeaderFieldsTooLarge=431]="RequestHeaderFieldsTooLarge",e[e.UnavailableForLegalReasons=451]="UnavailableForLegalReasons",e[e.InternalServerError=500]="InternalServerError",e[e.NotImplemented=501]="NotImplemented",e[e.BadGateway=502]="BadGateway",e[e.ServiceUnavailable=503]="ServiceUnavailable",e[e.GatewayTimeout=504]="GatewayTimeout",e[e.HttpVersionNotSupported=505]="HttpVersionNotSupported",e[e.VariantAlsoNegotiates=506]="VariantAlsoNegotiates",e[e.InsufficientStorage=507]="InsufficientStorage",e[e.LoopDetected=508]="LoopDetected",e[e.NotExtended=510]="NotExtended",e[e.NetworkAuthenticationRequired=511]="NetworkAuthenticationRequired",e}(x||{});function H(e,n){return{body:n,headers:e.headers,context:e.context,observe:e.observe,params:e.params,reportProgress:e.reportProgress,responseType:e.responseType,withCredentials:e.withCredentials,transferCache:e.transferCache}}let pe=(()=>{class e{constructor(t){this.handler=t}request(t,r,s={}){let o;if(t instanceof U)o=t;else{let c,d;c=s.headers instanceof m?s.headers:new m(s.headers),s.params&&(d=s.params instanceof M?s.params:new M({fromObject:s.params})),o=new U(t,r,void 0!==s.body?s.body:null,{headers:c,context:s.context,params:d,reportProgress:s.reportProgress,responseType:s.responseType||"json",withCredentials:s.withCredentials,transferCache:s.transferCache})}const i=(0,P.of)(o).pipe((0,E.concatMap)(c=>this.handler.handle(c)));if(t instanceof U||"events"===s.observe)return i;const l=i.pipe((0,E.filter)(c=>c instanceof N));switch(s.observe||"body"){case"body":switch(o.responseType){case"arraybuffer":return l.pipe((0,E.map)(c=>{if(null!==c.body&&!(c.body instanceof ArrayBuffer))throw new Error("Response is not an ArrayBuffer.");return c.body}));case"blob":return l.pipe((0,E.map)(c=>{if(null!==c.body&&!(c.body instanceof Blob))throw new Error("Response is not a Blob.");return c.body}));case"text":return l.pipe((0,E.map)(c=>{if(null!==c.body&&"string"!=typeof c.body)throw new Error("Response is not a string.");return c.body}));default:return l.pipe((0,E.map)(c=>c.body))}case"response":return l;default:throw new Error(`Unreachable: unhandled observe type ${s.observe}}`)}}delete(t,r={}){return this.request("DELETE",t,r)}get(t,r={}){return this.request("GET",t,r)}head(t,r={}){return this.request("HEAD",t,r)}jsonp(t,r){return this.request("JSONP",t,{params:(new M).append(r,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(t,r={}){return this.request("OPTIONS",t,r)}patch(t,r,s={}){return this.request("PATCH",t,H(s,r))}post(t,r,s={}){return this.request("POST",t,H(s,r))}put(t,r,s={}){return this.request("PUT",t,H(s,r))}static#e=this.\u0275fac=function(r){return new(r||e)(a.\u0275\u0275inject(R))};static#t=this.\u0275prov=a.\u0275\u0275defineInjectable({token:e,factory:e.\u0275fac})}return e})();const We=/^\)\]\}',?\n/;function ye(e){if(e.url)return e.url;const n="X-Request-URL".toLocaleLowerCase();return e.headers.get(n)}let $=(()=>{class e{constructor(){this.fetchImpl=(0,a.inject)($e,{optional:!0})?.fetch??fetch.bind(globalThis),this.ngZone=(0,a.inject)(a.NgZone)}handle(t){return new P.Observable(r=>{const s=new AbortController;return this.doRequest(t,s.signal,r).then(ee,o=>r.error(new I({error:o}))),()=>s.abort()})}doRequest(t,r,s){var o=this;return(0,C.c)(function*(){const i=o.createRequestInit(t);let l;try{const T=o.fetchImpl(t.urlWithParams,{signal:r,...i});(function Ge(e){e.then(ee,ee)})(T),s.next({type:b.Sent}),l=yield T}catch(T){return void s.error(new I({error:T,status:T.status??0,statusText:T.statusText,url:t.urlWithParams,headers:T.headers}))}const c=new m(l.headers),d=l.statusText,u=ye(l)??t.urlWithParams;let p=l.status,y=null;if(t.reportProgress&&s.next(new z({headers:c,status:p,statusText:d,url:u})),l.body){const T=l.headers.get("content-length"),h=[],f=l.body.getReader();let Z,g,w=0;const B=typeof Zone<"u"&&Zone.current;yield o.ngZone.runOutsideAngular((0,C.c)(function*(){for(;;){const{done:F,value:ce}=yield f.read();if(F)break;if(h.push(ce),w+=ce.length,t.reportProgress){g="text"===t.responseType?(g??"")+(Z??=new TextDecoder).decode(ce,{stream:!0}):void 0;const Be=()=>s.next({type:b.DownloadProgress,total:T?+T:void 0,loaded:w,partialText:g});B?B.run(Be):Be()}}}));const ae=o.concatChunks(h,w);try{const F=l.headers.get("Content-Type")??"";y=o.parseBody(t,ae,F)}catch(F){return void s.error(new I({error:F,headers:new m(l.headers),status:l.status,statusText:l.statusText,url:ye(l)??t.urlWithParams}))}}0===p&&(p=y?x.Ok:0),p>=200&&p<300?(s.next(new N({body:y,headers:c,status:p,statusText:d,url:u})),s.complete()):s.error(new I({error:y,headers:c,status:p,statusText:d,url:u}))})()}parseBody(t,r,s){switch(t.responseType){case"json":const o=(new TextDecoder).decode(r).replace(We,"");return""===o?null:JSON.parse(o);case"text":return(new TextDecoder).decode(r);case"blob":return new Blob([r],{type:s});case"arraybuffer":return r.buffer}}createRequestInit(t){const r={},s=t.withCredentials?"include":void 0;if(t.headers.forEach((o,i)=>r[o]=i.join(",")),r.Accept??="application/json, text/plain, */*",!r["Content-Type"]){const o=t.detectContentTypeHeader();null!==o&&(r["Content-Type"]=o)}return{body:t.serializeBody(),method:t.method,headers:r,credentials:s}}concatChunks(t,r){const s=new Uint8Array(r);let o=0;for(const i of t)s.set(i,o),o+=i.length;return s}static#e=this.\u0275fac=function(r){return new(r||e)};static#t=this.\u0275prov=a.\u0275\u0275defineInjectable({token:e,factory:e.\u0275fac})}return e})();class $e{}function ee(){}function me(e,n){return n(e)}function qe(e,n){return(t,r)=>n.intercept(t,{handle:s=>e(s,r)})}const te=new a.InjectionToken(""),X=new a.InjectionToken(""),ne=new a.InjectionToken(""),re=new a.InjectionToken("");function Ye(){let e=null;return(n,t)=>{null===e&&(e=((0,a.inject)(te,{optional:!0})??[]).reduceRight(qe,me));const r=(0,a.inject)(a.\u0275PendingTasks),s=r.add();return e(n,t).pipe((0,E.finalize)(()=>r.remove(s)))}}let ge,G=(()=>{class e extends R{constructor(t,r){super(),this.backend=t,this.injector=r,this.chain=null,this.pendingTasks=(0,a.inject)(a.\u0275PendingTasks);const s=(0,a.inject)(re,{optional:!0});this.backend=s??t}handle(t){if(null===this.chain){const s=Array.from(new Set([...this.injector.get(X),...this.injector.get(ne,[])]));this.chain=s.reduceRight((o,i)=>function Se(e,n,t){return(r,s)=>(0,a.runInInjectionContext)(t,()=>n(r,o=>e(o,s)))}(o,i,this.injector),me)}const r=this.pendingTasks.add();return this.chain(t,s=>this.backend.handle(s)).pipe((0,E.finalize)(()=>this.pendingTasks.remove(r)))}static#e=this.\u0275fac=function(r){return new(r||e)(a.\u0275\u0275inject(v),a.\u0275\u0275inject(a.EnvironmentInjector))};static#t=this.\u0275prov=a.\u0275\u0275defineInjectable({token:e,factory:e.\u0275fac})}return e})(),Qe=0;class Te{}function rt(){return"object"==typeof window?window:{}}let se=(()=>{class e{constructor(t,r){this.callbackMap=t,this.document=r,this.resolvedPromise=Promise.resolve()}nextCallback(){return"ng_jsonp_callback_"+Qe++}handle(t){if("JSONP"!==t.method)throw new Error("JSONP requests must use JSONP request method.");if("json"!==t.responseType)throw new Error("JSONP requests must use Json response type.");if(t.headers.keys().length>0)throw new Error("JSONP requests do not support headers.");return new P.Observable(r=>{const s=this.nextCallback(),o=t.urlWithParams.replace(/=JSONP_CALLBACK(&|$)/,`=${s}$1`),i=this.document.createElement("script");i.src=o;let l=null,c=!1;this.callbackMap[s]=y=>{delete this.callbackMap[s],l=y,c=!0};const d=()=>{i.parentNode&&i.parentNode.removeChild(i),delete this.callbackMap[s]};return i.addEventListener("load",y=>{this.resolvedPromise.then(()=>{d(),c?(r.next(new N({body:l,status:x.Ok,statusText:"OK",url:o})),r.complete()):r.error(new I({url:o,status:0,statusText:"JSONP Error",error:new Error("JSONP injected script did not invoke callback.")}))})}),i.addEventListener("error",y=>{d(),r.error(new I({error:y,status:0,statusText:"JSONP Error",url:o}))}),this.document.body.appendChild(i),r.next({type:b.Sent}),()=>{c||this.removeListeners(i),d()}})}removeListeners(t){ge??=this.document.implementation.createHTMLDocument(),ge.adoptNode(t)}static#e=this.\u0275fac=function(r){return new(r||e)(a.\u0275\u0275inject(Te),a.\u0275\u0275inject(k.DOCUMENT))};static#t=this.\u0275prov=a.\u0275\u0275defineInjectable({token:e,factory:e.\u0275fac})}return e})();function Ee(e,n){return"JSONP"===e.method?(0,a.inject)(se).handle(e):n(e)}let st=(()=>{class e{constructor(t){this.injector=t}intercept(t,r){return(0,a.runInInjectionContext)(this.injector,()=>Ee(t,s=>r.handle(s)))}static#e=this.\u0275fac=function(r){return new(r||e)(a.\u0275\u0275inject(a.EnvironmentInjector))};static#t=this.\u0275prov=a.\u0275\u0275defineInjectable({token:e,factory:e.\u0275fac})}return e})();const ot=/^\)\]\}',?\n/;let oe=(()=>{class e{constructor(t){this.xhrFactory=t}handle(t){if("JSONP"===t.method)throw new a.\u0275RuntimeError(-2800,!1);const r=this.xhrFactory;return(r.\u0275loadImpl?(0,P.from)(r.\u0275loadImpl()):(0,P.of)(null)).pipe((0,E.switchMap)(()=>new P.Observable(o=>{const i=r.build();if(i.open(t.method,t.urlWithParams),t.withCredentials&&(i.withCredentials=!0),t.headers.forEach((h,f)=>i.setRequestHeader(h,f.join(","))),t.headers.has("Accept")||i.setRequestHeader("Accept","application/json, text/plain, */*"),!t.headers.has("Content-Type")){const h=t.detectContentTypeHeader();null!==h&&i.setRequestHeader("Content-Type",h)}if(t.responseType){const h=t.responseType.toLowerCase();i.responseType="json"!==h?h:"text"}const l=t.serializeBody();let c=null;const d=()=>{if(null!==c)return c;const h=i.statusText||"OK",f=new m(i.getAllResponseHeaders()),w=function it(e){return"responseURL"in e&&e.responseURL?e.responseURL:/^X-Request-URL:/m.test(e.getAllResponseHeaders())?e.getResponseHeader("X-Request-URL"):null}(i)||t.url;return c=new z({headers:f,status:i.status,statusText:h,url:w}),c},u=()=>{let{headers:h,status:f,statusText:w,url:Z}=d(),g=null;f!==x.NoContent&&(g=typeof i.response>"u"?i.responseText:i.response),0===f&&(f=g?x.Ok:0);let B=f>=200&&f<300;if("json"===t.responseType&&"string"==typeof g){const ae=g;g=g.replace(ot,"");try{g=""!==g?JSON.parse(g):null}catch(F){g=ae,B&&(B=!1,g={error:F,text:g})}}B?(o.next(new N({body:g,headers:h,status:f,statusText:w,url:Z||void 0})),o.complete()):o.error(new I({error:g,headers:h,status:f,statusText:w,url:Z||void 0}))},p=h=>{const{url:f}=d(),w=new I({error:h,status:i.status||0,statusText:i.statusText||"Unknown Error",url:f||void 0});o.error(w)};let y=!1;const J=h=>{y||(o.next(d()),y=!0);let f={type:b.DownloadProgress,loaded:h.loaded};h.lengthComputable&&(f.total=h.total),"text"===t.responseType&&i.responseText&&(f.partialText=i.responseText),o.next(f)},T=h=>{let f={type:b.UploadProgress,loaded:h.loaded};h.lengthComputable&&(f.total=h.total),o.next(f)};return i.addEventListener("load",u),i.addEventListener("error",p),i.addEventListener("timeout",p),i.addEventListener("abort",p),t.reportProgress&&(i.addEventListener("progress",J),null!==l&&i.upload&&i.upload.addEventListener("progress",T)),i.send(l),o.next({type:b.Sent}),()=>{i.removeEventListener("error",p),i.removeEventListener("abort",p),i.removeEventListener("load",u),i.removeEventListener("timeout",p),t.reportProgress&&(i.removeEventListener("progress",J),null!==l&&i.upload&&i.upload.removeEventListener("progress",T)),i.readyState!==i.DONE&&i.abort()}})))}static#e=this.\u0275fac=function(r){return new(r||e)(a.\u0275\u0275inject(k.XhrFactory))};static#t=this.\u0275prov=a.\u0275\u0275defineInjectable({token:e,factory:e.\u0275fac})}return e})();const q=new a.InjectionToken(""),we="XSRF-TOKEN",Pe=new a.InjectionToken("",{providedIn:"root",factory:()=>we}),Re="X-XSRF-TOKEN",ve=new a.InjectionToken("",{providedIn:"root",factory:()=>Re});class S{}let be=(()=>{class e{constructor(t,r,s){this.doc=t,this.platform=r,this.cookieName=s,this.lastCookieString="",this.lastToken=null,this.parseCount=0}getToken(){if("server"===this.platform)return null;const t=this.doc.cookie||"";return t!==this.lastCookieString&&(this.parseCount++,this.lastToken=(0,k.\u0275parseCookieValue)(t,this.cookieName),this.lastCookieString=t),this.lastToken}static#e=this.\u0275fac=function(r){return new(r||e)(a.\u0275\u0275inject(k.DOCUMENT),a.\u0275\u0275inject(a.PLATFORM_ID),a.\u0275\u0275inject(Pe))};static#t=this.\u0275prov=a.\u0275\u0275defineInjectable({token:e,factory:e.\u0275fac})}return e})();function _e(e,n){const t=e.url.toLowerCase();if(!(0,a.inject)(q)||"GET"===e.method||"HEAD"===e.method||t.startsWith("http://")||t.startsWith("https://"))return n(e);const r=(0,a.inject)(S).getToken(),s=(0,a.inject)(ve);return null!=r&&!e.headers.has(s)&&(e=e.clone({headers:e.headers.set(s,r)})),n(e)}let Me=(()=>{class e{constructor(t){this.injector=t}intercept(t,r){return(0,a.runInInjectionContext)(this.injector,()=>_e(t,s=>r.handle(s)))}static#e=this.\u0275fac=function(r){return new(r||e)(a.\u0275\u0275inject(a.EnvironmentInjector))};static#t=this.\u0275prov=a.\u0275\u0275defineInjectable({token:e,factory:e.\u0275fac})}return e})();var O=function(e){return e[e.Interceptors=0]="Interceptors",e[e.LegacyInterceptors=1]="LegacyInterceptors",e[e.CustomXsrfConfiguration=2]="CustomXsrfConfiguration",e[e.NoXsrfProtection=3]="NoXsrfProtection",e[e.JsonpSupport=4]="JsonpSupport",e[e.RequestsMadeViaParent=5]="RequestsMadeViaParent",e[e.Fetch=6]="Fetch",e}(O||{});function j(e,n){return{\u0275kind:e,\u0275providers:n}}function Ne(...e){const n=[pe,oe,G,{provide:R,useExisting:G},{provide:v,useExisting:oe},{provide:X,useValue:_e,multi:!0},{provide:q,useValue:!0},{provide:S,useClass:be}];for(const t of e)n.push(...t.\u0275providers);return(0,a.makeEnvironmentProviders)(n)}function at(e){return j(O.Interceptors,e.map(n=>({provide:X,useValue:n,multi:!0})))}const Ie=new a.InjectionToken("");function Oe(){return j(O.LegacyInterceptors,[{provide:Ie,useFactory:Ye},{provide:X,useExisting:Ie,multi:!0}])}function ie({cookieName:e,headerName:n}){const t=[];return void 0!==e&&t.push({provide:Pe,useValue:e}),void 0!==n&&t.push({provide:ve,useValue:n}),j(O.CustomXsrfConfiguration,t)}function ke(){return j(O.NoXsrfProtection,[{provide:q,useValue:!1}])}function Ae(){return j(O.JsonpSupport,[se,{provide:Te,useFactory:rt},{provide:X,useValue:Ee,multi:!0}])}function ct(){return j(O.RequestsMadeViaParent,[{provide:v,useFactory:()=>(0,a.inject)(R,{skipSelf:!0,optional:!0})}])}function lt(){return j(O.Fetch,[$,{provide:v,useExisting:$},{provide:re,useExisting:$}])}let dt=(()=>{class e{static disable(){return{ngModule:e,providers:[ke().\u0275providers]}}static withOptions(t={}){return{ngModule:e,providers:ie(t).\u0275providers}}static#e=this.\u0275fac=function(r){return new(r||e)};static#t=this.\u0275mod=a.\u0275\u0275defineNgModule({type:e});static#n=this.\u0275inj=a.\u0275\u0275defineInjector({providers:[Me,{provide:te,useExisting:Me,multi:!0},{provide:S,useClass:be},ie({cookieName:we,headerName:Re}).\u0275providers,{provide:q,useValue:!0}]})}return e})(),ht=(()=>{class e{static#e=this.\u0275fac=function(r){return new(r||e)};static#t=this.\u0275mod=a.\u0275\u0275defineNgModule({type:e});static#n=this.\u0275inj=a.\u0275\u0275defineInjector({providers:[Ne(Oe())]})}return e})(),ut=(()=>{class e{static#e=this.\u0275fac=function(r){return new(r||e)};static#t=this.\u0275mod=a.\u0275\u0275defineNgModule({type:e});static#n=this.\u0275inj=a.\u0275\u0275defineInjector({providers:[Ae().\u0275providers]})}return e})();const De="b",xe="h",je="s",Fe="st",Le="u",Ue="rt",Y=new a.InjectionToken(""),ft=["GET","HEAD"];function pt(e,n){const{isCacheActive:t,...r}=(0,a.inject)(Y),{transferCache:s,method:o}=e;if(!t||"POST"===o&&!r.includePostRequests&&!s||"POST"!==o&&!ft.includes(o)||!1===s||!1===r.filter?.(e))return n(e);const i=(0,a.inject)(a.TransferState),l=function mt(e){const{params:n,method:t,responseType:r,url:s,body:o}=e,d=function gt(e){let n=0;for(const t of e)n=Math.imul(31,n)+t.charCodeAt(0)<<0;return n+=2147483648,n.toString()}([t,r,s,"string"==typeof o?o:"",n.keys().sort().map(u=>`${u}=${n.getAll(u)}`).join("&")].join("|"));return(0,a.makeStateKey)(d)}(e),c=i.get(l,null);let d=r.includeHeaders;if("object"==typeof s&&s.includeHeaders&&(d=s.includeHeaders),c){const{[De]:u,[Ue]:p,[xe]:y,[je]:J,[Fe]:T,[Le]:h}=c;let f=u;switch(p){case"arraybuffer":f=(new TextEncoder).encode(u).buffer;break;case"blob":f=new Blob([u])}let w=new m(y);return(0,P.of)(new N({body:f,headers:w,status:J,statusText:T,url:h}))}return n(e).pipe((0,E.tap)(u=>{u instanceof N&&i.set(l,{[De]:u.body,[xe]:yt(u.headers,d),[je]:u.status,[Fe]:u.statusText,[Le]:u.url||"",[Ue]:e.responseType})}))}function yt(e,n){if(!n)return{};const t={};for(const r of n){const s=e.getAll(r);null!==s&&(t[r]=s)}return t}function Tt(e){return[{provide:Y,useFactory:()=>((0,a.\u0275performanceMarkFeature)("NgHttpTransferCache"),{isCacheActive:!0,...e})},{provide:ne,useValue:pt,multi:!0,deps:[a.TransferState,Y]},{provide:a.APP_BOOTSTRAP_LISTENER,multi:!0,useFactory:()=>{const n=(0,a.inject)(a.ApplicationRef),t=(0,a.inject)(Y);return()=>{(0,a.\u0275whenStable)(n).then(()=>{t.isCacheActive=!1})}}}]}},1528:(Ce,V,_)=>{function C(P,E,k,R,v,m,L){try{var A=P[m](L),D=A.value}catch(Q){return void k(Q)}A.done?E(D):Promise.resolve(D).then(R,v)}function a(P){return function(){var E=this,k=arguments;return new Promise(function(R,v){var m=P.apply(E,k);function L(D){C(m,R,v,L,A,"next",D)}function A(D){C(m,R,v,L,A,"throw",D)}L(void 0)})}}_.d(V,{c:()=>a})}}]);