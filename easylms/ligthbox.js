function replaceVideoLink(link) {
    let newLink = "";
    if (link.includes("youtu")) {
        newLink = replaceYoutubeLink(link);
    }
    if (link.includes("viemo")) {
        newLink = replaceVimeoLink(link);
    }
}

function replaceYoutubeLink(link) {
    return link;
}

function replaceVimeoLink(link) {
    return link;
}

var Webflow = Webflow || [];
Webflow.push(function () {
    var json = $(".w-json[data-lms-video-src]");
    json.each(function () {
        var src = replaceVideoLink($(this).attr("data-lms-video-src"));
        $(this).html($(this).html().replace("{SRC}", src));
    });
    $(".w-lightbox").webflowLightBox();
});
