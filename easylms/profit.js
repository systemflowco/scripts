(() => {
    class Profit {
        constructor(elem) {
            this.incomeField = elem.querySelector("[data-name='estimate-income']");
            this.studentsField = elem.querySelector("[data-name='estimate-students']");
            this.singleCostsFields = elem.querySelectorAll("static-expense-price");
            this.monthlyCostsFields = elem.querySelectorAll("monthly-expense-price");
            this.summaryField = elem.querySelector("#estimate-total");
            this.assignEvents();
        }

        assignEvents() {
            this.calculateProfit();
        }

        calculateProfit() {
            let profit = 0;
            let income = this.incomeField ? this.incomeField.value : 0;
            let singleCosts = 990;
            let monthlyCosts = 40;
            profit = profit + income - singleCosts - monthlyCosts * 12;
            this.updateProfitField(profit);
        }

        updateProfitField(profit) {
            this.summaryField.innerText = profit;
        }

        updateCosts() {}
    }
    document.addEventListener("DOMContentLoaded", function (event) {
        const estimate = document.querySelector(".estimate");
        if (estimate) {
            new Profit(estimate);
        }
    });
})();
