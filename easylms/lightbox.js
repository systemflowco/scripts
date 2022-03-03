function replaceVideoLink(link) {
    let newLink = "";
    if (link.includes("youtu")) {
        newLink = replaceYoutubeLink(link);
    }
    if (link.includes("vimeo")) {
        newLink = replaceVimeoLink(link);
    }
    return newLink;
}

function replaceYoutubeLink(link) {
    var myregexp =
        /.*(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
    const videoId = link.replace(myregexp, "$1");

    // create a new src & embed the enablejsapi=1 query string
    const src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${location.origin}&modestbranding=1&showinfo=0&rel=0`;

    return src;
}

function replaceVimeoLink(link) {
    var myregexp =
        /.*(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?\/?(.*)/i;

    const videoId = link.replace(myregexp, "$1");
    const videoHash = link.replace(myregexp, "$2");
    // create a new src & embed the enablejsapi=1 query string
    const src = `https://player.vimeo.com/video/${videoId}${videoHash ? "?h=" + videoHash : ""}`;
    // set the recreated src as the iframe's src
    return src;
}

var Webflow = Webflow || [];
Webflow.push(function () {
    var lightboxes = $(".w-json[data-lms-video-src]");
    lightboxes.each(function () {
        var lightboxLink = $(this).closest("a.lightbox-link");
        lightboxLink.addClass("w-lightbox");
        var src = replaceVideoLink($(this).attr("data-lms-video-src"));
        $(this).html($(this).html().replace("{SRC}", src));
        $(this).appendTo(lightboxLink);
    });
    $(".w-lightbox").webflowLightBox();
});
