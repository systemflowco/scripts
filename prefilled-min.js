(()=>{class a{constructor(a){this.query=[],a&&this.parse(a)}parse(a){const b=("?"===a.charAt(0)?a.slice(1):a).split("&");b.forEach(a=>{const[b,c]=a.split("=");this.set(b,decodeURIComponent(c))})}get(a){const b=this.query.find(({key:b})=>b===a);return b?b.value:null}set(a,b){this.remove(a),this.query.push({key:a,value:b})}remove(a){this.query=this.query.filter(({key:b})=>b!==a)}}const b=document.querySelector("[data-sysflow-form-prefill]");if(console.log(b),b){const c=new a(window.location.search);console.log(c);const d=b.querySelectorAll("input");console.log(d),d.forEach(a=>{console.log(a.id);const b=a.id;console.log(b);const d=c.get(b);console.log(d),d&&(a.value=d)})}})();