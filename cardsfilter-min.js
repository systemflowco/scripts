(()=>{class e{constructor(e){this.filter=e,this.container=this.filter.closest(".container"),this.cards=this.container?this.container.querySelectorAll(".card"):null,this.filterBy="0"==this.filter.dataset.sysflowCardsFilter?".tagline":this.filter.dataset.sysflowCardsFilter,this.taglines=this.container?this.container.querySelectorAll(this.filterBy):null,this.tags=this.filter.querySelector("[data-sysflow-multiple-tags]"),this.list=this.filter.querySelector("[data-sysflow-multiple-list]"),this.placeholder=this.filter.querySelector("[data-sysflow-multiple-placeholder]"),this.placeholderText=this.placeholder?this.placeholder.innerText:"",this.selected=[],this.assignEvents()}assignEvents(){this.clearTags(),this.cards&&this.taglines&&this.createList()}createList(){this.list.innerHTML="";const e=[...this.taglines].map(e=>e.innerText),t=[...new Set(e)];t.forEach((e,t)=>{this.list.innerHTML+=`<div class="dropdown-menu-item w-dropdown-link" data-index="${t}">${e}</div>`}),[...this.list.children].forEach((e,t)=>{e.addEventListener("click",s=>{this.toggleOption(e,t)})})}clearTags(){this.tags.innerHTML=""}clearPlaceholder(){this.placeholder&&(this.placeholder.innerText="")}showPlaceholder(){this.placeholder&&(this.placeholder.innerText=this.placeholderText)}toggleOption(e,t){const s=e.innerText;this.selected.indexOf(s)>-1?(this.selected.splice(this.selected.indexOf(s),1),e.classList.remove("selected"),this.removeFromTags(t)):(this.selected.push(s),e.classList.add("selected"),this.addToTags(e,t),this.clearPlaceholder()),this.filterResults()}removeFromTags(e){this.tags.querySelector(`[data-index="${e}"]`).remove()}addToTags(e,t){let s=document.createElement("div");s.classList.add("tag"),s.setAttribute("data-index",t),s.innerHTML=`${e.innerText} <span class="material-icons icon-right">close</span>`,s.addEventListener("click",s=>{s.stopPropagation(),s.preventDefault(),this.toggleOption(e,t)},!0),["momusedown","mouseup"].forEach(e=>s.addEventListener(e,e=>{e.stopPropagation(),e.preventDefault()},!0)),this.tags.append(s)}filterResults(){this.selected.length>0?this.cards.forEach(e=>{const t=e.querySelector(this.filterBy).innerText;this.selected.indexOf(t)>-1?(delete e.dataset.filterHide,e.dataset.searchHide||(e.style.display="flex")):(e.style.display="none",e.dataset.filterHide=!0)}):this.clearFilter()}clearFilter(){this.cards.forEach(e=>{e.dataset.filterHide&&(delete e.dataset.filterHide,e.dataset.searchHide||(e.style.display="flex"))}),this.showPlaceholder()}}document.addEventListener("DOMContentLoaded",function(t){const s=document.querySelectorAll("[data-sysflow-cards-filter]");s&&s.forEach(t=>{new e(t)})})})();