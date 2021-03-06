(() => {
    if (window.easyLmsInfo.videoType.toLowerCase() !== "youtube") return;

    // inject the vimeo api script
    const tag = document.createElement("script");
    tag.src = "https://player.vimeo.com/api/player.js";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    //wait until loaded
    tag.addEventListener("load", vimeoReady);

    function vimeoReady() {
        $("iframe").each((i, frame) => {
            // for each iframe
            // get the src
            let src = $(frame).attr("src");
            // skip the iframe if it's not a vimeo video
            if (!src.includes("vimeo")) {
                return;
            }
            // get the video id from the webflow defined src attribute value
            const videoId = window.easyLmsInfo.videoId;
            let tempHash = src.split("%3Fh%3D");
            const videoHash = tempHash.length > 1 ? tempHash[1].split("%26")[0] : "";
            // create a new src & embed the enablejsapi=1 query string
            src = `https://player.vimeo.com/video/${videoId}${videoHash ? "?h=" + videoHash : ""}`;
            // set the recreated src as the iframe's src
            $(frame).attr("src", src);
            // create a unique id for the iframe
            $(frame).attr("id", "dynamic" + i);
            // call the createPlayer function with the iframe's id
            createVimeoPlayer(frame.id);
        });
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

        player.on("play", function () {
            $(document).trigger("playerPlay");
        });

        $(document).on("goToVideoSecond", (event, progress) => {
            player.setCurrentTime(progress);
        });

        $(document).trigger("playerReady");

        player.on("ended", function () {
            $(document).trigger("finishLesson");
        });

        player.on("playbackratechange", function (event) {
            $(document).trigger("playbackRate", event.playbackRate);
        });

        $(document).on("setPlaybackRate", (event, playrate) => {
            player.setPlaybackRate(playrate);
        });
    }
})();
