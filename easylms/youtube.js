const videoLink1 = window.easyLmsInfo.lessonVideo || window.easyLmsInfo.eventVideo || "";

(() => {
    if (!videoLink1.includes("youtu")) return;

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
    var myregexp =
        /.*(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
    const videoId = videoLink1.replace(myregexp, "$1");

    // create a new src & embed the enablejsapi=1 query string
    const src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${location.origin}&modestbranding=1&showinfo=0&rel=0`;

    // set the recreated src as the iframe's src
    frame.setAttribute("src", src);
    // create a unique id for the iframe
    frame.id = "youtubePlayer";
    // call the createPlayer function with the iframe's id
    createYoutubePlayer(frame.id);

    const chat = document.querySelector("[data-easylms-video-chat]");
    if (chat) {
        const chatSrc = `https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${location.origin}`;
        chat.setAttribute("src", chatSrc);
    }
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
    }

    function onYoutubePlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED) {
            $(document).trigger("finishLesson");
        }
    }
}
