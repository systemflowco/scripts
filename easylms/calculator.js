(() => {
    class Calculator {
        constructor(elem) {
            this.prices = document.querySelectorAll(".pricing-checkbox");
            this.startPrice = 1990;
            this.startMonthPrice = 0;
            this.totalPrice = 0;
            this.totalMonthPrice = 0;
            this.priceTable = document.querySelector(".pricing-summary");
            this.assignEvents();
        }

        assignEvents() {
            this.prices.forEach((price) => {
                price.addEventListener("click", this.checkPrices.bind(this));
            });
        }

        checkPrices() {
            this.totalPrice = this.startPrice;
            this.totalMonthPrice = this.startMonthPrice;
            this.prices.forEach((price) => {
                let chosen = price.querySelector("input[type=checkbox]").checked;
                if (chosen) {
                    let title = price.querySelector(".checkbox-title").innerText;
                    let priceField = price.querySelector(".service-price");
                    let price = priceField ? +priceField.innerText.split("zł")[0] : 0;
                    let monthPriceField = price.querySelector(".tag.alternative");
                    let monthPrice = monthPriceField
                        ? +monthPriceField.innerText.split("zł")[0]
                        : 0;
                    this.totalPrice += price;
                    this.totalMonthPrice += monthPrice;
                    this.addPriceToTable(title, price);
                }
            });
        }

        addPriceToTable(title, price) {
            const newItem = `<li class="summary-list-item"><div class="summary-item-name">${title}</div><div class="summary-item-price">${price} zł</div></li>`;
            this.priceTable.querySelector("ol").innerHTML += newItem;
        }
    }
    document.addEventListener("DOMContentLoaded", function (event) {
        new Calculator();
    });
})();
