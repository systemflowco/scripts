(() => {
    class Calculator {
        constructor(elem) {
            this.prices = document.querySelectorAll(".pricing-checkbox");
            this.startPrice = 1990;
            this.startMonthPrice = 0;
            this.totalPrice = 0;
            this.totalMonthPrice = 0;
            this.assignEvents();
        }

        assignEvents() {
            this.prices.forEach((price) => {
                price.addEventListener("click", this.checkPrices.bind(this));
            });
        }

        checkPrices() {
            this.prices.forEach((price) => {
                this.totalPrice = this.startPrice;
                this.totalMonthPrice = this.startMonthPrice;
                const chosen = price.querySelector("input[type=checkbox]").checked;
                if (chosen) {
                    const title = price.querySelector(".checkbox-title").innerText;
                    const priceField = price.querySelector(".service-price");
                    const price = priceField ? +priceField.innerText.split("zł")[0] : 0;
                    const monthPriceField = price.querySelector(".tag.alternative");
                    const monthPrice = monthPriceField
                        ? +monthPriceField.innerText.split("zł")[0]
                        : 0;
                    this.totalPrice += price;
                    this.totalMonthPrice += monthPrice;
                }
            });
        }
    }
    document.addEventListener("DOMContentLoaded", function (event) {
        new Calculator();
    });
})();
