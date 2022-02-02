(() => {
    const isYoutubeOnPage = [...document.querySelectorAll("iframe")].filter((x) =>
        x.src.includes("youtube")
    ).length;

    if (!isYoutubeOnPage) return;

    // inject the youtube api script
    $('<script src="https://www.youtube.com/iframe_api">').insertBefore($("script")[0]);

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
            // get the video id from the webflow defined src attribute value
            const videoId = src.split("youtube.com%2Fembed%2F")[1].split("%3F")[0];
            // create a new src & embed the enablejsapi=1 query string
            src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
            // set the recreated src as the iframe's src
            $(frame).attr("src", src);
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
            // setup the event function to be called when YT.player is ready
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
            },
        });

        // setup the onPlayerReady function
        function onPlayerReady(event) {
            // when each timestamp is clicked

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

        function onPlayerStateChange(event) {
            if (event.data == YT.PlayerState.ENDED) {
                $(document).trigger("finishLesson");
            }
        }
    }
})();
