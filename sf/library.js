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
            const link = `https://systemflowco.github.io/scripts/sf13/${slug}.json`;
            const btnText = btn.querySelector(".button-text");

            btnText.innerText = "Coping ...";

            fetch(link)
                .then((response) => {
                    if (!response.ok)
                        return new Promise((resolve, reject) => reject(response.text()));
                    return response.text();
                })
                .then((data) => {
                    window.addEventListener("copy", this.copyJson.bind(this));
                    window.wfCopyJsonData = data;
                    document.execCommand("copy");
                })
                .catch((error) => {
                    this.showBanner("Something went wrong. Please refresh browser and try again!");
                })
                .finally(() => {
                    btnText.innerText = "Copy";
                    this.showBanner(`Component ${name} copied successfully`);
                });
        }

        copyJson(e) {
            if (e && e.clipboardData) {
                e.clipboardData.setData("application/json", window.wfCopyJsonData);
                e.preventDefault();
            }
            window.removeEventListener("copy", this.copyJson.bind(this));
        }

        showBanner(text) {
            this.banner.querySelector(".body-text").innerText = text;
            this.banner.style.display = "flex";
            setTimeout(() => {
                this.banner.style.opacity = "1";
                this.banner.style.top = "0px";
            }, 100);
            setTimeout(() => {
                this.banner.style.opacity = "0";
                this.banner.style.top = "-10px";
                setTimeout(() => {
                    this.banner.style.display = "none";
                }, 300);
            }, 3000);
        }
    }
    document.addEventListener("DOMContentLoaded", function (event) {
        new SFLibrary();
    });
})();
