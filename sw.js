if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let l={};const o=e=>i(e,t),u={module:{uri:t},exports:l,require:o};s[t]=Promise.all(n.map((e=>u[e]||o(e)))).then((e=>(r(...e),l)))}}define(["./workbox-bc55f1ff"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"404.html",revision:"fe301a43239b82ee73f8ae2089b682e4"},{url:"assets/main.b559b648.js",revision:null},{url:"assets/main.ddbc56a5.css",revision:null},{url:"assets/Map.9eb150a8.css",revision:null},{url:"assets/Map.a2ec333a.js",revision:null},{url:"assets/vendor.ae9e4b3e.js",revision:null},{url:"index.html",revision:"67b3a32303e88f69706cb1c150a72c79"},{url:"registerSW.js",revision:"998d92cd25b034016efed01c48201eab"},{url:"manifest.webmanifest",revision:"73e991c727e316a3338dc01dc2e09859"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));