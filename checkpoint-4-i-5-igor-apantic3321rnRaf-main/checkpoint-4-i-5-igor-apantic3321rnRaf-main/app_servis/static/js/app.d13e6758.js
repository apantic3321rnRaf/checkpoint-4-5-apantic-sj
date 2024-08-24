(function(){var e={3703:function(){},5553:function(e,t,a){"use strict";var o=a(6369),n=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("nav",[t("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" | "),t("router-link",{attrs:{to:"/kategorije"}},[e._v("Kategorije")]),e._v(" | "),t("router-link",{attrs:{to:"/naruci"}},[e._v("Naruci")]),e.token?e._e():t("b-nav-item",{attrs:{to:"/register"}},[e._v("Register")]),e.token?t("b-nav-item",{on:{click:function(t){return e.logout()}}},[e._v("Log Out")]):t("b-nav-item",{attrs:{to:"/login"}},[e._v("Log In")])],1),t("div",{staticClass:"col-md-12 bg-light"}),t("router-view")],1)},r=[],s=a(3822),l={computed:{...(0,s.rn)(["token"])},methods:{...(0,s.OI)(["removeToken","setToken"]),logout(){this.removeToken()}},mounted(){localStorage.token&&this.setToken(localStorage.token)}},i=l,u=a(1001),d=(0,u.Z)(i,n,r,!1,null,null,null),c=d.exports,m=a(2631),p=function(){var e=this,t=e._self._c;return t("div",[t("img",{staticClass:"center",attrs:{alt:"Restaurant logo",src:a(6949)}}),t("Header",{attrs:{title:e.headerTitle}}),t("button",{on:{click:function(t){return e.prev()}}},[e._v("Prethodno")]),t("button",{on:{click:function(t){return e.next()}}},[e._v("Sledece")]),e.svaJelaIDs?t("JeloList",{attrs:{jelaIDs:e.svaJelaIDs.slice(10*e.current,10*e.current+10)}}):t("p",[e._v("Lista još nije spremna")])],1)},f=[],h=function(){var e=this,t=e._self._c;return t("div",{staticClass:"header"},[t("h1",[e._v(e._s(e.title))])])},v=[],g={name:"Header",props:{title:String}},b=g,k=a(3703),j=a.n(k),y=(0,u.Z)(b,h,v,!1,null,"053cd20f",null);"function"===typeof j()&&j()(y);var _=y.exports,J=function(){var e=this,t=e._self._c;return t("div",e._l(e.jela,(function(e){return t("JeloSingle",{key:e.id,attrs:{jelo:e}})})),1)},T=[],S=(a(560),function(){var e=this,t=e._self._c;return t("div",{staticClass:"jelo",on:{click:function(t){return e.kliknutoJelo(e.jelo.id)}}},[t("div",{staticClass:"img-wrapper"},[t("img",{staticClass:"blur",attrs:{src:`/jela/${e.jelo.id}.png`,alt:"Nema slike"}}),t("div",{staticClass:"content fade"},[e._v(" Klikni za detalje ")])]),t("h3",[e._v(e._s(e.jelo.naziv))])])}),w=[],x={name:"JeloSingle",props:{jelo:Object},methods:{checkImageExists(e){const t=new Image;return t.src=e,t.complete&&0!==t.naturalWidth},kliknutoJelo(e){this.$router.push({name:"Jelo",params:{id:e}})}}},I=x,P=(0,u.Z)(I,S,w,!1,null,"e955287e",null),C=P.exports,z={name:"JeloList",components:{JeloSingle:C},data(){return{jela:[]}},props:{jelaIDs:{type:Array}},methods:{...(0,s.nv)(["getJelo"])},mounted(){console.log("Usao sam u mount za JeloList"),this.jelaIDs&&this.jelaIDs.map((e=>{this.getJelo(e.id).then((e=>this.jela.push(e))),console.log("jela: "),console.log(e)}))},watch:{jelaIDs(e){console.log("Nval je: "+e),this.jela=[],e&&(e.map((e=>{this.getJelo(e.id).then((e=>this.jela.push(e)))})),console.log("NVal: "+JSON.stringify(e)))}}},O=z,E=(0,u.Z)(O,J,T,!1,null,"5a101a89",null),L=E.exports,$={name:"App",components:{Header:_,JeloList:L},data(){return{headerTitle:"Restoran",current:0}},computed:{...(0,s.rn)(["svaJelaIDs"])},methods:{...(0,s.nv)(["fetchSvaJela"]),next(){10*this.current<this.svaJelaIDs.length&&this.current++},prev(){this.current>0&&this.current--}},mounted(){this.fetchSvaJela()}},H=$,N=(0,u.Z)(H,p,f,!1,null,null,null),A=N.exports,D=function(){var e=this,t=e._self._c;return t("div",[t("img",{staticClass:"center",attrs:{alt:"Restaurant logo",src:a(6949)}}),t("Header",{attrs:{title:e.headerTitle}}),t("hr"),e.jelo?t("div",[t("div",{staticClass:"jelo"},[t("Header",{attrs:{title:e.jelo.naziv}}),t("div",{staticClass:"info"},[t("img",{staticClass:"slika",attrs:{src:`/jela/${e.jelo.id}.png`,alt:"Nema slike"}}),t("div",{staticClass:"opis"},[t("h2",[e._v("Opis")]),t("p",[e._v(e._s(e.jelo.opis))]),t("h2",[e._v("Cena")]),t("p",[e._v(e._s(e.jelo.cena)+"rsd")])])])],1)]):t("div",[e._v(" Loading... ")])],1)},K=[],B={name:"Jelo",components:{Header:_},data(){return{headerTitle:"Restoran",jelo:null}},methods:{...(0,s.nv)(["getJelo"])},mounted(){this.getJelo(this.$route.params.id).then((e=>{this.jelo=e}))}},Z=B,q=(0,u.Z)(Z,D,K,!1,null,"6db7dd92",null),R=q.exports,M=function(){var e=this,t=e._self._c;return t("div",[t("Header",{attrs:{title:"Kategorije jela"}}),t("b-pagination",{attrs:{"per-page":e.perPage,"total-rows":this.kategorije.length,"aria-controls":"tabelaKategorije"},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}}),t("b-table",{attrs:{striped:"",hover:"",items:this.kategorije,fields:e.fields,"per-page":e.perPage,"current-page":e.currentPage,id:"tabelaKategorije"},scopedSlots:e._u([{key:"cell(logo)",fn:function(e){return[t("img",{attrs:{src:`/kategorije/${e.item.id}.png`}})]}}])})],1)},G=[],U={name:"Kategorije",components:{Header:_},computed:{...(0,s.rn)(["kategorije"])},methods:{...(0,s.nv)(["fetchKategorije"])},data(){return{perPage:5,currentPage:1,fields:[{key:"naziv",sortable:!0,label:"Kompanija"},{key:"logo",label:""}]}},mounted(){this.fetchKategorije()}},W=U,X=(0,u.Z)(W,M,G,!1,null,null,null),F=X.exports,V=function(){var e=this,t=e._self._c;return t("div",[t("Header",{attrs:{title:e.headerTitle}}),t("b-alert",{attrs:{variant:e.statusnaPorukaTip,show:null!=e.statusnaPoruka}},[e._v(" "+e._s(e.statusnaPoruka)+" ")]),t("div",[t("b-container",{staticStyle:{padding:"5px",margin:"5px"},attrs:{fluid:""}},[t("b-row",[t("b-col",{attrs:{sm:"3"}},[t("label",{attrs:{for:"adresa"}},[e._v("Adresa")])]),t("b-col",{attrs:{sm:"9"}},[t("b-form-input",{attrs:{id:"adresa",state:e.validnaAdresa},model:{value:e.forma.adresa,callback:function(t){e.$set(e.forma,"adresa",t)},expression:"forma.adresa"}})],1)],1),t("b-row",[t("b-col",{attrs:{sm:"3"}},[t("label",[e._v("Telefon")])]),t("b-col",{attrs:{sm:"9"}},[t("b-form-input",{attrs:{id:"telefon",type:"number",state:e.validanTelefon},model:{value:e.forma.telefon,callback:function(t){e.$set(e.forma,"telefon",t)},expression:"forma.telefon"}})],1)],1),t("b-row",[t("b-col",{attrs:{sm:"3"}},[t("label",[e._v("Ime i prezime")])]),t("b-col",{attrs:{sm:"9"}},[t("b-form-input",{attrs:{id:"ime_prezime",state:e.validnoIme},model:{value:e.forma.ime_prezime,callback:function(t){e.$set(e.forma,"ime_prezime",t)},expression:"forma.ime_prezime"}})],1)],1),t("b-row",[t("b-col",{attrs:{sm:"3"}},[t("label",{attrs:{for:"spisakJela"}},[e._v("Jela:")])]),t("b-col",{attrs:{sm:"3"}},[t("select",{staticClass:"form-select",attrs:{id:"spisakJela"}},[t("option")])])],1),t("b-row",[t("b-col",{attrs:{sm:"3"}},[t("label",{attrs:{for:"kolicina"}},[e._v("Kolicina:")])]),t("b-col",{attrs:{sm:"1"}},[t("b-form-input",{staticClass:"form-control",staticStyle:{"max-width":"100px"},attrs:{type:"number",min:"0",step:"1",required:"",id:"kolicina",name:"kolicina"}})],1),t("b-col",{attrs:{sm:"1"}},[t("b-button",{staticClass:"btn btn-success",attrs:{type:"button"},on:{click:e.dodajUSpisak}},[e._v("+")])],1)],1)],1),t("div",{attrs:{id:"stavka"}}),t("b-button",{attrs:{variant:"primary"},on:{click:function(t){return e.posalji()}}},[e._v("Posalji")]),t("input",{attrs:{type:"hidden",name:"jela",id:"jela-input"}})],1)],1)},Q=[],Y={name:"App",components:{Header:_,JeloList:L},data(){return{headerTitle:"Narudzbina",statusnaPoruka:null,statusnaPorukaTip:null,forma:{adresa:null,telefon:null,ime_prezime:null}}},computed:{...(0,s.rn)(["token"]),validnoIme(){return null==this.forma.ime_prezime?null:this.forma.ime_prezime.length>2},validanTelefon(){return null==this.forma.telefon?null:this.forma.telefon.length>9},validnaAdresa(){return null==this.forma.adresa?null:this.forma.adresa.length>2}},methods:{dodajJelo(e,t){document.getElementById("spisakJela").selectedIndex=0,console.log("Select Dropdown Options:",document.getElementById("spisakJela").innerHTML);var a=document.querySelector(`#spisakJela > option[value='${e}']`).innerHTML,o=document.createElement("span");o.classList.add("badge"),o.classList.add("bg-secondary"),o.dataset.id=e,o.dataset.kolicina=t,o.innerHTML=a+" "+t,console.log("Kliknuo si +");var n=document.createElement("button");n.type="button",n.classList.add("btn"),n.classList.add("btn-default"),n.classList.add("btn-sm"),n.innerHTML="X",o.appendChild(n),document.getElementById("stavka").appendChild(o),document.getElementById("stavka").appendChild(document.createTextNode(" ")),n.addEventListener("click",(function(){var e=this.parentNode.dataset.id;this.parentNode.parentNode.removeChild(this.parentNode),document.querySelector(`#spisakJela > option[value='${e}']`).disabled=!1;var t=document.querySelectorAll("#stavka > span.badge"),a=Array.from(t).map((e=>({id:e.dataset.id,kolicina:e.dataset.kolicina}))),o=JSON.stringify(a);console.log(o),document.getElementById("jela-input").value=o}));var r=document.querySelectorAll("#stavka > span.badge"),s=[];for(let i=0;i<r.length;i++)s.push(r[i].dataset.id);var l=JSON.stringify(s);document.getElementById("jela-input").value=l},dodajUSpisak(){var e=document.getElementById("spisakJela").value,t=document.getElementById("kolicina").value;e?this.dodajJelo(e,t):alert("Izaberi sastojak")},posalji(){if(this.validnoIme&&this.validanTelefon&&this.validnaAdresa){console.log(JSON.stringify(this.forma));var e={status:"Novo"},t=new Date;e.vreme_narucivanja=t,e.ime_prezime=this.forma.ime_prezime,e.telefon=this.forma.telefon,e.adresa=this.forma.adresa;var a=[];Array.from(document.querySelectorAll("#stavka > span.badge")).forEach((e=>{var t={jelo_id:e.dataset.id,komada:e.dataset.kolicina};a.push(t)})),console.log(a),e.stavke=a,fetch("http://localhost:9000/narudzbina/nova-narudzbina",{headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.token}`},method:"POST",body:JSON.stringify(e)}).then((e=>e.json())).then((e=>{console.log(e),e.error?(this.statusnaPoruka=e.error,this.statusnaPorukaTip="danger"):(this.statusnaPoruka="Narudzbina je uspesno poslata",this.statusnaPorukaTip="success")}))}}},mounted(){console.log(this.token),fetch("http://localhost:9000/jelo/",{method:"GET",headers:{Authorization:`Bearer ${this.token}`,"Content-Type":"application/json"}}).then((e=>e.json())).then((e=>{for(let t=0;t<e.length;t++){let a=document.createElement("option");a.value=e[t].id,a.innerHTML=e[t].naziv,document.getElementById("spisakJela").appendChild(a)}})).catch((e=>console.log(e)))}},ee=Y,te=(0,u.Z)(ee,V,Q,!1,null,null,null),ae=te.exports,oe=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("Header",{attrs:{title:"Log In"}}),t("b-form",{on:{submit:e.onSubmit}},[t("b-form-group",{attrs:{label:"User Name:","label-for":"username"}},[t("b-form-input",{attrs:{id:"username",placeholder:"Enter username",required:""},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),t("b-form-group",{attrs:{label:"Password:","label-for":"password"}},[t("b-form-input",{attrs:{id:"password",type:"password",required:""},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),t("b-button",{attrs:{type:"submit",variant:"primary"}},[e._v("Login")])],1)],1)},ne=[],re={name:"Login",components:{Header:_},data(){return{form:{username:"",password:""}}},methods:{...(0,s.nv)(["login"]),onSubmit(e){e.preventDefault(),this.login(this.form),this.$router.push({name:"Home"})}}},se=re,le=(0,u.Z)(se,oe,ne,!1,null,"5945a5a9",null),ie=le.exports,ue=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("Header",{attrs:{subtitle:"Create account"}}),t("b-form",{on:{submit:e.onSubmit}},[t("b-form-group",{attrs:{label:"Email address:","label-for":"email"}},[t("b-form-input",{attrs:{id:"email",type:"email",placeholder:"Enter email",required:""},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),t("b-form-group",{attrs:{label:"User Name:","label-for":"username"}},[t("b-form-input",{attrs:{id:"username",placeholder:"Enter username",required:""},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),t("b-form-group",{attrs:{label:"Password:","label-for":"password"}},[t("b-form-input",{attrs:{id:"password",type:"password",required:""},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1),t("b-button",{attrs:{type:"submit",variant:"primary"}},[e._v("Register")])],1)],1)},de=[],ce={name:"Register",components:{Header:_},data(){return{form:{email:"",name:"",password:""}}},methods:{...(0,s.nv)(["register"]),onSubmit(e){e.preventDefault(),this.register(this.form),this.$router.push({name:"Home"})}}},me=ce,pe=(0,u.Z)(me,ue,de,!1,null,"c034268e",null),fe=pe.exports;o["default"].use(m.ZP);const he=[{path:"/",name:"Home",component:A},{path:"/jelo/:id",name:"Jelo",component:R},{path:"/kategorije",name:"Kategorije",component:F},{path:"/naruci",name:"Narudzbina",component:ae},{path:"/login",name:"Login",component:ie},{path:"/register",name:"Register",component:fe}],ve=new m.ZP({mode:"history",base:"/",routes:he});var ge=ve;o["default"].use(s.ZP);var be=new s.ZP.Store({state:{headerTitle:"Restoran",jela:[],kategorije:[],svaJelaIDs:[],token:""},getters:{},mutations:{addKategorije(e,t){e.kategorije=t},addJela(e,t){e.jela[t.id]=t},addSvaJelaIDs(e,t){e.svaJelaIDs=t},setToken(e,t){t.startsWith("token=")||(t="token="+t),e.token=t,localStorage.token=t,console.log(t)},removeToken(e){e.token="",localStorage.token=""}},actions:{fetchKategorije({commit:e,state:t}){return fetch("http://localhost:9000/kategorija/",{method:"GET",headers:{Authorization:`Bearer ${t.token}`,"Content-Type":"application/json"}}).then((e=>e.json())).then((t=>{console.log(t),e("addKategorije",t)})).catch((e=>{console.error("Error fetching data:",e)}))},async getJelo({commit:e,state:t},a){return new Promise(((o,n)=>{t.jela[a]?o(t.jela[a]):fetch(`http://localhost:9000/jelo/${a}`,{method:"GET",headers:{Authorization:`Bearer ${t.token}`,"Content-Type":"application/json"}}).then((e=>e.json())).then((t=>{console.log(t),e("addJela",t),o(t)}))}))},async fetchSvaJela({commit:e,state:t}){fetch("http://localhost:9000/jelo",{method:"GET",headers:{Authorization:`Bearer ${t.token}`,"Content-Type":"application/json"}}).then((e=>e.json())).then((t=>e("addSvaJelaIDs",t)))},register({commit:e},t){fetch("http://127.0.0.1:9001/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((e=>e.json())).then((t=>e("setToken",t.token)))},login({commit:e},t){fetch("http://127.0.0.1:9001/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((e=>e.json())).then((t=>{t.msg?alert(t.msg):e("setToken",t.token)}))}},modules:{}}),ke=a(6681),je=a(9425);a(7024);o["default"].use(ke.XG7),o["default"].use(je.A7),o["default"].config.productionTip=!1,new o["default"]({router:ge,store:be,render:e=>e(c)}).$mount("#app")},6949:function(e,t,a){"use strict";e.exports=a.p+"img/logo.5fc45333.png"}},t={};function a(o){var n=t[o];if(void 0!==n)return n.exports;var r=t[o]={exports:{}};return e[o].call(r.exports,r,r.exports,a),r.exports}a.m=e,function(){var e=[];a.O=function(t,o,n,r){if(!o){var s=1/0;for(d=0;d<e.length;d++){o=e[d][0],n=e[d][1],r=e[d][2];for(var l=!0,i=0;i<o.length;i++)(!1&r||s>=r)&&Object.keys(a.O).every((function(e){return a.O[e](o[i])}))?o.splice(i--,1):(l=!1,r<s&&(s=r));if(l){e.splice(d--,1);var u=n();void 0!==u&&(t=u)}}return t}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[o,n,r]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var o in t)a.o(t,o)&&!a.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.p="/"}(),function(){var e={143:0};a.O.j=function(t){return 0===e[t]};var t=function(t,o){var n,r,s=o[0],l=o[1],i=o[2],u=0;if(s.some((function(t){return 0!==e[t]}))){for(n in l)a.o(l,n)&&(a.m[n]=l[n]);if(i)var d=i(a)}for(t&&t(o);u<s.length;u++)r=s[u],a.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return a.O(d)},o=self["webpackChunkvezba4vue"]=self["webpackChunkvezba4vue"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=a.O(void 0,[998],(function(){return a(5553)}));o=a.O(o)})();
//# sourceMappingURL=app.d13e6758.js.map