(() => {
    class Calculator {
        constructor(elem) {
            this.items = document.querySelectorAll(".pricing-checkbox-header");
            this.countItems = document.querySelectorAll(".checkbox-counter-value");
            this.startPrice = +document.querySelector(".price-big").innerText.split("zł")[0];
            this.startMonthPrice = 0;
            this.totalPrice = 0;
            this.totalMonthPrice = 0;
            this.priceTable = document.querySelector(".pricing-summary");
            this.monthPriceTable = document.querySelector(".monthly");
            this.assignEvents();
        }

        assignEvents() {
            this.checkAllPrices();
            this.items.forEach((item) => {
                item.querySelector(".w-checkbox").addEventListener(
                    "click",
                    this.checkAllPrices.bind(this)
                );
            });
            this.countItems.forEach((item) => {
                let toggles = item.parentElement.querySelectorAll("a");
                toggles[0].addEventListener("click", this.changeAmount.bind(this, item, -1));
                toggles[1].addEventListener("click", this.changeAmount.bind(this, item, 1));
            });
        }

        checkAllPrices() {
            this.totalPrice = this.startPrice;
            this.clearPriceTable();
            this.totalMonthPrice = this.startMonthPrice;
            this.clearMonthPriceTable();

            this.checkSinglePrices();

            //update total Price
            this.priceTable.querySelector(
                ".summary-item-price.big"
            ).innerText = `${this.totalPrice} zł netto`;

            //update total month Price
            this.monthPriceTable.querySelector(
                ".summary-item-price.big"
            ).innerText = `${this.totalMonthPrice} zł`;
        }

        checkSinglePrices() {
            this.items.forEach((item) => {
                let chosen = item.querySelector("input[type=checkbox]").checked;
                if (chosen) {
                    let title = item.querySelector(".checkbox-custom-label").innerText;
                    let priceField = item.querySelector(".price-service");
                    let price = priceField ? +priceField.innerText : 0;
                    let monthPriceField = item.querySelector(".price-monthly");
                    let monthPrice = monthPriceField ? +monthPriceField.innerText : 0;
                    let amountField = item.querySelector(".checkbox-counter-value");
                    let amount = amountField ? +amountField.innerText : 1;
                    if (price) {
                        this.totalPrice += price * amount;
                        this.addPriceToTable(title, price * amount);
                    }
                    if (monthPrice) {
                        this.totalMonthPrice += monthPrice * amount;
                        this.addMonthPriceToTable(title, monthPrice * amount);
                    }
                }
            });
        }

        addPriceToTable(title, price) {
            const newItem = `<li class="summary-list-item"><div class="summary-item-name">${title}</div><div class="summary-item-price">${
                price ? price + " zł" : "-"
            }</div></li>`;
            this.priceTable.querySelector("ol").innerHTML += newItem;
        }

        addMonthPriceToTable(title, price) {
            const newItem = `<li class="summary-list-item"><div class="summary-item-name">${title}</div><div class="summary-item-price">${price} zł</div></li>`;
            this.monthPriceTable.querySelector("ol").innerHTML += newItem;
        }

        clearPriceTable() {
            const firstItem = this.priceTable.querySelector("ol").children[0].outerHTML;
            this.priceTable.querySelector("ol").innerHTML = firstItem;
        }

        clearMonthPriceTable() {
            this.monthPriceTable.querySelector("ol").innerHTML = "";
        }

        changeAmount(counter, value) {
            let oldValue = +counter.innerText;
            let newValue = oldValue + value;

            if (newValue > -1) {
                counter.innerText = newValue;
            } else {
                counter.innerText = 0;
            }

            if (newValue > 0) {
                counter.parentElement.querySelector("a").classList.remove("disabled");
            } else {
                counter.parentElement.querySelector("a").classList.add("disabled");
            }

            this.updateCheckboxState(counter);
        }

        updateCheckboxState(counter) {
            let chosenField = counter
                .closest(".pricing-checkbox-header")
                .querySelector("input[type=checkbox]");
            let chosen = chosenField.checked;

            if (counter.value > 0 && !chosen) {
                chosenField.click();
            }
            if (counter.value <= 0 && chosen) {
                chosenField.click();
            }
        }
    }
    document.addEventListener("DOMContentLoaded", function (event) {
        new Calculator();
    });
})();
