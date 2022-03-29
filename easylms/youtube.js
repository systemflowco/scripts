(() => {
    if (!window.easyLmsInfo.lessonVideo.includes("youtu")) return;

    // inject the youube api script
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})();

// setup the onYouTubeIframeAPIReady function
// this is the function called by the youtube api once it's ready
function onYouTubeIframeAPIReady() {
    const frame = document.querySelector("[data-easylms-video]");

    // get the video id
    function YouTubeGetID(url) {
        url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
    }
    const videoId = YouTubeGetID(window.easyLmsInfo.lessonVideo);

    console.log("Generate src");
    // create a new src & embed the enablejsapi=1 query string
    const src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${location.origin}&autoplay=1`;

    // set the recreated src as the iframe's src
    frame.setAttribute("src", src);
    // create a unique id for the iframe
    frame.id = "youtubePlayer";
    frame.setAttribute("allow", "autoplay");
    // call the createPlayer function with the iframe's id
    createYoutubePlayer(frame.id);
}

// setup the createPlayer function
function createYoutubePlayer(iframe) {
    // initialize YT.player with the specified iframe's id
    let player = new YT.Player(iframe, {
        playerVars: { showInfo: 0, modestbranding: 1, autoplay: 1, rel: 0, modestbranding: 1 },
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

        event.target.playVideo();

        $(document).on("goToVideoSecond", (event, progress) => {
            player.seekTo(progress);
        });

        $(document).trigger("playerReady");

        $(document).on("setPlaybackRate", (event, playrate) => {
            player.setPlaybackRate(playrate);
        });
    }

    function onYoutubePlaybackRateChange(event) {
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
