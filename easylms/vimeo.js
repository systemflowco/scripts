// inject the vimeo api script
$('<script onload="vimeoReady();"; src="https://player.vimeo.com/api/player.js">').insertBefore(
    $("script")[0]
);

function vimeoReady() {
    console.log("vimeo ready");
    $("iframe").each((i, frame) => {
        // for each iframe
        // get the src
        let src = $(frame).attr("src");
        // skip the iframe if it's not a vimeo video
        if (!src.includes("vimeo")) return;
        console.log("jest iframe z vimeo");
        // call the createPlayer function with the iframe's id
        createPlayer(frame);
    });
}

// setup the createPlayer function
function createPlayer(iframe) {
    var player = new Vimeo.Player(iframe);
    console.log(player);

    player.on("ended", function () {
        console.log("the end");
    });
}
