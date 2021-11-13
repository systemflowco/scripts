//SYSTEM FLOW Age Verification
(() => {
    class AgeVerifications {
        constructor(elem) {
            this.age = elem;
            this.limit = +this.age.getAttribute("data-sysflow-age") || 18;
            this.btn = this.age.querySelector("[data-sysflow-age-check]");
            this.KEY_COOKIE = "SYSFLOW.AGE";
            this.cookieStatus = localStorage.getItem(this.KEY_COOKIE);

            this.assignEvents();
        }

        assignEvents() {
            if (!this.cookieStatus) {
                this.showAgeForm();
            } else {
                this.hideAgeForm();
            }
        }

        showAgeForm() {
            setTimeout(() => {
                this.age.style.opacity = "100%";
            }, 100);

            this.btn.addEventListener("click", (e) => {
                e.preventDefault();
                this.verifyAge();
            });
        }

        hideAgeForm() {
            this.age.style.opacity = "0%";
            setTimeout(() => {
                this.age.remove();
            }, 200);
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
                error.innerHTML = msg || "Error";
                error.style.opacity = "100%";

                setTimeout(() => {
                    error.style.opacity = "0%";
                }, 3000);
            }
        }

        validateForm() {
            if (!this.year) {
                this.showError("Provide year");
                return false;
            }
            if (this.year < 1900 || this.year > new Date().getFullYear()) {
                this.showError("Incorrect year");
                return false;
            }
            if (this.month < 1 || this.month > 12) {
                this.showError("Incorrect month");
                return false;
            }
            if (this.day < 1 || this.day > 31) {
                this.showError("Incorrect day");
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
            this.getData();
            if (this.validateForm()) {
                if (this.calculateAge() >= this.limit) {
                    localStorage.setItem(this.KEY_COOKIE, true);
                    this.hideAgeForm();
                } else {
                    this.showError(`You are under ${this.limit} years old`);
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
