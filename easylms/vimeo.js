(() => {
    if (!window.easyLmsInfo.lessonVideo.includes("vimeo")) return;

    // inject the vimeo api script
    const tag = document.createElement("script");
    tag.src = "https://player.vimeo.com/api/player.js";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    //wait until loaded
    tag.addEventListener("load", vimeoReady);

    function vimeoReady() {
        const frame = document.querySelector("[data-easylms-video]");

        // get the video id from the webflow defined src attribute value
        var myregexp =
            /.*(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?\/?(.*)/i;
        const videoId = window.easyLmsInfo.lessonVideo.replace(myregexp, "$1");
        const videoHash = window.easyLmsInfo.lessonVideo.replace(myregexp, "$2");
        // create a new src & embed the enablejsapi=1 query string
        src = `https://player.vimeo.com/video/${videoId}${videoHash ? "?h=" + videoHash : ""}`;
        // set the recreated src as the iframe's src
        frame.setAttribute("src", src);
        // create a unique id for the iframe
        frame.id = "vimeoPlayer";
        // call the createPlayer function with the iframe's id
        createVimeoPlayer(frame.id);
    }

    // setup the createPlayer function
    function createVimeoPlayer(iframe) {
        var player = new Vimeo.Player(iframe);

        // play the video at the specified seconds
        setInterval(() => {
            player.getCurrentTime().then(function (progress) {
                $(document).trigger("videoProgress", progress);
            });
        }, 5000);

        player.play();

        $(document).on("goToVideoSecond", (event, progress) => {
            player.setCurrentTime(progress);
        });

        $(document).trigger("playerReady");

        player.on("ended", function () {
            $(document).trigger("finishLesson");
        });
    }
})();
