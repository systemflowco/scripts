const ej_api = "https://app.easytools.pl/api/json";
const newEvent = new Event("easyJsonReady");

const easy_json = {
    logged() {
        const stripeKey = easy_json.getProductId();
        return window._EC_USER_ID && window[stripeKey];
    },
    getProductId() {
        return window.easyLmsInfo ? "_EC_" + window.easyLmsInfo.ecProductId.split(",").filter((id) => id.indexOf('prod_') > -1 || id.indexOf('price_')>-1)[0] : "";
    },
    async patch(json, override = false) {
        if (!easy_json.logged()) {
            window.easyJSON = {};
            return;
        }
        // await easy_json.get();
        const userId = window._EC_USER_ID;
        const stripeId = easy_json.getProductId();
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
            document.addEventListener("DOMContentLoaded", function (event) {
                new LogTost();
            });
            return;
        }
        const userId = window._EC_USER_ID;
        const stripeId = easy_json.getProductId();
        const result = await fetch(`${ej_api}/${userId}?stripeId=${stripeId}`, {
            mode: "cors",
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        let data = {};
        try {
            data = await result.json();
            if (data.statusCode !== 404 && data.statusCode !== 500) {
                window.easyJSON = data;
            }
        }
        catch {window.easyJSON = data;}
    },
};

class LogTost {
    constructor() {
        this.logTost = document.createElement("div");
        this.logTostHtml = `
                <div class="toast-header">
                    <div class="popup-title">Zaloguj się aby nie utracić postępów!</div>
                    <div data-ec-toast-close class="material-icons icon-close">close</div>
                </div>
                <div>
                    <div class="body-text m s-m-b-0">
                    Abyśmy mogli zapisać Twoje postępy między sesjami, musisz być zalogowany do swojego konta EasyCart. Dane logowania znajdziesz w mailu który przesłaliśmy po uzyskaniu dostępu do kursu. Możesz także zresetować hasło.
                    </div>
                    <div class="ctas-wrapper">
                        <a href="https://app.easycart.pl/logowanie?redirect=${encodeURI(
                            window.location
                        )}" class="button small w-inline-block">
                            <div class="button-text">Zaloguj się</div>
                        </a>
                    </div>
                </div>
     `;
        this.KEY_LOGIN = "LOGIN.TOAST";

        this.assignEvents();
    }

    assignEvents() {
        const tostSaved = sessionStorage.getItem(this.KEY_LOGIN);
        if (!tostSaved) {
            this.appendTost();
        }
    }

    appendTost() {
        this.logTost.innerHTML = this.logTostHtml;
        this.logTost.classList.add("toast");
        this.logTost.style.cssText +=
            "position: fixed; top: -12px;  left: 50%; bottom: auto; z-index: 1001; transform: translateX(-50%); opacity: 0; transition: all 0.3s;";
        document.body.append(this.logTost);
        setTimeout(this.showTost.bind(this), 100);
        this.logTost.querySelectorAll("[data-ec-toast-close]").forEach((closeBtn) => {
            closeBtn.addEventListener("click", this.removeTost.bind(this));
        });
        this.saveTost();
    }

    removeTost() {
        this.hideTost();
        setTimeout(() => {
            this.logTost.remove();
        }, 300);
    }

    showTost() {
        this.logTost.style.opacity = 1;
        this.logTost.style.top = "12px";
    }

    hideTost() {
        this.logTost.style.opacity = 0;
        this.logTost.style.top = "-12px";
    }

    saveTost() {
        sessionStorage.setItem(this.KEY_LOGIN, true);
    }
}

(async () => {
    await easy_json.get();
    document.dispatchEvent(newEvent);
})();
