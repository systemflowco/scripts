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
            this.incomeField.value = "100";
            this.studentsField.value = "50";

            this.incomeField.addEventListener("change", this.calculateProfit.bind(this));
            this.studentsField.addEventListener("change", this.calculateProfit.bind(this));
            document
                .querySelector("#id-profit-autoimplement")
                .addEventListener("click", this.calculateProfit.bind(this));
            document
                .querySelector("#id-profit-implementation")
                .addEventListener("click", this.calculateProfit.bind(this));
            this.calculateProfit();
        }

        calculateProfit() {
            let income = this.incomeField ? +this.incomeField.value : 0;
            let students = this.studentsField ? +this.studentsField.value : 0;

            let hosting = students > 200 ? 127.5 : students > 100 ? 48 : 17.25;
            document.getElementById("id-profit-hosting").innerText = `${hosting} zł`;
            let mailing = students > 350 ? 285 : students > 250 ? 160 : students > 100 ? 60 : 40;
            document.getElementById("id-profit-mailing").innerText = `${mailing} zł`;
            let noAutoImplement = document.querySelector("#id-profit-autoimplement input").checked;
            let automation = noAutoImplement ? 40 : 200;
            document.getElementById("id-profit-automation").innerText = `${automation} zł`;
            let stripe = Math.round(0.016 * income * students * 100) / 100;
            document.getElementById("id-profit-stripe").innerText = `${stripe.toLocaleString()} zł`;
            let ec = Math.round(0.02 * income * students * 100) / 100;
            document.getElementById("id-profit-ec").innerText = `${ec.toLocaleString()} zł`;

            let monthlyCosts = 10 + hosting + mailing + automation + stripe + ec;

            let noImplement = document.querySelector("#id-profit-implementation input").checked;
            let singleCosts = noImplement ? 990 : 9900;
            let oldSingleCosts = noImplement ? 1980 : 19800;
            document.getElementById(
                "id-profit-singlecost"
            ).innerHTML = `<strike>${oldSingleCosts.toLocaleString()}</strike>  ${singleCosts.toLocaleString()} zł`;

            let profit =
                Math.round((income * students * 12 - singleCosts - monthlyCosts * 12) * 100) / 100;

            this.updateProfitField(profit);
        }

        updateProfitField(profit) {
            this.summaryField.innerText = `${profit.toLocaleString()} zł`;
        }
    }
    document.addEventListener("DOMContentLoaded", function (event) {
        const estimate = document.querySelector(".estimate");
        if (estimate) {
            new Profit(estimate);
        }
    });
})();
