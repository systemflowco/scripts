(() => {
    function getYoutubeVideoId(link) {
        var myregexp =
            /.*(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
        return link.replace(myregexp, "$1");
    }

    function getVimeoVideoId(link) {
        var myregexp =
            /.*(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|event\/|webinars\/events\/|)([^\/]+)\/?(.*)/i;
        return link.replace(myregexp, "$1");
    }

    function getVimeoVideoHash(link) {
        var myregexp =
            /.*(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|event\/|webinars\/events\/|)([^\/]+)\/?(.*)/i;
        return link.replace(myregexp, "$2");
    }

    const lmsVideos = document.querySelectorAll("[data-easylms-video]");
    lmsVideos.forEach((lmsVideo) => {
        let videoLink = lmsVideo.getAttribute("data-easylms-video");
        let videoSrc = "";
        if (videoLink.includes("youtu")) {
            let videoId = getYoutubeVideoId(videoLink);
            videoSrc = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${location.origin}&modestbranding=1&showinfo=0&rel=0`;
        }
        if (videoLink.includes("vimeo")) {
            let videoId = getVimeoVideoId(videoLink);
            let videoHash = getVimeoVideoHash(videoLink);
            videoSrc = `https://player.vimeo.com/video/${videoId}${
                videoHash ? "?h=" + videoHash : ""
            }`;
            if (videoLink.includes("event")) {
                eventSrc = `https://vimeo.com/event/${videoId}/embed${
                    videoHash ? "/" + videoHash : ""
                }`;
            }
            if (videoLink.includes("webinars")) {
                eventSrc = `https://vimeo.com/webinars/events/${videoId}/embed`;
            }
        }
        lmsVideo.setAttribute("src", videoSrc);
    });

    const lmsEvent = document.querySelector("[data-easylms-video-event]");
    if (lmsEvent) {
        let videoLink = lmsEvent.getAttribute("data-easylms-video-event");
        let eventSrc = "";
        if (videoLink.includes("youtu")) {
            let videoId = getYoutubeVideoId(videoLink);
            eventSrc = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${location.origin}&modestbranding=1&showinfo=0&rel=0`;
        }
        if (videoLink.includes("vimeo")) {
            let videoId = getVimeoVideoId(videoLink);
            let videoHash = getVimeoVideoHash(videoLink);
            eventSrc = `https://player.vimeo.com/video/${videoId}${
                videoHash ? "?h=" + videoHash : ""
            }/embed`;
            if (videoLink.includes("event")) {
                eventSrc = `https://vimeo.com/event/${videoId}/embed${
                    videoHash ? "/" + videoHash : ""
                }`;
            }
            if (videoLink.includes("webinars")) {
                eventSrc = `https://vimeo.com/webinars/events/${videoId}/embed`;
            }
        }
        lmsEvent.setAttribute("src", eventSrc);
    }

    const lmsChat = document.querySelector("[data-easylms-video-chat]");
    if (lmsChat) {
        let videoLink = lmsChat.getAttribute("data-easylms-video-chat");
        let chatSrc = "";
        if (videoLink.includes("youtu")) {
            let videoId = getYoutubeVideoId(videoLink);
            chatSrc = `https://www.youtube.com/live_chat?v=${videoId}&embed_domain=${location.host}`;
        }
        if (videoLink.includes("vimeo")) {
            let videoId = getVimeoVideoId(videoLink);
            chatSrc = `https://vimeo.com/live-chat/${videoId}`;
            if (videoLink.includes("event")) {
                chatSrc = `https://vimeo.com/event/${videoId}/chat`;
            }
        }
        lmsChat.setAttribute("src", chatSrc);
    }
})();
