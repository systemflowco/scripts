(() => {
    class Calculator {
        constructor(elem) {
            this.items = document.querySelectorAll(".pricing-checkbox");
            this.startPrice = 990;
            this.startMonthPrice = 0;
            this.totalPrice = 0;
            this.totalMonthPrice = 0;
            this.priceTable = document.querySelector(".pricing-summary");
            this.monthPriceTable = document.querySelector(".monthly");
            this.assignEvents();
        }

        assignEvents() {
            this.items.forEach((item) => {
                item.addEventListener("click", this.checkPrices.bind(this));
            });
        }

        checkPrices() {
            this.totalPrice = this.startPrice;
            this.totalMonthPrice = this.startMonthPrice;
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
                    this.totalPrice += price;
                    this.addPriceToTable(title, price);
                    if (monthPrice) {
                        this.totalMonthPrice += monthPrice;
                        this.addMonthPriceToTable(title, monthPrice);
                    }
                }
            });
            //update total Price
            this.priceTable.querySelector(
                ".summary-item-price.big"
            ).innerText = `${this.totalPrice} zł netto`;
        }

        addPriceToTable(title, price) {
            const newItem = `<li class="summary-list-item"><div class="summary-item-name">${title}</div><div class="summary-item-price">${price} zł</div></li>`;
            this.priceTable.querySelector("ol").innerHTML += newItem;
        }

        addMonthPriceToTable(title, price) {
            const newItem = `<li class="summary-list-item"><div class="summary-item-name">${title}</div><div class="summary-item-price">${price} zł</div></li>`;
            this.monthPriceTable.querySelector("ol").innerHTML += newItem;
        }
    }
    document.addEventListener("DOMContentLoaded", function (event) {
        new Calculator();
    });
})();
