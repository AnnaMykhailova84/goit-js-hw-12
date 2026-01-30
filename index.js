import{a as p,S as y,i as g}from"./assets/vendor-dgoA7Xew.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const h="54418567-38d23a8e17a003c539283c0a3",L="https://pixabay.com/api/";function S(o){return p.get(L,{params:{key:h,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(t=>t.data)}const l=document.querySelector(".gallery"),c=document.querySelector(".loader"),b=new y(".gallery a",{captionsData:"alt",captionDelay:250});function q(o){const t=o.map(({webformatURL:s,largeImageURL:i,tags:e,likes:r,views:a,comments:d,downloads:m})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${i}">
          <img class="gallery-image" src="${s}" alt="${e}" loading="lazy" />
          <ul class="gallery-img-info">
            <li>Likes<span class="js-info">${r}</span></li>
            <li>Views<span class="js-info">${a}</span></li>
            <li>Comments<span class="js-info">${d}</span></li>
            <li>Downloads<span class="js-info">${m}</span></li>
          </ul>
        </a>
      </li>
    `).join("");l.insertAdjacentHTML("beforeend",t),b.refresh()}function u(){l.innerHTML=""}function $(){c.classList.remove("hidden")}function j(){c.classList.add("hidden")}const f=document.querySelector(".form");f.addEventListener("submit",w);function w(o){o.preventDefault();const t=o.currentTarget.elements["search-text"].value.trim();t&&(u(),$(),S(t).then(s=>{if(s.hits.length===0){n();return}q(s.hits)}).catch(s=>{console.error(s),n()}).finally(()=>{j()}),f.reset())}function n(){u(),g.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",close:!1,progressBar:!1,timeout:"3000",messageSize:"16"})}
//# sourceMappingURL=index.js.map
