(()=>{class e{constructor(e){this.searchInput=e,this.container=this.searchInput.closest(".container"),this.cards=this.container.querySelectorAll(".card"),this.textSelectors="h1, h2, h3, h4, h5, h6, p",this.assignEvents()}assignEvents(){this.searchInput.addEventListener("keyup",this.searchResults.bind(this))}searchResults(){this.queryText=this.searchInput.value.toLowerCase(),this.queryText.length>0?this.cards.forEach(e=>{const t=e.textContent;t.toLowerCase().indexOf(this.queryText)>-1?(e.style.display="flex",this.showResult(e)):e.style.display="none"}):this.clearSearch()}showResult(e){const t=e.querySelectorAll(this.textSelectors);t.forEach(e=>{e.innerHTML=this.highlightText(e.innerText)})}hideResult(e){const t=e.querySelectorAll(this.textSelectors);t.forEach(e=>{e.innerHTML=e.innerText})}clearSearch(){this.cards.forEach(e=>{e.style.display="flex",this.hideResult(e)})}highlightText(e){const t=new RegExp(`(${this.queryText})`,"gi");return e.replace(t,"<span style='background: yellow'>$1</span>")}}const t=document.querySelectorAll("[data-sysflow-cards-search]");t&&t.forEach(t=>{new e(t)})})();