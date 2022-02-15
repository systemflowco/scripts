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
        window.easyJSON = data;
        return data;
    },
    async get() {
        if (!easy_json.logged()) {
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
        window.easyJSON = data;
    },
};
easy_json.get().then(() => {
    console.log(window.easyJSON);
});
