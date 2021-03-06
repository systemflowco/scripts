//SYSTEM FLOW Cards Filtering by Taglines
(() => {
    class CardsFilter {
        constructor(elem) {
            this.filter = elem;
            this.container = this.filter.closest(".container");
            this.collectionItems = this.container
                ? this.container.querySelectorAll(".w-dyn-item .card")
                : null;
            this.cards = this.container ? this.container.querySelectorAll(".card") : null;
            this.filterBy =
                this.filter.dataset.sysflowCardsFilter == "0"
                    ? ".card .tagline"
                    : this.filter.dataset.sysflowCardsFilter;
            this.taglines = this.container ? this.container.querySelectorAll(this.filterBy) : null;
            this.tags = this.filter.querySelector("[data-sysflow-multiple-tags]");
            this.list = this.filter.querySelector("[data-sysflow-multiple-list]");
            this.placeholder = this.filter.querySelector("[data-sysflow-multiple-placeholder]");
            this.placeholderText = this.placeholder ? this.placeholder.innerText : "";
            this.selected = [];

            this.assignEvents();
        }

        assignEvents() {
            this.clearTags();
            if (this.collectionItems && this.collectionItems.length) {
                this.cards = [];
                this.collectionItems.forEach((item) =>
                    this.cards.push(item.closest(".w-dyn-item"))
                );
            }
            if (this.cards && this.taglines) {
                this.createList();
            }
        }

        createList() {
            this.list.innerHTML = "";
            const taglinesArray = [...this.taglines].map((x) => x.innerText);
            const taglineUnique = [...new Set(taglinesArray)];

            taglineUnique.forEach((option, index) => {
                this.list.innerHTML += `<div class="dropdown-menu-item w-dropdown-link" data-index="${index}">${option}</div>`;
            });

            [...this.list.children].forEach((option, index) => {
                option.addEventListener("click", (e) => {
                    this.toggleOption(option, index);
                });
            });
        }

        clearTags() {
            this.tags.innerHTML = "";
        }

        clearPlaceholder() {
            if (this.placeholder) this.placeholder.innerText = "";
        }

        showPlaceholder() {
            if (this.placeholder) this.placeholder.innerText = this.placeholderText;
        }

        toggleOption(option, index) {
            const text = option.innerText;
            if (this.selected.indexOf(text) > -1) {
                this.selected.splice(this.selected.indexOf(text), 1);
                option.classList.remove("selected");
                this.removeFromTags(index);
            } else {
                this.selected.push(text);
                option.classList.add("selected");
                this.addToTags(option, index);
                this.clearPlaceholder();
            }
            this.filterResults();
        }

        removeFromTags(index) {
            this.tags.querySelector(`[data-index="${index}"]`).remove();
        }

        addToTags(option, index) {
            let tag = document.createElement("div");
            tag.classList.add("tag");
            tag.classList.add("tag-closeable");
            tag.setAttribute("data-index", index);
            tag.innerHTML = `${option.innerText} <span class="material-icons icon-right">close</span>`;
            //allow deleteting selection by clicking tabs
            tag.addEventListener(
                "click",
                (ev) => {
                    ev.stopPropagation();
                    ev.preventDefault();
                    this.toggleOption(option, index);
                },
                true
            );
            //prevent default dropdown behaviour
            ["momusedown", "mouseup"].forEach((evt) =>
                tag.addEventListener(
                    evt,
                    (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                    },
                    true
                )
            );

            this.tags.append(tag);
        }

        filterResults() {
            if (this.selected.length > 0) {
                this.cards.forEach((card) => {
                    const taglines = [...card.querySelectorAll(this.filterBy)].map(
                        (x) => x.innerText
                    );
                    let tagFound = false;
                    taglines.forEach((tag) => {
                        if (this.selected.indexOf(tag) > -1) {
                            tagFound = true;
                        }
                    });
                    if (tagFound) {
                        delete card.dataset.filterHide;
                        if (!card.dataset.searchHide) card.style.display = "flex";
                    } else {
                        card.style.display = "none";
                        card.dataset.filterHide = true;
                    }
                });
            } else {
                this.clearFilter();
            }
        }

        clearFilter() {
            this.cards.forEach((card) => {
                if (card.dataset.filterHide) {
                    delete card.dataset.filterHide;
                    if (!card.dataset.searchHide) card.style.display = "flex";
                }
            });
            this.showPlaceholder();
        }
    }

    document.addEventListener("DOMContentLoaded", function (event) {
        const cfilters = document.querySelectorAll("[data-sysflow-cards-filter]");

        if (cfilters) {
            cfilters.forEach((cfilter) => {
                new CardsFilter(cfilter);
            });
        }
    });
})();
