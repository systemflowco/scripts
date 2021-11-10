(()=>{class e{constructor(e){this.age=e,this.limit=+this.age.getAttribute("data-sysflow-age")||18,this.btn=this.age.querySelector("[data-sysflow-age-check]"),this.KEY_COOKIE="SYSFLOW.AGE",this.cookieStatus=localStorage.getItem(this.KEY_COOKIE),this.assignEvents()}assignEvents(){this.cookieStatus?this.hideAgeForm():this.showAgeForm()}showAgeForm(){setTimeout(()=>{this.age.style.opacity="100%"},100),this.btn.addEventListener("click",e=>{e.preventDefault(),this.verifyAge()})}hideAgeForm(){this.age.style.opacity="0%",setTimeout(()=>{this.age.remove()},200)}getData(){this.year=this.age.querySelector("[data-sysflow-age-year]")?+this.age.querySelector("[data-sysflow-age-year]").value:0,this.month=this.age.querySelector("[data-sysflow-age-month]")?+this.age.querySelector("[data-sysflow-age-month]").value:1,this.day=this.age.querySelector("[data-sysflow-age-day]")?+this.age.querySelector("[data-sysflow-age-day]").value:1}showError(e){const t=this.age.querySelector("[data-sysflow-age-error]");t&&(t.innerHTML=e||"Błąd",t.style.opacity="100%",setTimeout(()=>{t.style.opacity="0%"},3e3))}validateForm(){return this.year?this.year<1900||this.year>(new Date).getFullYear()?(this.showError("Niepoprawny rok urodzenia"),!1):this.month<1||this.month>12?(this.showError("Niepoprawny miesiąc"),!1):!(this.day<1||this.day>31)||(this.showError("Niepoprawny dzień"),!1):(this.showError("Podaj rok urodzenia"),!1)}calculateAge(){const e=new Date(this.year,this.month-1,this.day,1,1,1),t=new Date;let a=t.getFullYear()-e.getFullYear();const s=t.getMonth()-e.getMonth();return(s<0||0===s&&t.getDate()<e.getDate())&&a--,a}verifyAge(){this.getData(),this.validateForm()&&(this.calculateAge()>=this.limit?(localStorage.setItem(this.KEY_COOKIE,!0),this.hideAgeForm()):this.showError(`Nie masz ukończone ${this.limit} lat`))}}const t=document.querySelectorAll("[data-sysflow-age]");t&&t.forEach(t=>{new e(t)})})();