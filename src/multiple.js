// SYSTEM FLOW Multiple
(() => {
    class Multiples {
        constructor(elem) {
            this.multiple = elem;
            this.select = this.multiple.querySelector("[data-sysflow-multiple-select]");
            this.options = this.select.querySelectorAll("option");
            this.tags = this.multiple.querySelector("[data-sysflow-multiple-tags]");
            this.list = this.multiple.querySelector("[data-sysflow-multiple-list]");
            this.placeholder = this.multiple.querySelector("[data-sysflow-multiple-placeholder]");
            this.placeholderText = this.placeholder ? this.placeholder.innerText : "";
            this.selected = [];

            this.assignEvents();
        }

        assignEvents() {
            this.clearTags();
            this.createList();
        }

        createList() {
            this.list.innerHTML = "";
            this.options.forEach((option, index) => {
                this.list.innerHTML += `<div class="dropdown-menu-item w-dropdown-link" data-index="${index}" data-value="${option.value}">${option.innerText}</div>`;
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
            if (this.selected.indexOf(index) > -1) {
                this.options[index].selected = false;
                this.selected.splice(this.selected.indexOf(index), 1);
                option.classList.remove("selected");
                this.removeFromTags(index);
            } else {
                this.options[index].selected = true;
                this.selected.push(index);
                option.classList.add("selected");
                this.addToTags(option, index);
                this.clearPlaceholder();
            }
        }

        removeFromTags(index) {
            this.tags.querySelector(`[data-index="${index}"]`).remove();
            if (!this.tags.length) {
                this.showPlaceholder();
            }
        }

        addToTags(option, index) {
            let tag = document.createElement("div");
            tag.classList.add("tag");
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
    }

    const multiples = document.querySelectorAll("[data-sysflow-multiple]");

    if (multiples) {
        multiples.forEach((multiple) => {
            new Multiples(multiple);
        });
    }
})();
