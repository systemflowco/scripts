(() => {
    class Calculator {
        constructor(elem) {
            this.items = document.querySelectorAll(".pricing-checkbox");
            this.countItems = document.querySelectorAll(".service-header");
            this.startPrice = 990;
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
                item.addEventListener("click", this.checkAllPrices.bind(this));
            });
            this.countItems.forEach((item) => {
                let counter = item.querySelector(".input-counter");
                if (counter) {
                    let toggles = counter.parentElement.querySelectorAll("a");
                    toggles[0].addEventListener("click", this.changeAmount.bind(this, counter, -1));
                    toggles[1].addEventListener("click", this.changeAmount.bind(this, counter, 1));
                    counter.addEventListener("input", this.changeAmount.bind(this, counter, 0));
                }
                item.addEventListener("click", this.checkAllPrices.bind(this));
            });
        }

        checkAllPrices() {
            console.log("checking prices");
            this.totalPrice = this.startPrice;
            this.clearPriceTable();
            this.totalMonthPrice = this.startMonthPrice;
            this.clearMonthPriceTable();

            this.checkSinglePrices();
            this.checkCounterPrices();

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
                    let title = item.querySelector(".checkbox-title").innerText;
                    let priceField = item.querySelector(".service-price");
                    let price = priceField ? +priceField.innerText.split("zł")[0] : 0;
                    let monthPriceField = item.querySelector(".tag.alternative");
                    let monthPrice = monthPriceField
                        ? +monthPriceField.innerText.split("zł")[0]
                        : 0;
                    if (price) {
                        this.totalPrice += price;
                        this.addPriceToTable(title, price);
                    }
                    if (monthPrice) {
                        this.totalMonthPrice += monthPrice;
                        this.addMonthPriceToTable(title, monthPrice);
                    }
                }
            });
        }

        checkCounterPrices() {
            this.countItems.forEach((item) => {
                let chosen = item.querySelector("input[type=checkbox]").checked;
                if (chosen) {
                    let title = item.querySelector(".service-title").innerText;
                    let priceField = item.querySelector(".service-price-label");
                    let price = priceField ? +priceField.innerText.split("zł")[0] : 0;
                    let amountField = item.querySelector(".input-counter");
                    let amount = amountField ? +amountField.value : 0;
                    if (price && amount) {
                        this.totalPrice += price * amount;
                        this.addPriceToTable(title, price * amount);
                    }
                }
            });
        }

        addPriceToTable(title, price) {
            const newItem = `<li class="summary-list-item"><div class="summary-item-name">${title}</div><div class="summary-item-price">${price} zł</div></li>`;
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
            let oldValue = +counter.value;
            let newValue = oldValue + value;

            if (newValue > -1) {
                counter.value = newValue;
            } else {
                counter.value = 0;
            }

            if (oldValue === 0 || newValue === 0) {
                counter.closest(".service-header").querySelector("input[type=checkbox]").click();
            }
        }
    }
    document.addEventListener("DOMContentLoaded", function (event) {
        new Calculator();
    });
})();
