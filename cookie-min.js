(()=>{const a=document.querySelector("[data-sysflow-cookie]");a&&new class a{constructor(a){this.KEY_COOKIE="SYSFLOW.COOKIE",this.cookie=a,this.url=a.dataset.sysflowCookie,this.acceptBtn=this.cookie.querySelector("[data-sysflow-cookie-accept]"),this.cookieStatus=localStorage.getItem(this.KEY_COOKIE),this.assignEvents()}assignEvents(){this.cookieStatus?this.removeCookie():this.appendCookie()}appendCookie(){setTimeout(()=>{this.cookie.classList.remove("invisible")},100),this.acceptBtn.addEventListener("click",this.acceptCookie.bind(this))}removeCookie(){this.cookie.style.display="none"}acceptCookie(){localStorage.setItem(this.KEY_COOKIE,!0),this.removeCookie(),"0"!==this.url&&"false"!==this.url&&this.sendWebhook()}sendWebhook(){const a={location:window.location.href},b=new XMLHttpRequest;b.open("POST",this.url,!0),b.setRequestHeader("Content-type","application/json"),b.send(JSON.stringify(a))}}(a)})();