const videoLink = window.easyLmsInfo.lessonVideo || window.easyLmsInfo.eventVideo;

(() => {
    if (!videoLink.includes("wistia")) return;

    // inject the youube api script
    const tag = document.createElement("script");
    tag.src = "//fast.wistia.net/assets/external/E-v1.js";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    //wait until loaded
    tag.addEventListener("load", wistiaReady);
})();

function wistiaReady() {
    const frame = document.querySelector("[data-easylms-video]");

    // create a new src & embed the enablejsapi=1 query string
    const src = videoLink;

    // set the recreated src as the iframe's src
    frame.setAttribute("src", src);
    // create a unique id for the iframe
    frame.id = "wistiaPlayer";
    // call the createPlayer function with the iframe's id
    Wistia.api(frame.id);
}
