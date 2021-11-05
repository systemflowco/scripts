//SYSTEM FLOW Age Verification
(() => {
    class AgeVerifications {
        constructor(elem) {
            this.age = elem;
            this.limit = +this.age.getAttribute("data-sysflow-age") || 18;
            this.btn = this.age.querySelector("[data-sysflow-age-check]");

            this.assignEvents();
        }

        assignEvents() {
            this.btn.addEventListener("click", (e) => {
                e.preventDefault();
                this.verifyAge();
            });
        }

        getData() {
            this.year = this.age.querySelector("[data-sysflow-age-year]")
                ? +this.age.querySelector("[data-sysflow-age-year]").value
                : 0;
            this.month = this.age.querySelector("[data-sysflow-age-month]")
                ? +this.age.querySelector("[data-sysflow-age-month]").value
                : 1;
            this.day = this.age.querySelector("[data-sysflow-age-day]")
                ? +this.age.querySelector("[data-sysflow-age-day]").value
                : 1;
        }

        showError(msg) {
            const error = this.age.querySelector("[data-sysflow-age-error]");
            if (error) {
                error.innerHTML = msg || "Błąd";
                error.style.visibility = "visible";

                setTimeout(() => {
                    error.style.visibility = "hidden";
                }, 3000);
            }
        }

        validateForm() {
            if (!this.year) {
                this.showError("Podaj rok urodzenia");
                return false;
            }
            if (this.year < 1900 || this.year > new Date().getFullYear()) {
                this.showError("Niepoprawny rok urodzenia");
                return false;
            }
            if (this.month < 1 || this.month > 12) {
                this.showError("Niepoprawny miesiąc");
                return false;
            }
            if (this.day < 1 || this.day > 31) {
                this.showError("Niepoprawny dzień");
                return false;
            }
            return true;
        }

        calculateAge() {
            const birth = new Date(this.year, this.month - 1, this.day, 1, 1, 1);

            const today = new Date();
            let ageCalc = today.getFullYear() - birth.getFullYear();
            const m = today.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                ageCalc--;
            }
            return ageCalc;
        }

        verifyAge() {
            console.log("jestem");
            this.getData();
            console.log(this.year);
            if (this.validateForm()) {
                if (this.calculateAge() >= this.limit) {
                    this.age.remove();
                } else {
                    this.showError(`Nie masz ukończone ${this.limit} lat`);
                }
            }
        }
    }

    const ageVerifications = document.querySelectorAll("[data-sysflow-age]");

    if (ageVerifications) {
        ageVerifications.forEach((ageVerification) => {
            new AgeVerifications(ageVerification);
        });
    }
})();
