(() => {
    class Calculator {
        constructor(elem) {
            this.items = document.querySelectorAll(".pricing-checkbox-header");
            this.startPrice = 199;
            this.startMonthPrice = 0;
            this.totalPrice = 199;
            this.totalMonthPrice = 0;
            this.priceTable = document.querySelector(".pricing-summary .single");
            this.monthPriceTable = document.querySelector(".monthly");
            this.payButton = document.querySelector("#payButton");
            this.implementOptions = [];
            this.assignEvents();
        }

        assignEvents() {
            this.checkAllPrices();
            
            this.items.forEach((item) => {
                item.querySelector(".w-check").addEventListener(
                    "click",
                    this.showSelect.bind(this)
                );
                item.querySelector(".w-radio").addEventListener(
                    "click",
                    this.checkAllPrices.bind(this)
                );
            });
        }

        checkAllPrices() {
            this.implementOptions = [];
            this.totalPrice = this.startPrice;
            this.clearPriceTable();
            this.totalMonthPrice = this.startMonthPrice;
            this.clearMonthPriceTable();

            this.checkSinglePrices();

            //update total Price
            this.priceTable.querySelector(".summary-item-price.big").innerText =
                `${this.totalPrice} zł netto`;
            let brutto = Math.round(this.totalPrice * 1.23);
            // https://hook.eu1.make.com/13mgu6xii6i38fzyi3a0528qoosjvqng
            // https://hook.eu1.make.com/yzi0o4r9ar4zjmwomtih3oq2souuof5m

            this.payButton.href = `https://hook.eu1.make.com/vydbcv44aqwl14ojtgmlgmn182qgq36s?price=${brutto}&prod=prod_LEYwjHjQyDzxxU&options=${this.implementOptions.join()}&monthly=${this.totalMonthPrice
                }`;
            this.payButton.querySelector(".button-text-2").innerText =
                `Płacę ${brutto} zł (brutto)`;
            //update total month Price
            this.monthPriceTable.querySelector(".summary-item-price.big").innerText =
                `${this.totalMonthPrice} zł`;

            if (!this.totalPrice) {
                this.priceTable.style.display = "none";
            } else {
                this.priceTable.style.display = "block";
            }

            if (!this.totalMonthPrice) {
                this.monthPriceTable.style.display = "none";
            } else {
                this.monthPriceTable.style.display = "block";
            }
        }

        hideSelects() {
            document.querySelectorAll(".checkbox-select").forEach((select) => {
                select.style.opacity = "0";
            });
        }

        showSelect() {
            this.hideSelects();
            this.items.forEach((item, index) => {
                let chosen =
                    item.querySelector("input[type=checkbox]")?.checked ;
                if (chosen) {
                    let select = item.querySelector(".checkbox-select");
                    select.style.opacity = "1";
                }
            });
        }

        checkSinglePrices() {
            this.items.forEach((item, index) => {
                let chosen =
                    item.querySelector("input[type=radio]")?.checked;
                if (chosen) {
                    let title = item.querySelector(".checkbox-custom-label").innerText;
                    4;
                    let priceField = item.querySelector(".price-service");
                    let price = priceField ? +priceField.innerText : 0;
                    let monthPriceField = item.querySelector(".price-monthly");
                    let monthPrice = monthPriceField ? +monthPriceField.innerText : 0;
                    if (price) {
                        this.totalPrice += price;
                        this.addPriceToTable(title,price);
                    }
                    if (monthPrice) {
                        this.totalMonthPrice += monthPrice;
                        this.addMonthPriceToTable(title, monthPrice);
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
            this.priceTable.querySelector("ol").innerHTML = "";
        }

        clearMonthPriceTable() {
            const firstItem = this.monthPriceTable.querySelector("ol").children[0].outerHTML;
            this.monthPriceTable.querySelector("ol").innerHTML = firstItem;
        }


    }
    document.addEventListener("DOMContentLoaded", function (event) {
        new Calculator();
    });
})();
