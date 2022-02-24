//SYSTEM FLOW Age Verification
(() => {
    class SFLibrary {
        constructor() {
            this.copyBtns = document.querySelectorAll("[data-copy-btn]");
            this.banner = document.querySelector("[data-banner]");
            this.assignEvents();
        }

        assignEvents() {
            if (this.copyBtns.length) {
                this.copyBtns.forEach((btn) => {
                    btn.addEventListener("click", this.copyComponent.bind(this, btn));
                });
            }
        }

        copyComponent(btn) {
            const component = btn.closest("[data-component]");
            const name = component.querySelector("[data-name]").innerText;
            const slug = component.querySelector("[data-slug]").innerText;
            this.showBanner(name);
        }

        showBanner(name) {
            this.banner.innerText = `Component ${name} copied successfully`;
            this.banner.style.display = "flex";
            setTimeout(() => {
                this.banner.style.display = "none";
            }, 3000);
        }
    }
    document.addEventListener("DOMContentLoaded", function (event) {
        new SFLibrary();
    });
})();
