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
    const src = `https://fast.wistia.net/embed/iframe/${videoId}`;

    frame.setAttribute("allow", "autoplay");

    // set the recreated src as the iframe's src
    frame.setAttribute("src", src);
    // create a unique id for the iframe
    frame.id = "wistiaPlayer";

    frame.classList.add("wistia_embed");
    frame.setAttribute("name", "wistia_embed");
    // call the createPlayer function with the iframe's id
    createWistiaPlayer(videoId);
}

function createWistiaPlayer(videoId) {
    window._wq = window._wq || [];
    _wq.push({
        id: videoId,
        onReady: function (video) {
            var player = video;

            // play the video at the specified seconds
            // setInterval(() => {
            //     $(document).trigger("videoProgress", player.time());
            // }, 5000);

            if (typeof window.autoplayMode === "undefined" || window.autoplayMode) {
                player.play();
            }

            player.bind("play", function () {
                $(document).trigger("playerPlay");
            });

            $(document).on("goToVideoSecond", (event, progress) => {
                player.time(progress);
            });

            $(document).trigger("playerReady");

            player.bind("end", function () {
                $(document).trigger("finishLesson");
            });

            player.bind("playbackratechange", function (rate) {
                $(document).trigger("playbackRate", rate);
            });

            $(document).on("setPlaybackRate", (event, playrate) => {
                player.playbackRate(playrate);
            });
        },
    });
}
