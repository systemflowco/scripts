//SYSTEM FLOW Age Verification
(() => {
    class SFLibrary {
        constructor() {
            this.copyBtns = document.querySelectorAll("[data-copy-btn]");

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
            const name = component.querySelector("[data-name]");
            const slug = component.querySelector("[data-slug]");
            console.log(name);
            console.log(slug);
        }
    }
    document.addEventListener("DOMContentLoaded", function (event) {
        new SFLibrary();
    });
})();
