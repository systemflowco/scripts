const script = document.createElement("script");
script.src = "https://systemflowco.github.io/scripts/sf/paste.js";
document.head.appendChild(script);

setTimeout(() => {
    readData(0, 10);
}, 3000);
