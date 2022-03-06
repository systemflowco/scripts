(() => {
    if (window.easyLmsInfo.videoType.toLowerCase() !== "youtube") return;

    // inject the youube api script
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})();

// setup the onYouTubeIframeAPIReady function
// this is the function called by the youtube api once it's ready
function onYouTubeIframeAPIReady() {
    // loop through all the iframes on the page
    $("iframe").each((i, frame) => {
        // for each iframe
        // get the src
        let src = $(frame).attr("src");
        // skip the iframe if it's not a youtube video
        if (!src.includes("youtube")) return;
        // get the video id
        const videoId = window.easyLmsInfo.videoId;

        // create a new src & embed the enablejsapi=1 query string
        src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${location.origin}&modestbranding=1&showinfo=0&rel=0`;

        // set the recreated src as the iframe's src
        frame.setAttribute("src", src);
        // create a unique id for the iframe
        $(frame).attr("id", "dynamic" + i);
        // call the createPlayer function with the iframe's id
        createYoutubePlayer(frame.id);
    });
}

// setup the createPlayer function
function createYoutubePlayer(iframe) {
    // initialize YT.player with the specified iframe's id
    let player = new YT.Player(iframe, {
        playerVars: { showInfo: 0, modestbranding: 1 },
        // setup the event function to be called when YT.player is ready
        events: {
            onReady: onYoutubePlayerReady,
            onStateChange: onYoutubePlayerStateChange,
            onPlaybackRateChange: onYoutubePlaybackRateChange,
        },
    });

    // setup the onYoutubePlayerReady function
    function onYoutubePlayerReady(event) {
        // play the video at the specified seconds
        setInterval(() => {
            const currentTime = player.getCurrentTime();
            $(document).trigger("videoProgress", currentTime);
        }, 5000);

        player.playVideo();

        $(document).on("goToVideoSecond", (event, progress) => {
            player.seekTo(progress);
        });

        $(document).trigger("playerReady");

        $(document).on("setPlaybackRate", (event, playrate) => {
            player.setPlaybackRate(playrate);
        });
    }

    function onYoutubePlaybackRateChange(event) {
        console.log(event.data);
        $(document).trigger("playbackRate", event.data);
    }

    function onYoutubePlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED) {
            $(document).trigger("finishLesson");
        }
        if (event.data == YT.PlayerState.PLAYING) {
            $(document).trigger("playerPlay");
        }
    }
}
