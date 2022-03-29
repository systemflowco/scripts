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

    // get the video id from the webflow defined src attribute value
    var myregexp = /.*wistia.com(?:\/medias)?\/(.*)/i;
    const videoId = window.easyLmsInfo.lessonVideo.replace(myregexp, "$1");

    // create a new src & embed the enablejsapi=1 query string
    const src = `https://fast.wistia.net/embed/iframe/embed/iframe/${videoId}`;

    // set the recreated src as the iframe's src
    frame.setAttribute("src", src);
    // create a unique id for the iframe
    frame.id = "wistiaPlayer";
    frame.setAttribute("allow", "autoplay");
    frame.classList.add("wistia_embed");
    frame.setAttribute("name", "wistia_embed");
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

/* <div class="wistia_responsive_padding" style="padding:56.25% 0 0 0;position:relative;">
    <div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;">
        <iframe src="https://fast.wistia.net/embed/iframe/3fml1o1h3e?videoFoam=true" title=" [Example Video] Wistia Video Essentials" allow="autoplay; fullscreen" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" msallowfullscreen width="100%" height="100%"></iframe></div></div>
<script src="https://fast.wistia.net/assets/external/E-v1.js" async></script> */
