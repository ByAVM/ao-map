import{a as h,o as i,c as f,r as l,p as u,b as p,d as g,e as y,f as L,g as $,h as k,i as P,j as x}from"./vendor.ae9e4b3e.js";const E=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}};E();const c=h.create({baseURL:"/ao-map/"});c.interceptors.request.use(t=>t,t=>(console.error(t),Promise.reject(t)));c.interceptors.response.use(t=>t.data,t=>(console.error(t),Promise.reject(t)));const d={getLocations:()=>c.get("resources/data/locations.json"),getIcons:()=>c.get("resources/data/icons.json"),getDetails:t=>c.get(`resources/data/details/${t}.json`)},q=t=>`/ao-map/resources/maps/${t}`,B=t=>`/ao-map/resources/markers/${t}`;var b=(t,s)=>{const n=t.__vccOpts||t;for(const[r,e]of s)n[r]=e;return n};const O={},j={class:"app-spiner"};function A(t,s){return i(),f("div",j,"Loading..")}var R=b(O,[["render",A],["__scopeId","data-v-afde4084"]]);const S={key:1,class:"app-loading"},w={setup(t){const s=l(null),n=l(null);return u("icons",p(s)),u("locations",p(n)),g(()=>{Promise.all([d.getIcons(),d.getLocations()]).then(([r,e])=>{s.value=r,n.value=e}).catch(()=>{})}),(r,e)=>{const o=$("router-view");return s.value&&n.value?(i(),y(o,{key:0})):(i(),f("div",S,[L(R)]))}}};const I="modulepreload",_={},C="/ao-map/",M=function(s,n){return!n||n.length===0?s():Promise.all(n.map(r=>{if(r=`${C}${r}`,r in _)return;_[r]=!0;const e=r.endsWith(".css"),o=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${o}`))return;const a=document.createElement("link");if(a.rel=e?"stylesheet":I,e||(a.as="script",a.crossOrigin=""),a.href=r,document.head.appendChild(a),e)return new Promise((m,v)=>{a.addEventListener("load",m),a.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>s())},N=k({history:P("/ao-map/"),routes:[{path:"/:location",name:"map",component:()=>M(()=>import("./Map.a2ec333a.js"),["assets/Map.a2ec333a.js","assets/Map.9eb150a8.css","assets/vendor.ae9e4b3e.js"]),props:!0},{path:"/:pathMatch(.*)*",name:"not-found",redirect:"/svetolesye"}]});x(w).use(N).mount("#app");export{b as _,q as a,d as c,B as g};