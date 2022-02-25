document.addEventListener("DOMContentLoaded", function (event) {
    function sendWebhook(data) {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", this.webhookUrl, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(data));
    }

    const webhookUrlField = document.querySelector("[data-easylms-webhook-url]");
    const webhookUrl = webhookUrlField ? webhookUrlField.innerText : "";

    if (webhookUrl && webhookUrl !== "https://webhook_url.com") {
        sendWebhook({
            type: "visitPage",
            location: window.location.href,
            ecUserId: window._EC_USER_ID,
        });
    }
});
