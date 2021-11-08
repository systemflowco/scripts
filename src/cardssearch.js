//SYSTEM FLOW Cards Searching
(() => {
    class CardsSearch {
        constructor(elem) {
            this.searchInput = elem;
            this.container = this.searchInput.closest(".container");
            this.cards = this.container ? this.container.querySelectorAll(".card") : null;
            this.textSelectors = "h1, h2, h3, h4, h5, h6, p";
            this.assignEvents();
        }

        assignEvents() {
            console.log(this.cards);
            if (this.cards) {
                this.searchInput.addEventListener("keyup", this.searchResults.bind(this));
            }
        }

        searchResults() {
            this.queryText = this.searchInput.value.toLowerCase();

            if (this.queryText.length > 0) {
                this.cards.forEach((card) => {
                    const fullText = card.textContent;
                    if (fullText.toLowerCase().indexOf(this.queryText) > -1) {
                        card.style.display = "flex";
                        this.showResult(card);
                    } else {
                        card.style.display = "none";
                    }
                });
            } else {
                this.clearSearch();
            }
        }

        showResult(card) {
            const texts = card.querySelectorAll(this.textSelectors);
            texts.forEach((text) => {
                text.innerHTML = this.highlightText(text.innerText);
            });
        }

        hideResult(card) {
            const texts = card.querySelectorAll(this.textSelectors);
            texts.forEach((text) => {
                text.innerHTML = text.innerText;
            });
        }

        clearSearch() {
            this.cards.forEach((card) => {
                card.style.display = "flex";
                this.hideResult(card);
            });
        }

        highlightText(text) {
            const myReg = new RegExp(`(${this.queryText})`, "gi");
            return text.replace(myReg, "<span style='background: yellow'>$1</span>");
        }
    }

    document.addEventListener("DOMContentLoaded", function (event) {
        const searches = document.querySelectorAll("[data-sysflow-cards-search]");

        if (searches) {
            searches.forEach((search) => {
                new CardsSearch(search);
            });
        }
    });
})();
