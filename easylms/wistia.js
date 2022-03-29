(() => {
    if (!window.easyLmsInfo.lessonVideo.includes("wistia")) return;

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
    const src = window.easyLmsInfo.lessonVideo.replace("/medias/", "/embed/iframe/");

    // set the recreated src as the iframe's src
    frame.setAttribute("src", src);
    // create a unique id for the iframe
    frame.id = "wistiaPlayer";
    // call the createPlayer function with the iframe's id
    createWistiaPlayer(frame.id);
}

function createWistiaPlayer(iframe) {
    var player = Wistia.api(iframe);
    console.log("I got a handle to the video!", player);

    // play the video at the specified seconds
    // setInterval(() => {
    //     $(document).trigger("videoProgress", player.time());
    // }, 5000);

    // player.play();

    // player.bind("play", function () {
    //     $(document).trigger("playerPlay");
    // });

    // $(document).on("goToVideoSecond", (event, progress) => {
    //     player.time(progress);
    // });

    // $(document).trigger("playerReady");

    // player.bind("end", function () {
    //     $(document).trigger("finishLesson");
    // });

    // player.bind("playbackratechange", function (rate) {
    //     $(document).trigger("playbackRate", rate);
    // });

    // $(document).on("setPlaybackRate", (event, playrate) => {
    //     player.playbackRate(playrate);
    // });
}
