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
            //starting values
            this.incomeField.value = "50";
            this.studentsField.value = "100";

            this.incomeField.addEventListener("change", this.calculateProfit.bind(this));
            this.studentsField.addEventListener("change", this.calculateProfit.bind(this));
            this.calculateProfit();
        }

        calculateProfit() {
            let income = this.incomeField ? +this.incomeField.value : 0;
            let students = this.studentsField ? +this.studentsField.value : 0;
            let singleCosts = 990;
            let monthlyCosts = 40;
            let profit = income * students - singleCosts - monthlyCosts * 12;
            this.updateProfitField(profit);
        }

        updateProfitField(profit) {
            this.summaryField.innerText = `${profit} zł`;
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
