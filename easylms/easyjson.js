const ej_api = "https://app.easytools.pl/api/json",
    easyJSON = {
        logged() {
            const e = easyJSON.getProductId();
            return window._EC_USER_ID && window[e];
        },
        getProductId: () =>
            Object.keys(window).filter(function (e) {
                return ~e.indexOf("_EC_") && !~e.indexOf("_EC_USER_ID");
            }),
        async patch(e, t = !1) {
            if (!easyJSON.logged()) return;
            const o = window._EC_USER_ID,
                n = easyJSON.getProductId()[0];
            let a = e;
            t && (a = { ...window.easyJSON, ...e });
            const s = await fetch(`${ej_api}/${o}`, {
                mode: "cors",
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: JSON.stringify(a), stripeId: n }),
            });
            return await s.json();
        },
        async get() {
            if (!easyJSON.logged()) return;
            const e = window._EC_USER_ID,
                t = easyJSON.getProductId()[0],
                o = await fetch(`${ej_api}/${e}?stripeId=${t}`, {
                    mode: "cors",
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }),
                n = await o.json();
            window.easyJSON = n;
        },
    };

easyJSON.get();
