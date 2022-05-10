(() => {
    class Carousels {
        constructor(elem) {
            this.cards = elem;

            this.assignEvents();
        }

        assignEvents() {

         
            const sliderCss = document.createElement("style");
            sliderCss.innerHTML = `.tns-inner{margin:0px 26px 0px 50px !important}.tns-outer{padding:0 !important}.tns-outer [hidden]{display:none !important}.tns-outer [aria-controls],.tns-outer [data-action]{cursor:pointer}.tns-slider{-webkit-transition:all 0s linear;-moz-transition:all 0s linear;transition:all 0s linear}.tns-slider>.tns-item{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.tns-horizontal.tns-subpixel{white-space:nowrap}.tns-horizontal.tns-subpixel>.tns-item{display:inline-block;vertical-align:top;white-space:normal}.tns-horizontal.tns-no-subpixel:after{content:'';display:table;clear:both}.tns-horizontal.tns-no-subpixel>.tns-item{float:left}.tns-horizontal.tns-carousel.tns-no-subpixel>.tns-item{margin-right:-100%}.tns-no-calc{position:relative;left:0}.tns-gallery{position:relative;left:0;min-height:1px}.tns-gallery>.tns-item{position:absolute;left:-100%;-webkit-transition:transform 0s linear, opacity 0s linear;-moz-transition:transform 0s linear, opacity 0s linear;transition:transform 0s linear, opacity 0s linear}.tns-gallery>.tns-slide-active{position:relative;left:auto !important}.tns-gallery>.tns-moving{-webkit-transition:all 0.25s linear;-moz-transition:all 0.25s linear;transition:all 0.25s linear}.tns-autowidth{display:inline-block}.tns-lazy-img{-webkit-transition:opacity 0.6s linear;-moz-transition:opacity 0.6s linear;transition:opacity 0.6s linear;opacity:0.6 linear}.tns-lazy-img.tns-complete{opacity:1}.tns-ah{-webkit-transition:height 0s linear;-moz-transition:height 0s linear;transition:height 0s linear}.tns-visually-hidden{position:absolute;left:-10000em}.tns-transparent{opacity:0;visibility:hidden}.tns-fadeIn{opacity:1;filter:alpha(opacity=100);z-index:0}.tns-normal,.tns-fadeOut{opacity:0;filter:alpha(opacity=0);z-index:-1}.tns-vpfix{white-space:nowrap}.tns-vpfix>div,.tns-vpfix>li{display:inline-block}.tns-t-subp2{margin:0 auto;width:310px;position:relative;height:10px;overflow:hidden}.tns-t-ct{width:2333.3333333%;width:-webkit-calc(100% * 70 / 3);width:-moz-calc(100% * 70 / 3);width:calc(100% * 70 / 3);position:absolute;right:0}.tns-t-ct:after{content:'';display:table;clear:both}.tns-t-ct>div{width:1.4285714%;width:-webkit-calc(100% / 70);width:-moz-calc(100% / 70);width:calc(100% / 70);height:10px;float:left}`;

            document.head.appendChild(sliderCss);

            const sliderLink = document.createElement("script");
            sliderLink.src =
                "https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.2/min/tiny-slider.js";

            document.head.appendChild(sliderLink);

            sliderLink.onload = ()=>{
                tns({
                    container:this.cards,
                    fixedWidth: 280,
                    slideBy: 1,
                    gutter:24,
                    loop:true,
                    edgePadding: 50,
                    swipeAngle: false,
                    nav:false,
                    controls:false,
                    autoplay:true,
                    speed: 1000,
                    autoplayTimeout: 1000,
                    autoplayHoverPause: true,
                    autoplayText: ["",""],
                })

            }

        }

     
    }

    const carousels = document.querySelectorAll("[data-sysflow-carousel]");

    if (carousels) {
        carousels.forEach((carousel) => {
            new Carousels(carousel);
        });
    }

})();
