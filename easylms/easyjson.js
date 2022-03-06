const ej_api = "https://app.easytools.pl/api/json";
const easy_json = {
    logged() {
        const stripeKey = easy_json.getProductId();
        return window._EC_USER_ID && window[stripeKey];
    },
    getProductId() {
        return Object.keys(window).filter(function (prop) {
            return ~prop.indexOf("_EC_") && !~prop.indexOf("_EC_USER_ID");
        });
    },
    async patch(json, override = false) {
        if (!easy_json.logged()) {
            window.easyJSON = {};
            return;
        }
        const userId = window._EC_USER_ID;
        const stripeId = easy_json.getProductId()[0];
        let userJSON = json;
        if (!override) {
            userJSON = { ...window.easyJSON, ...json };
        }
        const result = await fetch(`${ej_api}/${userId}`, {
            mode: "cors",
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: JSON.stringify(userJSON), stripeId: stripeId }),
        });
        const { data } = await result.json();
        window.easyJSON = data || {};
        return data;
    },
    async get() {
        if (!easy_json.logged()) {
            window.easyJSON = {};
            new LogTost();
            return;
        }
        const userId = window._EC_USER_ID;
        const stripeId = easy_json.getProductId()[0];
        const result = await fetch(`${ej_api}/${userId}?stripeId=${stripeId}`, {
            mode: "cors",
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const data = await result.json();
        window.easyJSON = data || {};
    },
};

class LogTost {
    constructor() {
        this.logTost = document.createElement("div");
        this.logTostHtml = `
                <div class="toast-header">
                    <div class="popup-title">Jesteś niezalogowany</div>
                    <div class="material-icons icon-close">close</div>
                </div>
                <div>
                    <div class="body-text m s-m-b-0">
                        Zaloguj się do easyCart aby Twoje postępy zostały zapisane
                    </div>
                    <div class="ctas-wrapper">
                        <a href="#" class="button small w-inline-block">
                            <div class="button-text">Zaloguj</div>
                        </a>
                        <div class="button-separator"></div>
                        <a href="#" class="button small outline w-inline-block">
                            <div class="button-text">Anuluj</div>
                        </a>
                    </div>
                </div>
     `;

        this.assignEvents();
    }

    assignEvents() {
        this.appendTost();
    }

    appendTost() {
        this.logTost.innerHTML = this.logTostHtml;
        this.logTost.classList.add("toast");
        this.logTost.style.cssText +=
            "position: fixed; bottom: -20px;  right: 0; opacity: 0; transition: all 0.3s;";
        document.body.append(this.logTost);
        setTimeout(this.showTost.bind(this), 100);
    }

    showTost() {
        this.logTost.style.opacity = 1;
        this.logTost.style.bottom = "0px";
    }
}

const newEvent = new Event("easyJsonReady");
easy_json
    .get()
    .then(() => {
        document.dispatchEvent(newEvent);
    })
    .catch(() => {
        document.dispatchEvent(newEvent);
    });
