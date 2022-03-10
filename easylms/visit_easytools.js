document.addEventListener("DOMContentLoaded", function (event) {
    function sendWebhook(url, data) {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(data));
    }

    const webhookUrl = window.easylmswebhook;

    if (webhookUrl && window._EC_USER_ID) {
        sendWebhook(webhookUrl, {
            type: "visitPage",
            location: window.location.href,
            ecUserId: window._EC_USER_ID,
        });
    }
});
